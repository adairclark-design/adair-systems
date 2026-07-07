// @ts-nocheck
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * OrchestrationDiagram — the methodology, drawn by scrolling.
 *
 * Topology (left to right):
 *   DIRECTION ──┬──▶ INTERFACE ──┬──▶ REVIEW ──▶ SHIP
 *               ├──▶ BACKEND  ───┤
 *               ├──▶ DATA     ───┤
 *               └──▶ QA       ───┘
 *
 * Draw order is the methodology's order: fan-out (specify/orchestrate),
 * parallel spans, convergence (integrate/govern), release. Scroll
 * progress through the section is the only input.
 *
 * The whole draw system is Framer's declarative `pathLength` motion
 * value — no dasharray math anywhere in this file. Node squares fade
 * in as their feeding path completes.
 *
 * Geometry is hand-authored on a 720×420 viewBox: orthogonal runs with
 * 12px quarter-arc corners, square nodes (brand geometry), mono labels.
 */

const TEAL = "#1FB6A6";
const VIOLET = "#7C5CF0";

/* fan-out: director right edge (85,210) to each agent left edge (334,y) */
const OUT_PATHS = [
  "M 85 210 H 200 Q 212 210 212 198 V 72 Q 212 60 224 60 H 334",
  "M 85 210 H 200 Q 212 210 212 198 V 172 Q 212 160 224 160 H 334",
  "M 85 210 H 200 Q 212 210 212 222 V 248 Q 212 260 224 260 H 334",
  "M 85 210 H 200 Q 212 210 212 222 V 348 Q 212 360 224 360 H 334",
];

/* convergence: agent right edge (356,y) to review left edge (492,210) */
const IN_PATHS = [
  "M 356 60 H 458 Q 470 60 470 72 V 198 Q 470 210 482 210 H 492",
  "M 356 160 H 458 Q 470 160 470 172 V 198 Q 470 210 482 210 H 492",
  "M 356 260 H 458 Q 470 260 470 248 V 222 Q 470 210 482 210 H 492",
  "M 356 360 H 458 Q 470 360 470 348 V 222 Q 470 210 482 210 H 492",
];

/* release: review right edge to ship left edge */
const SHIP_PATH = "M 518 210 H 615";

const AGENTS = ["INTERFACE", "BACKEND", "DATA", "QA"];
const AGENT_Y = [60, 160, 260, 360];

/* Each drawn element owns its scroll-range hook — lint-clean (no hooks
   in loops) and each piece of the schematic is independently testable. */

function ScrollPath({
  d, progress, range, reduced,
}: {
  d: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  const pathLength = useTransform(progress, range, [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#flow)"
      strokeWidth="1"
      style={{ pathLength: reduced ? 1 : pathLength }}
    />
  );
}

function ScrollNode({
  x, y, size, progress, range, reduced, ship = false,
}: {
  x: number;
  y: number;
  size: number;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
  ship?: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.rect
      className={"orchestration__node" + (ship ? " orchestration__node--ship" : "")}
      x={x}
      y={y}
      width={size}
      height={size}
      style={{ opacity: reduced ? 1 : opacity }}
    />
  );
}

function ScrollLabel({
  x, y, text, progress, range, reduced,
}: {
  x: number;
  y: number;
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.text
      className="orchestration__label"
      x={x}
      y={y}
      textAnchor="middle"
      style={{ opacity: reduced ? 1 : opacity }}
    >
      {text}
    </motion.text>
  );
}

export default function OrchestrationDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <div ref={ref} className="orchestration" aria-label="Diagram: one director fans work out to four specialized agents, whose output converges through review and ships as one system.">
      <svg viewBox="0 0 720 420" className="orchestration__svg" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={TEAL} />
            <stop offset="1" stopColor={VIOLET} />
          </linearGradient>
        </defs>

        {/* faint complete circuit underneath — the drawn lines trace over it */}
        <g className="orchestration__ghost">
          {[...OUT_PATHS, ...IN_PATHS, SHIP_PATH].map((d) => (
            <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          ))}
        </g>

        {/* drawn paths — stage windows stagger 0.03 per lane */}
        {OUT_PATHS.map((d, i) => (
          <ScrollPath key={d} d={d} progress={scrollYProgress} reduced={!!reduced}
            range={[0.02 + i * 0.03, 0.34 + i * 0.03]} />
        ))}
        {IN_PATHS.map((d, i) => (
          <ScrollPath key={d} d={d} progress={scrollYProgress} reduced={!!reduced}
            range={[0.4 + i * 0.03, 0.68 + i * 0.03]} />
        ))}
        <ScrollPath d={SHIP_PATH} progress={scrollYProgress} reduced={!!reduced}
          range={[0.78, 0.92]} />

        {/* nodes: squares, stroke-only, brand geometry */}
        <rect className="orchestration__node" x="55" y="195" width="30" height="30" />
        {AGENT_Y.map((y, i) => (
          <ScrollNode key={y} x={334} y={y - 11} size={22}
            progress={scrollYProgress} reduced={!!reduced}
            range={[0.3 + i * 0.03, 0.38 + i * 0.03]} />
        ))}
        <ScrollNode x={492} y={197} size={26}
          progress={scrollYProgress} reduced={!!reduced} range={[0.72, 0.8]} />
        <ScrollNode x={615} y={195} size={30} ship
          progress={scrollYProgress} reduced={!!reduced} range={[0.9, 0.98]} />

        {/* mono labels */}
        <text className="orchestration__label" x="70" y="252" textAnchor="middle">DIRECTION</text>
        {AGENT_Y.map((y, i) => (
          <ScrollLabel key={AGENTS[i]} x={345} y={y - 22} text={AGENTS[i]}
            progress={scrollYProgress} reduced={!!reduced}
            range={[0.3 + i * 0.03, 0.38 + i * 0.03]} />
        ))}
        <ScrollLabel x={505} y={252} text="REVIEW"
          progress={scrollYProgress} reduced={!!reduced} range={[0.72, 0.8]} />
        <ScrollLabel x={630} y={252} text="SHIP"
          progress={scrollYProgress} reduced={!!reduced} range={[0.9, 0.98]} />
      </svg>
    </div>
  );
}
