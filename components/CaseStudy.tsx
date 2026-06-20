"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const caseStudies = [
  {
    eyebrow: "Agentic product architecture",
    title: "Tristan's Fitness Platform",
    description:
      "Directed a multi-surface product build spanning client onboarding, training workflows, workout tracking, and AI-assisted nutrition planning. Specialized agents advanced frontend, backend, and product logic in parallel while I governed the architecture and integration layer.",
    tags: ["Agentic full stack", "AI planning", "Client platform"],
    image: "/tristan-app.png",
    alt: "Tristan's Fitness Platform training plan and nutrition dashboard interface",
    width: 3012,
    height: 1610
  },
  {
    eyebrow: "Orchestrated decision system",
    title: "AcreLogic",
    description:
      "Orchestrated a data-rich agricultural platform combining crop intelligence, planning rules, search, and high-density interaction design. Agent teams handled data modeling, interface systems, and decision logic concurrently, compressing a complex product into one cohesive experience.",
    tags: ["Agent orchestration", "Decision systems", "Data-rich UX"],
    image: "/acrelogic.png",
    alt: "AcreLogic crop selection interface for intelligent gardening and agriculture planning",
    width: 2932,
    height: 1580
  },
  {
    eyebrow: "AI-accelerated brand platform",
    title: "RappConsulting",
    description:
      "Directed an AI-accelerated redesign across brand language, content architecture, responsive components, and conversion flows. The orchestration model moved strategy, design, and implementation forward together while preserving a deliberate executive-grade finish.",
    tags: ["AI-directed design", "B2B systems", "Rapid deployment"],
    image: "/rapp-consulting.png",
    alt: "Rapp Consulting premium nonprofit consulting website homepage redesign",
    width: 2934,
    height: 1588
  },
  {
    eyebrow: "Multi-agent intelligence layer",
    title: "Polyvision Integration",
    description:
      "Directed a real-time intelligence product across market data ingestion, API architecture, alerting, and LLM-assisted interpretation. Agentic execution coordinated the interface and backend workstreams while I controlled system boundaries, integration quality, and release readiness.",
    tags: ["LLM orchestration", "API architecture", "Realtime intelligence"],
    image: "/polyvision.png",
    alt: "PolyVision AI edge prediction market intelligence landing page",
    width: 2936,
    height: 1600
  }
];

function ScrollWords({ text }: { text: string }) {
  return (
    <motion.span
      className="word-reveal scroll-word-reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045 } }
      }}
    >
      {text.split(" ").map((word) => (
        <motion.span
          className="reveal-word"
          key={word}
          variants={{
            hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function CaseStudyRow({
  project,
  index,
  isExpanded,
  onToggle
}: {
  project: (typeof caseStudies)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const contentId = `case-study-content-${index}`;

  return (
    <motion.article
      className={`group overflow-hidden rounded-[8px] border backdrop-blur-2xl transition-colors duration-300 ${
        isExpanded
          ? "border-cyan-200/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.085),rgba(100,92,255,0.055)),rgba(8,8,18,0.76)] shadow-[0_28px_90px_rgba(0,0,0,0.34),0_0_52px_rgba(40,215,255,0.07)]"
          : "border-white/[0.08] bg-white/[0.035] hover:border-white/[0.16] hover:bg-white/[0.055]"
      }`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.62, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="m-0">
        <button
          aria-controls={contentId}
          aria-expanded={isExpanded}
          className="grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-0 bg-transparent px-5 py-5 text-left font-[inherit] sm:gap-6 sm:px-7 sm:py-6 lg:px-8"
          type="button"
          onClick={onToggle}
        >
          <span className="mono-tag text-[0.68rem] text-cyan-200/50">{String(index + 1).padStart(2, "0")}</span>

          <span className="min-w-0">
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
              {project.eyebrow}
            </span>
            <span className="block text-xl font-bold leading-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-2xl">
              {project.title}
            </span>
          </span>

          <motion.span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              isExpanded
                ? "border-cyan-200/30 bg-cyan-200/10 text-cyan-100"
                : "border-white/10 bg-white/[0.045] text-slate-400 group-hover:border-white/20 group-hover:text-white"
            }`}
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={contentId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{
              height: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.34, ease: "easeOut" },
              marginTop: { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <motion.div
              className="grid gap-6 border-t border-white/[0.08] p-4 sm:p-6 lg:grid-cols-[1.22fr_0.78fr] lg:gap-8 lg:p-8"
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <figure className="m-0 min-w-0 rounded-[6px] border border-white/10 bg-black/25 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Image
                  className="block h-auto w-full rounded-[2px]"
                  src={project.image}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  sizes="(max-width: 1023px) calc(100vw - 80px), 680px"
                  quality={90}
                />
              </figure>

              <div className="flex min-w-0 flex-col justify-between p-2 lg:py-3">
                <p className="m-0 text-sm leading-6 text-slate-300/75 sm:text-base sm:leading-7">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.045] px-3 text-xs font-semibold text-slate-300/80"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function CaseStudy() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="featured-section" id="featured-architecture">
      <span className="section-crosshair section-crosshair-top" aria-hidden="true">
        +
      </span>
      <div className="featured-heading">
        <motion.span
          className="section-kicker mono-tag"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
        >
          [ PORTFOLIO ]
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollWords text="Premium applications engineered to scale your business." />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          Portfolio work spanning AI applications, agricultural intelligence, executive B2B web design,
          and backend systems built to carry real business logic.
        </motion.p>
      </div>
      <div className="architecture-grid">
        {caseStudies.map((project, index) => (
          <CaseStudyRow
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            key={project.title}
            onToggle={() => setExpandedIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>
    </section>
  );
}
