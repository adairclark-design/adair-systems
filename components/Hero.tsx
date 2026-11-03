"use client";

import { motion } from "framer-motion";
import HeroDepth from "@/components/HeroDepth";
import EngagementReadout from "@/components/EngagementReadout";

const heroProofPoints = [
  ["Role", "full-stack engineer"],
  ["Method", "design through release"],
  ["Outcome", "production software"]
];

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
      initial={false}
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
      {text.split(" ").map((word, index) => (
        <motion.span
          className="reveal-word"
          key={`${word}-${index}`}
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
  const heroContent = (
    <>
      <motion.p
        className="hero-kicker"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Adair Clark · Full-Stack & Systems Engineer
      </motion.p>
      <h1 className="hero-title" aria-label="I design, build, and ship.">
        <WordReveal text="I design, build," delay={0.16} />{" "}
        <span className="hero-title__unit">
          <WordReveal text="and ship." delay={0.40} />
        </span>
      </h1>
      <p className="hero-subhead" aria-label="I build product interfaces, backend services, and data systems—and connect them into software people can use.">
        <WordReveal text="I build product interfaces, backend services, and data systems—and connect them into software people can use." delay={0.42} />
      </p>
      <motion.div
        className="hero-actions"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="primary-cta btn" href="mailto:hello@adair.systems?subject=Software%20Engineering">
          Discuss a role or project
        </a>
      </motion.div>
      <a className="hero-work-link" href="#featured-architecture">Explore selected work ↗</a>
      <motion.div
        className="hero-proof"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Adair Systems engagement proof points"
      >
        {heroProofPoints.map(([label, value]) => (
          <span className="hero-proof__item" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </span>
        ))}
      </motion.div>
    </>
  );

  return (
    <HeroDepth
      field={<div className="hero-field" aria-hidden="true" />}
      content={heroContent}
      panel={
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
        >
          <EngagementReadout />
        </motion.div>
      }
    />
  );
}
