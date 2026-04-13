import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGNAL — AI-Powered Indian Equity Intelligence",
  description:
    "AI-native financial intelligence for Indian stock markets. Earnings decoded. Every quarter.",
  openGraph: {
    title: "SIGNAL — Indian Markets. Finally Decoded.",
    description:
      "AI-powered earnings analysis for India's top companies. Quarterly results decoded in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=instrument-serif@400&f[]=satoshi@400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
