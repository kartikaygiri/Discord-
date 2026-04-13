import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Sparkline from "@/components/ui/Sparkline";
import { ChangeBadge, GradeBadge, SectorTag } from "@/components/ui/Badge";
import { COMPANIES, MARKET_INDICES, EARNINGS_CALENDAR_DATA, EARNINGS_CARDS, formatPrice } from "@/lib/data";

const SPARKLINES: Record<string, number[]> = {
  reliance:     [2780, 2795, 2742, 2810, 2798, 2823, 2847],
  tcs:          [4180, 4156, 4134, 4098, 4112, 4090, 4123],
  infosys:      [1845, 1853, 1862, 1871, 1878, 1884, 1891],
  hdfcbank:     [1780, 1762, 1748, 1755, 1742, 1738, 1742],
  zomato:       [218,  224,  231,  235,  239,  244,  247],
  bajajfinance: [6980, 7010, 7045, 7082, 7120, 7155, 7182],
  wipro:        [468,  463,  459,  457,  456,  456,  455],
  itc:          [430,  432,  434,  435,  436,  437,  437],
  asianpaints:  [2480, 2462, 2448, 2434, 2422, 2415, 2412],
  maruti:       [11720,11780,11830,11880,11920,11955,11982],
};

const GAINERS = [
  { ticker: "ZOMATO", name: "Zomato", change: 5.37, price: 247.4, sector: "Consumer" },
  { ticker: "BAJFINANCE", name: "Bajaj Finance", change: 2.68, price: 7182, sector: "NBFC" },
  { ticker: "RELIANCE", name: "Reliance Inds", change: 2.31, price: 2847.5, sector: "Oil & Gas" },
  { ticker: "MARUTI", name: "Maruti Suzuki", change: 2.07, price: 11982, sector: "Auto" },
  { ticker: "INFY", name: "Infosys", change: 1.22, price: 1891.2, sector: "IT Services" },
];

const LOSERS = [
  { ticker: "WIPRO", name: "Wipro", change: -1.34, price: 455.8, sector: "IT Services" },
  { ticker: "ASIANPAINT", name: "Asian Paints", change: -1.20, price: 2412, sector: "Paints" },
  { ticker: "HDFCBANK", name: "HDFC Bank", change: -0.84, price: 1742.3, sector: "Banking" },
  { ticker: "TCS", name: "TCS", change: -0.80, price: 4123, sector: "IT Services" },
  { ticker: "ITC", name: "ITC", change: 0.87, price: 437.5, sector: "FMCG" },
];

