// Static data for Sprint 1 — will be replaced with live Supabase data in Sprint 2

export type Company = {
  id: string;
  name: string;
  ticker: string;
  bseCode: string;
  sector: string;
  industry: string;
  marketCap: number; // in Cr
  price: number;
  change: number;    // absolute
  changePct: number; // percentage
  pe: number;
  divYield: number;
  high52w: number;
  low52w: number;
  bookValue: number;
  isNifty50: boolean;
  logoInitials: string;
  logoColor: string;
};

export type QuarterlyResult = {
  quarter: string;
  revenue: number;
  ebitda: number;
  netProfit: number;
  eps: number;
  revenueGrowthYoY: number;
  ebitdaMargin: number;
  netMargin: number;
  beatMiss: "beat" | "miss" | "in-line";
  analystEstEps: number;
};

export type EarningsCard = {
  quarter: string;
  signalGrade: string;
  signalScore: number;
  revenue: number;
  revenueGrowthYoY: number;
  ebitda: number;
  ebitdaGrowthYoY: number;
  netProfit: number;
  netProfitGrowthYoY: number;
  eps: number;
  epsGrowthYoY: number;
  revenueBeatMiss: "beat" | "miss" | "in-line";
  ebitdaBeatMiss: "beat" | "miss" | "in-line";
  netProfitBeatMiss: "beat" | "miss" | "in-line";
  epsBeatMiss: "beat" | "miss" | "in-line";
  aiSummary: string;
  managementSentimentScore: number;
  managementKeywords: string[];
  riskFlags: { flag: string; severity: "low" | "medium" | "high" }[];
  forwardGuidance: string;
};

export const COMPANIES: Company[] = [
  {
    id: "reliance",
    name: "Reliance Industries Ltd",
    ticker: "RELIANCE",
    bseCode: "500325",
    sector: "Oil & Gas",
    industry: "Conglomerate",
    marketCap: 1927000,
    price: 2847.5,
    change: 64.3,
    changePct: 2.31,
    pe: 28.4,
    divYield: 0.34,
    high52w: 3024,
    low52w: 2220,
    bookValue: 1142,
    isNifty50: true,
    logoInitials: "RIL",
    logoColor: "#1E40AF",
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    bseCode: "532540",
    sector: "IT Services",
    industry: "Software",
    marketCap: 1489000,
    price: 4123.0,
    change: -33.1,
    changePct: -0.8,
    pe: 32.1,
    divYield: 1.2,
    high52w: 4592,
    low52w: 3542,
    bookValue: 218,
    isNifty50: true,
    logoInitials: "TCS",
    logoColor: "#1D4ED8",
  },
  {
    id: "infosys",
    name: "Infosys Ltd",
    ticker: "INFY",
    bseCode: "500209",
    sector: "IT Services",
    industry: "Software",
    marketCap: 785000,
    price: 1891.2,
    change: 22.7,
    changePct: 1.22,
    pe: 27.8,
    divYield: 2.1,
    high52w: 2100,
    low52w: 1521,
    bookValue: 165,
    isNifty50: true,
    logoInitials: "INFY",
    logoColor: "#065F46",
  },
  {
    id: "hdfcbank",
    name: "HDFC Bank Ltd",
    ticker: "HDFCBANK",
    bseCode: "500180",
    sector: "Banking",
    industry: "Private Bank",
    marketCap: 1180000,
    price: 1742.3,
    change: -14.8,
    changePct: -0.84,
    pe: 19.4,
    divYield: 1.1,
    high52w: 1880,
    low52w: 1481,
    bookValue: 625,
    isNifty50: true,
    logoInitials: "HDFC",
    logoColor: "#7C3AED",
  },
  {
    id: "zomato",
    name: "Zomato Ltd",
    ticker: "ZOMATO",
    bseCode: "543320",
    sector: "Consumer",
    industry: "Food Delivery",
    marketCap: 214000,
    price: 247.4,
    change: 12.6,
    changePct: 5.37,
    pe: 91.2,
    divYield: 0,
    high52w: 304,
    low52w: 142,
    bookValue: 28.4,
    isNifty50: false,
    logoInitials: "ZOM",
    logoColor: "#991B1B",
  },
  {
    id: "bajajfinance",
    name: "Bajaj Finance Ltd",
    ticker: "BAJFINANCE",
    bseCode: "500034",
    sector: "NBFC",
    industry: "Consumer Finance",
    marketCap: 438000,
    price: 7182.0,
    change: 187.4,
    changePct: 2.68,
    pe: 32.8,
    divYield: 0.28,
    high52w: 8192,
    low52w: 6143,
    bookValue: 1240,
    isNifty50: true,
    logoInitials: "BAJ",
    logoColor: "#B45309",
  },
  {
    id: "wipro",
    name: "Wipro Ltd",
    ticker: "WIPRO",
    bseCode: "507685",
    sector: "IT Services",
    industry: "Software",
    marketCap: 241000,
    price: 455.8,
    change: -6.2,
    changePct: -1.34,
    pe: 22.1,
    divYield: 0.44,
    high52w: 574,
    low52w: 398,
    bookValue: 112,
    isNifty50: true,
    logoInitials: "WIP",
    logoColor: "#164E63",
  },
  {
    id: "itc",
    name: "ITC Ltd",
    ticker: "ITC",
    bseCode: "500875",
    sector: "FMCG",
    industry: "Tobacco & FMCG",
    marketCap: 546000,
    price: 437.5,
    change: 3.8,
    changePct: 0.87,
    pe: 29.6,
    divYield: 3.2,
    high52w: 509,
    low52w: 394,
    bookValue: 51.2,
    isNifty50: true,
    logoInitials: "ITC",
    logoColor: "#14532D",
  },
  {
    id: "asianpaints",
    name: "Asian Paints Ltd",
    ticker: "ASIANPAINT",
    bseCode: "500820",
    sector: "Paints",
    industry: "Specialty Chemicals",
    marketCap: 231000,
    price: 2412.0,
    change: -29.4,
    changePct: -1.2,
    pe: 58.3,
    divYield: 1.0,
    high52w: 3394,
    low52w: 2142,
    bookValue: 222,
    isNifty50: true,
    logoInitials: "AP",
    logoColor: "#DC2626",
  },
  {
    id: "maruti",
    name: "Maruti Suzuki India Ltd",
    ticker: "MARUTI",
    bseCode: "532500",
    sector: "Auto",
    industry: "Passenger Vehicles",
    marketCap: 362000,
    price: 11982.0,
    change: 243.6,
    changePct: 2.07,
    pe: 27.4,
    divYield: 0.82,
    high52w: 13680,
    low52w: 10024,
    bookValue: 2830,
    isNifty50: true,
    logoInitials: "MSI",
    logoColor: "#0369A1",
  },
];

