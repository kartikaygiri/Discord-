"use client";

import { useState } from "react";
import type { Company } from "@/lib/data";

const QUICK_PROMPTS = [
  "Summarize last 4 quarters",
  "Is debt sustainable?",
  "What drove last quarter's growth?",
  "Compare margins to sector average",
];

type Message = { role: "user" | "assistant"; content: string };

export default function AIChatPanel({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm Signal AI. I have access to ${company.name}'s quarterly filings, annual reports, and shareholding data. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: company.id,
          companyName: company.name,
          messages: [...messages, userMsg],
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to Signal AI right now. Please try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Signal AI Chat"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 200,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #C9A84C, #A88A3D)",
          border: "none",
          cursor: "pointer",
          display: open ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
          fontSize: 24,
          transition: "transform 200ms ease, box-shadow 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        ◈
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 200,
            width: "min(420px, calc(100vw - 48px))",
            height: "min(580px, calc(100vh - 100px))",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-elevated)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "var(--bg-tertiary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                  color: "#0A0A0B",
                }}
              >
                ◈
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Signal AI</p>
                <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{company.ticker} context loaded</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: 18, padding: 4 }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.role === "user" ? "var(--accent-gold-dim)" : "var(--bg-tertiary)",
                    border: `1px solid ${m.role === "user" ? "rgba(201,168,76,0.2)" : "var(--border-subtle)"}`,
                    fontSize: 14,
                    color: "var(--text-primary)",
                    lineHeight: 1.6,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "10px 14px" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent-gold)",
                      animation: `pulse-live 1.2s ease ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && (
            <div style={{ padding: "8px 20px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-medium)",
                    borderRadius: 100,
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    padding: "4px 12px",
                    cursor: "pointer",
                    transition: "all 150ms",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: 10,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={`Ask about ${company.ticker}...`}
              style={{
                flex: 1,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-primary)",
                fontSize: 14,
                padding: "10px 14px",
                outline: "none",
                fontFamily: "Satoshi, sans-serif",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="btn-gold"
              style={{
                padding: "10px 16px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                opacity: !input.trim() || loading ? 0.5 : 1,
                flexShrink: 0,
              }}
            >
              →
            </button>
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: 10, color: "var(--text-tertiary)", padding: "4px 16px 12px", textAlign: "center", lineHeight: 1.4 }}>
            Signal AI is for informational purposes only. Not investment advice.
          </p>
        </div>
      )}
    </>
  );
}
