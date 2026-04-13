"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ChangeBadge, SectorTag } from "@/components/ui/Badge";
import { COMPANIES, formatPrice } from "@/lib/data";

const PREBUILT_SCREENS = [
  {
    id: "quality",
    icon: "🏆",
    title: "High Quality",
    desc: "ROE > 15%, low debt, consistent growth",
    filters: { minPe: 0, maxPe: 50, minDivYield: 0 },
    color: "var(--accent-gold)",
    bg: "var(--accent-gold-dim)",
  },
  {
    id: "momentum",
    icon: "🚀",
    title: "Momentum Leaders",
    desc: "Near 52W high, positive earnings surprise",
    filters: { minPe: 0, maxPe: 100, minDivYield: 0 },
    color: "var(--signal-green)",
    bg: "var(--signal-green-dim)",
  },
  {
    id: "dividend",
    icon: "💰",
    title: "Dividend Machines",
    desc: "Yield > 1%, consistent 5Y payout",
    filters: { minPe: 0, maxPe: 40, minDivYield: 0.5 },
    color: "var(--signal-blue)",
    bg: "rgba(10,132,255,0.12)",
  },
  {
    id: "redflag",
    icon: "⚠️",
    title: "Red Flag Watch",
    desc: "Promoter pledge > 5%, auditor change",
    filters: { minPe: 0, maxPe: 100, minDivYield: 0 },
    color: "var(--signal-red)",
    bg: "var(--signal-red-dim)",
  },
  {
    id: "ai",
    icon: "◈",
    title: "AI Picks",
    desc: "Positive sentiment shift in latest concall",
    filters: { minPe: 0, maxPe: 100, minDivYield: 0 },
    color: "var(--signal-amber)",
    bg: "rgba(255,214,10,0.12)",
  },
];

const SECTORS = ["All", "IT Services", "Banking", "NBFC", "Oil & Gas", "FMCG", "Auto", "Paints", "Consumer"];

