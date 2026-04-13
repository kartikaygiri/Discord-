import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ChangeBadge, BeatMissBadge, GradeBadge, SectorTag } from "@/components/ui/Badge";
import {
  COMPANIES,
  QUARTERLY_RESULTS,
  EARNINGS_CARDS,
  formatPrice,
  formatCurrency,
  formatPct,
} from "@/lib/data";
import EarningsChart from "@/components/charts/EarningsChart";
import PriceChartSection from "@/components/charts/PriceChartSection";
import AIChatPanel from "@/components/ui/AIChatPanel";

type Props = { params: Promise<{ ticker: string }> };

export async function generateStaticParams() {
  return [
    { ticker: "reliance" },
    { ticker: "tcs" },
    { ticker: "infosys" },
    { ticker: "hdfcbank" },
    { ticker: "zomato" },
    { ticker: "bajajfinance" },
    { ticker: "wipro" },
    { ticker: "itc" },
    { ticker: "asianpaints" },
    { ticker: "maruti" },
  ];
}

export default async function CompanyPage({ params }: Props) {
  const { ticker } = await params;
  const company = COMPANIES.find(
    (c) => c.id === ticker || c.ticker.toLowerCase() === ticker.toLowerCase()
  );
  if (!company) notFound();

  const quarters = QUARTERLY_RESULTS[company.id] || [];
  const card = EARNINGS_CARDS[company.id];

  const peers = COMPANIES.filter(
    (c) => c.sector === company.sector && c.id !== company.id
  ).slice(0, 4);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      {/* COMPANY HEADER */}
      <header
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "32px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {/* Left: identity */}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: company.logoColor,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {company.logoInitials}
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 6,
                    lineHeight: 1.2,
                  }}
                >
                  {company.name}
                </h1>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 10 }}>
                  NSE: {company.ticker} · BSE: {company.bseCode}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SectorTag label={company.sector} />
                  <SectorTag label={company.industry} />
                  {company.isNifty50 && (
                    <span
                      style={{
                        display: "inline-block",
                        background: "var(--accent-gold-dim)",
                        color: "var(--accent-gold)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 10px",
                      }}
                    >
                      Nifty 50
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: price */}
            <div style={{ textAlign: "right" }}>
              <p
                className="font-num"
                style={{ fontSize: 36, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}
              >
                {formatPrice(company.price)}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", marginTop: 6, flexWrap: "wrap" }}
              >
                <span
                  className="font-num"
                  style={{
                    fontSize: 16,
                    color: company.changePct >= 0 ? "var(--signal-green)" : "var(--signal-red)",
                  }}
                >
                  {company.change >= 0 ? "+" : ""}
                  {formatPrice(company.change)}
                </span>
                <ChangeBadge value={company.changePct} />
              </div>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>
                52W: {formatPrice(company.low52w)} — {formatPrice(company.high52w)}
              </p>
            </div>
          </div>

          {/* Key metrics strip */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid var(--border-subtle)",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Market Cap", value: `₹${(company.marketCap / 100000).toFixed(2)} L Cr` },
              { label: "PE Ratio", value: company.pe.toFixed(1) },
              { label: "Div Yield", value: `${company.divYield}%` },
              { label: "Book Value", value: formatPrice(company.bookValue) },
            ].map((m) => (
              <div key={m.label}>
                <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4, letterSpacing: "0.04em" }}>
                  {m.label}
                </p>
                <p className="font-num" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* PRICE CHART */}
        <section style={{ padding: "32px 0" }}>
          <PriceChartSection company={company} />
        </section>

        {/* AI EARNINGS CARD */}
        {card && (
          <section style={{ padding: "0 0 32px" }}>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-xl)",
                padding: 32,
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--signal-green)" }} className="pulse-live" />
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                      LATEST EARNINGS
                    </p>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)" }}>{card.quarter}</h2>
                </div>
                <GradeBadge grade={card.signalGrade} score={card.signalScore} />
              </div>

              {/* Metric cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 28 }}>
                {[
                  { label: "Revenue", value: formatCurrency(card.revenue), growth: card.revenueGrowthYoY, beat: card.revenueBeatMiss },
                  { label: "EBITDA",  value: formatCurrency(card.ebitda),  growth: card.ebitdaGrowthYoY,  beat: card.ebitdaBeatMiss },
                  { label: "Net Profit", value: formatCurrency(card.netProfit), growth: card.netProfitGrowthYoY, beat: card.netProfitBeatMiss },
                  { label: "EPS", value: `₹${card.eps.toFixed(2)}`, growth: card.epsGrowthYoY, beat: card.epsBeatMiss },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: "var(--bg-tertiary)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8, letterSpacing: "0.04em" }}>{m.label}</p>
                    <p className="font-num" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{m.value}</p>
                    <ChangeBadge value={m.growth} size="sm" showArrow={true} />
                    <div style={{ marginTop: 8 }}>
                      <BeatMissBadge value={m.beat} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue trend chart */}
              {quarters.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    4-QUARTER TREND
                  </p>
                  <EarningsChart data={quarters} />
                </div>
              )}

              {/* AI Summary */}
              <div
                className="border-gold-left"
                style={{
                  background: "var(--accent-gold-dim)",
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                  padding: "20px 24px 20px 20px",
                  marginBottom: 24,
                }}
              >
                <p style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, marginBottom: 10, letterSpacing: "0.06em" }}>
                  AI INSIGHT
                </p>
                <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.75 }}>
                  &quot;{card.aiSummary}&quot;
                </p>
              </div>

              {/* Management sentiment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div>
                  <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    MANAGEMENT SENTIMENT
                  </p>
                  <div style={{ height: 8, background: "var(--bg-tertiary)", borderRadius: 100, overflow: "hidden", marginBottom: 8 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${card.managementSentimentScore}%`,
                        background: card.managementSentimentScore > 60 ? "var(--signal-green)" : "var(--signal-amber)",
                        borderRadius: 100,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <p className="font-num" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {card.managementSentimentScore}% Positive
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                    {card.managementKeywords.map((kw) => (
                      <span
                        key={kw}
                        style={{
                          background: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
                          borderRadius: 100,
                          fontSize: 11,
                          padding: "2px 10px",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    FORWARD GUIDANCE
                  </p>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {card.forwardGuidance}
                  </p>
                </div>
              </div>

              {/* Risk flags */}
              {card.riskFlags.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 11, color: "var(--signal-amber)", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
                    ⚠ RISK FLAGS
                  </p>
                  {card.riskFlags.map((r, i) => {
                    const color = r.severity === "high" ? "var(--signal-red)" : r.severity === "medium" ? "var(--signal-amber)" : "var(--text-secondary)";
                    const bg = r.severity === "high" ? "var(--signal-red-dim)" : r.severity === "medium" ? "rgba(255,214,10,0.08)" : "var(--bg-tertiary)";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "10px 14px",
                          background: bg,
                          borderRadius: "var(--radius-sm)",
                          marginBottom: 8,
                          border: `1px solid ${color}22`,
                        }}
                      >
                        <span style={{ color, fontSize: 13, marginTop: 1 }}>•</span>
                        <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>{r.flag}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                <button
                  className="btn-gold"
                  style={{ padding: "10px 20px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600 }}
                >
                  Ask AI about this →
                </button>
                <button
                  style={{ padding: "10px 20px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 500, background: "transparent", border: "1px solid var(--border-medium)", color: "var(--text-secondary)", cursor: "pointer" }}
                >
                  Share Card 🔗
                </button>
                <button
                  style={{ padding: "10px 20px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 500, background: "transparent", border: "1px solid var(--border-medium)", color: "var(--text-secondary)", cursor: "pointer" }}
                >
                  Download PDF 📄
                </button>
              </div>
            </div>
          </section>
        )}

        {/* QUARTERLY RESULTS TABLE */}
        {quarters.length > 0 && (
          <section style={{ padding: "0 0 32px" }}>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>Quarterly Results</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Quarter</th>
                      <th>Revenue (Cr)</th>
                      <th>YoY %</th>
                      <th>EBITDA (Cr)</th>
                      <th>EBITDA Margin</th>
                      <th>Net Profit (Cr)</th>
                      <th>Net Margin</th>
                      <th>EPS</th>
                      <th>vs Estimates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quarters.map((q) => (
                      <tr key={q.quarter}>
                        <td style={{ color: "var(--text-primary)", fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}>
                          {q.quarter}
                        </td>
                        <td>{q.revenue.toLocaleString("en-IN")}</td>
                        <td>
                          <ChangeBadge value={q.revenueGrowthYoY} size="sm" />
                        </td>
                        <td>{q.ebitda.toLocaleString("en-IN")}</td>
                        <td>
                          <span
                            className="font-num"
                            style={{
                              color: q.ebitdaMargin > 20 ? "var(--signal-green)" : q.ebitdaMargin > 12 ? "var(--signal-amber)" : "var(--signal-red)",
                            }}
                          >
                            {q.ebitdaMargin.toFixed(1)}%
                          </span>
                        </td>
                        <td>{q.netProfit.toLocaleString("en-IN")}</td>
                        <td>
                          <span
                            className="font-num"
                            style={{
                              color: q.netMargin > 15 ? "var(--signal-green)" : q.netMargin > 8 ? "var(--signal-amber)" : "var(--signal-red)",
                            }}
                          >
                            {q.netMargin.toFixed(1)}%
                          </span>
                        </td>
                        <td>₹{q.eps.toFixed(2)}</td>
                        <td><BeatMissBadge value={q.beatMiss} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* PEER COMPARISON */}
        {peers.length > 0 && (
          <section style={{ padding: "0 0 32px" }}>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>
                  Peer Comparison — {company.sector}
                </h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Price</th>
                      <th>Market Cap</th>
                      <th>PE Ratio</th>
                      <th>52W High</th>
                      <th>52W Low</th>
                      <th>Div Yield</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Current company first */}
                    {[company, ...peers].map((c, i) => (
                      <tr key={c.id} style={i === 0 ? { background: "var(--accent-gold-dim)" } : {}}>
                        <td>
                          <Link
                            href={`/company/${c.ticker.toLowerCase()}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              textDecoration: "none",
                              fontFamily: "Satoshi, sans-serif",
                            }}
                          >
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                background: c.logoColor,
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 8,
                                fontWeight: 700,
                                color: "white",
                              }}
                            >
                              {c.logoInitials}
                            </div>
                            <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13 }}>
                              {c.ticker}
                              {i === 0 && (
                                <span style={{ color: "var(--accent-gold)", marginLeft: 6, fontSize: 11 }}>★</span>
                              )}
                            </span>
                          </Link>
                        </td>
                        <td>{formatPrice(c.price)}</td>
                        <td>₹{(c.marketCap / 100000).toFixed(1)} L Cr</td>
                        <td>{c.pe.toFixed(1)}</td>
                        <td>{formatPrice(c.high52w)}</td>
                        <td>{formatPrice(c.low52w)}</td>
                        <td>{c.divYield > 0 ? `${c.divYield}%` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SHAREHOLDING PATTERN */}
        <section style={{ padding: "0 0 32px" }}>
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 20 }}>
              Shareholding Pattern — Q3 FY26
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flexWrap: "wrap" }}>
              <div>
                {/* Stacked bar */}
                <div style={{ height: 24, borderRadius: 100, overflow: "hidden", display: "flex", marginBottom: 16 }}>
                  {[
                    { label: "Promoter", pct: 50.3, color: "#1E40AF" },
                    { label: "FII", pct: 22.8, color: "#065F46" },
                    { label: "DII", pct: 14.6, color: "#7C3AED" },
                    { label: "Retail", pct: 8.4, color: "#B45309" },
                    { label: "Others", pct: 3.9, color: "#4B5563" },
                  ].map((s) => (
                    <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.label}: ${s.pct}%`} />
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {[
                    { label: "Promoter", pct: 50.3, change: -0.2, color: "#1E40AF" },
                    { label: "FII", pct: 22.8, change: +1.1, color: "#065F46" },
                    { label: "DII", pct: 14.6, change: +0.4, color: "#7C3AED" },
                    { label: "Retail", pct: 8.4, change: -0.8, color: "#B45309" },
                    { label: "Others", pct: 3.9, change: -0.5, color: "#4B5563" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
                      <span className="font-num" style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>{s.pct}%</span>
                      <span className="font-num" style={{ fontSize: 11, color: s.change >= 0 ? "var(--signal-green)" : "var(--signal-red)" }}>
                        {s.change >= 0 ? "▲" : "▼"}{Math.abs(s.change)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>Promoter Pledge</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <p className="font-num" style={{ fontSize: 28, fontWeight: 700, color: "var(--signal-amber)" }}>2.1%</p>
                  <div>
                    <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Up from 1.8%</p>
                    <p style={{ fontSize: 12, color: "var(--signal-amber)" }}>⚠ Moderate flag</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 16, lineHeight: 1.6 }}>
                  Promoter holding has been stable for 6 consecutive quarters. FII interest increased after Q2 results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM SPACER for chat panel */}
        <div style={{ height: 100 }} />
      </div>

      <AIChatPanel company={company} />
      <Footer />
    </div>
  );
}
