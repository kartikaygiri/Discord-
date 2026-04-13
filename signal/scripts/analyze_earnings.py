#!/usr/bin/env python3
"""
SIGNAL — AI Earnings Analyzer
Reads raw quarterly results from Supabase, sends them to Claude API,
and stores the structured AI earnings card back in Supabase.

Usage:
    python scripts/analyze_earnings.py
    python scripts/analyze_earnings.py --quarter_id <uuid>

Requirements:
    pip install anthropic supabase python-dotenv
"""

import os
import json
import logging
import argparse
from datetime import datetime

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
SUPABASE_URL      = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY      = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
MODEL             = "claude-sonnet-4-20250514"

ANALYSIS_PROMPT = """You are a senior equity analyst specializing in Indian public companies.
Analyze the quarterly financial results below and return a structured JSON response.

COMPANY: {company_name} ({ticker})
QUARTER: {quarter}

CURRENT QUARTER DATA:
{current_data}

PREVIOUS QUARTER DATA:
{prev_data}

YEAR-AGO QUARTER DATA:
{yoy_data}

ANALYST CONSENSUS ESTIMATES:
{consensus}

Respond ONLY with valid JSON matching this exact schema:
{{
  "signal_grade": "A+|A|A-|B+|B|B-|C+|C|D",
  "signal_score": 1-10,
  "summary": "2-3 sentence plain English summary for a retail investor",
  "key_highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "management_sentiment": {{
    "score": 0-100,
    "keywords": ["word1", "word2", "word3", "word4", "word5"],
    "tone": "positive|neutral|cautious|negative"
  }},
  "risk_flags": [
    {{"flag": "description of risk", "severity": "low|medium|high"}}
  ],
  "beat_miss_analysis": "One paragraph on how results compared to estimates",
  "forward_guidance": "What management said about next quarter/FY outlook",
  "segment_breakdown": "Key business segment performance summary",
  "key_ratios": {{
    "ebitda_margin": number,
    "net_margin": number,
    "revenue_growth_yoy": number,
    "pat_growth_yoy": number
  }}
}}

Rules:
- Use Indian currency notation (Cr, L Cr)
- Reference Indian fiscal year (e.g., Q3 FY26 = Oct-Dec 2025)
- Be direct and specific with numbers
- Never give buy/sell recommendations
- Signal grade should reflect: A+ (exceptional beat + guidance raise), A (beat on all metrics), B (mixed/in-line), C (miss), D (significant miss + concerns)
"""


def get_supabase_client():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_pending_quarters(client, limit: int = 10) -> list[dict]:
    """Fetch quarterly results that don't yet have an AI earnings card."""
    resp = client.rpc("get_quarters_without_cards", {"p_limit": limit}).execute()
    if resp.data:
        return resp.data

    # Fallback: direct query
    existing_cards = client.table("earnings_cards").select("quarter_id").execute()
    analyzed_ids   = {c["quarter_id"] for c in (existing_cards.data or [])}

    all_quarters = (
        client.table("quarterly_results")
        .select("*, companies(name, ticker_nse, ticker_bse)")
        .limit(limit)
        .execute()
    )

    return [q for q in (all_quarters.data or []) if q["id"] not in analyzed_ids]


def fetch_quarter_context(client, company_id: str, current_quarter: str) -> tuple[dict, dict]:
    """Fetch previous quarter and YoY quarter data for context."""
    quarters = (
        client.table("quarterly_results")
        .select("*")
        .eq("company_id", company_id)
        .order("filing_date", desc=True)
        .limit(5)
        .execute()
    )

    results = quarters.data or []
    # Remove current quarter from list
    others = [q for q in results if q["quarter"] != current_quarter]

    prev_quarter = others[0] if len(others) > 0 else {}
    yoy_quarter  = next((q for q in others if q["quarter"][-4:] != current_quarter[-4:]), {})

    return prev_quarter, yoy_quarter