export default function ScreenerPage() {
  const [minPe, setMinPe] = useState(0);
  const [maxPe, setMaxPe] = useState(100);
  const [minDivYield, setMinDivYield] = useState(0);
  const [sector, setSector] = useState("All");
  const [activePrebuilt, setActivePrebuilt] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"marketCap" | "pe" | "changePct" | "divYield">("marketCap");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let results = COMPANIES.filter((co) => {
      if (co.pe < minPe || co.pe > maxPe) return false;
      if (co.divYield < minDivYield) return false;
      if (sector !== "All" && co.sector !== sector) return false;
      return true;
    });

    results = [...results].sort((a, b) => {
      const av = a[sortBy] as number;
      const bv = b[sortBy] as number;
      return sortDir === "desc" ? bv - av : av - bv;
    });

    return results;
  }, [minPe, maxPe, minDivYield, sector, sortBy, sortDir]);

  const applyPrebuilt = (screen: (typeof PREBUILT_SCREENS)[0]) => {
    setActivePrebuilt(screen.id);
    setMinPe(screen.filters.minPe);
    setMaxPe(screen.filters.maxPe);
    setMinDivYield(screen.filters.minDivYield);
  };

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortBy(col); setSortDir("desc"); }
  };

  const SortArrow = ({ col }: { col: typeof sortBy }) =>
    sortBy === col ? <span style={{ color: "var(--accent-gold)" }}>{sortDir === "desc" ? " ↓" : " ↑"}</span> : null;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
            SCREENER
          </p>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--text-primary)", marginBottom: 8 }}>
            Find your next investment
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>
            Filter 500+ Indian companies by fundamentals, growth, and quality metrics.
          </p>
        </div>

        {/* Pre-built screens */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 36 }}>
          {PREBUILT_SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => applyPrebuilt(s)}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: "var(--radius-lg)",
                border: `1px solid ${activePrebuilt === s.id ? s.color + "44" : "var(--border-subtle)"}`,
                background: activePrebuilt === s.id ? s.bg : "var(--bg-secondary)",
                cursor: "pointer",
                transition: "all 200ms",
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: activePrebuilt === s.id ? s.color : "var(--text-primary)", marginBottom: 4 }}>
                {s.title}
              </p>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.4 }}>{s.desc}</p>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "start" }}>
          {/* Filter panel */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              position: "sticky",
              top: 80,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 20 }}>Filters</p>

            {/* Sector */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                SECTOR
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {SECTORS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSector(s)}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: sector === s ? "var(--accent-gold-dim)" : "transparent",
                      color: sector === s ? "var(--accent-gold)" : "var(--text-secondary)",
                      fontSize: 13,
                      fontWeight: sector === s ? 600 : 400,
                      cursor: "pointer",
                      fontFamily: "Satoshi, sans-serif",
                      transition: "all 150ms",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* PE */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                PE RATIO
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number"
                  value={minPe}
                  onChange={(e) => setMinPe(Number(e.target.value))}
                  style={{ width: "100%", background: "var(--bg-tertiary)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: 13, padding: "8px 10px", outline: "none", fontFamily: "JetBrains Mono, monospace" }}
                />
                <span style={{ color: "var(--text-tertiary)", fontSize: 13 }}>—</span>
                <input
                  type="number"
                  value={maxPe}
                  onChange={(e) => setMaxPe(Number(e.target.value))}
                  style={{ width: "100%", background: "var(--bg-tertiary)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: 13, padding: "8px 10px", outline: "none", fontFamily: "JetBrains Mono, monospace" }}
                />
              </div>
            </div>

            {/* Dividend Yield */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                MIN DIV YIELD (%)
              </p>
              <input
                type="number"
                step="0.1"
                value={minDivYield}
                onChange={(e) => setMinDivYield(Number(e.target.value))}
                style={{ width: "100%", background: "var(--bg-tertiary)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: 13, padding: "8px 10px", outline: "none", fontFamily: "JetBrains Mono, monospace" }}
              />
            </div>

            <button
              onClick={() => { setMinPe(0); setMaxPe(100); setMinDivYield(0); setSector("All"); setActivePrebuilt(null); }}
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", fontSize: 13, border: "1px solid var(--border-medium)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "Satoshi, sans-serif" }}
            >
              Reset Filters
            </button>
          </div>

          {/* Results table */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                <span className="font-num" style={{ color: "var(--text-primary)", fontWeight: 700 }}>{filtered.length}</span> companies match
              </p>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Click column header to sort</p>
            </div>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ cursor: "default" }}>Company</th>
                      <th style={{ cursor: "default" }}>Sector</th>
                      <th onClick={() => toggleSort("marketCap")} style={{ cursor: "pointer", userSelect: "none" }}>
                        Mkt Cap<SortArrow col="marketCap" />
                      </th>
                      <th style={{ cursor: "default" }}>Price</th>
                      <th onClick={() => toggleSort("changePct")} style={{ cursor: "pointer", userSelect: "none" }}>
                        Day %<SortArrow col="changePct" />
                      </th>
                      <th onClick={() => toggleSort("pe")} style={{ cursor: "pointer", userSelect: "none" }}>
                        PE<SortArrow col="pe" />
                      </th>
                      <th onClick={() => toggleSort("divYield")} style={{ cursor: "pointer", userSelect: "none" }}>
                        Div Yield<SortArrow col="divYield" />
                      </th>
                      <th style={{ cursor: "default" }}>52W Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: 40, color: "var(--text-tertiary)", fontFamily: "Satoshi, sans-serif" }}>
                          No companies match your filters. Try adjusting the criteria.
                        </td>
                      </tr>
                    )}
                    {filtered.map((co) => {
                      const rangePct = ((co.price - co.low52w) / (co.high52w - co.low52w)) * 100;
                      return (
                        <tr key={co.id}>
                          <td style={{ fontFamily: "Satoshi, sans-serif" }}>
                            <Link href={`/company/${co.ticker.toLowerCase()}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 28, height: 28, background: co.logoColor, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "white", flexShrink: 0 }}>
                                {co.logoInitials}
                              </div>
                              <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13 }}>{co.ticker}</span>
                            </Link>
                          </td>
                          <td style={{ fontFamily: "Satoshi, sans-serif" }}>
                            <SectorTag label={co.sector} />
                          </td>
                          <td>₹{(co.marketCap / 100000).toFixed(1)} L Cr</td>
                          <td>{formatPrice(co.price)}</td>
                          <td><ChangeBadge value={co.changePct} size="sm" /></td>
                          <td>{co.pe.toFixed(1)}x</td>
                          <td>{co.divYield > 0 ? `${co.divYield}%` : "—"}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                              <div style={{ flex: 1, height: 4, background: "var(--bg-tertiary)", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ width: `${rangePct}%`, height: "100%", background: "var(--accent-gold)", borderRadius: 2 }} />
                              </div>
                              <span style={{ fontSize: 10, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                                {Math.round(rangePct)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
