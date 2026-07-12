"use client";

import { motion } from "framer-motion";
import CaseStudyItem from "@/components/CaseStudyItem";

const caseStudies = [
  {
    eyebrow: "Multi-agent intelligence layer",
    title: "Polyvision Integration",
    description:
      "Directed a real-time intelligence product across market data ingestion, API architecture, alerting, and LLM-assisted interpretation. Agentic execution coordinated the interface and backend workstreams while I controlled system boundaries, integration quality, and release readiness.",
    outcome: "Raw market feeds became interpreted, actionable alerts — removing the manual monitoring layer between data and decision.",
    tags: ["LLM orchestration", "API architecture", "Realtime intelligence"],
    images: [
      "/project-images/PolyVision 1.png",
      "/project-images/PolyVision 2.png",
      "/project-images/PolyVision 3.png",
      "/project-images/PolyVision 4.png"
    ]
  },
  {
    eyebrow: "Orchestrated decision system",
    title: "AcreLogic",
    description:
      "Orchestrated a data-rich agricultural platform combining crop intelligence, planning rules, search, and high-density interaction design. Agent teams handled data modeling, interface systems, and decision logic concurrently, compressing a complex product into one cohesive experience.",
    outcome: "Planning decisions that required cross-referencing multiple data sources now resolve in one query.",
    tags: ["Agent orchestration", "Decision systems", "Data-rich UX"],
    images: [
      "/project-images/AcreLogic 1.png",
      "/project-images/AcreLogic 2.png",
      "/project-images/AcreLogic 3.png",
      "/project-images/AcreLogic 4.png"
    ]
  },
  {
    eyebrow: "Agentic product architecture",
    title: "TDT Training",
    description:
      "Directed a multi-surface product build spanning client onboarding, training workflows, workout tracking, and AI-assisted nutrition planning. Specialized agents advanced frontend, backend, and product logic in parallel while I governed the architecture and integration layer.",
    outcome: "Onboarding, training, and nutrition planning now run in one platform, replacing the spreadsheets and manual check-ins the business ran on.",
    tags: ["Agentic full stack", "AI planning", "Client platform"],
    images: [
      "/project-images/TDT 1.png",
      "/project-images/TDT 2.png",
      "/project-images/TDT 3.png",
      "/project-images/TDT 4.png",
      "/project-images/TDT 5.png",
      "/project-images/TDT 6.png",
      "/project-images/TDT 7.png"
    ]
  },
  {
    eyebrow: "AI-accelerated brand platform",
    title: "RappConsulting",
    description:
      "Directed an AI-accelerated redesign across brand language, content architecture, responsive components, and conversion flows. The orchestration model moved strategy, design, and implementation forward together while preserving a deliberate executive-grade finish.",
    outcome: "Strategy, design, and implementation moved as one workstream, collapsing the usual agency hand-off cycle entirely.",
    tags: ["AI-directed design", "B2B systems", "Rapid deployment"],
    images: [
      "/project-images/RAPP 1.png",
      "/project-images/RAPP 2.png",
      "/project-images/RAPP 3.png",
      "/project-images/RAPP 4.png",
      "/project-images/RAPP 5.png"
    ]
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

export function CaseStudy() {
  return (
    <section className="featured-section" id="featured-architecture" data-reveal>
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
          <ScrollWords text="Systems in production." />
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
      <div>
        {caseStudies.map((project, index) => (
          <CaseStudyItem
            key={project.title}
            index={String(index + 1).padStart(2, '0')}
            kicker={project.eyebrow}
            title={project.title}
            outcome={project.outcome}
            tags={project.tags}
            images={project.images}
          >
            {project.description}
          </CaseStudyItem>
        ))}
      </div>
    </section>
  );
}