def analyze_with_claude(company_name: str, ticker: str, quarter: str,
                        current: dict, prev: dict, yoy: dict) -> dict:
    """Call Claude API to generate the earnings analysis."""
    import anthropic

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    def fmt_quarter_data(data: dict) -> str:
        if not data:
            return "Not available"
        return json.dumps({
            "quarter":    data.get("quarter", "N/A"),
            "revenue":    f"₹{data.get('revenue', 0):,.0f} Cr" if data.get("revenue") else "N/A",
            "ebitda":     f"₹{data.get('ebitda', 0):,.0f} Cr" if data.get("ebitda") else "N/A",
            "net_profit": f"₹{data.get('net_profit', 0):,.0f} Cr" if data.get("net_profit") else "N/A",
            "eps":        f"₹{data.get('eps', 0):.2f}" if data.get("eps") else "N/A",
            "margins":    {
                "ebitda": f"{data.get('ebitda_margin', 0):.1f}%",
                "net":    f"{data.get('net_margin', 0):.1f}%",
            },
        }, indent=2)

    prompt = ANALYSIS_PROMPT.format(
        company_name=company_name,
        ticker=ticker,
        quarter=quarter,
        current_data=fmt_quarter_data(current),
        prev_data=fmt_quarter_data(prev),
        yoy_data=fmt_quarter_data(yoy),
        consensus=json.dumps({
            "eps_estimate": current.get("analyst_estimate_eps"),
            "beat_miss":    current.get("beat_miss"),
        }, indent=2),
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )

    content = response.content[0].text.strip()
    # Strip markdown code fences if present
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]

    return json.loads(content)


def save_earnings_card(client, company_id: str, quarter_id: str, analysis: dict):
    """Save the AI analysis as an earnings card in Supabase."""
    payload = {
        "company_id":           company_id,
        "quarter_id":           quarter_id,
        "signal_grade":         analysis.get("signal_grade"),
        "signal_score":         analysis.get("signal_score"),
        "ai_summary":           analysis.get("summary"),
        "key_highlights":       analysis.get("key_highlights", []),
        "management_sentiment": analysis.get("management_sentiment", {}),
        "risk_flags":           analysis.get("risk_flags", []),
        "trend_data":           analysis.get("key_ratios", {}),
        "forward_guidance":     analysis.get("forward_guidance"),
        "generated_at":         datetime.utcnow().isoformat(),
        "model_version":        MODEL,
    }

    resp = client.table("earnings_cards").insert(payload).execute()
    log.info(f"Saved earnings card: {resp.data[0]['id'] if resp.data else 'unknown'}")


def process_quarter(quarter: dict, client):
    """Full pipeline for one quarter."""
    company    = quarter.get("companies", {})
    company_id = quarter["company_id"]
    quarter_id = quarter["id"]
    qtr_str    = quarter["quarter"]
    co_name    = company.get("name", "Unknown Company")
    ticker     = company.get("ticker_nse") or company.get("ticker_bse", "UNKNOWN")

    log.info(f"Analyzing {co_name} — {qtr_str}")

    prev, yoy = fetch_quarter_context(client, company_id, qtr_str)

    try:
        analysis = analyze_with_claude(co_name, ticker, qtr_str, quarter, prev, yoy)
        log.info(f"Grade: {analysis.get('signal_grade')} | Score: {analysis.get('signal_score')}/10")
        save_earnings_card(client, company_id, quarter_id, analysis)
    except json.JSONDecodeError as e:
        log.error(f"JSON parse error for {co_name}: {e}")
    except Exception as e:
        log.error(f"Analysis failed for {co_name}: {e}")


def main():
    parser = argparse.ArgumentParser(description="SIGNAL AI earnings analyzer")
    parser.add_argument("--quarter_id", help="Analyze a specific quarter by ID")
    parser.add_argument("--limit", type=int, default=10, help="Batch size (default: 10)")
    args = parser.parse_args()

    client = get_supabase_client()

    if args.quarter_id:
        resp = (
            client.table("quarterly_results")
            .select("*, companies(name, ticker_nse, ticker_bse)")
            .eq("id", args.quarter_id)
            .single()
            .execute()
        )
        quarters = [resp.data] if resp.data else []
    else:
        quarters = fetch_pending_quarters(client, limit=args.limit)

    log.info(f"Processing {len(quarters)} quarter(s)")

    for quarter in quarters:
        process_quarter(quarter, client)

    log.info("Done.")


if __name__ == "__main__":
    main()
