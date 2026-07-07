// @ts-nocheck
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * OperatingModel — the thesis, resolved by scrolling.
 *
 * The site's two strongest sentences become its one pinned moment:
 * a 170vh section with the statement sticky at center. Words resolve
 * from ghosted to full presence as scroll passes through — the accent
 * phrases ("parallel execution", "technical judgment") land last in
 * their brand tints. Reads like a readout coming into focus.
 *
 * Cost: ten useTransform opacity maps on ten spans. No per-frame JS,
 * no layout writes — opacity only. Reduced-motion renders the
 * statement fully resolved with no sticky pin.
 */

type Word = { text: string; accent?: "teal" | "violet" };

const LINE_1: Word[] = [
  { text: "AI" },
  { text: "provides" },
  { text: "parallel", accent: "teal" },
  { text: "execution.", accent: "teal" },
];

const LINE_2: Word[] = [
  { text: "I" },
  { text: "provide" },
  { text: "technical", accent: "violet" },
  { text: "judgment.", accent: "violet" },
];

function ResolvedWord({
  word,
  progress,
  start,
}: {
  word: Word;
  progress: MotionValue<number>;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.1], [0.16, 1]);
  const cls =
    "opmodel__word" + (word.accent ? ` opmodel__word--${word.accent}` : "");
  return (
    <motion.span className={cls} style={{ opacity }}>
      {word.text}{" "}
    </motion.span>
  );
}

export default function OperatingModel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* window: section entering lower viewport (top at 65% vh) → pin
     release (section bottom meets viewport bottom). With the 140vh
     runway that's ~105vh of scroll; words complete at 0.79, leaving
     the last ~21vh as a held beat of resolved text before release. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end end"],
  });

  if (reduced) {
    return (
      <div className="opmodel opmodel--static">
        <div className="opmodel__pin">
          <span className="opmodel__kicker">[ OPERATING MODEL ]</span>
          <p className="opmodel__statement">
            AI provides{" "}
            <span className="opmodel__word--teal">parallel execution.</span>
          </p>
          <p className="opmodel__statement">
            I provide{" "}
            <span className="opmodel__word--violet">technical judgment.</span>
          </p>
        </div>
      </div>
    );
  }

  /* line 1 resolves during the approach (0.05–0.42), line 2 while
     pinned and centered (0.42–0.79) — each word's window is +0.1 */
  const starts1 = [0.05, 0.14, 0.23, 0.32];
  const starts2 = [0.42, 0.51, 0.6, 0.69];

  return (
    <div ref={ref} className="opmodel">
      <div className="opmodel__pin">
        <span className="opmodel__kicker">[ OPERATING MODEL ]</span>
        <p className="opmodel__statement">
          {LINE_1.map((w, i) => (
            <ResolvedWord key={w.text} word={w} progress={scrollYProgress} start={starts1[i]} />
          ))}
        </p>
        <p className="opmodel__statement">
          {LINE_2.map((w, i) => (
            <ResolvedWord key={w.text} word={w} progress={scrollYProgress} start={starts2[i]} />
          ))}
        </p>
      </div>
    </div>
  );
}
