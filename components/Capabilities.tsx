"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    meta: "[ AGENT ORCHESTRATION ]",
    title: "Multi-Agent Engineering Systems",
    body: "I direct specialized AI agents across product strategy, frontend, backend, data, and QA—turning one business objective into coordinated production work.",
    stat: "Parallel execution",
    className: "md:col-span-2"
  },
  {
    meta: "[ SPECIFICATION DESIGN ]",
    title: "Advanced Prompt Architecture",
    body: "Ambiguous requirements become precise system prompts, constraints, acceptance criteria, and implementation plans that agents can execute reliably.",
    stat: "Context control",
    className: "md:col-span-1"
  },
  {
    meta: "[ TECHNICAL DIRECTION ]",
    title: "Human-Governed AI Delivery",
    body: "I review architecture, resolve agent conflicts, enforce security and quality, and remain accountable for every system decision that ships.",
    stat: "Expert oversight",
    className: "md:col-span-1"
  },
  {
    meta: "[ ACCELERATED DELIVERY ]",
    title: "AI-Accelerated Full-Stack Deployment",
    body: "Build, test, integration, and release workflows run in parallel to compress delivery cycles without trading away maintainability or polish.",
    stat: "Ship velocity",
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
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          One technical director. An orchestrated engineering system.
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
