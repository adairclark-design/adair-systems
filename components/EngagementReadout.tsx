/*
 * EngagementReadout — hero right column, final.
 *
 * A static instrument-style readout stating the terms of the engagement.
 * No canvas, no JS, no animation except a CSS status pulse (disabled
 * under prefers-reduced-motion). Cannot fail to render.
 *
 * Register: cockpit readout. The H1 makes the claim; this panel states
 * the terms. Label/value rows answer, in order: who directs, what
 * executes, where review happens, what ships, and whether the practice
 * is taking work.
 */

export default function EngagementReadout() {
  return (
    <aside className="readout" aria-label="Engagement model">
      <div className="readout__head">
        <span className="readout__label">[ ENGAGEMENT MODEL ]</span>
        <span className="readout__status">
          <span className="readout__dot" aria-hidden="true" />
          ACCEPTING PROJECTS
        </span>
      </div>

      <dl className="readout__rows">
        <div className="readout__row">
          <dt>Direction</dt>
          <dd>Adair Clark — one accountable technical architect</dd>
        </div>
        <div className="readout__row">
          <dt>Execution</dt>
          <dd>Specialized AI agents, running parallel workstreams</dd>
        </div>
        <div className="readout__row">
          <dt>Review</dt>
          <dd>Human judgment at every integration boundary</dd>
        </div>
        <div className="readout__row">
          <dt>Delivery</dt>
          <dd>Production software — maintainable, documented, yours</dd>
        </div>
      </dl>
    </aside>
  );
}
