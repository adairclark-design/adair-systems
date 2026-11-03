"use client";

import { motion } from "framer-motion";
import CaseStudyItem from "@/components/CaseStudyItem";

const caseStudies = [
  {
    eyebrow: "Real-time market systems",
    title: "Polyvision Integration",
    description: "I built market data ingestion, API integration, alert delivery, and the interface for monitoring live market activity.",
    outcome: "Market feeds and alerts are brought into one monitoring workflow.",
    tags: ["Data ingestion", "API architecture", "Real-time interfaces"],
    images: [
      "/project-images/PolyVision 2.png",
      "/project-images/PolyVision 3.png",
      "/project-images/PolyVision 4.png"
    ]
  },
  {
    eyebrow: "Agricultural planning software",
    title: "AcreLogic",
    description: "I built a planning interface that connects agricultural data, search, and business rules in one application.",
    outcome: "Search, planning inputs, and supporting data share one workspace.",
    tags: ["Data architecture", "Planning rules", "Data-rich UX"],
    images: [
      "/project-images/AcreLogic 1.png",
      "/project-images/AcreLogic 2.png",
      "/project-images/AcreLogic 3.png",
    ]
  },
  {
    eyebrow: "Training & nutrition platform",
    title: "TDT Training",
    description: "I built onboarding, workout tracking, and training and nutrition workflows across a connected client platform.",
    outcome: "Client onboarding, training, and nutrition workflows are available in one platform.",
    tags: ["Full-stack development", "Calculation pipelines", "Client workflows"],
    images: [
      "/project-images/TDT 1.png",
      "/project-images/TDT 2.png",
      "/project-images/TDT 3.png",
      "/project-images/TDT 4.png",
      "/project-images/TDT 6.png",
      "/project-images/TDT 7.png"
    ]
  },
  {
    eyebrow: "B2B web platform",
    title: "RappConsulting",
    description: "I designed and implemented the responsive site, content structure, and contact flows for an executive consulting practice.",
    outcome: "Services and contact pathways are presented in a cohesive responsive experience.",
    tags: ["Responsive interfaces", "Content architecture", "B2B web development"],
    images: [
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
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045 } }
      }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          className="reveal-word"
          key={`${word}-${index}`}
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
        >
          [ PORTFOLIO ]
        </motion.span>
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollWords text="Systems in production." />
        </motion.h2>
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.72 }}
          transition={{ duration: 0.76, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected work across market data, agricultural planning, training platforms, and B2B web experiences.
        </motion.p>
      </div>
      <div className="relative z-[1] mx-auto w-[var(--container)]">
        {caseStudies.map((project, index) => (
          <CaseStudyItem
            key={project.title}
            index={String(index + 1).padStart(2, '0')}
            kicker={project.eyebrow}
            title={project.title}
            outcome={project.outcome}
            tags={project.tags}
            images={project.images}
            defaultOpen={index === 0}
          >
            {project.description}
          </CaseStudyItem>
        ))}
      </div>
    </section>
  );
}
