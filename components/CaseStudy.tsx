"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

function CaseStudyCard({
  project,
  index
}: {
  project: (typeof caseStudies)[number];
  index: number;
}) {
  return (
    <motion.article
      className="architecture-card magic-card"
      initial={{ opacity: 0, y: 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.006 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <figure className="case-image-panel">
        <div className="case-image-frame">
          <Image
            className="case-study-image"
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 88px), 1124px"
            quality={90}
            priority={index === 0}
          />
        </div>
      </figure>
      <div className="case-copy">
        <div className="case-copy-heading">
          <span className="case-eyebrow">{project.eyebrow}</span>
          <h3 className="break-words">{project.title}</h3>
        </div>
        <div className="case-copy-body">
          <p>{project.description}</p>
          <div className="case-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudy() {
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
          <CaseStudyCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}