export const QUARTERLY_RESULTS: Record<string, QuarterlyResult[]> = {
  reliance: [
    { quarter: "Q3 FY26", revenue: 239000, ebitda: 42800, netProfit: 19878, eps: 29.34, revenueGrowthYoY: 12.3, ebitdaMargin: 17.9, netMargin: 8.3, beatMiss: "beat", analystEstEps: 27.8 },
    { quarter: "Q2 FY26", revenue: 215000, ebitda: 38200, netProfit: 17642, eps: 26.04, revenueGrowthYoY: 9.8, ebitdaMargin: 17.8, netMargin: 8.2, beatMiss: "in-line", analystEstEps: 25.9 },
    { quarter: "Q1 FY26", revenue: 208000, ebitda: 36100, netProfit: 16789, eps: 24.78, revenueGrowthYoY: 8.2, ebitdaMargin: 17.4, netMargin: 8.1, beatMiss: "beat", analystEstEps: 23.5 },
    { quarter: "Q4 FY25", revenue: 194000, ebitda: 34200, netProfit: 15120, eps: 22.32, revenueGrowthYoY: 7.1, ebitdaMargin: 17.6, netMargin: 7.8, beatMiss: "miss", analystEstEps: 23.1 },
  ],
  tcs: [
    { quarter: "Q3 FY26", revenue: 63973, ebitda: 17010, netProfit: 12480, eps: 33.99, revenueGrowthYoY: 5.6, ebitdaMargin: 26.6, netMargin: 19.5, beatMiss: "beat", analystEstEps: 32.5 },
    { quarter: "Q2 FY26", revenue: 62540, ebitda: 16524, netProfit: 11984, eps: 32.64, revenueGrowthYoY: 4.2, ebitdaMargin: 26.4, netMargin: 19.2, beatMiss: "in-line", analystEstEps: 32.7 },
    { quarter: "Q1 FY26", revenue: 61230, ebitda: 16130, netProfit: 11792, eps: 32.11, revenueGrowthYoY: 4.4, ebitdaMargin: 26.3, netMargin: 19.3, beatMiss: "in-line", analystEstEps: 32.0 },
    { quarter: "Q4 FY25", revenue: 60630, ebitda: 15904, netProfit: 11637, eps: 31.68, revenueGrowthYoY: 5.3, ebitdaMargin: 26.2, netMargin: 19.2, beatMiss: "beat", analystEstEps: 31.1 },
  ],
  infosys: [
    { quarter: "Q3 FY26", revenue: 41764, ebitda: 9914, netProfit: 6858, eps: 16.52, revenueGrowthYoY: 8.1, ebitdaMargin: 23.8, netMargin: 16.4, beatMiss: "beat", analystEstEps: 15.9 },
    { quarter: "Q2 FY26", revenue: 40986, ebitda: 9713, netProfit: 6524, eps: 15.72, revenueGrowthYoY: 6.7, ebitdaMargin: 23.7, netMargin: 15.9, beatMiss: "in-line", analystEstEps: 15.8 },
    { quarter: "Q1 FY26", revenue: 39991, ebitda: 9398, netProfit: 6368, eps: 15.34, revenueGrowthYoY: 5.9, ebitdaMargin: 23.5, netMargin: 15.9, beatMiss: "beat", analystEstEps: 14.8 },
    { quarter: "Q4 FY25", revenue: 38688, ebitda: 9014, netProfit: 5991, eps: 14.43, revenueGrowthYoY: 4.8, ebitdaMargin: 23.3, netMargin: 15.5, beatMiss: "miss", analystEstEps: 14.9 },
  ],
  hdfcbank: [
    { quarter: "Q3 FY26", revenue: 86535, ebitda: 28100, netProfit: 16736, eps: 22.14, revenueGrowthYoY: 6.2, ebitdaMargin: 32.5, netMargin: 19.3, beatMiss: "beat", analystEstEps: 21.3 },
    { quarter: "Q2 FY26", revenue: 81541, ebitda: 26200, netProfit: 15920, eps: 21.07, revenueGrowthYoY: 7.3, ebitdaMargin: 32.1, netMargin: 19.5, beatMiss: "in-line", analystEstEps: 21.0 },
    { quarter: "Q1 FY26", revenue: 78200, ebitda: 24800, netProfit: 14920, eps: 19.74, revenueGrowthYoY: 8.9, ebitdaMargin: 31.7, netMargin: 19.1, beatMiss: "beat", analystEstEps: 19.0 },
    { quarter: "Q4 FY25", revenue: 74212, ebitda: 23482, netProfit: 14228, eps: 18.83, revenueGrowthYoY: 9.1, ebitdaMargin: 31.6, netMargin: 19.2, beatMiss: "in-line", analystEstEps: 18.9 },
  ],
};

