import { NextResponse } from "next/server";
import { MARKET_INDICES, COMPANIES } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  // In production this would pull live data from NSE/BSE APIs.
  // For Sprint 1 we return the static dataset with a simulated "last updated" timestamp.
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);

  return NextResponse.json({
    indices: MARKET_INDICES,
    topGainers: [...COMPANIES].sort((a, b) => b.changePct - a.changePct).slice(0, 5),
    topLosers: [...COMPANIES].sort((a, b) => a.changePct - b.changePct).slice(0, 5),
    lastUpdated: istTime.toISOString(),
    marketStatus: "closed", // "open" | "pre-open" | "closed"
  });
}
