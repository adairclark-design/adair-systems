"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const captions: Record<string, string> = {
  "/project-images/PolyVision 2.png": "Live market feed, filters, and trader leaderboard",
  "/project-images/PolyVision 3.png": "Trader profiles ranked by profit and loss",
  "/project-images/PolyVision 4.png": "Market categories, prices, and liquidity",
  "/project-images/AcreLogic 1.png": "Planning entry screen",
  "/project-images/AcreLogic 2.png": "Crop catalog with search and growing requirements",
  "/project-images/AcreLogic 3.png": "Map-based bed layout and dimension controls",
  "/project-images/TDT 1.png": "Client dashboard with training and nutrition targets",
  "/project-images/TDT 2.png": "Assigned workout, sets, repetitions, and coaching cues",
  "/project-images/TDT 3.png": "Daily nutrition targets and food logging",
  "/project-images/TDT 4.png": "Food search, portion controls, and nutrient totals",
  "/project-images/TDT 6.png": "Training service booking options",
  "/project-images/TDT 7.png": "Training history calendar and session details",
  "/project-images/RAPP 2.png": "Consulting vision and service overview",
  "/project-images/RAPP 3.png": "Service navigation and detailed offering",
  "/project-images/RAPP 4.png": "Grant strategy content and supporting graphic",
  "/project-images/RAPP 5.png": "Team profiles and contact section"
};

type Props = {
  index: string; kicker: string; title: string; outcome?: string;
  tags?: string[]; images?: string[]; defaultOpen?: boolean; children: ReactNode;
};

function ScreenshotViewer({ images, title, initial, onClose }: {
  images: string[]; title: string; initial: number; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(initial);
  const move = (step: number) => setActive(i => (i + step + images.length) % images.length);
  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  return createPortal(
    <dialog ref={dialog} className="case-dialog" aria-label={`${title} screenshot viewer`}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}>
      <div className="case-dialog__toolbar">
        <span aria-live="polite">{title} · {active + 1} / {images.length}</span>
        <button type="button" onClick={onClose} autoFocus aria-label="Close screenshot viewer">Close ×</button>
      </div>
      <img className="case-dialog__image" src={images[active]} alt={`${title}: ${captions[images[active]]}`} />
      {images.length > 1 && <div className="case-dialog__controls">
        <button type="button" onClick={() => move(-1)}>← Previous</button>
        <a href={images[active]} target="_blank" rel="noreferrer">Open full image ↗</a>
        <button type="button" onClick={() => move(1)}>Next →</button>
      </div>}
    </dialog>, document.body
  );
}

export default function CaseStudyItem({ index, kicker, title, outcome, tags = [], images = [], defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const panelId = `case-panel-${index}`;
  return <article className={`case${open ? " case--open" : ""}`}>
    <h3 className="case__heading">
      <button type="button" className="case__head" aria-expanded={open} aria-controls={panelId}
        id={`${panelId}-heading`} onClick={() => setOpen(value => !value)}>
        <span className="case__cover" aria-hidden="true"><img src={images[0]} alt="" loading="lazy" /></span>
        <span className="case__meta"><span className="case__kicker">{index} / {kicker}</span><span className="case__title">{title}</span><span className="case__scope">{tags.join(" · ")}</span></span>
        <span className="case__toggle" aria-hidden="true" />
      </button>
    </h3>
    <div id={panelId} className="case__panel" role="region" aria-labelledby={`${panelId}-heading`} hidden={!open}>
      <div className="case__inner">
        <p className="case__body">{children}</p>
        {outcome && <p className="case__outcome">{outcome}</p>}
        <ul className="case__tags">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {open && images.length > 0 && <div className="case__gallery-grid" data-count={images.length} aria-label={`${title} screenshots`}>
          {images.map((src, i) => <button key={src} className={`case__frame${i === 0 && images.length !== 4 ? " case__frame--featured" : ""}`}
            type="button" onClick={() => setActiveImage(i)} aria-label={`Open ${title} screenshot ${i + 1}`}>
            <img src={src} alt={`${title}: ${captions[src]}`} loading="lazy" />
            <span aria-hidden="true">{captions[src]} ↗</span>
          </button>)}
        </div>}
      </div>
    </div>
    {activeImage !== null && <ScreenshotViewer images={images} title={title} initial={activeImage} onClose={() => setActiveImage(null)} />}
  </article>;
}
