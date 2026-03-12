import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know More",
  description:
    "Discover more about Greg Patini — essays, projects, and insights from an engineer and founder.",
  alternates: { canonical: "/know-more" },
};

export default function KnowMore() {
  return <main className="min-h-screen bg-background" />;
}
