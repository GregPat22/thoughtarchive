"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="border-t border-border/40 bg-background/50 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Built with Next.js & Motion
        </p>
        <div className="flex items-center gap-6">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-detail"
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
