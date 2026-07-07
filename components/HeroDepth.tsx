// @ts-nocheck
"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * HeroDepth — three-plane parallax on hero exit.
 *
 * Planes and rates (scroll progress 0 = hero top at viewport top,
 * 1 = hero bottom at viewport top):
 *   field   — murmuration SVG layer: y 0→+110px, scale 1→1.06
 *             (ground plane: recedes down and grows slightly)
 *   content — kicker/H1/subhead/CTA: y 0→−70px, fades by 0.75
 *             (foreground: exits fastest)
 *   panel   — engagement readout: y 0→−28px
 *             (mid plane: between the two)
 *
 * All three are pure transforms/opacity — compositor-only, no layout.
 * prefers-reduced-motion renders static layers with zero motion values
 * created. Scroll tracking is Framer's shared rAF-batched observer;
 * this component registers no listeners of its own.
 *
 * Usage in Hero.tsx:
 *
 *   <HeroDepth
 *     field={<div className="hero-field" aria-hidden="true" />}
 *     content={<> kicker, H1, subhead, CTA — existing JSX </>}
 *     panel={<EngagementReadout />}
 *   />
 *
 * IMPORTANT integration change: remove the murmuration url(...) layer
 * from the body background — the .hero-field div (styled in
 * scroll-moments.css) now owns that SVG so it can be transformed.
 */

type Props = {
  field: ReactNode;
  content: ReactNode;
  panel: ReactNode;
};

export default function HeroDepth({ field, content, panel }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  if (reduced) {
    return (
      <section ref={ref} className="hero hero--depth" id="home">
        <div className="hero-field-layer">{field}</div>
        <div className="hero__grid">
          <div className="hero__content">{content}</div>
          <div className="hero__panel">{panel}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="hero hero--depth" id="home">
      <motion.div
        className="hero-field-layer"
        style={{ y: fieldY, scale: fieldScale } as CSSProperties}
      >
        {field}
      </motion.div>
      <div className="hero__grid">
        <motion.div
          className="hero__content"
          style={{ y: contentY, opacity: contentOpacity } as CSSProperties}
        >
          {content}
        </motion.div>
        <motion.div className="hero__panel" style={{ y: panelY } as CSSProperties}>
          {panel}
        </motion.div>
      </div>
    </section>
  );
}
