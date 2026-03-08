import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio personale — design e sviluppo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
