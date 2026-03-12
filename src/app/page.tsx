"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = ["Bologna - Italy", "San Francisco - USA"];
import { usePageHover } from "@/context/PageHoverContext";
import { EssaysSection } from "@/components/EssaysSection";
import { Dashboard } from "@/components/Dashboard";
import { WhoSection } from "@/components/WhoSection";

const borderFillTransition = {
  duration: 0.26,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const WORDS = ["truth", "optimism", "humanity", "curiosity", "clarity"];
const SIZES_DESKTOP = [
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
] as const;
const SIZES_MOBILE = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
] as const;

type WordLayout = {
  word: string;
  size: string;
  left: string;
  top: string;
  rotate: number;
};

/** 5 non-overlapping zones for desktop */
const SAFE_ZONES_DESKTOP: {
  leftMin: number;
  leftMax: number;
  topMin: number;
  topMax: number;
}[] = [
  { leftMin: 5, leftMax: 22, topMin: 8, topMax: 24 },
  { leftMin: 78, leftMax: 92, topMin: 8, topMax: 24 },
  { leftMin: 5, leftMax: 22, topMin: 62, topMax: 88 },
  { leftMin: 78, leftMax: 92, topMin: 62, topMax: 88 },
  { leftMin: 30, leftMax: 45, topMin: 8, topMax: 26 },
];

/** Mobile-friendly zones — avoid center where text/button sit */
const SAFE_ZONES_MOBILE: {
  leftMin: number;
  leftMax: number;
  topMin: number;
  topMax: number;
}[] = [
  { leftMin: 5, leftMax: 35, topMin: 8, topMax: 22 },
  { leftMin: 60, leftMax: 90, topMin: 8, topMax: 22 },
  { leftMin: 5, leftMax: 35, topMin: 72, topMax: 90 },
  { leftMin: 60, leftMax: 90, topMin: 72, topMax: 90 },
  { leftMin: 20, leftMax: 50, topMin: 10, topMax: 20 },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateRandomLayouts(mobile: boolean): WordLayout[] {
  const shuffledWords = shuffle(WORDS);
  const zones = mobile ? SAFE_ZONES_MOBILE : SAFE_ZONES_DESKTOP;
  const sizes = mobile ? SIZES_MOBILE : SIZES_DESKTOP;
  return shuffledWords.map((word, i) => {
    const zone = zones[i % zones.length];
    const leftPct =
      zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin);
    const topPct =
      zone.topMin + Math.random() * (zone.topMax - zone.topMin);
    return {
      word,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      left: `${leftPct}%`,
      top: `${topPct}%`,
      rotate: -14 + Math.random() * 28,
    };
  });
}

type View = "hero" | "dashboard" | "essays" | "who";

