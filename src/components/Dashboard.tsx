"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, BookOpen, Layers, Terminal, AtSign, Heart } from "lucide-react";
import { GeistMono } from "geist/font/mono";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 28,
    },
  },
};

interface DashboardProps {
  onBack: () => void;
  onWho: () => void;
}

export function Dashboard({ onBack, onWho }: DashboardProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground/90"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>Back</span>
        </button>
      </div>

      {/* Cards grid */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <motion.div
          className="grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contacts card — tall vertical, left column */}
          <motion.div
            variants={cardVariants}
            className="order-4 group relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 transition-colors hover:border-[#ffe066]/50 hover:bg-foreground/[0.06] md:order-none md:col-span-3 md:row-span-2 md:p-8"
          >
            <div>
              <AtSign
                className="mb-4 size-5 text-foreground/40 transition-colors group-hover:text-[#ffe066]"
                aria-hidden
              />
              <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                Contacts
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                Find me elsewhere.
              </p>
            </div>

            <div className="mt-6 flex flex-row gap-5">
              <a
                href="https://x.com/gregpatini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground/50 transition-colors hover:text-[#ffe066]"
              >
                <svg className="size-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/inartenino/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground/50 transition-colors hover:text-[#ffe066]"
              >
                <svg className="size-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/greg-patini-b318223b6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-foreground/50 transition-colors hover:text-[#ffe066]"
              >
                <svg className="size-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Essays card — top right area */}
          <motion.div
            variants={cardVariants}
            className="order-2 relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 md:order-none md:col-span-5 md:min-h-[340px] md:p-8"
          >
            <div>
              <BookOpen
                className="mb-4 size-5 text-foreground/40"
                aria-hidden
              />
              <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                Essays
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
                Thoughts on silence, tools, constraints, and everything in
                between.
              </p>
            </div>
            <span className="mt-6 inline-block self-start border border-red-500/30 px-3 py-1 text-xs font-medium uppercase tracking-widest text-red-500/80">
              Coming soon
            </span>
          </motion.div>

          {/* Archive card — top right */}
          <motion.div
            variants={cardVariants}
            className="order-3 relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 md:order-none md:col-span-4 md:min-h-[340px] md:p-8"
          >
            <div>
              <Layers
                className="mb-4 size-5 text-foreground/40"
                aria-hidden
              />
              <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                Archive
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
                Something new is taking shape here.
              </p>
            </div>
            <span className="mt-6 inline-block self-start border border-red-500/30 px-3 py-1 text-xs font-medium uppercase tracking-widest text-red-500/80">
              Coming soon
            </span>
          </motion.div>

          {/* Fan page card — enjoy, pink theme */}
          <motion.div
            variants={cardVariants}
            className="order-5 group relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 transition-colors hover:border-pink-400/40 hover:bg-foreground/[0.06] md:order-none md:col-span-4 md:min-h-[220px] md:p-8"
          >
            <Link
              href="/fan"
              className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-left md:p-8"
              aria-label="Go to fan page — enjoy"
            >
              <div>
                <Heart
                  className="mb-4 size-5 text-foreground/40 transition-colors group-hover:text-pink-400"
                  aria-hidden
                />
                <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                  Fan page
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
                  A little corner to enjoy. Corgis, vibes, and good energy.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/30 transition-colors group-hover:text-pink-400/70">
                Enjoy &rarr;
              </span>
            </Link>
          </motion.div>

          {/* Who I am — bottom right, spanning remaining cols */}
          <motion.button
            type="button"
            onClick={onWho}
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className={`${GeistMono.className} order-1 group relative flex items-center justify-between overflow-hidden border border-foreground/10 bg-[#0a1628]/60 p-6 text-left transition-colors hover:border-[#64b5f6]/30 hover:bg-[#0a1628]/80 md:order-none md:col-span-9 md:p-8`}
          >
            <div className="flex items-center gap-5">
              <Terminal
                className="size-5 shrink-0 text-[#64b5f6]/40 transition-colors group-hover:text-[#64b5f6]"
                aria-hidden
              />
              <div>
                <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                  Who I am
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-foreground/50">
                  A terminal experience. Type <code className="font-mono text-[#64b5f6]/60">/who</code> to find out.
                </p>
              </div>
            </div>
            <span className="hidden text-xs font-medium uppercase tracking-widest text-foreground/30 transition-colors group-hover:text-[#64b5f6]/70 sm:block">
              Enter &rarr;
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
