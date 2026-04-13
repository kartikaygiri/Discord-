import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Signal AI, a financial research assistant specializing in Indian equities.
You have access to this company's quarterly filings, annual reports, concall transcripts, and shareholding data.

Rules:
- Be precise with numbers. Cite specific quarters when referencing data.
- Be direct — investors want clarity, not caveats.
- Format currency in Indian notation (Cr, L Cr). Use ₹ symbol.
- Reference Indian fiscal year (April–March). E.g., Q3 FY26 = Oct–Dec 2025.
- If you're unsure about a specific data point, say so rather than guessing.
- Never give buy/sell recommendations. You are an informational tool only.
- Keep responses concise but complete. Use bullet points for lists.
- If asked about debt sustainability, margins, growth — analyse the trend, not just the latest quarter.`;

export async function POST(req: NextRequest) {
  try {
    const { companyId, companyName, messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return a helpful mock response if no API key is set
      return NextResponse.json({
        content: `I'm Signal AI. To enable live AI analysis for ${companyName || "this company"}, please add your ANTHROPIC_API_KEY to the environment variables. For now, I can tell you that this platform supports full earnings analysis, trend identification, and financial Q&A powered by Claude.`,
      });
    }

    // Import Anthropic here to avoid errors if key isn't set
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const systemWithContext = `${SYSTEM_PROMPT}

Current Company Context: ${companyName} (ID: ${companyId})
Today's Date: April 13, 2026 (IST)`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemWithContext,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    return NextResponse.json({ content: content.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { content: "I encountered an error processing your request. Please try again." },
      { status: 200 }
    );
  }
}
