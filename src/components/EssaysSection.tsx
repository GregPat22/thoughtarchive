"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TITLES = [
  "On silence and attention",
  "Notes on building tools",
  "Reading as a form of waiting",
  "Minimal surfaces",
  "The weight of defaults",
  "Local first, again",
  "Drafts and permanence",
  "Margin and line length",
  "In praise of constraints",
  "The ethics of slowness",
  "What we leave in the margins",
  "Tools and their defaults",
  "Against infinite scroll",
  "Paper as interface",
  "Handwriting and memory",
  "The shape of a year",
  "Rereading",
  "Unfinished thoughts",
  "Quiet interfaces",
  "Distance and clarity",
  "Small systems",
  "On not publishing",
  "Lists and order",
  "The cost of attention",
  "Minimalism as constraint",
  "Waiting as practice",
  "Local coherence",
  "Friction and intention",
  "Single-purpose tools",
  "The weight of choice",
  "Blank space",
  "Repetition and ritual",
  "Slow computation",
  "Analog residues",
  "Limited surfaces",
  "Margin of error",
  "Placeholder",
  "Draft mode",
  "Incomplete",
  "To be written",
  "Untitled",
  "Fragment",
  "Note to self",
  "Later",
  "Maybe",
  "—",
];

const YEARS = [
  "2025",
  "2025",
  "2024",
  "2024",
  "2024",
  "2023",
  "2023",
  "2022",
  "—",
];

const FAKE_ESSAYS = TITLES.map((title, i) => ({
  id: String(i + 1),
  title,
  date: YEARS[i % YEARS.length],
}));

type Essay = (typeof FAKE_ESSAYS)[number];

const SCROLL_ZONE_RATIO = 0.28;
const SCROLL_SPEED_BASE = 12;
const SCROLL_SPEED_MAX = 36;
const LERP = 0.28; // interpolazione velocità: più alto = risposta più rapida

export function EssaysSection({ onBack }: { onBack: () => void }) {
  const [hoveredEssay, setHoveredEssay] = useState<Essay | null>(null);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  type SidebarMode = "expanded" | "collapsed";
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("expanded");
  const displayEssay = selectedEssay ?? hoveredEssay;
  const listRef = useRef<HTMLDivElement>(null);
  const targetSpeedRef = useRef(0);
  const currentSpeedRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    const zone = h * SCROLL_ZONE_RATIO;

    if (y < zone) {
      const t = 1 - y / zone;
      targetSpeedRef.current = -(
        SCROLL_SPEED_BASE +
        t * (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE)
      );
    } else if (y > h - zone) {
      const t = (y - (h - zone)) / zone;
      targetSpeedRef.current =
        SCROLL_SPEED_BASE + t * (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE);
    } else {
      targetSpeedRef.current = 0;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 0;
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarMode((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const tick = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = Math.min(Math.max((now - lastTimeRef.current) / 16.66, 0), 2);
      lastTimeRef.current = now;

      const target = targetSpeedRef.current;
      let current = currentSpeedRef.current;
      current += (target - current) * LERP;
      if (Math.abs(current) < 0.3) current = 0;
      currentSpeedRef.current = current;

      if (current !== 0) {
        el.scrollTop += current * Math.min(dt, 2);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-transparent">
      <motion.div
        ref={listRef}
        className="relative flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-foreground/15 scrollbar-sidebar"
        style={{ maxHeight: "100vh" }}
        initial={false}
        animate={{
          width: sidebarMode === "expanded" ? "22rem" : "0rem",
          minWidth: sidebarMode === "expanded" ? "22rem" : "0rem",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex min-h-0 flex-1 flex-col py-3 pl-2.5 pr-2">
          <button
            type="button"
            onClick={onBack}
            className="mb-3 flex items-center gap-1.5 text-left text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground/90"
          >
            <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
            Back
          </button>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/50">
            Essays
          </p>
          <ul className="flex flex-col gap-2 pb-6">
            {FAKE_ESSAYS.map((essay) => (
              <li key={essay.id} className="min-w-0">
                <a
                  href="#"
                  role="button"
                  className={`block no-underline transition-colors hover:text-foreground ${selectedEssay?.id === essay.id ? "font-medium text-foreground" : "text-foreground/95"}`}
                  onMouseEnter={() => setHoveredEssay(essay)}
                  onMouseLeave={() => setHoveredEssay(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedEssay((prev) =>
                      prev?.id === essay.id ? null : essay
                    );
                  }}
                >
                  <span className="font-normal">{essay.title}</span>
                  {sidebarMode === "expanded" && (
                    <span className="ml-2 text-foreground/45">
                      {essay.date}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      {/* Spacer per il pulsante toggle: fuori dalla sidebar così l’icona non viene tagliata */}
      <div className="relative flex h-screen w-6 shrink-0 items-center">
        <button
          type="button"
          onClick={toggleSidebar}
          className="absolute left-0 top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground/50 transition-colors hover:border-foreground/25 hover:bg-muted/50 hover:text-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={
            sidebarMode === "collapsed" ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {sidebarMode === "collapsed" ? (
            <ChevronRight className="size-4" aria-hidden />
          ) : (
            <ChevronLeft className="size-4" aria-hidden />
          )}
        </button>
      </div>
      <div className="relative min-w-0 flex-1">
        <AnimatePresence mode="wait">
          {displayEssay ? (
            <motion.article
              key={displayEssay.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{
                type: "spring",
                bounce: 0.15,
                stiffness: 400,
                damping: 30,
              }}
              className="absolute inset-0 overflow-y-auto py-8 pl-6 pr-10"
              style={{ willChange: "transform" }}
            >
              <header className="mb-8">
                <h2 className="text-xl font-normal tracking-tight text-foreground/95">
                  {displayEssay.title}
                </h2>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/45">
                  {displayEssay.date}
                </p>
              </header>
              <div className="prose prose-neutral max-w-none text-sm leading-relaxed text-foreground/80">
                <p>
                  Essay content would appear here. This is a placeholder for the
                  full text of &ldquo;{displayEssay.title}&rdquo; — you can
                  replace this with real content or fetch it by essay id when
                  you have a backend or markdown source.
                </p>
                <p className="mt-4">
                  {selectedEssay
                    ? "Click another title to switch, or click the same title again to close."
                    : "Click a title to open it, or hover to preview."}
                </p>
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center py-8"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                Click or hover an essay to read
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
