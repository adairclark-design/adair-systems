"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    meta: "[ FRONTEND DESIGN ]",
    title: "Premium Web & App Design",
    body: "Beautiful, high-performance websites and user interfaces built for speed, accessibility, and conversion.",
    stat: "Pixel systems",
    className: "md:col-span-2"
  },
  {
    meta: "[ FULL-STACK APPS ]",
    title: "Custom Software Applications",
    body: "Secure, scalable web applications connecting complex data and teams into a single polished workflow.",
    stat: "Full stack",
    className: "md:col-span-1"
  },
  {
    meta: "[ BACKEND & AI ]",
    title: "AI & Backend Architecture",
    body: "Robust backend systems, secure data pipelines, and custom AI/LLM automation to scale your business operations.",
    stat: "Ops logic",
    className: "md:col-span-1"
  },
  {
    meta: "[ CORPORATE SITES ]",
    title: "Corporate Web Presence",
    body: "Premium, SEO-optimized corporate sites. We build the technical trust layer needed to convert high-value clients.",
    stat: "Trust layer",
    className: "md:col-span-2"
  }
];

export function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities">
      <span className="section-crosshair section-crosshair-top" aria-hidden="true">
        +
      </span>
      <div className="capabilities-heading">
        <motion.span
          className="section-kicker mono-tag"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
        >
          // SYS.CAPABILITIES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Strategy, systems, and surfaces in one build partner.
        </motion.h2>
      </div>
      <div className="bento-grid grid-cols-1 md:grid-cols-3">
        {capabilities.map((capability, index) => (
          <motion.article
            className={`bento-card magic-card ${capability.className}`}
            key={capability.title}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.012 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.72, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono-tag bento-meta">{capability.meta}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <span className="bento-stat">{capability.stat}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
