"use client";

import { motion } from "framer-motion";
import { BackgroundField } from "@/components/BackgroundField";

const buildSignals = ["AI programming", "Interface craft", "Business architecture"];

function WordReveal({
  text,
  className,
  delay = 0
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`word-reveal ${className ?? ""}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08
          }
        }
      }}
    >
      {text.split(" ").map((word) => (
        <motion.span
          className="reveal-word"
          key={word}
          variants={{
            hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section className="hero-section" id="top">
      <BackgroundField />
      <div className="hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Boutique systems studio for ambitious companies
          </motion.p>
          <h1 className="hero-title" aria-label="Intelligent Architecture.">
            <WordReveal text="Intelligent Architecture." delay={0.16} />
          </h1>
          <p className="hero-subhead" aria-label="World-Class Design. Founder-grade surfaces and intelligent systems engineered by Adair Clark.">
            <WordReveal text="World-Class Design. Founder-grade surfaces and intelligent systems engineered by Adair Clark." delay={0.42} />
          </p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="primary-cta" href="#featured-architecture">
              Explore Our Work
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero-hologram magic-card"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hologram-orbit" />
          <div className="hologram-orbit hologram-orbit-two" />
          <div className="hologram-panel">
            <span className="hologram-label">[ STATUS: ACTIVE ]</span>
            <strong>Intelligence with a beautiful surface.</strong>
          </div>
          <div className="hologram-stack">
            {buildSignals.map((signal, index) => (
              <motion.span
                key={signal}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.74 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {signal}
              </motion.span>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
