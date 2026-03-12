import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Greg Patini (Gregorio Patini) — engineer, developer, and founder based between Bologna and San Francisco.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <p className="text-center text-foreground/90">
        More about you, coming soon.
      </p>
      <Link
        href="/"
        className="text-sm text-foreground/60 underline underline-offset-2 hover:text-detail"
      >
        Back
      </Link>
    </main>
  );
}
