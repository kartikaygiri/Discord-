-- SIGNAL Database Schema
-- Run this in Supabase SQL Editor: supabase.com > SQL Editor > New Query

-- ─── COMPANIES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS companies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  ticker_nse    TEXT,
  ticker_bse    TEXT,
  bse_code      TEXT,
  sector        TEXT,
  industry      TEXT,
  market_cap    NUMERIC,
  logo_url      TEXT,
  logo_color    TEXT DEFAULT '#1E40AF',
  logo_initials TEXT,
  is_nifty50    BOOLEAN DEFAULT false,
  is_nifty500   BOOLEAN DEFAULT false,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── QUARTERLY RESULTS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quarterly_results (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            UUID REFERENCES companies(id) ON DELETE CASCADE,
  quarter               TEXT NOT NULL,           -- e.g. 'Q3FY26'
  fiscal_year           TEXT NOT NULL,            -- e.g. 'FY26'
  revenue               NUMERIC,
  ebitda                NUMERIC,
  net_profit            NUMERIC,
  eps                   NUMERIC,
  revenue_growth_yoy    NUMERIC,                  -- percentage
  ebitda_margin         NUMERIC,
  net_margin            NUMERIC,
  analyst_estimate_eps  NUMERIC,
  beat_miss             TEXT CHECK (beat_miss IN ('beat', 'miss', 'in-line')),
  filing_date           DATE,
  filing_url            TEXT,
  raw_data              JSONB DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, quarter)
);

-- ─── AI EARNINGS CARDS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS earnings_cards (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id              UUID REFERENCES companies(id) ON DELETE CASCADE,
  quarter_id              UUID REFERENCES quarterly_results(id),
  signal_grade            TEXT,                   -- 'A+' to 'D'
  signal_score            INTEGER CHECK (signal_score BETWEEN 1 AND 10),
  ai_summary              TEXT,
  key_highlights          JSONB DEFAULT '[]',
  management_sentiment    JSONB DEFAULT '{}',     -- {score: 72, keywords: [...]}
  risk_flags              JSONB DEFAULT '[]',     -- [{flag: "...", severity: "high"}]
  trend_data              JSONB DEFAULT '{}',
  forward_guidance        TEXT,
  generated_at            TIMESTAMPTZ DEFAULT NOW(),
  model_version           TEXT DEFAULT 'claude-sonnet-4-20250514'
);

-- ─── ANNUAL FINANCIALS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS annual_financials (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id           UUID REFERENCES companies(id) ON DELETE CASCADE,
  fiscal_year          TEXT NOT NULL,
  revenue              NUMERIC,
  ebitda               NUMERIC,
  net_profit           NUMERIC,
  total_assets         NUMERIC,
  total_debt           NUMERIC,
  equity               NUMERIC,
  eps                  NUMERIC,
  dividend_per_share   NUMERIC,
  roe                  NUMERIC,
  roce                 NUMERIC,
  debt_to_equity       NUMERIC,
  current_ratio        NUMERIC,
  operating_cash_flow  NUMERIC,
  free_cash_flow       NUMERIC,
  raw_data             JSONB DEFAULT '{}',
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, fiscal_year)
);

-- ─── SHAREHOLDING ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shareholding (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id           UUID REFERENCES companies(id) ON DELETE CASCADE,
  quarter              TEXT NOT NULL,
  promoter_pct         NUMERIC,
  fii_pct              NUMERIC,
  dii_pct              NUMERIC,
  retail_pct           NUMERIC,
  others_pct           NUMERIC,
  promoter_pledge_pct  NUMERIC DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, quarter)
);

-- ─── PRICE HISTORY ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS price_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  open       NUMERIC,
  high       NUMERIC,
  low        NUMERIC,
  close      NUMERIC,
  volume     BIGINT,
  UNIQUE(company_id, date)
);

-- ─── WATCHLISTS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS watchlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  added_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, company_id)
);

-- ─── AI CHAT HISTORY ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  role       TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── EARNINGS CALENDAR ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS earnings_calendar (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            UUID REFERENCES companies(id) ON DELETE CASCADE,
  expected_date         DATE,
  confirmed             BOOLEAN DEFAULT false,
  analyst_consensus_eps NUMERIC,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan                    TEXT NOT NULL CHECK (plan IN ('free', 'pro_monthly', 'pro_annual')),
  razorpay_subscription_id TEXT,
  status                  TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  trial_ends_at           TIMESTAMPTZ,
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_quarterly_company   ON quarterly_results(company_id);
CREATE INDEX IF NOT EXISTS idx_quarterly_quarter   ON quarterly_results(quarter);
CREATE INDEX IF NOT EXISTS idx_price_company_date  ON price_history(company_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_watchlist_user      ON watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_earnings_cal_date   ON earnings_calendar(expected_date);
CREATE INDEX IF NOT EXISTS idx_companies_nifty50   ON companies(is_nifty50) WHERE is_nifty50 = true;
CREATE INDEX IF NOT EXISTS idx_chat_user_company   ON chat_history(user_id, company_id);

-- ─── ROW-LEVEL SECURITY ──────────────────────────────────────────────────────
ALTER TABLE watchlists     ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions  ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own watchlist
CREATE POLICY watchlist_user_policy ON watchlists
  USING (auth.uid() = user_id);

-- Users can only read/write their own chat history
CREATE POLICY chat_user_policy ON chat_history
  USING (auth.uid() = user_id);

-- Users can only read their own subscription
CREATE POLICY subscriptions_user_policy ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Public read access for market data
CREATE POLICY companies_public_read ON companies FOR SELECT USING (true);
CREATE POLICY quarterly_public_read ON quarterly_results FOR SELECT USING (true);
CREATE POLICY earnings_cards_public_read ON earnings_cards FOR SELECT USING (true);
CREATE POLICY price_history_public_read ON price_history FOR SELECT USING (true);
CREATE POLICY earnings_cal_public_read ON earnings_calendar FOR SELECT USING (true);
CREATE POLICY shareholding_public_read ON shareholding FOR SELECT USING (true);
CREATE POLICY annual_fin_public_read ON annual_financials FOR SELECT USING (true);
