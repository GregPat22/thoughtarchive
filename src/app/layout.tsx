import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://gregpatini.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Greg Patini — Engineer, Developer & Founder",
    template: "%s | Greg Patini",
  },
  description:
    "Personal site of Greg Patini (Gregorio Patini) — engineer, developer, and founder based between Bologna and San Francisco. Essays, thoughts, and projects.",
  keywords: [
    "Greg Patini",
    "Gregorio Patini",
    "engineer",
    "developer",
    "founder",
    "software engineer",
    "portfolio",
    "essays",
    "Bologna",
    "San Francisco",
  ],
  authors: [{ name: "Greg Patini", url: siteUrl }],
  creator: "Greg Patini",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "it_IT",
    url: siteUrl,
    siteName: "Greg Patini",
    title: "Greg Patini — Engineer, Developer & Founder",
    description:
      "Personal site of Greg Patini (Gregorio Patini) — engineer, developer, and founder. Essays, thoughts, and projects.",
  },
  twitter: {
    card: "summary",
    site: "@gregpatini",
    creator: "@gregpatini",
    title: "Greg Patini — Engineer, Developer & Founder",
    description:
      "Personal site of Greg Patini — engineer, developer, and founder. Essays, thoughts, and projects.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Greg Patini",
              alternateName: "Gregorio Patini",
              url: siteUrl,
              jobTitle: "Engineer & Founder",
              knowsAbout: [
                "Software Engineering",
                "Web Development",
                "Startups",
              ],
              sameAs: [
                "https://x.com/gregpatini",
                "https://www.linkedin.com/in/gregpatini",
                "https://www.instagram.com/inartenino/",
              ],
            }),
          }}
        />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
