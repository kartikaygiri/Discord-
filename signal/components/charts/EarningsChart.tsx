"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { QuarterlyResult } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        padding: "12px 16px",
        borderLeft: "3px solid var(--accent-gold)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ color: "var(--text-tertiary)", fontSize: 11 }}>{p.name}: </span>
          ₹{(p.value as number).toLocaleString("en-IN")} Cr
        </p>
      ))}
    </div>
  );
};

type Props = { data: QuarterlyResult[] };

export default function EarningsChart({ data }: Props) {
  const reversed = [...data].reverse();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {/* Revenue chart */}
      <div style={{ height: 160 }}>
        <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8 }}>Revenue (₹ Cr)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reversed} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="quarter"
              tick={{ fill: "var(--text-tertiary)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]}>
              {reversed.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    i === reversed.length - 1
                      ? "var(--accent-gold)"
                      : "rgba(201,168,76,0.3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Net Profit chart */}
      <div style={{ height: 160 }}>
        <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 8 }}>Net Profit (₹ Cr)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reversed} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="quarter"
              tick={{ fill: "var(--text-tertiary)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="netProfit" name="Net Profit" radius={[4, 4, 0, 0]}>
              {reversed.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    i === reversed.length - 1
                      ? "var(--signal-green)"
                      : "rgba(48,209,88,0.3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
