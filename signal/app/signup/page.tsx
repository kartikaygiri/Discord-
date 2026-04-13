"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div
      className="gradient-mesh"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
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
        <span className="font-serif" style={{ fontSize: 22, color: "var(--text-primary)" }}>
          SIGNAL
        </span>
      </Link>

      <div
        className="animate-fade-up"
        style={{
          width: "100%",
          maxWidth: 440,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-xl)",
          padding: 40,
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <div
          style={{
            background: "var(--accent-gold-dim)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 28,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 20 }}>✦</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-gold)" }}>Early Access — Free</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Join 2,400+ investors. No credit card required.</p>
          </div>
        </div>

        <h1 className="font-serif" style={{ fontSize: 28, color: "var(--text-primary)", marginBottom: 8 }}>
          Start for free
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 32 }}>
          India&apos;s smartest equity intelligence platform
        </p>

        {/* Google OAuth */}
        <button
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-primary)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "all 200ms",
            marginBottom: 20,
            fontFamily: "Satoshi, sans-serif",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" />
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" />
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" />
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" />
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <hr className="divider" style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>or</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                First Name
              </label>
              <input type="text" placeholder="Arjun" className="input-dark" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500 }}>
                Last Name
              </label>
              <input type="text" placeholder="Kumar" className="input-dark" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500 }}>
              Email
            </label>
            <input type="email" placeholder="arjun@example.com" className="input-dark" />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, fontWeight: 500 }}>
              Password
            </label>
            <input type="password" placeholder="Min 8 characters" className="input-dark" />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              fontSize: 15,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Create Free Account
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)", marginTop: 24 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-gold)", textDecoration: "none", fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 24, textAlign: "center", maxWidth: 400, lineHeight: 1.6 }}>
        By creating an account, you agree to our{" "}
        <a href="#" style={{ color: "var(--text-secondary)" }}>Terms of Service</a> and{" "}
        <a href="#" style={{ color: "var(--text-secondary)" }}>Privacy Policy</a>.
        SIGNAL is not SEBI registered. For informational purposes only.
      </p>
    </div>
  );
}
