"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ChangeBadge } from "@/components/ui/Badge";
import { COMPANIES, EARNINGS_CARDS, formatPrice } from "@/lib/data";

const METRICS = [
  { key: "marketCap",  label: "Market Cap",   fmt: (v: number) => `₹${(v / 100000).toFixed(2)} L Cr` },
  { key: "price",      label: "Current Price", fmt: (v: number) => formatPrice(v) },
  { key: "pe",         label: "PE Ratio",      fmt: (v: number) => `${v.toFixed(1)}x` },
  { key: "divYield",   label: "Div Yield",     fmt: (v: number) => v > 0 ? `${v}%` : "Nil" },
  { key: "bookValue",  label: "Book Value",    fmt: (v: number) => formatPrice(v) },
  { key: "high52w",    label: "52W High",      fmt: (v: number) => formatPrice(v) },
  { key: "low52w",     label: "52W Low",       fmt: (v: number) => formatPrice(v) },
];

export default function ComparePage() {
  const [tickerA, setTickerA] = useState("reliance");
  const [tickerB, setTickerB] = useState("tcs");

  const compA = COMPANIES.find((c) => c.id === tickerA) ?? COMPANIES[0];
  const compB = COMPANIES.find((c) => c.id === tickerB) ?? COMPANIES[1];
  const cardA = EARNINGS_CARDS[compA.id];
  const cardB = EARNINGS_CARDS[compB.id];

  const getBetter = (key: string) => {
    const valA = compA[key as keyof typeof compA] as number;
    const valB = compB[key as keyof typeof compB] as number;
    // Lower is better for PE; higher is better for others
    if (key === "pe") return valA < valB ? "A" : valA > valB ? "B" : "tie";
    return valA > valB ? "A" : valA < valB ? "B" : "tie";
  };

  const CompanySelector = ({ value, onChange, excludeId }: { value: string; onChange: (v: string) => void; excludeId: string }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        color: "var(--text-primary)",
        fontSize: 14,
        padding: "10px 14px",
        outline: "none",
        cursor: "pointer",
        fontFamily: "Satoshi, sans-serif",
        width: "100%",
      }}
    >
      {COMPANIES.filter((c) => c.id !== excludeId).map((co) => (
        <option key={co.id} value={co.id} style={{ background: "#1A1A1F" }}>
          {co.ticker} — {co.name}
        </option>
      ))}
    </select>
  );

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
            COMPARE
          </p>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--text-primary)" }}>
            Side-by-side comparison
          </h1>
        </div>

        {/* Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8 }}>COMPANY A</p>
            <CompanySelector value={tickerA} onChange={setTickerA} excludeId={tickerB} />
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-medium)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-tertiary)",
              fontSize: 18,
              marginTop: 20,
            }}
          >
            ⇄
          </div>
          <div>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8 }}>COMPANY B</p>
            <CompanySelector value={tickerB} onChange={setTickerB} excludeId={tickerA} />
          </div>
        </div>

        {/* Company header cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          {[{ co: compA, card: cardA, side: "A" }, { co: compB, card: cardB, side: "B" }].map(({ co, card, side }) => (
            <div
              key={side}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-xl)",
                padding: 28,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: co.logoColor,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {co.logoInitials}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{co.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{co.ticker} · {co.sector}</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <p className="font-num" style={{ fontSize: 28, fontWeight: 700, color: "var(--text-primary)" }}>
                  {formatPrice(co.price)}
                </p>
                <ChangeBadge value={co.changePct} />
              </div>

              <p className="font-num" style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }}>
                Mkt Cap: ₹{(co.marketCap / 100000).toFixed(1)} L Cr
              </p>

              {card && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: card.signalGrade.startsWith("A") ? "var(--signal-green-dim)" : "rgba(255,214,10,0.12)",
                    color: card.signalGrade.startsWith("A") ? "var(--signal-green)" : "var(--signal-amber)",
                    borderRadius: "var(--radius-md)",
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <span className="font-num" style={{ fontSize: 18, fontWeight: 700 }}>{card.signalGrade}</span>
                  <span>Signal Grade · {card.quarter}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Metrics table */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-subtle)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Key Metrics</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-tertiary)" }}>
                <th style={{ padding: "12px 24px", textAlign: "left", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                  METRIC
                </th>
                <th style={{ padding: "12px 24px", textAlign: "right", fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>
                  {compA.ticker}
                </th>
                <th style={{ padding: "12px 24px", textAlign: "right", fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>
                  {compB.ticker}
                </th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m) => {
                const winner = getBetter(m.key);
                const valA = compA[m.key as keyof typeof compA] as number;
                const valB = compB[m.key as keyof typeof compB] as number;
                return (
                  <tr key={m.key} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "var(--text-secondary)", fontFamily: "Satoshi, sans-serif" }}>
                      {m.label}
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                      <span
                        style={{
                          color: winner === "A" ? "var(--accent-gold)" : "var(--text-primary)",
                          fontWeight: winner === "A" ? 700 : 400,
                        }}
                      >
                        {m.fmt(valA)}
                        {winner === "A" && <span style={{ marginLeft: 6, fontSize: 11 }}>★</span>}
                      </span>
                    </td>
                    <td style={{ padding: "14px 24px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                      <span
                        style={{
                          color: winner === "B" ? "var(--accent-gold)" : "var(--text-primary)",
                          fontWeight: winner === "B" ? 700 : 400,
                        }}
                      >
                        {m.fmt(valB)}
                        {winner === "B" && <span style={{ marginLeft: 6, fontSize: 11 }}>★</span>}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Latest Earnings Comparison */}
        {cardA && cardB && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            {[{ co: compA, card: cardA }, { co: compB, card: cardB }].map(({ co, card }) => (
              <div
                key={co.id}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: 24,
                }}
              >
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {card.quarter} — {co.ticker}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[
                    { label: "Revenue Growth", value: `+${card.revenueGrowthYoY}%`, color: "var(--signal-green)" },
                    { label: "Net Profit Growth", value: `+${card.netProfitGrowthYoY}%`, color: "var(--signal-green)" },
                    { label: "EPS", value: `₹${card.eps.toFixed(2)}`, color: "var(--text-primary)" },
                    { label: "Mgmt Sentiment", value: `${card.managementSentimentScore}%`, color: card.managementSentimentScore > 70 ? "var(--signal-green)" : "var(--signal-amber)" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", padding: 12 }}>
                      <p style={{ fontSize: 10, color: "var(--text-tertiary)", marginBottom: 4 }}>{s.label}</p>
                      <p className="font-num" style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {card.aiSummary.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AI-generated summary */}
        <div
          className="border-gold-left"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-medium)",
            borderRadius: "0 var(--radius-lg) var(--radius-lg) 0",
            padding: "24px 28px 24px 24px",
          }}
        >
          <p style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, marginBottom: 12, letterSpacing: "0.06em" }}>
            AI COMPARISON SUMMARY
          </p>
          <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.75, marginBottom: 12 }}>
            <strong>{compA.name}</strong> trades at a higher earnings multiple ({compA.pe.toFixed(1)}x PE) reflecting its dominant position
            in {compA.sector}. {compB.name} offers {compB.pe < compA.pe ? "better value" : "premium positioning"} at {compB.pe.toFixed(1)}x PE.
          </p>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75 }}>
            From a dividend perspective, {compA.divYield > compB.divYield ? compA.ticker : compB.ticker} provides
            higher income yield at {Math.max(compA.divYield, compB.divYield).toFixed(2)}%. For growth investors,
            both companies operate in {compA.sector === compB.sector ? "the same sector" : "different sectors"} with distinct risk profiles.
            Always conduct independent due diligence before investing.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
