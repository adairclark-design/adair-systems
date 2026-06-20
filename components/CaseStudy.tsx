"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const caseStudies = [
  {
    eyebrow: "Flagship AI product",
    title: "Tristan's Fitness Platform",
    description:
      "Architected and deployed a comprehensive, full-stack fitness application. Built a custom client portal, an AI-powered nutrition planning engine, and a proprietary workout tracking system to digitize and scale their coaching business.",
    tags: ["AI planning", "Client UX", "Performance systems"],
    image: "/tristan-app.png",
    alt: "Tristan's Fitness Platform training plan and nutrition dashboard interface",
    width: 2930,
    height: 1354
  },
  {
    eyebrow: "Agricultural intelligence",
    title: "AcreLogic",
    description:
      "Engineered a data-driven agricultural intelligence platform. Developed complex mapping interfaces and decision-support algorithms to help farmers visualize land data and automate crop planning.",
    tags: ["Decision support", "Field workflows", "Applied AI"],
    image: "/acrelogic.png",
    alt: "AcreLogic crop selection interface for intelligent gardening and agriculture planning",
    width: 2932,
    height: 1580
  },
  {
    eyebrow: "Corporate design overhaul",
    title: "RappConsulting.org",
    description:
      "Designed and developed a high-conversion corporate website. Overhauled the digital brand identity and rebuilt the web architecture to establish executive-grade trust and drive enterprise consulting leads.",
    tags: ["Brand system", "Web design", "B2B conversion"],
    image: "/rapp-consulting.png",
    alt: "Rapp Consulting premium nonprofit consulting website homepage redesign",
    width: 2934,
    height: 1588
  },
  {
    eyebrow: "Advanced backend capability",
    title: "Polyvision Integration",
    description:
      "Built a highly secure, scalable backend intelligence layer. Designed custom API architectures and integrated advanced machine learning orchestration to power predictive data analytics at scale.",
    tags: ["Backend logic", "Data systems", "Intelligence layer"],
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
      className={`architecture-card magic-card ${index % 2 === 1 ? "architecture-card-reverse" : ""}`}
      initial={{ opacity: 0, y: 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.012 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="case-image-panel">
        <div className="case-image-frame">
          <Image
            className="w-full aspect-[16/9] object-cover object-left-top rounded-lg shadow-lg"
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            unoptimized
            sizes="(max-width: 900px) 100vw, 54vw"
            priority={index === 0}
          />
        </div>
      </div>
      <div className="case-copy">
        <span className="case-eyebrow">{project.eyebrow}</span>
        <h3 className="break-words">{project.title}</h3>
        <p>{project.description}</p>
        <div className="case-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
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
