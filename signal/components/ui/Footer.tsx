"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "48px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: "linear-gradient(135deg, #C9A84C, #A88A3D)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0A0A0B",
                }}
              >
                S
              </div>
              <span
                className="font-serif"
                style={{ fontSize: 20, color: "var(--text-primary)" }}
              >
                SIGNAL
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 240 }}>
              AI-powered equity intelligence for Indian markets. Turn filings into clarity.
            </p>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 12 }}>
              Built in India 🇮🇳
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="label-micro" style={{ marginBottom: 16 }}>Product</p>
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Screener", href: "/screener" },
              { label: "Earnings Calendar", href: "/earnings" },
              { label: "Compare", href: "/compare" },
              { label: "Pricing", href: "/pricing" },
            ].map((link) => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <p className="label-micro" style={{ marginBottom: 16 }}>Company</p>
            {[
              { label: "About", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
            ].map((link) => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 14 }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p className="label-micro" style={{ marginBottom: 16 }}>Legal</p>
            {[
              { label: "Terms of Service", href: "#" },
              { label: "Privacy Policy", href: "#" },
              { label: "Cookie Policy", href: "#" },
              { label: "Disclaimer", href: "#" },
            ].map((link) => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 14 }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div
          style={{
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p style={{ fontSize: 12, color: "var(--text-tertiary)", maxWidth: 640, lineHeight: 1.7 }}>
            <strong style={{ color: "var(--signal-amber)" }}>Disclaimer:</strong>{" "}
            SIGNAL is not a SEBI-registered investment advisor. All information provided is for educational
            and informational purposes only. Do not make investment decisions based solely on this platform.
            Data is sourced from BSE, NSE, and public filings. Past performance is not indicative of future results.
            Always consult a qualified financial advisor before investing.
          </p>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
            © 2026 SIGNAL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
