import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F14",
};

export const metadata: Metadata = {
  title: "CLOSYR™ - Deal Intelligence & Escrow Operating System",
  description: "Where deals don't just close — they converge. Modern escrow and deal intelligence platform.",
  keywords: "escrow, real estate, deal intelligence, transaction management, fintech",
  authors: [{ name: "GoKoncentrate" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><circle cx='60' cy='60' r='55' fill='none' stroke='%233B82F6' stroke-width='2'/><path d='M60 15 L85 30 L85 70 Q85 85 60 100 Q35 85 35 70 L35 30 Z' fill='%233B82F6'/><path d='M75 45 Q75 35 60 35 Q45 35 45 50 Q45 65 60 65 Q75 65 75 55' fill='none' stroke='%23D4AF37' stroke-width='4' stroke-linecap='round'/></svg>" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}