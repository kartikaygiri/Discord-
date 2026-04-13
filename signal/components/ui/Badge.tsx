type BadgeProps = {
  value: number;
  suffix?: string;
  showArrow?: boolean;
  size?: "sm" | "md";
};

export function ChangeBadge({ value, suffix = "%", showArrow = true, size = "md" }: BadgeProps) {
  const isPositive = value >= 0;
  const isNeutral = Math.abs(value) < 0.1;
  const fontSize = size === "sm" ? 11 : 12;
  const padding = size === "sm" ? "1px 6px" : "2px 8px";

  const bg = isNeutral
    ? "rgba(255,214,10,0.12)"
    : isPositive
    ? "var(--signal-green-dim)"
    : "var(--signal-red-dim)";
  const color = isNeutral
    ? "var(--signal-amber)"
    : isPositive
    ? "var(--signal-green)"
    : "var(--signal-red)";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        background: bg,
        color,
        borderRadius: 100,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize,
        fontWeight: 500,
        padding,
        whiteSpace: "nowrap",
      }}
    >
      {showArrow && <span>{arrow}</span>}
      {value >= 0 ? "+" : ""}
      {value.toFixed(2)}{suffix}
    </span>
  );
}

type BeatMissBadgeProps = { value: "beat" | "miss" | "in-line" };

export function BeatMissBadge({ value }: BeatMissBadgeProps) {
  const config = {
    beat:     { bg: "var(--signal-green-dim)", color: "var(--signal-green)", label: "Beat ✓" },
    miss:     { bg: "var(--signal-red-dim)",   color: "var(--signal-red)",   label: "Miss ✗" },
    "in-line":{ bg: "rgba(255,214,10,0.12)",   color: "var(--signal-amber)", label: "In-line ≈" },
  };
  const c = config[value];
  return (
    <span
      style={{
        display: "inline-block",
        background: c.bg,
        color: c.color,
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
      }}
    >
      {c.label}
    </span>
  );
}

type GradeBadgeProps = { grade: string; score?: number };

export function GradeBadge({ grade, score }: GradeBadgeProps) {
  const color = grade.startsWith("A")
    ? "var(--signal-green)"
    : grade.startsWith("B")
    ? "var(--signal-amber)"
    : "var(--signal-red)";
  const bg = grade.startsWith("A")
    ? "var(--signal-green-dim)"
    : grade.startsWith("B")
    ? "rgba(255,214,10,0.12)"
    : "var(--signal-red-dim)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <span
        style={{
          display: "inline-block",
          background: bg,
          color,
          borderRadius: 8,
          fontSize: 20,
          fontWeight: 700,
          padding: "4px 14px",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {grade}
      </span>
      {score !== undefined && (
        <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace" }}>
          {score}/10
        </span>
      )}
    </div>
  );
}

type SectorTagProps = { label: string };
export function SectorTag({ label }: SectorTagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 10px",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}
