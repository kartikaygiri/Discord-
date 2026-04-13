import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Sparkline from "@/components/ui/Sparkline";
import { ChangeBadge } from "@/components/ui/Badge";
import { COMPANIES, MARKET_INDICES, formatPrice } from "@/lib/data";

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

const FEATURES = [
  {
    icon: "✦",
    title: "EARNINGS DECODER",
    desc: "Quarterly filings become beautiful one-page cards with AI-generated insights, risk flags, and management sentiment analysis.",
  },
  {
    icon: "◈",
    title: "ASK SIGNAL AI",
    desc: "Chat with any company's financial data. \"Is RIL's debt sustainable?\" or \"Compare margins vs TCS\" — answered in seconds.",
  },
  {
    icon: "⚡",
    title: "INSTANT ALERTS",
    desc: "Get AI analysis within 2 hours of a company filing results with BSE. Never miss an earnings beat or miss again.",
  },
];

const TESTIMONIALS = [
  { name: "Rohan M.", city: "Mumbai",    text: "Finally understand what Jio's numbers actually mean." },
  { name: "Priya S.", city: "Bangalore", text: "The earnings cards saved me hours of reading PDFs." },
  { name: "Arjun K.", city: "Delhi",     text: "Signal AI explained debt ratios better than my CA." },
  { name: "Neha T.",  city: "Hyderabad", text: "My portfolio tracking is 10x clearer now." },
  { name: "Vikram P.",city: "Pune",      text: "Best ₹299 I spend every month on my investments." },
];

