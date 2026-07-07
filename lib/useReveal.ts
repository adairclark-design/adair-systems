// @ts-nocheck
"use client";

import { useEffect } from "react";

/**
 * useReveal — one scroll-entrance system for the whole page.
 *
 * Call once in the page/layout client shell:  useReveal();
 * Mark elements:  <section data-reveal>            (0ms)
 *                 <div data-reveal style={{ "--rv": "80ms" }}>   (staggered)
 *
 * Design guarantees:
 * - Elements are only hidden after this hook adds .reveal-ready to
 *   <html>. No JS, no hiding — content is never lost to a failed script.
 * - prefers-reduced-motion: the class is never added; everything is
 *   simply visible.
 * - One IntersectionObserver for the entire page; each element is
 *   unobserved after revealing. Nothing re-triggers on scroll-up.
 */

export default function useReveal(selector = "[data-reveal]") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" }
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [selector]);
}