export default function Home() {
  const { setHoveringButton, isHoveringButton } = usePageHover();
  const [view, setView] = useState<View>("hero");
  const [wordLayouts, setWordLayouts] = useState<WordLayout[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocationIndex((prev) => (prev + 1) % LOCATIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setWordLayouts(generateRandomLayouts(false));
    setHoveringButton(true);
  }, [setHoveringButton, isMobile]);

  const handleTap = useCallback(() => {
    if (!isMobile) return;
    // On mobile, toggle the word reveal on tap, then navigate
    if (!isHoveringButton) {
      setWordLayouts(generateRandomLayouts(true));
      setHoveringButton(true);
      // Auto-navigate after a brief reveal
      setTimeout(() => {
        setHoveringButton(false);
        setView("dashboard");
      }, 600);
    }
  }, [isMobile, isHoveringButton, setHoveringButton]);

  const goToDashboard = () => {
    setHoveringButton(false);
    setView("dashboard");
  };
  const goToWho = () => setView("who");
  const goToHero = () => setView("hero");

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            {/* Name — top right */}
            <motion.span
              className={`absolute inset-x-0 top-4 z-20 text-center whitespace-nowrap text-base font-normal tracking-wide sm:top-6 sm:text-lg transition-colors duration-300 ${
                isHoveringButton ? "text-[#0a0a0a]" : "text-foreground/80"
              }`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Greg Patini
            </motion.span>

            {/* Location — bottom center */}
            <motion.div
              className={`absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-6 transition-colors duration-300 ${
                isHoveringButton ? "text-[#0a0a0a]" : "text-foreground/80"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className={`flex items-center justify-center gap-1.5 whitespace-nowrap text-center text-sm font-normal uppercase tracking-[0.15em] sm:text-base transition-colors duration-300 ${
                isHoveringButton ? "text-[#0a0a0a]/60" : "text-foreground/60"
              }`}>
                Locations
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-100 duration-1000" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                </span>
              </span>
              <div className="relative mt-0.5 h-6 overflow-hidden sm:h-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={LOCATIONS[locationIndex]}
                    className="block whitespace-nowrap text-center text-sm font-normal leading-6 sm:text-base sm:leading-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {LOCATIONS[locationIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <p
              className={`relative z-10 max-w-sm text-center text-base font-normal tracking-normal transition-colors duration-300 sm:max-w-none sm:text-lg ${
                isHoveringButton ? "text-[#0a0a0a]" : "text-foreground/90"
              }`}
            >
              This is the digital testimony of my existence.
            </p>

            {/* Floating words on hover/tap */}
            <AnimatePresence>
              {isHoveringButton && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {wordLayouts.map(({ word, size, left, top, rotate }) => (
                    <span
                      key={word}
                      className={`absolute font-medium text-[#0a0a0a] ${size}`}
                      style={{
                        left,
                        top,
                        transform: `rotate(${rotate}deg)`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative z-10 mt-10 sm:mt-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* Desktop: animated border on hover */}
              {!isMobile ? (
                <motion.div
                  className="relative inline-block"
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      transition: {
                        staggerChildren: 0,
                        staggerDirection: -1,
                      },
                    },
                    hover: {
                      transition: { staggerChildren: 0.04, delayChildren: 0 },
                    },
                  }}
                >
                  <motion.span
                    className="absolute left-0 top-0 right-0 h-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{ transformOrigin: "left", willChange: "transform" }}
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute top-0 right-0 bottom-0 w-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{ transformOrigin: "top", willChange: "transform" }}
                    variants={{
                      rest: { scaleY: 0 },
                      hover: { scaleY: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{
                      transformOrigin: "right",
                      willChange: "transform",
                    }}
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{
                      transformOrigin: "bottom",
                      willChange: "transform",
                    }}
                    variants={{
                      rest: { scaleY: 0 },
                      hover: { scaleY: 1 },
                    }}
                    transition={borderFillTransition}
                  />

                  <motion.button
                    type="button"
                    onClick={goToDashboard}
                    className={`relative z-10 inline-block cursor-pointer border-0 bg-foreground/5 px-6 py-3 text-sm font-medium no-underline outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-[#ffaa00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isHoveringButton
                        ? "text-[#0a0a0a]"
                        : "text-foreground/90"
                    }`}
                    style={{ willChange: "transform" }}
                    initial={false}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setHoveringButton(false)}
                  >
                    Know more
                  </motion.button>
                </motion.div>
              ) : (
                /* Mobile: simple button with border, tap navigates */
                <motion.button
                  type="button"
                  onClick={handleTap}
                  className={`relative inline-block cursor-pointer border border-[#ffaa00]/40 bg-foreground/5 px-8 py-4 text-base font-medium no-underline outline-none transition-colors active:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-[#ffaa00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isHoveringButton
                      ? "text-[#0a0a0a]"
                      : "text-foreground/90"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  Know more
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ) : view === "dashboard" ? (
          <motion.div
            key="dashboard"
            className="min-h-screen w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <Dashboard onBack={goToHero} onWho={goToWho} />
          </motion.div>
        ) : view === "essays" ? (
          <motion.div
            key="essays"
            className="min-h-screen w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <EssaysSection onBack={goToDashboard} />
          </motion.div>
        ) : (
          <motion.div
            key="who"
            className="min-h-screen w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <WhoSection onBack={goToDashboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
