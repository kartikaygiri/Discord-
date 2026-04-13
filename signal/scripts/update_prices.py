#!/usr/bin/env python3
"""
SIGNAL — Price Data Updater
Fetches end-of-day OHLCV data for all tracked companies and updates Supabase.
Run daily via cron at 4:30 PM IST (after NSE/BSE close at 3:30 PM + 1hr buffer).

Cron entry: 30 16 * * 1-5 /usr/bin/python3 /app/scripts/update_prices.py

Usage:
    python scripts/update_prices.py
    python scripts/update_prices.py --ticker RELIANCE

Requirements:
    pip install yfinance supabase python-dotenv pandas
"""

import os
import logging
import argparse
from datetime import datetime, date, timedelta

import pandas as pd
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]


NIFTY50_TICKERS = {
    "RELIANCE.NS":   "500325",
    "TCS.NS":        "532540",
    "INFY.NS":       "500209",
    "HDFCBANK.NS":   "500180",
    "ICICIBANK.NS":  "532174",
    "HINDUNILVR.NS": "500696",
    "KOTAKBANK.NS":  "500247",
    "SBIN.NS":       "500112",
    "BAJFINANCE.NS": "500034",
    "BHARTIARTL.NS": "532454",
    "ITC.NS":        "500875",
    "LT.NS":         "500510",
    "ASIANPAINT.NS": "500820",
    "MARUTI.NS":     "532500",
    "WIPRO.NS":      "507685",
    "ZOMATO.NS":     "543320",
}


def get_supabase_client():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_company_ids(client) -> dict[str, str]:
    """Map BSE code → Supabase company UUID."""
    resp = client.table("companies").select("id, bse_code").execute()
    return {row["bse_code"]: row["id"] for row in (resp.data or [])}


def fetch_prices_yahoo(ticker: str, days: int = 5) -> pd.DataFrame:
    """Fetch OHLCV data from Yahoo Finance."""
    import yfinance as yf

    end   = date.today()
    start = end - timedelta(days=days + 5)  # Extra buffer for weekends

    df = yf.download(ticker, start=start.isoformat(), end=end.isoformat(),
                     auto_adjust=True, progress=False, show_errors=False)
    return df


def upsert_prices(client, company_id: str, df: pd.DataFrame):
    """Bulk upsert OHLCV rows for a company."""
    if df.empty:
        return 0

    rows = []
    for idx, row in df.iterrows():
        rows.append({
            "company_id": company_id,
            "date":       idx.strftime("%Y-%m-%d"),
            "open":       round(float(row["Open"]),   2),
            "high":       round(float(row["High"]),   2),
            "low":        round(float(row["Low"]),    2),
            "close":      round(float(row["Close"]),  2),
            "volume":     int(row["Volume"]),
        })

    resp = (
        client.table("price_history")
        .upsert(rows, on_conflict="company_id,date")
        .execute()
    )
    return len(resp.data or [])


def main():
    parser = argparse.ArgumentParser(description="SIGNAL price data updater")
    parser.add_argument("--ticker", help="Specific Yahoo ticker (e.g. RELIANCE.NS)")
    parser.add_argument("--days",   type=int, default=5, help="Days of history to fetch")
    args = parser.parse_args()

    client     = get_supabase_client()
    company_map = fetch_company_ids(client)

    tickers = {args.ticker: NIFTY50_TICKERS.get(args.ticker, "")} if args.ticker else NIFTY50_TICKERS

    total_rows = 0
    for yf_ticker, bse_code in tickers.items():
        company_id = company_map.get(bse_code)
        if not company_id:
            log.warning(f"No Supabase ID for {yf_ticker} (BSE: {bse_code}), skipping")
            continue

        log.info(f"Fetching {yf_ticker}...")
        try:
            df = fetch_prices_yahoo(yf_ticker, days=args.days)
            if df.empty:
                log.warning(f"No price data returned for {yf_ticker}")
                continue

            n = upsert_prices(client, company_id, df)
            total_rows += n
            log.info(f"  Upserted {n} rows for {yf_ticker}")
        except Exception as e:
            log.error(f"  Error processing {yf_ticker}: {e}")

    log.info(f"Done. Total rows upserted: {total_rows}")


if __name__ == "__main__":
    main()