export const EARNINGS_CARDS: Record<string, EarningsCard> = {
  reliance: {
    quarter: "Q3 FY26",
    signalGrade: "A",
    signalScore: 8,
    revenue: 239000,
    revenueGrowthYoY: 12.3,
    ebitda: 42800,
    ebitdaGrowthYoY: 8.7,
    netProfit: 19878,
    netProfitGrowthYoY: 15.2,
    eps: 29.34,
    epsGrowthYoY: 14.8,
    revenueBeatMiss: "beat",
    ebitdaBeatMiss: "in-line",
    netProfitBeatMiss: "beat",
    epsBeatMiss: "beat",
    aiSummary:
      "Jio Platforms drove 68% of revenue growth this quarter. Retail margins compressed 120bps due to store expansion capex. Management guided for 18% EBITDA growth in Q4, contingent on tariff hike implementation in February.",
    managementSentimentScore: 72,
    managementKeywords: ["strong demand", "capacity expansion", "digital leadership", "tariff hike", "Jio growth"],
    riskFlags: [
      { flag: "Net debt increased 8% QoQ — highest in 6 quarters", severity: "medium" },
      { flag: "Promoter pledge at 2.1% (up from 1.8%)", severity: "low" },
    ],
    forwardGuidance: "Management guided for Q4 EBITDA growth of 18% YoY, subject to telecom tariff revision. O2C segment expected to face margin pressure due to crude price volatility.",
  },
  tcs: {
    quarter: "Q3 FY26",
    signalGrade: "B+",
    signalScore: 7,
    revenue: 63973,
    revenueGrowthYoY: 5.6,
    ebitda: 17010,
    ebitdaGrowthYoY: 6.1,
    netProfit: 12480,
    netProfitGrowthYoY: 4.5,
    eps: 33.99,
    epsGrowthYoY: 4.3,
    revenueBeatMiss: "beat",
    ebitdaBeatMiss: "beat",
    netProfitBeatMiss: "beat",
    epsBeatMiss: "beat",
    aiSummary:
      "BFSI vertical showed early signs of recovery with 3.2% QoQ growth. AI-related deal wins reached ₹18,200 Cr TCV. Attrition improved to 12.3% from 13.1% last quarter. North America demand remains cautious.",
    managementSentimentScore: 65,
    managementKeywords: ["AI opportunities", "deal pipeline", "BFSI recovery", "cost optimization", "talent retention"],
    riskFlags: [
      { flag: "Revenue growth below 6% for 3 consecutive quarters", severity: "medium" },
      { flag: "Discretionary spending slowdown in BFSI", severity: "medium" },
    ],
    forwardGuidance: "Management guided for FY26 revenue growth at 5-6% in constant currency, maintaining EBIT margin in the 26-27% band. Large deal pipeline remains healthy at $14.2B.",
  },
  infosys: {
    quarter: "Q3 FY26",
    signalGrade: "A-",
    signalScore: 8,
    revenue: 41764,
    revenueGrowthYoY: 8.1,
    ebitda: 9914,
    ebitdaGrowthYoY: 9.4,
    netProfit: 6858,
    netProfitGrowthYoY: 11.4,
    eps: 16.52,
    epsGrowthYoY: 5.1,
    revenueBeatMiss: "beat",
    ebitdaBeatMiss: "beat",
    netProfitBeatMiss: "beat",
    epsBeatMiss: "beat",
    aiSummary:
      "Infosys raised FY26 revenue guidance to 4.5-5% in CC, signalling improved demand visibility. GenAI deals crossed $3.2B TCV in 9 months. Europe showed 6.1% YoY growth, reversing three quarters of weakness.",
    managementSentimentScore: 78,
    managementKeywords: ["GenAI momentum", "guidance raise", "Europe recovery", "margin expansion", "large deals"],
    riskFlags: [
      { flag: "Headcount declined 2,100 QoQ amid cautious hiring", severity: "low" },
    ],
    forwardGuidance: "Raised FY26 revenue growth guidance to 4.5-5% from 3.75-4.5% in CC terms. Expects EBIT margins of 20-22% for the full year.",
  },
};

