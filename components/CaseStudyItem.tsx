// @ts-nocheck
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CaseStudyItemProps = {
  index: string;
  kicker: string;
  title: string;
  outcome?: string;
  tags?: string[];
  images?: string[];
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function CaseStudyItem({
  index,
  kicker,
  title,
  outcome,
  tags = [],
  images = [],
  defaultOpen = false,
  children,
}: CaseStudyItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelId = `case-panel-${index}`;
  const lightboxOpen = activeImage !== null;
  const activeSrc = lightboxOpen ? images[activeImage] : null;

  function closeLightbox() {
    setActiveImage(null);
  }

  function showPrevious() {
    setActiveImage((current) => {
      if (current === null || images.length === 0) return current;
      return (current - 1 + images.length) % images.length;
    });
  }

  function showNext() {
    setActiveImage((current) => {
      if (current === null || images.length === 0) return current;
      return (current + 1) % images.length;
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length]);

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

          {open && images.length > 0 && (
            <div className="case-lightbox-thumbs" aria-label={`${title} screenshots`}>
              {images.map((src, imageIndex) => (
                <button
                  type="button"
                  className="case-lightbox-thumb"
                  key={src}
                  onClick={() => setActiveImage(imageIndex)}
                  aria-label={`Open ${title} screenshot ${imageIndex + 1}`}
                >
                  <img
                    src={src}
                    alt={`${title} screenshot ${imageIndex + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && activeSrc && (
              <motion.div
                className="case-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
                aria-label={`${title} screenshot viewer`}
              >
                <button
                  type="button"
                  className="case-lightbox__close"
                  onClick={closeLightbox}
                  aria-label="Close screenshot viewer"
                >
                  ×
                </button>

                {images.length > 1 && (
                  <button
                    type="button"
                    className="case-lightbox__nav case-lightbox__nav--prev"
                    onClick={(event) => {
                      event.stopPropagation();
                      showPrevious();
                    }}
                    aria-label="Previous screenshot"
                  >
                    ‹
                  </button>
                )}

                <div
                  className="case-lightbox__stage"
                  onClick={(event) => event.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSrc}
                      src={activeSrc}
                      alt={`${title} screenshot ${activeImage + 1}`}
                      className="case-lightbox__image"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </AnimatePresence>

                  <div className="case-lightbox__meta">
                    <span>{title}</span>
                    <span>
                      {activeImage + 1} / {images.length}
                    </span>
                  </div>
                </div>

                {images.length > 1 && (
                  <button
                    type="button"
                    className="case-lightbox__nav case-lightbox__nav--next"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNext();
                    }}
                    aria-label="Next screenshot"
                  >
                    ›
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </article>
  );
}
