"use client";

type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
};

export default function Sparkline({
  data,
  width = 80,
  height = 32,
  color,
  fillOpacity = 0.15,
}: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = color || (isPositive ? "var(--signal-green)" : "var(--signal-red)");

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const firstX = (0 / (data.length - 1)) * width;
  const lastX = ((data.length - 1) / (data.length - 1)) * width;
  const fillPath = `M${firstX},${height} L${polyline} L${lastX},${height} Z`;
  const linePath = `M${points[0]} L${points.slice(1).join(" L")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`grad-${color?.replace(/[^a-z]/gi, "")}-${width}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity={fillOpacity * 2} />
          <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d={fillPath}
        fill={`url(#grad-${color?.replace(/[^a-z]/gi, "")}-${width})`}
      />
      <polyline
        points={polyline}
        fill="none"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
