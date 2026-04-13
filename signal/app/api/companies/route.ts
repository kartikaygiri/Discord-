import { NextRequest, NextResponse } from "next/server";
import { COMPANIES } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get("sector");
  const nifty50 = searchParams.get("nifty50");
  const query = searchParams.get("q");

  let companies = [...COMPANIES];

  if (sector) {
    companies = companies.filter((c) => c.sector.toLowerCase() === sector.toLowerCase());
  }
  if (nifty50 === "true") {
    companies = companies.filter((c) => c.isNifty50);
  }
  if (query) {
    const q = query.toLowerCase();
    companies = companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.ticker.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ companies, total: companies.length });
}
