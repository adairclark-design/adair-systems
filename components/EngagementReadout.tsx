// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * EngagementReadout v2 — boots like an instrument.
 *
 * Sequence on first view (~1.1s total):
 *   1. [ ENGAGEMENT MODEL ] resolves through a character scramble
 *   2. rows come online in order: hairline draws, label decodes,
 *      value fades up 4px (CSS handles rules/values via --boot-i)
 *   3. the ACCEPTING PROJECTS status lights last
 *
 * Server render and no-JS output the finished panel (SEO-safe,
 * nothing hidden without JS). prefers-reduced-motion skips the
 * boot entirely. Runs once per page view.
 */

const ROWS = [
  ["Direction", "Adair Clark — one accountable technical architect"],
  ["Execution", "Specialized AI agents, running parallel workstreams"],
  ["Review", "Human judgment at every integration boundary"],
  ["Delivery", "Production software — maintainable, documented, yours"],
];

const CHARSET = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";

/** Text that resolves left-to-right through random characters. */
function Scramble({ text, play, delay = 0 }) {
  const [out, setOut] = useState(text); // server + no-motion: final text
  useEffect(() => {
    if (!play) { setOut(text); return; }
    let raf = 0;
    let startAt = 0;
    const duration = 380;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!startAt) startAt = now;
        const resolved = Math.floor(
          ((now - startAt) / duration) * text.length
        );
        if (resolved >= text.length) { setOut(text); return; }
        let s = "";
        for (let i = 0; i < text.length; i++) {
          s += i < resolved || text[i] === " " || text[i] === "[" || text[i] === "]"
            ? text[i]
            : CHARSET[(Math.random() * CHARSET.length) | 0];
        }
        setOut(s);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [play, text, delay]);
  return <>{out}</>;
}

export default function EngagementReadout() {
  const ref = useRef(null);
  const [phase, setPhase] = useState("static"); // static | armed | boot

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // stays "static": finished panel, no boot
    setPhase("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("boot");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const booting = phase === "boot";
  const cls =
    "readout" +
    (phase === "armed" ? " readout--armed" : "") +
    (booting ? " readout--armed readout--boot" : "");

  return (
    <aside ref={ref} className={cls} aria-label="Engagement model">
      <div className="readout__head">
        <span className="readout__label">
          <Scramble text="[ ENGAGEMENT MODEL ]" play={booting} delay={0} />
        </span>
        <span className="readout__status">
          <span className="readout__dot" aria-hidden="true" />
          ACCEPTING PROJECTS
        </span>
      </div>

      <dl className="readout__rows">
        {ROWS.map(([label, value], i) => (
          <div
            key={label}
            className="readout__row"
            style={{ "--boot-i": i }}
          >
            <dt>
              <Scramble text={label} play={booting} delay={260 + i * 140} />
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
