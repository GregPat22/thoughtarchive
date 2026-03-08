"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMagneticPull } from "motion-plus/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const { x: magneticX, y: magneticY } = useMagneticPull(ctaRef, 0.2);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
    >
      {/* Sfondo gradient sottile */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,var(--primary)/12%,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-primary/5 blur-3xl"
        aria-hidden
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-sm font-medium tracking-wide text-primary"
        >
          Portfolio & Creative Developer
        </motion.p>

        {/* Titolo con gradient text animato */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block text-foreground">Ciao, sono </span>
          <span
            className={cn(
              "mt-2 block bg-linear-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent",
              "bg-size-[200%_auto] animate-[gradient-shift_6s_ease_infinite]"
            )}
          >
            [Il tuo nome]
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-lg text-muted-foreground"
        >
          Design e sviluppo di esperienze digitali minimali e performanti.
          Frontend, motion e UI.
        </motion.p>

        {/* CTA con effetto magnetic (Motion+) e hover scale + glow */}
        <motion.div
          ref={ctaRef}
          variants={itemVariants}
          style={{
            x: magneticX,
            y: magneticY,
            willChange: "transform",
          }}
          className="inline-block"
        >
          <Button
            size="lg"
            className={cn(
              "group relative overflow-hidden",
              "focus-visible:scale-105"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              Vedi progetti
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Orbiting dots decorativi (leggeri) */}
      <div className="pointer-events-none absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? {
                    opacity: 0.4,
                    scale: 1,
                    transition: { delay: 0.8 + i * 0.1 },
                  }
                : {}
            }
            className="h-1.5 w-1.5 bg-primary/60"
          />
        ))}
      </div>
    </section>
  );
}
