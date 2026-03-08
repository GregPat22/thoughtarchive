"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageHover } from "@/context/PageHoverContext";
import { EssaysSection } from "@/components/EssaysSection";

const borderFillTransition = {
  duration: 0.26,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const WORDS = ["truth", "optimism", "humanity", "curiosity", "clarity"];
const SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"] as const;

type WordLayout = {
  word: string;
  size: (typeof SIZES)[number];
  left: string;
  top: string;
  rotate: number;
};

/** 5 zone non sovrapposte: una parola per zona, mai sul paragrafo né sul button */
const SAFE_ZONES: { leftMin: number; leftMax: number; topMin: number; topMax: number }[] = [
  { leftMin: 5, leftMax: 22, topMin: 8, topMax: 24 },   // alto-sinistra
  { leftMin: 78, leftMax: 92, topMin: 8, topMax: 24 },   // alto-destra
  { leftMin: 5, leftMax: 22, topMin: 62, topMax: 88 },    // basso-sinistra
  { leftMin: 78, leftMax: 92, topMin: 62, topMax: 88 }, // basso-destra
  { leftMin: 30, leftMax: 45, topMin: 8, topMax: 26 },   // centro-alto (sopra il testo)
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateRandomLayouts(): WordLayout[] {
  const shuffledWords = shuffle(WORDS);
  return shuffledWords.map((word, i) => {
    const zone = SAFE_ZONES[i % SAFE_ZONES.length];
    const leftPct = zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin);
    const topPct = zone.topMin + Math.random() * (zone.topMax - zone.topMin);
    return {
      word,
      size: SIZES[Math.floor(Math.random() * SIZES.length)],
      left: `${leftPct}%`,
      top: `${topPct}%`,
      rotate: -14 + Math.random() * 28,
    };
  });
}

type View = "hero" | "essays";

export default function Home() {
  const { setHoveringButton, isHoveringButton } = usePageHover();
  const [view, setView] = useState<View>("hero");
  const [wordLayouts, setWordLayouts] = useState<WordLayout[]>([]);

  const handleMouseEnter = useCallback(() => {
    setWordLayouts(generateRandomLayouts());
    setHoveringButton(true);
  }, [setHoveringButton]);

  const goToEssays = () => {
    setHoveringButton(false); // pagina torna nera prima della transizione
    setView("essays");
  };
  const goToHero = () => setView("hero");

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-6"
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
            <p
              className={`relative z-10 text-center text-lg font-normal tracking-normal transition-colors duration-300 ${
                isHoveringButton ? "text-[#0a0a0a]" : "text-foreground/90"
              }`}
            >
              This is the digital testimony of my existence.
            </p>

            {/* Parole in evidenza sullo sfondo bianco al hover */}
            <AnimatePresence>
              {isHoveringButton && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                    },
                  }}
                >
                  {wordLayouts.map(({ word, size, left, top, rotate }) => (
                    <motion.span
                      key={word}
                      className={`absolute font-medium text-[#0a0a0a] ${size}`}
                      style={{
                        left,
                        top,
                        rotate,
                        willChange: "transform, opacity",
                      }}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative z-10 mt-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.div
                className="relative inline-block"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: {
                    transition: { staggerChildren: 0, staggerDirection: -1 },
                  },
                  hover: {
                    transition: { staggerChildren: 0.04, delayChildren: 0 },
                  },
                }}
              >
                <motion.span
                  className="absolute left-0 top-0 right-0 h-[2px] bg-[#ffaa00] pointer-events-none"
                  style={{
                    transformOrigin: "left",
                    willChange: "transform",
                  }}
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={borderFillTransition}
                />
                <motion.span
                  className="absolute top-0 right-0 bottom-0 w-[2px] bg-[#ffaa00] pointer-events-none"
                  style={{
                    transformOrigin: "top",
                    willChange: "transform",
                  }}
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
                  onClick={goToEssays}
                  className={`relative z-10 inline-block cursor-pointer border-0 bg-foreground/5 px-6 py-3 text-sm font-medium no-underline outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-[#ffaa00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isHoveringButton
                      ? "text-[#0a0a0a]"
                      : "text-foreground/90"
                  }`}
                  style={{ willChange: "transform" }}
                  initial={false}
                  animate={{
                    scale: [1, 1.02, 1],
                    transition: {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
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
            </motion.div>
          </motion.div>
        ) : (
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
            <EssaysSection onBack={goToHero} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