export const MARKET_INDICES = [
  { name: "NIFTY 50", value: 22843.2, change: 187.4, changePct: 0.83 },
  { name: "SENSEX", value: 75124.6, change: 612.8, changePct: 0.82 },
  { name: "BANK NIFTY", value: 48302.1, change: -214.6, changePct: -0.44 },
  { name: "INDIA VIX", value: 14.82, change: -0.34, changePct: -2.24 },
  { name: "USD/INR", value: 83.47, change: 0.12, changePct: 0.14 },
];

export const EARNINGS_CALENDAR_DATA = [
  { date: "2026-04-15", companies: ["Infosys", "Wipro", "Mindtree"] },
  { date: "2026-04-17", companies: ["HDFC Bank", "Kotak Mahindra Bank"] },
  { date: "2026-04-18", companies: ["TCS", "HCL Technologies"] },
  { date: "2026-04-22", companies: ["Reliance Industries", "Bajaj Finance"] },
  { date: "2026-04-24", companies: ["ITC", "Asian Paints", "Maruti Suzuki"] },
  { date: "2026-04-28", companies: ["ICICI Bank", "Axis Bank", "SBI"] },
];

export function formatCurrency(value: number, unit: "Cr" | "L Cr" = "Cr"): string {
  if (unit === "L Cr") return `₹${(value / 100000).toFixed(2)} L Cr`;
  return `₹${value.toLocaleString("en-IN")} Cr`;
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPct(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function getGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "var(--signal-green)";
  if (grade.startsWith("B")) return "var(--signal-amber)";
  return "var(--signal-red)";
}
