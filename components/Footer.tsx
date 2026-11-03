"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@adair.systems");
    } catch { window.location.href = "mailto:hello@adair.systems"; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[var(--bg)] overflow-hidden pb-12 pt-32">
      {/* Background Glow */}
      <div className="absolute inset-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-teal-rgb),0.4)] to-transparent" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-teal-rgb),0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[min(1160px,calc(100vw-40px))]">
        <div className="flex flex-col items-center text-center">
          <motion.span
            className="section-kicker mono-tag mb-8"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            // ENGINEERING ROLES & PROJECTS
          </motion.span>
          
          <motion.h2 
            className="mb-12 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-7xl"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let&apos;s Build <br/>
            <span className="bg-gradient-to-r from-[var(--accent-teal-text)] to-[var(--accent-violet-text)] bg-clip-text text-transparent">Something.</span>
          </motion.h2>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={handleCopyEmail}
              className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-5 transition-all hover:border-[var(--accent-teal-text)]/40 hover:bg-white/10 hover:shadow-[0_0_32px_rgba(var(--accent-teal-rgb),0.15)] active:scale-95"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {copied ? "Email copied" : "Copy email address"}
                </span>
                <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  hello@adair.systems
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[var(--accent-teal-text)]/20 group-hover:text-[var(--accent-teal-text)]">
                {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
              </div>
            </button>
          </motion.div>
        </div>

        <div className="mt-32 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Adair Systems. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/adairclark-design"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
              <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/adair-clark-0380b9239"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-[var(--accent-violet-text)]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
              <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
