"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { ChevronLeft } from "lucide-react";

// ── Formula components ──

function SummationSymbol() {
  return (
    <span className="inline-flex flex-col items-center">
      <span className="text-[14px] leading-none text-[#64b5f6]/70">n</span>
      <span className="-my-[2px] text-[38px] leading-none">&#8721;</span>
      <span className="mt-[7px] text-[14px] leading-none text-[#64b5f6]/70">
        i=1
      </span>
    </span>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex justify-center sm:my-8">
      <div
        className="inline-flex items-center gap-3 font-mono text-xl text-[#e0e0e0] sm:gap-4 sm:text-2xl"
        style={{ textShadow: "0 0 20px rgba(100,181,246,0.15)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Formula1() {
  return (
    <FormulaBlock>
      <SummationSymbol />
      <span>
        A<sub className="text-[0.7em]">i</sub>
      </span>
    </FormulaBlock>
  );
}

function Formula2() {
  return (
    <FormulaBlock>
      <SummationSymbol />
      <span className="text-[#e0e0e0]/40">(</span>
      <span>
        A<sub className="text-[0.7em]">i</sub>
      </span>
      <span className="text-[#64b5f6]/60">&middot;</span>
      <span>
        Im<sub className="text-[0.7em]">i</sub>
      </span>
      <span className="text-[#e0e0e0]/40">)</span>
    </FormulaBlock>
  );
}

function Formula3() {
  return (
    <FormulaBlock>
      <SummationSymbol />
      <span className="text-[#e0e0e0]/40">(</span>
      <span>
        A<sub className="text-[0.7em]">i</sub>
      </span>
      <span className="text-[#64b5f6]/60">&middot;</span>
      <span>
        Im<sub className="text-[0.7em]">i</sub>
      </span>
      <span className="text-[#e0e0e0]/40">)</span>
      <span className="mx-1 text-[#64b5f6]/60">=</span>
      <span
        className="text-[#64b5f6]"
        style={{ textShadow: "0 0 12px rgba(100,181,246,0.3)" }}
      >
        Id
      </span>
    </FormulaBlock>
  );
}

// ── Terminal cursor ──

function TerminalCursor({ visible }: { visible: boolean }) {
  return (
    <span
      className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-[#64b5f6]"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

// ── Content blocks definition ──

type TextBlock = { type: "text"; text: string };
type QuoteContentBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};
type FormulaContentBlock = { type: "formula"; id: number };
type ContentBlock = TextBlock | QuoteContentBlock | FormulaContentBlock;

const CONTENT_BLOCKS: ContentBlock[] = [
  {
    type: "quote",
    text: "It\u2019s not who you are underneath, but what you do that defines you.",
  },
  { type: "text", text: "Defining yourself is hard." },
  {
    type: "text",
    text: "In the kind of hyper-reactive social environment we live in today, other people probably decide who you are far more than you ever get to. No matter how hard you push to draw the contours of your own identity, the crowd tends to override.",
  },
  {
    type: "text",
    text: "Maybe, in the end, we\u2019re just the running sum \u2014 from 1 to n \u2014 of every action we take.",
  },
  { type: "formula", id: 1 },
  {
    type: "text",
    text: "And that sum gets multiplied by the actual benefit (or impact) that each action produces.",
  },
  { type: "formula", id: 2 },
  {
    type: "text",
    text: "The result of the equation?\nThat\u2019s your identity.",
  },
  { type: "formula", id: 3 },
  {
    type: "quote",
    text: "Exact equivalence or complete coincidence: the identity of two signatures, of two concepts; identity of points of view.",
    attribution: "dictionary",
  },
];

// ── Typewriter bio component ──

function BioContent({ onComplete }: { onComplete: () => void }) {
  const [blockIdx, setBlockIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [formulasRevealed, setFormulasRevealed] = useState<Set<number>>(
    new Set(),
  );
  const [cursorVisible, setCursorVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (blockIdx >= CONTENT_BLOCKS.length) {
      onCompleteRef.current();
      return;
    }

    const block = CONTENT_BLOCKS[blockIdx];

    if (block.type === "formula") {
      // Reveal formula, pause, advance
      setFormulasRevealed((prev) => new Set(prev).add(block.id));
      const id = setTimeout(() => {
        setBlockIdx((b) => b + 1);
        setCharIdx(0);
      }, 900);
      return () => clearTimeout(id);
    }

    // Text or quote block — typewrite
    const text = block.text;
    if (charIdx >= text.length) {
      // Block done, pause then advance
      const pause = block.type === "quote" ? 500 : 250;
      const id = setTimeout(() => {
        setBlockIdx((b) => b + 1);
        setCharIdx(0);
      }, pause);
      return () => clearTimeout(id);
    }

    const ch = text[charIdx];
    const speed =
      ch === "\n"
        ? 120
        : ch === "."
          ? 90
          : ch === ","
            ? 50
            : 18 + Math.random() * 16;

    const id = setTimeout(() => {
      const jump =
        ch === "\n"
          ? 1
          : Math.min(
              1 + Math.floor(Math.random() * 2),
              text.length - charIdx,
            );
      setCharIdx(charIdx + jump);
    }, speed);

    return () => clearTimeout(id);
  }, [blockIdx, charIdx]);

  const allDone = blockIdx >= CONTENT_BLOCKS.length;

  return (
    <div className="flex flex-col">
      {CONTENT_BLOCKS.map((block, i) => {
        if (i > blockIdx) return null;

        const isCurrent = i === blockIdx;

        // ── Formula ──
        if (block.type === "formula") {
          const visible = formulasRevealed.has(block.id);
          return (
            <AnimatePresence key={`formula-${block.id}`}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut" as const,
                  }}
                >
                  {block.id === 1 && <Formula1 />}
                  {block.id === 2 && <Formula2 />}
                  {block.id === 3 && <Formula3 />}
                </motion.div>
              )}
            </AnimatePresence>
          );
        }

        // ── Quote ──
        if (block.type === "quote") {
          const displayText = isCurrent
            ? block.text.slice(0, charIdx)
            : block.text;
          if (!displayText && isCurrent) {
            return (
              <div key={i} className="relative my-6 sm:my-8">
                <div className="border-l-2 border-[#64b5f6]/25 pl-5 sm:pl-6">
                  <p className="font-serif text-base italic leading-relaxed text-[#64b5f6]/60 sm:text-lg">
                    &ldquo;
                    <TerminalCursor visible={cursorVisible} />
                  </p>
                </div>
              </div>
            );
          }
          const finished = !isCurrent || charIdx >= block.text.length;
          return (
            <div key={i} className="relative my-6 sm:my-8">
              <div className="border-l-2 border-[#64b5f6]/25 pl-5 sm:pl-6">
                <p className="font-serif text-base italic leading-relaxed text-[#64b5f6]/60 sm:text-lg">
                  &ldquo;{displayText}
                  {finished && <>&rdquo;</>}
                  {isCurrent && !allDone && (
                    <TerminalCursor visible={cursorVisible} />
                  )}
                </p>
                {finished && block.attribution && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 text-xs tracking-widest text-[#64b5f6]/30"
                  >
                    — {block.attribution}
                  </motion.p>
                )}
              </div>
            </div>
          );
        }

        // ── Text ──
        const displayText = isCurrent
          ? block.text.slice(0, charIdx)
          : block.text;
        if (!displayText && isCurrent) {
          return (
            <div
              key={i}
              className="mb-3 text-sm leading-[1.9] text-[#c8d6e5]/85 sm:text-base sm:leading-[2]"
            >
              <TerminalCursor visible={cursorVisible} />
            </div>
          );
        }
        const lines = displayText.split("\n");
        return (
          <div
            key={i}
            className="mb-3 text-sm leading-[1.9] text-[#c8d6e5]/85 sm:text-base sm:leading-[2]"
          >
            {lines.map((line, li) => (
              <p key={li} className={line === "" ? "h-4" : ""}>
                {line}
                {isCurrent && li === lines.length - 1 && !allDone && (
                  <TerminalCursor visible={cursorVisible} />
                )}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ── Greg typewriter ──

const GREG_TEXT = `Greg Patini. 23. Born in Italy, still here.

I study economics and management, but most of what I know I taught myself — design, code, systems thinking. I like building things from zero.

I read a lot. I think a lot. Sometimes I write about it. Most of the time I just keep building.

I care about craft. About the invisible decisions that make something feel right. About not shipping things I wouldn't use myself.

I don't have a grand thesis about who I am. I just keep showing up, and the sum keeps running.`;

function GregTypewriter() {
  const [charIdx, setCharIdx] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (charIdx >= GREG_TEXT.length) return;

    const ch = GREG_TEXT[charIdx];
    const speed =
      ch === "\n"
        ? 120
        : ch === "."
          ? 90
          : ch === ","
            ? 50
            : 18 + Math.random() * 16;

    const id = setTimeout(() => {
      const jump =
        ch === "\n"
          ? 1
          : Math.min(
              1 + Math.floor(Math.random() * 2),
              GREG_TEXT.length - charIdx,
            );
      setCharIdx(charIdx + jump);
    }, speed);

    return () => clearTimeout(id);
  }, [charIdx]);

  const displayed = GREG_TEXT.slice(0, charIdx);
  const lines = displayed.split("\n");
  const done = charIdx >= GREG_TEXT.length;

  return (
    <div className="text-sm leading-[1.9] text-[#c8d6e5]/85 sm:text-base sm:leading-[2]">
      {lines.map((line, i) => (
        <p key={i} className={line === "" ? "h-4" : "mb-3"}>
          {line}
          {i === lines.length - 1 && !done && (
            <TerminalCursor visible={cursorOn} />
          )}
        </p>
      ))}
    </div>
  );
}

// ── ASCII rocket art ──

const ASCII_ROCKET = [
  "      /\\      ",
  "     /  \\     ",
  "    / WHO\\    ",
  "   |      |   ",
  "   |      |   ",
  "   | .__. |   ",
  "   |  ||  |   ",
  "  /|  ||  |\\  ",
  " / |______| \\ ",
  "|   ______   |",
  " \\_/      \\_/ ",
];

const ASCII_FLAME_FRAMES = [
  [
    "    \\  ||  /  ",
    "     \\ || /   ",
    "      )  (    ",
    "      \\  /    ",
    "       \\/     ",
  ],
  [
    "    ) \\||/ (  ",
    "     \\)  (/   ",
    "      \\  /    ",
    "       ||     ",
    "       \\/     ",
    "       .      ",
  ],
  [
    "   )\\ \\||/ /( ",
    "    \\ \\)(/ /  ",
    "     ) || (   ",
    "      \\  /    ",
    "       \\/     ",
    "       :      ",
    "       .      ",
  ],
];

// Particle burst on launch
function LaunchParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.3;
    const dist = 30 + Math.random() * 100;
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.6 + Math.random() * 30,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 0.15,
    };
  });

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-[#64b5f6]"
          style={{ width: p.size, height: p.size }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

// ── Main component ──

export function WhoSection({
  onBack,
  onGreg,
}: {
  onBack: () => void;
  onGreg?: () => void;
}) {
  const [phase, setPhase] = useState<"terminal" | "rocket" | "bio">(
    "terminal",
  );
  const [inputValue, setInputValue] = useState("");
  const [gregInputValue, setGregInputValue] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showRocket, setShowRocket] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [bioComplete, setBioComplete] = useState(false);
  const [gregStarted, setGregStarted] = useState(false);
  const [flameFrame, setFlameFrame] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const gregInputRef = useRef<HTMLInputElement>(null);
  const rocketLaunchedRef = useRef(false);

  // Blinking cursor (for inputs only)
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-focus terminal input
  useEffect(() => {
    if (phase === "terminal") inputRef.current?.focus();
  }, [phase]);

  // Flame animation
  useEffect(() => {
    if (!showRocket) return;
    const id = setInterval(() => {
      setFlameFrame((f) => (f + 1) % ASCII_FLAME_FRAMES.length);
    }, 100);
    return () => clearInterval(id);
  }, [showRocket]);

  // Rocket lifecycle — runs exactly once
  useEffect(() => {
    if (phase !== "rocket" || rocketLaunchedRef.current) return;
    rocketLaunchedRef.current = true;
    setShowRocket(true);

    // Show bio while rocket is still flying
    const bioTimer = setTimeout(() => setShowBio(true), 2000);
    // Dismiss rocket after it's off-screen
    const rocketTimer = setTimeout(() => setShowRocket(false), 3500);

    return () => {
      clearTimeout(bioTimer);
      clearTimeout(rocketTimer);
    };
  }, [phase]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim().toLowerCase() === "/who") {
      setPhase("rocket");
    }
  }, [inputValue]);

  const handleGregSubmit = useCallback(() => {
    if (gregInputValue.trim().toLowerCase() === "/greg") {
      setGregStarted(true);
      onGreg?.();
    }
  }, [gregInputValue, onGreg]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = () => {
    if (phase === "terminal") inputRef.current?.focus();
    if (showBio) gregInputRef.current?.focus();
  };

  return (
    <div
      className={`${GeistMono.className} relative flex min-h-screen w-full flex-col overflow-hidden`}
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)",
      }}
      onClick={handleContainerClick}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,181,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,181,246,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scanline effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(100,181,246,0.1) 2px, rgba(100,181,246,0.1) 4px)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-20 flex items-center border-b border-[#64b5f6]/10 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#64b5f6]/50 transition-colors hover:text-[#64b5f6]/90"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>Back</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#64b5f6]/40" />
          <span className="text-[10px] uppercase tracking-widest text-[#64b5f6]/30">
            terminal v1.0
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-4 sm:px-6">
        {/* ── Terminal input ── */}
        <AnimatePresence>
          {phase === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex w-full max-w-2xl flex-col items-center gap-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs tracking-wider text-[#64b5f6]/30"
              >
                type a command to begin
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex w-full items-center gap-2 border border-[#64b5f6]/15 bg-[#0a1628]/80 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
              >
                <span className="select-none text-sm text-[#64b5f6]/50 sm:text-base">
                  $
                </span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm text-[#e0e0e0] caret-transparent outline-none placeholder:text-[#64b5f6]/20 sm:text-base"
                    placeholder="/who"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span
                    className="pointer-events-none absolute top-0 text-sm text-[#64b5f6] sm:text-base"
                    style={{
                      left: `${inputValue.length}ch`,
                      opacity: cursorVisible ? 1 : 0,
                    }}
                  >
                    ▌
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-[10px] tracking-widest text-[#64b5f6]/20"
              >
                hint: /who
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ASCII Rocket (single launch) ── */}
        <AnimatePresence>
          {showRocket && (
            <motion.div
              key="rocket"
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ y: 0 }}
                animate={{ y: "-130vh" }}
                transition={{
                  duration: 10,
                  ease: [0.15, 0, 0.1, 1],
                }}
              >
                <pre
                  className="select-none text-center text-xs leading-[1.15] text-[#64b5f6] sm:text-sm sm:leading-[1.2]"
                  style={{ textShadow: "0 0 12px rgba(100,181,246,0.4)" }}
                >
                  {ASCII_ROCKET.join("\n")}
                </pre>
                <pre
                  className="select-none text-center text-xs leading-[1.15] text-[#ffaa00] sm:text-sm sm:leading-[1.2]"
                  style={{ textShadow: "0 0 16px rgba(255,170,0,0.5)" }}
                >
                  {ASCII_FLAME_FRAMES[flameFrame].join("\n")}
                </pre>
              </motion.div>

              <div className="pointer-events-none absolute inset-0">
                <LaunchParticles />
              </div>

              <motion.div
                className="pointer-events-none fixed inset-0 z-50"
                animate={{
                  x: [0, -2, 3, -1, 2, -1, 0],
                  y: [0, 1, -3, 2, -1, 1, 0],
                }}
                transition={{ duration: 0.5, delay: 0.05 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bio content (typewriter) ── */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              key="bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex w-full max-w-2xl flex-col gap-6 overflow-y-auto py-12 sm:py-16"
            >
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-[#64b5f6]/15" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#64b5f6]/40">
                  who am i
                </span>
                <div className="h-px flex-1 bg-[#64b5f6]/15" />
              </motion.div>

              <BioContent onComplete={() => setBioComplete(true)} />

              {/* ── Second terminal prompt ── */}
              <AnimatePresence>
                {bioComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-8 flex flex-col gap-4"
                  >
                    <p className="text-xs tracking-wider text-[#64b5f6]/30">
                      still don&apos;t get who am I? try to type{" "}
                      <span className="text-[#64b5f6]/50">/greg</span>
                    </p>

                    <div className="flex w-full items-center gap-2 border border-[#64b5f6]/15 bg-[#0a1628]/80 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
                      <span className="select-none text-sm text-[#64b5f6]/50 sm:text-base">
                        $
                      </span>
                      <div className="relative flex-1">
                        {gregStarted ? (
                          <span className="text-sm text-[#e0e0e0] sm:text-base">
                            /greg
                          </span>
                        ) : (
                          <>
                            <input
                              ref={gregInputRef}
                              type="text"
                              value={gregInputValue}
                              onChange={(e) =>
                                setGregInputValue(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleGregSubmit();
                                }
                              }}
                              className="w-full bg-transparent text-sm text-[#e0e0e0] caret-transparent outline-none placeholder:text-[#64b5f6]/20 sm:text-base"
                              placeholder="/greg"
                              autoComplete="off"
                              spellCheck={false}
                            />
                            <span
                              className="pointer-events-none absolute top-0 text-sm text-[#64b5f6] sm:text-base"
                              style={{
                                left: `${gregInputValue.length}ch`,
                                opacity: cursorVisible ? 1 : 0,
                              }}
                            >
                              ▌
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ── Greg typewriter output ── */}
                    {gregStarted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-6"
                      >
                        <GregTypewriter />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-20 flex items-center justify-between border-t border-[#64b5f6]/10 px-4 py-2 sm:px-6">
        <span className="text-[10px] text-[#64b5f6]/20">session::active</span>
        <span className="text-[10px] text-[#64b5f6]/20">
          {phase === "terminal"
            ? "awaiting input"
            : showBio
              ? bioComplete
                ? "done"
                : "streaming"
              : "launching..."}
        </span>
      </div>
    </div>
  );
}
