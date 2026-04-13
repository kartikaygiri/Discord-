import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { EARNINGS_CALENDAR_DATA } from "@/lib/data";

const ALL_CALENDAR = [
  { date: "2026-04-13", companies: [
    { name: "Infosys Ltd",    sector: "IT Services", estEps: "₹16.52" },
    { name: "Wipro Ltd",      sector: "IT Services", estEps: "₹6.8" },
    { name: "Mindtree Ltd",   sector: "IT Services", estEps: "₹18.2" },
  ]},
  { date: "2026-04-15", companies: [
    { name: "HDFC AMC",       sector: "NBFC",        estEps: "₹72.4" },
    { name: "Page Industries", sector: "Textile",    estEps: "₹198.1" },
  ]},
  { date: "2026-04-17", companies: [
    { name: "HDFC Bank",      sector: "Banking",     estEps: "₹22.1" },
    { name: "Kotak Mah Bank", sector: "Banking",     estEps: "₹31.5" },
  ]},
  { date: "2026-04-18", companies: [
    { name: "TCS",            sector: "IT Services", estEps: "₹33.99" },
    { name: "HCL Technologies",sector: "IT Services",estEps: "₹18.6" },
  ]},
  { date: "2026-04-22", companies: [
    { name: "Reliance Industries", sector: "Oil & Gas", estEps: "₹29.34" },
    { name: "Bajaj Finance",       sector: "NBFC",      estEps: "₹42.1" },
    { name: "Divi's Labs",         sector: "Pharma",    estEps: "₹55.8" },
  ]},
  { date: "2026-04-24", companies: [
    { name: "ITC Ltd",        sector: "FMCG",        estEps: "₹5.4" },
    { name: "Asian Paints",   sector: "Paints",      estEps: "₹7.8" },
    { name: "Maruti Suzuki",  sector: "Auto",        estEps: "₹128.4" },
  ]},
  { date: "2026-04-25", companies: [
    { name: "Axis Bank",      sector: "Banking",     estEps: "₹19.6" },
    { name: "IndusInd Bank",  sector: "Banking",     estEps: "₹28.1" },
  ]},
  { date: "2026-04-28", companies: [
    { name: "ICICI Bank",     sector: "Banking",     estEps: "₹22.8" },
    { name: "SBI",            sector: "Banking",     estEps: "₹17.4" },
    { name: "Bajaj Auto",     sector: "Auto",        estEps: "₹84.3" },
  ]},
  { date: "2026-04-29", companies: [
    { name: "Larsen & Toubro", sector: "Infra",      estEps: "₹34.2" },
    { name: "NTPC",            sector: "Power",      estEps: "₹5.1" },
  ]},
  { date: "2026-04-30", companies: [
    { name: "UltraTech Cement", sector: "Cement",   estEps: "₹92.4" },
    { name: "Sun Pharma",       sector: "Pharma",   estEps: "₹11.8" },
    { name: "Nestle India",     sector: "FMCG",     estEps: "₹78.2" },
  ]},
];

function getDayOfWeek(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function isToday(dateStr: string) {
  return dateStr === "2026-04-13";
}

const SECTOR_COLORS: Record<string, string> = {
  "IT Services": "#1D4ED8",
  "Banking":     "#7C3AED",
  "NBFC":        "#B45309",
  "FMCG":        "#065F46",
  "Auto":        "#0369A1",
  "Oil & Gas":   "#1E40AF",
  "Pharma":      "#9D174D",
  "Paints":      "#DC2626",
  "Cement":      "#6B7280",
  "Infra":       "#374151",
  "Power":       "#D97706",
  "Textile":     "#7C3AED",
};

export default function EarningsCalendarPage() {
  const totalThisMonth = ALL_CALENDAR.reduce((acc, d) => acc + d.companies.length, 0);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
            EARNINGS CALENDAR
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--text-primary)" }}>
              April 2026
            </h1>
            <div style={{ display: "flex", gap: 8 }}>
              {["Nifty 50", "My Watchlist", "BSE 500"].map((f, i) => (
                <button
                  key={f}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    fontSize: 13,
                    fontWeight: 500,
                    border: "1px solid var(--border-medium)",
                    cursor: "pointer",
                    background: i === 0 ? "var(--accent-gold-dim)" : "transparent",
                    color: i === 0 ? "var(--accent-gold)" : "var(--text-secondary)",
                    fontFamily: "Satoshi, sans-serif",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              <span className="font-num" style={{ color: "var(--accent-gold)", fontWeight: 700 }}>{totalThisMonth}</span> companies reporting this month
            </p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              <span className="font-num" style={{ color: "var(--signal-green)", fontWeight: 700 }}>3</span> reporting today
            </p>
          </div>
        </div>

        {/* Calendar list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ALL_CALENDAR.map((day) => {
            const today = isToday(day.date);
            return (
              <div
                key={day.date}
                style={{
                  background: today ? "rgba(201,168,76,0.06)" : "var(--bg-secondary)",
                  border: `1px solid ${today ? "rgba(201,168,76,0.3)" : "var(--border-subtle)"}`,
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}
              >
                {/* Day header */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: today ? "rgba(201,168,76,0.08)" : "var(--bg-tertiary)",
                  }}
                >
                  {today && (
                    <div className="pulse-live" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-gold)", flexShrink: 0 }} />
                  )}
                  <p style={{ fontSize: 14, fontWeight: 700, color: today ? "var(--accent-gold)" : "var(--text-primary)" }}>
                    📅 {today ? "TODAY — " : ""}{getDayOfWeek(day.date)}
                  </p>
                  <span
                    style={{
                      background: today ? "var(--accent-gold-dim)" : "var(--bg-hover)",
                      color: today ? "var(--accent-gold)" : "var(--text-tertiary)",
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 10px",
                      marginLeft: "auto",
                    }}
                  >
                    {day.companies.length} {day.companies.length === 1 ? "company" : "companies"}
                  </span>
                </div>

                {/* Companies list */}
                <div>
                  {day.companies.map((co, i) => {
                    const sectorColor = SECTOR_COLORS[co.sector] || "#4B5563";
                    return (
                      <div
                        key={co.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          padding: "16px 24px",
                          borderBottom: i < day.companies.length - 1 ? "1px solid var(--border-subtle)" : "none",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Company logo placeholder */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            background: sectorColor,
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
                          {co.name.slice(0, 3).toUpperCase()}
                        </div>

                        <div style={{ flex: 1, minWidth: 160 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                            {co.name}
                          </p>
                          <span
                            style={{
                              background: "var(--bg-tertiary)",
                              color: "var(--text-tertiary)",
                              borderRadius: 100,
                              fontSize: 11,
                              padding: "1px 8px",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            {co.sector}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                          <div>
                            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 2 }}>Analyst Est. EPS</p>
                            <p className="font-num" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
                              {co.estEps}
                            </p>
                          </div>

                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              style={{
                                padding: "8px 16px",
                                borderRadius: "var(--radius-md)",
                                fontSize: 12,
                                fontWeight: 500,
                                border: "1px solid var(--border-medium)",
                                background: "transparent",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontFamily: "Satoshi, sans-serif",
                              }}
                            >
                              🔔 <span>Set Alert</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            padding: 32,
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-xl)",
            textAlign: "center",
          }}
        >
          <p className="font-serif" style={{ fontSize: 24, color: "var(--text-primary)", marginBottom: 8 }}>
            Never miss earnings day
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>
            Get AI analysis delivered to your inbox within 2 hours of any company filing results.
          </p>
          <a
            href="/signup"
            className="btn-gold"
            style={{ padding: "12px 28px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Enable Email Alerts — Free
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
