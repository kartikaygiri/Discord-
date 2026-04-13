"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Company } from "@/lib/data";

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

function generatePriceData(company: Company, tf: Timeframe) {
  const points: number = { "1D": 78, "1W": 7, "1M": 30, "3M": 90, "6M": 180, "1Y": 52, "3Y": 36 }[tf];
  const seed = company.price;
  const isUp = company.changePct >= 0;
  const volatility = 0.012;

  const data: { label: string; price: number; volume: number }[] = [];
  let price = seed * (isUp ? 0.88 : 1.12);

  for (let i = 0; i < points; i++) {
    const rand = (Math.sin(i * 127.3 + seed) + 1) / 2;
    const drift = isUp ? 0.002 : -0.002;
    price = price * (1 + drift + (rand - 0.5) * volatility * 2);
    price = Math.max(price, seed * 0.6);

    const labels: Record<Timeframe, string> = {
      "1D": `${9 + Math.floor((i / 78) * 7)}:${String(Math.floor((i % 12) * 5)).padStart(2, "0")}`,
      "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7],
      "1M": `${i + 1}`,
      "3M": `${i + 1}`,
      "6M": `${i + 1}`,
      "1Y": `W${i + 1}`,
      "3Y": `M${i + 1}`,
    };

    data.push({
      label: labels[tf],
      price: Math.round(price * 100) / 100,
      volume: Math.round(800000 + rand * 2000000),
    });
  }

  // Force last price to match company price
  if (data.length > 0) {
    data[data.length - 1].price = seed;
  }

  return data;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        padding: "12px 16px",
        borderLeft: "3px solid var(--accent-gold)",
      }}
    >
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>{label}</p>
      <p className="font-num" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>
        ₹{(payload[0].value as number).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};

type Props = { company: Company };

export default function PriceChartSection({ company }: Props) {
  const [activeFrame, setActiveFrame] = useState<Timeframe>("3M");
  const data = useMemo(() => generatePriceData(company, activeFrame), [company, activeFrame]);

  const first = data[0]?.price ?? company.price;
  const last = data[data.length - 1]?.price ?? company.price;
  const isPositive = last >= first;
  const chartColor = isPositive ? "var(--signal-green)" : "var(--signal-red)";

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Price Chart</h3>
        <div style={{ display: "flex", gap: 4, background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", padding: 4 }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveFrame(tf)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: activeFrame === tf ? "var(--bg-hover)" : "transparent",
                color: activeFrame === tf ? "var(--text-primary)" : "var(--text-tertiary)",
                transition: "all 150ms ease",
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#30D158" : "#FF453A"} stopOpacity={0.2} />
                <stop offset="100%" stopColor={isPositive ? "#30D158" : "#FF453A"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--text-tertiary)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "var(--text-tertiary)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill="url(#priceGrad)"
              dot={false}
              activeDot={{ r: 4, fill: chartColor, stroke: "var(--bg-tertiary)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