export default function LandingPage() {
  return (
    <div className="gradient-mesh" style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div className="animate-fade-up">
          <span
            style={{
              display: "inline-block",
              background: "var(--accent-gold-dim)",
              color: "var(--accent-gold)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 100,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            NOW IN EARLY ACCESS
          </span>
        </div>

        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: 24,
            animation: "fade-up 0.6s ease 80ms forwards",
            opacity: 0,
          }}
        >
          Indian Markets.
          <br />
          <span className="gradient-text-gold">Finally Decoded.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            maxWidth: 540,
            margin: "0 auto 36px",
            lineHeight: 1.7,
            animation: "fade-up 0.6s ease 160ms forwards",
            opacity: 0,
          }}
        >
          AI-powered equity intelligence that turns earnings reports into clarity.
          Nifty 50 to BSE 500 — every quarter, decoded.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fade-up 0.6s ease 240ms forwards",
            opacity: 0,
          }}
        >
          <Link
            href="/signup"
            className="btn-gold"
            style={{ padding: "14px 32px", borderRadius: "var(--radius-md)", fontSize: 16, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Get Early Access — Free
          </Link>
          <Link
            href="/company/reliance"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 24px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-md)",
            }}
          >
            See a live example →
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fade-up 0.6s ease 320ms forwards",
            opacity: 0,
          }}
        >
          {[
            { value: "2,400+", label: "Investors" },
            { value: "500+",   label: "Companies" },
            { value: "12,000+",label: "Earnings Cards" },
            { value: "< 2hr",  label: "Alert Speed" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p className="font-num" style={{ fontSize: 22, fontWeight: 700, color: "var(--accent-gold)" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div
        className="ticker-wrap"
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="ticker-track">
          {[...COMPANIES, ...COMPANIES].map((co, i) => {
            const spark = SPARKLINES[co.id] || [100, 102, 101, 103, 104];
            return (
              <Link key={`${co.id}-${i}`} href={`/company/${co.ticker.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 24px",
                    borderRight: "1px solid var(--border-subtle)",
                    minWidth: 220,
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
                      fontSize: 10,
                      fontWeight: 700,
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {co.logoInitials}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
                      {co.ticker}
                    </p>
                    <p className="font-num" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>
                      {formatPrice(co.price)}
                    </p>
                    <ChangeBadge value={co.changePct} size="sm" />
                  </div>
                  <Sparkline data={spark} width={60} height={28} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "96px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
            WHAT SIGNAL DOES
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--text-primary)", marginBottom: 16 }}>
            See what others miss
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto" }}>
            Every quarter, Indian companies file hundreds of pages. Signal reads them all, so you don&apos;t have to.
          </p>
        </div>

        <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {FEATURES.map((card) => (
            <div
              key={card.title}
              className="card-hover"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: 32,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--accent-gold-dim)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "var(--accent-gold)",
                  marginBottom: 20,
                }}
              >
                {card.icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
                {card.title}
              </p>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE EARNINGS CARD */}
      <section style={{ padding: "80px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
              SIGNAL IN ACTION
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--text-primary)" }}>
              An earnings card in 2 hours, not 2 days
            </h2>
          </div>

          <div
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-xl)",
              padding: 32,
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: "#1E40AF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>
                  RIL
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>Reliance Industries</p>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>NSE: RELIANCE · Q3 FY26</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ background: "var(--signal-green-dim)", color: "var(--signal-green)", borderRadius: 8, fontSize: 24, fontWeight: 700, padding: "6px 16px", fontFamily: "'JetBrains Mono', monospace" }}>
                  A
                </div>
                <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>Signal Grade</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Revenue",    value: "₹2.39L Cr", growth: "+12.3%", beat: "Beat ✓",    bc: "var(--signal-green)" },
                { label: "EBITDA",     value: "₹42,800 Cr", growth: "+8.7%",  beat: "In-line ≈", bc: "var(--signal-amber)" },
                { label: "Net Profit", value: "₹19,878 Cr", growth: "+15.2%", beat: "Beat ✓",    bc: "var(--signal-green)" },
                { label: "EPS",        value: "₹29.34",     growth: "+14.8%", beat: "Beat ✓",    bc: "var(--signal-green)" },
              ].map((m) => (
                <div key={m.label} style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: 16, border: "1px solid var(--border-subtle)" }}>
                  <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8, letterSpacing: "0.04em" }}>{m.label}</p>
                  <p className="font-num" style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{m.value}</p>
                  <p className="font-num" style={{ fontSize: 12, color: "var(--signal-green)" }}>{m.growth} ↑</p>
                  <p style={{ fontSize: 11, color: m.bc, marginTop: 4 }}>{m.beat}</p>
                </div>
              ))}
            </div>

            <div
              className="border-gold-left"
              style={{ background: "var(--accent-gold-dim)", borderRadius: "0 var(--radius-md) var(--radius-md) 0", padding: "16px 20px 16px 16px", marginBottom: 20 }}
            >
              <p style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.06em" }}>AI INSIGHT</p>
              <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7 }}>
                &quot;Jio Platforms drove 68% of revenue growth this quarter. Retail margins compressed 120bps due to store
                expansion capex. Management guided for 18% EBITDA growth in Q4, contingent on tariff hike implementation
                in February.&quot;
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/company/reliance" className="btn-gold" style={{ padding: "10px 20px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                View Full Analysis →
              </Link>
              <Link href="/signup" style={{ padding: "10px 20px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-block", background: "transparent", border: "1px solid var(--border-medium)", color: "var(--text-secondary)" }}>
                Get alerts like this
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET INDICES */}
      <section style={{ padding: "48px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", textAlign: "center", marginBottom: 24 }}>
          LIVE MARKET INDICES
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {MARKET_INDICES.map((idx) => (
            <div key={idx.name} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 16, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8 }}>{idx.name}</p>
              <p className="font-num" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>
                {idx.value.toLocaleString("en-IN")}
              </p>
              <div style={{ marginTop: 6, display: "flex", justifyContent: "center" }}>
                <ChangeBadge value={idx.changePct} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: "80px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
            TRUSTED BY INVESTORS
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 12, color: "var(--text-primary)" }}>
            Trusted by 2,400+ investors across India
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 48 }}>
            From first-time investors to seasoned traders — everyone deserves clear financial information.
          </p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {["#1E40AF", "#065F46", "#991B1B", "#7C3AED", "#B45309"].map((c, i) => (
                <div key={c} style={{ width: 40, height: 40, borderRadius: "50%", background: c, border: "2px solid var(--bg-secondary)", marginLeft: i > 0 ? -12 : 0, zIndex: 5 - i }} />
              ))}
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>+2,400 investors joined this month</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: 24, textAlign: "left" }}>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>&quot;{t.text}&quot;</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</p>
                <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{t.city}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Link href="/signup" className="btn-gold" style={{ padding: "14px 36px", borderRadius: "var(--radius-md)", fontSize: 16, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
              Join the waitlist — it&apos;s free
            </Link>
          </div>
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <h2 className="font-serif" style={{ fontSize: 32, color: "var(--text-primary)" }}>Popular Companies</h2>
          <Link href="/screener" style={{ fontSize: 14, color: "var(--accent-gold)", textDecoration: "none", fontWeight: 500 }}>
            View all companies →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {COMPANIES.slice(0, 6).map((co) => {
            const spark = SPARKLINES[co.id] || [100, 102];
            return (
              <Link key={co.id} href={`/company/${co.ticker.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <div className="card-hover" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: 20, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, background: co.logoColor, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>
                        {co.logoInitials}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{co.ticker}</p>
                        <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{co.sector}</p>
                      </div>
                    </div>
                    <Sparkline data={spark} width={56} height={28} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <p className="font-num" style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>{formatPrice(co.price)}</p>
                    <ChangeBadge value={co.changePct} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
