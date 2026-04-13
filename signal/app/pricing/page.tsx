import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const FREE_FEATURES = [
  "10 company profiles",
  "Basic financials (annual)",
  "Earnings cards (48hr delay)",
  "5 AI questions per day",
  "Basic screener",
  "Earnings calendar view",
];

const PRO_FEATURES = [
  "All BSE 500 companies",
  "Real-time earnings cards (within 2 hours)",
  "Unlimited AI questions",
  "Advanced screener + save screens",
  "Portfolio earnings tracker",
  "Email & WhatsApp alerts",
  "Export to PDF",
  "Compare tool (multi-company)",
  "Concall transcript access",
  "Shareholding pattern history",
  "Priority access to new features",
];

const FAQS = [
  {
    q: "Is my payment secure?",
    a: "Yes. All payments are processed through Razorpay, which is PCI-DSS Level 1 compliant. We never store your card details. All transactions are encrypted with 256-bit SSL.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel anytime from your account settings. Your Pro access continues until the end of your current billing period. No questions asked.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI (GPay, PhonePe, Paytm), all major debit and credit cards (Visa, Mastercard, RuPay), and net banking from 50+ banks.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! All new users get a 7-day free trial of Signal Pro. No credit card required to start. Upgrade only when you're convinced.",
  },
  {
    q: "Is Signal SEBI registered?",
    a: "No. Signal is an informational and research tool, not a SEBI-registered investment advisor. All content is for educational purposes only. Please consult a SEBI-registered advisor for investment decisions.",
  },
  {
    q: "How is the annual plan priced?",
    a: "The annual plan is ₹2,499/year — equivalent to ₹208/month, saving you ₹1,089 compared to monthly billing. Billed once per year.",
  },
];

export default function PricingPage() {
  return (
    <div className="gradient-mesh" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
            PRICING
          </p>
          <h1 className="font-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "var(--text-primary)", marginBottom: 16 }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}>
            Start free. Upgrade when the insights start paying for themselves.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 64, maxWidth: 860, margin: "0 auto 64px" }}>

          {/* Free Plan */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              padding: 40,
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em" }}>
                FREE
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="font-num" style={{ fontSize: 40, fontWeight: 700, color: "var(--text-primary)" }}>₹0</span>
                <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>/ forever</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 8 }}>
                For investors just getting started
              </p>
            </div>

            <Link
              href="/signup"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-medium)",
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 32,
                transition: "all 200ms",
              }}
            >
              Start Free
            </Link>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {FREE_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-tertiary)", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div
            style={{
              background: "linear-gradient(160deg, #1a1710 0%, var(--bg-secondary) 40%)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "var(--radius-xl)",
              padding: 40,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              }}
            />

            <div style={{ position: "absolute", top: 20, right: 20 }}>
              <span
                style={{
                  background: "var(--accent-gold-dim)",
                  color: "var(--accent-gold)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "4px 12px",
                  letterSpacing: "0.06em",
                }}
              >
                ✦ MOST POPULAR
              </span>
            </div>

            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-gold)", marginBottom: 8, letterSpacing: "0.04em" }}>
                SIGNAL PRO
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="font-num" style={{ fontSize: 40, fontWeight: 700, color: "var(--text-primary)" }}>₹299</span>
                <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>/ month</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>
                or{" "}
                <span className="font-num" style={{ color: "var(--accent-gold)", fontWeight: 600 }}>₹2,499/year</span>
                {" "}— save ₹1,089
              </p>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 8 }}>
                For serious investors who demand clarity
              </p>
            </div>

            <Link
              href="/signup"
              className="btn-gold"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                color: "#0A0A0B",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              Start 7-Day Free Trial
            </Link>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {PRO_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 64, padding: "32px 24px", background: "var(--bg-secondary)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-subtle)" }}>
          {[
            { icon: "🔐", title: "Razorpay Secured", desc: "PCI-DSS compliant payments" },
            { icon: "💳", title: "UPI & Cards", desc: "GPay, PhonePe, all banks" },
            { icon: "↩️", title: "Cancel Anytime", desc: "No lock-ins, no hassle" },
            { icon: "🛡️", title: "7-Day Free Trial", desc: "No credit card required" },
          ].map((t) => (
            <div key={t.title} style={{ textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{t.title}</p>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: 32, color: "var(--text-primary)", marginBottom: 32, textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "18px 24px",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    userSelect: "none",
                  }}
                >
                  {faq.q}
                  <span style={{ color: "var(--text-tertiary)", fontSize: 18, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ padding: "0 24px 18px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <p className="font-serif" style={{ fontSize: 28, color: "var(--text-primary)", marginBottom: 12 }}>
            Still unsure? Start free.
          </p>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 24 }}>
            No credit card. No commitment. Just clarity.
          </p>
          <Link href="/signup" className="btn-gold" style={{ padding: "14px 36px", borderRadius: "var(--radius-md)", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Create Free Account
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
