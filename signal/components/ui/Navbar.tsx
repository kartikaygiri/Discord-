"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Screener", href: "/screener" },
  { label: "Earnings", href: "/earnings" },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        background: "rgba(10,10,11,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #C9A84C, #A88A3D)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#0A0A0B",
              }}
            >
              S
            </div>
            <span
              className="font-serif"
              style={{ fontSize: 22, color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              SIGNAL
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-primary)";
                  (e.target as HTMLElement).style.background = "var(--bg-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href="/login"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                padding: "8px 14px",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="btn-gold"
              style={{
                padding: "8px 18px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get Access
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: 8,
                fontSize: 20,
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border-subtle)",
              padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  padding: "10px 8px",
                  borderRadius: "var(--radius-md)",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
