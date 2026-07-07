// @ts-nocheck
"use client";

import { useState } from "react";

/**
 * CaseStudyItem — expandable portfolio row.
 *
 * Expansion uses the CSS grid 0fr→1fr technique (see interactions.css):
 * animates height-to-auto with zero JS measurement, no reflow jank.
 * Fully keyboard-accessible: the head is a real <button> with
 * aria-expanded/aria-controls.
 *
 * Usage (order and copy per the Phase 2 canonical deck):
 *
 *   <CaseStudyItem
 *     index="01"
 *     kicker="Multi-Agent Intelligence Layer"
 *     title="Polyvision Integration"
 *     outcome="Raw market feeds became interpreted, actionable alerts — removing the manual monitoring layer between data and decision."
 *     tags={["LLM orchestration", "API architecture", "Realtime intelligence"]}
 *   >
 *     Directed a real-time intelligence product across market data
 *     ingestion, API architecture, alerting, and LLM-assisted
 *     interpretation. Agentic execution coordinated the interface and
 *     backend workstreams while I controlled system boundaries,
 *     integration quality, and release readiness.
 *   </CaseStudyItem>
 */

type CaseStudyItemProps = {
  index: string;
  kicker: string;
  title: string;
  outcome?: string;
  tags?: string[];
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function CaseStudyItem({
  index,
  kicker,
  title,
  outcome,
  tags = [],
  defaultOpen = false,
  children,
}: CaseStudyItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `case-panel-${index}`;

  return (
    <article className={`case${open ? " case--open" : ""}`}>
      <button
        type="button"
        className="case__head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="case__index">{index}</span>
        <span className="case__meta">
          <span className="case__kicker">{kicker}</span>
          <span className="case__title">{title}</span>
        </span>
        <span className="case__toggle" aria-hidden="true" />
      </button>

      <div id={panelId} className="case__panel" role="region" aria-label={title}>
        <div className="case__inner">
          <p className="case__body">{children}</p>
          {outcome && <p className="case__outcome">{outcome}</p>}
          {tags.length > 0 && (
            <ul className="case__tags">
              {tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
