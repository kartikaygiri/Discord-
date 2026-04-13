#!/usr/bin/env python3
"""
SIGNAL — BSE Filing Scraper
Fetches quarterly result PDFs from BSE India's corporate filings API,
extracts financial tables, and inserts into Supabase.

Usage:
    python scripts/scrape_bse.py
    python scripts/scrape_bse.py --company 500325  # specific BSE code

Requirements:
    pip install requests camelot-py[cv] supabase python-dotenv tabula-py
"""

import os
import json
import time
import logging
import argparse
from datetime import datetime, timedelta
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# ─── Config ──────────────────────────────────────────────────────────────────

BSE_FILINGS_URL = "https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w"
BSE_PDF_BASE    = "https://www.bseindia.com"

SUPABASE_URL    = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY    = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; SignalBot/1.0; +https://signal.in/bot)",
    "Referer":    "https://www.bseindia.com/",
    "Accept":     "application/json",
}

# ─── BSE API Helpers ─────────────────────────────────────────────────────────

def fetch_filings(bse_code: str, days_back: int = 7) -> list[dict]:
    """Fetch financial result filings for a company from BSE."""
    from_date = (datetime.now() - timedelta(days=days_back)).strftime("%Y%m%d")
    to_date   = datetime.now().strftime("%Y%m%d")

    params = {
        "pageno":      "1",
        "strCat":      "-1",
        "strPrevDate": from_date,
        "strScrip":    bse_code,
        "strSearch":   "P",
        "strToDate":   to_date,
        "strType":     "C",
        "subcategory": "-1",
    }

    try:
        resp = requests.get(BSE_FILINGS_URL, params=params, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("Table", [])
    except Exception as e:
        log.error(f"Failed to fetch filings for {bse_code}: {e}")
        return []


def is_financial_result(filing: dict) -> bool:
    """Check if a filing is a quarterly financial result."""
    category = filing.get("CATEGORYNAME", "").lower()
    news_body = filing.get("NEWSSUB", "").lower()
    financial_keywords = ["financial result", "quarterly result", "unaudited result", "audited result"]
    return any(kw in category or kw in news_body for kw in financial_keywords)


def download_pdf(filing: dict, output_dir: Path) -> Path | None:
    """Download the filing PDF and return local path."""
    pdf_url = filing.get("ATTACHMENTNAME", "")
    if not pdf_url:
        return None

    full_url = f"{BSE_PDF_BASE}/{pdf_url.lstrip('/')}"
    filename  = output_dir / f"{filing['SCRIPCD']}_{filing['NEWS_DT']}.pdf"

    if filename.exists():
        log.info(f"PDF already downloaded: {filename}")
        return filename

    try:
        resp = requests.get(full_url, headers=HEADERS, timeout=30, stream=True)
        resp.raise_for_status()
        with open(filename, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        log.info(f"Downloaded: {filename}")
        return filename
    except Exception as e:
        log.error(f"Failed to download PDF: {e}")
        return None


# ─── PDF Table Extraction ────────────────────────────────────────────────────

def extract_tables_from_pdf(pdf_path: Path) -> list[dict]:
    """Extract financial tables from a quarterly result PDF using camelot."""
    try:
        import camelot
        tables = camelot.read_pdf(str(pdf_path), pages="all", flavor="lattice")
        results = []
        for table in tables:
            df = table.df
            if df.shape[0] > 3 and df.shape[1] >= 2:  # Minimum viable table
                results.append(df.to_dict(orient="records"))
        return results
    except ImportError:
        log.warning("camelot not installed, trying tabula-py")
        return _extract_with_tabula(pdf_path)
    except Exception as e:
        log.error(f"PDF extraction failed: {e}")
        return []


def _extract_with_tabula(pdf_path: Path) -> list[dict]:
    """Fallback: extract tables using tabula-py."""
    try:
        import tabula
        dfs = tabula.read_pdf(str(pdf_path), pages="all", multiple_tables=True, silent=True)
        return [df.to_dict(orient="records") for df in dfs if not df.empty]
    except Exception as e:
        log.error(f"tabula extraction failed: {e}")
        return []


def parse_financial_values(tables: list[dict]) -> dict:
    """
    Heuristic parser to extract key financial metrics from table data.
    Returns structured dict with revenue, ebitda, net_profit, eps.
    """
    raw_text = json.dumps(tables).lower()

    def find_value(keywords: list[str]) -> float | None:
        for kw in keywords:
            idx = raw_text.find(kw)
            if idx == -1:
                continue
            # Look for a number after the keyword (simplified)
            snippet = raw_text[idx : idx + 100]
            import re
            nums = re.findall(r"[\d,]+\.?\d*", snippet)
            for n in nums:
                try:
                    val = float(n.replace(",", ""))
                    if val > 100:  # Filter noise
                        return val
                except ValueError:
                    continue
        return None

    return {
        "revenue":    find_value(["total revenue", "revenue from operations", "net revenue"]),
        "ebitda":     find_value(["ebitda", "operating profit", "profit before interest"]),
        "net_profit": find_value(["profit after tax", "net profit", "pat"]),
        "eps":        find_value(["earnings per share", "eps", "basic eps"]),
    }


# ─── Supabase Integration ────────────────────────────────────────────────────

def get_supabase_client():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def upsert_quarterly_result(client, company_id: str, quarter: str, data: dict) -> str:
    """Insert or update a quarterly result record. Returns the record ID."""
    payload = {
        "company_id":         company_id,
        "quarter":            quarter,
        "fiscal_year":        quarter[-4:],   # e.g. 'FY26' from 'Q3FY26'
        "revenue":            data.get("revenue"),
        "ebitda":             data.get("ebitda"),
        "net_profit":         data.get("net_profit"),
        "eps":                data.get("eps"),
        "raw_data":           data,
    }
    resp = client.table("quarterly_results").upsert(payload, on_conflict="company_id,quarter").execute()
    return resp.data[0]["id"] if resp.data else None


def trigger_ai_analysis(quarter_id: str):
    """Trigger the AI analysis pipeline for a newly ingested quarter."""
    # In production: push to a message queue or call analyze_earnings.py
    log.info(f"Triggering AI analysis for quarter_id: {quarter_id}")


# ─── Main Pipeline ───────────────────────────────────────────────────────────

def process_company(bse_code: str, company_id: str, output_dir: Path):
    """Full pipeline for one company."""
    log.info(f"Processing BSE:{bse_code}")

    filings = fetch_filings(bse_code)
    financial_filings = [f for f in filings if is_financial_result(f)]
    log.info(f"Found {len(financial_filings)} financial result filing(s)")

    client = get_supabase_client()

    for filing in financial_filings[:2]:  # Process latest 2 filings
        pdf_path = download_pdf(filing, output_dir)
        if not pdf_path:
            continue

        tables = extract_tables_from_pdf(pdf_path)
        values = parse_financial_values(tables)

        # Derive quarter from filing date (rough heuristic)
        filing_date = filing.get("NEWS_DT", "")
        quarter = derive_quarter(filing_date)

        log.info(f"Extracted for {quarter}: {values}")

        qid = upsert_quarterly_result(client, company_id, quarter, {
            **values,
            "filing_date": filing_date,
            "filing_url": f"{BSE_PDF_BASE}/{filing.get('ATTACHMENTNAME', '')}",
            "raw_tables": tables,
        })

        if qid:
            trigger_ai_analysis(qid)

        time.sleep(2)  # Rate limiting


def derive_quarter(date_str: str) -> str:
    """Derive fiscal quarter from a date string. Indian FY = April–March."""
    try:
        dt = datetime.strptime(date_str[:10], "%Y-%m-%d")
    except ValueError:
        return "Q?FY??"

    month = dt.month
    year  = dt.year

    if month in (4, 5, 6):    q, fy = "Q1", year
    elif month in (7, 8, 9):  q, fy = "Q2", year
    elif month in (10, 11, 12): q, fy = "Q3", year
    else:                      q, fy = "Q4", year - 1   # Jan-Mar belongs to prev FY

    return f"{q}FY{str(fy + 1)[-2:]}"


def main():
    parser = argparse.ArgumentParser(description="SIGNAL BSE filing scraper")
    parser.add_argument("--company", help="BSE code to process (default: all Nifty 50)")
    parser.add_argument("--days", type=int, default=7, help="Days to look back (default: 7)")
    args = parser.parse_args()

    output_dir = Path("data/pdfs")
    output_dir.mkdir(parents=True, exist_ok=True)

    # In production, load from DB. For now, hardcode Nifty 50 sample.
    COMPANIES = [
        {"bse_code": "500325", "id": "reliance-uuid"},
        {"bse_code": "532540", "id": "tcs-uuid"},
        {"bse_code": "500209", "id": "infosys-uuid"},
        {"bse_code": "500180", "id": "hdfcbank-uuid"},
    ]

    if args.company:
        COMPANIES = [c for c in COMPANIES if c["bse_code"] == args.company]

    for co in COMPANIES:
        try:
            process_company(co["bse_code"], co["id"], output_dir)
        except Exception as e:
            log.error(f"Error processing {co['bse_code']}: {e}")
        time.sleep(3)


if __name__ == "__main__":
    main()