export default function DashboardPage() {
  const todayCard = EARNINGS_CARDS["infosys"];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      {/* MARKET PULSE */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0 24px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 0,
          }}
        >
          {MARKET_INDICES.map((idx, i) => (
            <div
              key={idx.name}
              style={{
                padding: "16px 28px",
                borderRight: i < MARKET_INDICES.length - 1 ? "1px solid var(--border-subtle)" : "none",
                flexShrink: 0,
                minWidth: 160,
              }}
            >
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>{idx.name}</p>
              <p className="font-num" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                {idx.value.toLocaleString("en-IN")}
              </p>
              <ChangeBadge value={idx.changePct} size="sm" />
            </div>
          ))}
          <div style={{ padding: "16px 28px", flexShrink: 0, display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
            <div className="pulse-live" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--signal-green)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--signal-green)" }}>LIVE</span>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: 4 }}>Updated 3:29 PM IST</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* TODAY'S SIGNAL */}
        <section style={{ marginBottom: 32 }}>
          <div
            className="border-gold-left"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 24px 24px 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div className="pulse-live" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--accent-gold)", textTransform: "uppercase" }}>
                TODAY&apos;S SIGNAL
              </p>
            </div>
            <p style={{ fontSize: 16, color: "var(--text-primary)", lineHeight: 1.7, marginBottom: 16 }}>
              3 Nifty 50 companies report earnings today. Based on analyst estimates,{" "}
              <strong style={{ color: "var(--accent-gold)" }}>Infosys Ltd</strong> has the highest
              probability of a beat — guidance revision expected after 4 strong quarters.{" "}
              <Link href="/company/infosys" style={{ color: "var(--signal-blue)", textDecoration: "none" }}>
                Here&apos;s why →
              </Link>
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Infosys", "Wipro", "Mindtree"].map((c) => (
                <span
                  key={c}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 100,
                    fontSize: 12,
                    padding: "4px 12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  📅 {c} reports today
                </span>
              ))}
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

          {/* WATCHLIST */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Your Watchlist</h2>
              <Link href="/signup" style={{ fontSize: 12, color: "var(--accent-gold)", textDecoration: "none" }}>
                + Add company
              </Link>
            </div>
            <div>
              {COMPANIES.slice(0, 5).map((co) => {
                const spark = SPARKLINES[co.id] || [100, 102];
                const card = EARNINGS_CARDS[co.id];
                return (
                  <Link key={co.id} href={`/company/${co.ticker.toLowerCase()}`} style={{ textDecoration: "none" }}>
                    <div
                      className="row-hover"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 20px",
                        borderBottom: "1px solid var(--border-subtle)",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          background: co.logoColor,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          fontWeight: 700,
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        {co.logoInitials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{co.ticker}</p>
                        <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{co.sector}</p>
                      </div>
                      <Sparkline data={spark} width={48} height={24} />
                      <div style={{ textAlign: "right", minWidth: 80 }}>
                        <p className="font-num" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                          {formatPrice(co.price)}
                        </p>
                        <ChangeBadge value={co.changePct} size="sm" />
                      </div>
                      {card && (
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            background: card.signalGrade.startsWith("A") ? "var(--signal-green-dim)" : "rgba(255,214,10,0.12)",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: card.signalGrade.startsWith("A") ? "var(--signal-green)" : "var(--signal-amber)",
                            fontFamily: "'JetBrains Mono', monospace",
                            flexShrink: 0,
                          }}
                        >
                          {card.signalGrade}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ padding: "12px 20px" }}>
              <Link
                href="/signup"
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>Sign in to sync your watchlist</span>
              </Link>
            </div>
          </div>

          {/* EARNINGS CALENDAR */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Earnings This Week</h2>
              <Link href="/earnings" style={{ fontSize: 12, color: "var(--accent-gold)", textDecoration: "none" }}>
                Full calendar →
              </Link>
            </div>
            <div style={{ padding: "8px 0" }}>
              {EARNINGS_CALENDAR_DATA.slice(0, 4).map((day) => {
                const d = new Date(day.date);
                const dateStr = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
                const isToday = day.date === "2026-04-13";
                return (
                  <div
                    key={day.date}
                    style={{
                      padding: "12px 20px",
                      borderBottom: "1px solid var(--border-subtle)",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      background: isToday ? "var(--accent-gold-dim)" : "transparent",
                    }}
                  >
                    <div style={{ minWidth: 72 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: isToday ? "var(--accent-gold)" : "var(--text-secondary)" }}>
                        {isToday ? "TODAY" : dateStr}
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      {day.companies.map((c) => (
                        <span
                          key={c}
                          style={{
                            display: "inline-block",
                            background: "var(--bg-tertiary)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: 100,
                            fontSize: 11,
                            padding: "2px 10px",
                            color: "var(--text-secondary)",
                            marginRight: 6,
                            marginBottom: 4,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "var(--text-tertiary)",
                        flexShrink: 0,
                        padding: 0,
                      }}
                      aria-label="Set alert"
                    >
                      🔔
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MARKET MOVERS */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Gainers */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>🚀</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Top Gainers</h3>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: "auto" }}>Nifty 500</span>
              </div>
              {GAINERS.map((s, i) => (
                <div
                  key={s.ticker}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="font-num" style={{ fontSize: 13, color: "var(--text-tertiary)", width: 20 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{s.ticker}</p>
                    <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{s.sector}</p>
                  </div>
                  <p className="font-num" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {formatPrice(s.price)}
                  </p>
                  <ChangeBadge value={s.change} size="sm" />
                </div>
              ))}
            </div>

            {/* Losers */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>📉</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Top Losers</h3>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: "auto" }}>Nifty 500</span>
              </div>
              {LOSERS.map((s, i) => (
                <div
                  key={s.ticker}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="font-num" style={{ fontSize: 13, color: "var(--text-tertiary)", width: 20 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{s.ticker}</p>
                    <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{s.sector}</p>
                  </div>
                  <p className="font-num" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {formatPrice(s.price)}
                  </p>
                  <ChangeBadge value={s.change} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT EARNINGS FEED */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="font-serif" style={{ fontSize: 24, color: "var(--text-primary)" }}>Recent Earnings</h2>
            <Link href="/screener" style={{ fontSize: 13, color: "var(--accent-gold)", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {Object.entries(EARNINGS_CARDS).map(([companyId, card]) => {
              const co = COMPANIES.find((c) => c.id === companyId);
              if (!co) return null;
              return (
                <Link key={companyId} href={`/company/${co.ticker.toLowerCase()}`} style={{ textDecoration: "none" }}>
                  <div
                    className="card-hover"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-lg)",
                      padding: 20,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            background: co.logoColor,
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                            fontWeight: 700,
                            color: "white",
                          }}
                        >
                          {co.logoInitials}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{co.name}</p>
                          <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{card.quarter}</p>
                        </div>
                      </div>
                      <GradeBadge grade={card.signalGrade} />
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                      {card.aiSummary.slice(0, 110)}...
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span className="font-num" style={{ fontSize: 12, color: "var(--signal-green)" }}>
                        Rev +{card.revenueGrowthYoY}%
                      </span>
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>·</span>
                      <span className="font-num" style={{ fontSize: 12, color: "var(--signal-green)" }}>
                        PAT +{card.netProfitGrowthYoY}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
