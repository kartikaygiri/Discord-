import { NextRequest, NextResponse } from "next/server";
import { COMPANIES, QUARTERLY_RESULTS, EARNINGS_CARDS } from "@/lib/data";

type Params = { params: Promise<{ ticker: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { ticker } = await params;
  const company = COMPANIES.find(
    (c) => c.id === ticker || c.ticker.toLowerCase() === ticker.toLowerCase()
  );

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  const quarters = QUARTERLY_RESULTS[company.id] ?? [];
  const earningsCard = EARNINGS_CARDS[company.id] ?? null;
  const peers = COMPANIES.filter(
    (c) => c.sector === company.sector && c.id !== company.id
  ).slice(0, 4);

  return NextResponse.json({ company, quarters, earningsCard, peers });
}
