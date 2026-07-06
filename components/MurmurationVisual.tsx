// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

/**
 * MurmurationVisual — hero right-side element.
 * A flock of Fibonacci-scaled squares organizes from scatter into a
 * diagonal formation: the logo concept performing the value proposition.
 *
 * Dependency-free. Respects prefers-reduced-motion (renders the final
 * formation as a static frame). Pauses off-screen via IntersectionObserver.
 */

const TEAL = [31, 182, 166];    // #1FB6A6
const VIOLET = [124, 92, 240];  // #7C5CF0
const FIB = [3, 4, 6, 9, 14];   // scaled-down Fibonacci sizes for card scale
const COUNT = 84;
const SETTLE_MS = 3200;         // scatter → formation duration
const IDLE_AMP = 5;             // px of ambient drift after settling

function lerp(a, b, t) { return a + (b - a) * t; }
function rgba(c1, c2, t, alpha) {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return `rgba(${r},${g},${b},${alpha})`;
}
// deterministic PRNG so the formation is identical on every load
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

function buildFlock(w, h) {
  const rand = mulberry32(47);
  const flock = [];
  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1); // position along formation, drives color
    // formation: gentle rising arc, lower-left → upper-right
    const fx = lerp(w * 0.08, w * 0.92, t);
    const fy = lerp(h * 0.82, h * 0.16, t) + Math.sin(t * Math.PI) * -h * 0.10;
    const tighten = 0.35 + 0.65 * (1 - t); // tail is looser, head is tight
    flock.push({
      t,
      // scatter start: anywhere, biased to edges
      sx: rand() * w,
      sy: rand() * h,
      // formation target with controlled scatter around the path
      fx: fx + (rand() - 0.5) * w * 0.10 * tighten,
      fy: fy + (rand() - 0.5) * h * 0.16 * tighten,
      size: FIB[Math.floor(rand() * FIB.length)],
      alpha: 0.35 + rand() * 0.45,
      phase: rand() * Math.PI * 2,   // idle drift phase
      speed: 0.4 + rand() * 0.5,     // idle drift speed
      delay: rand() * 600,           // stagger the departure
    });
  }
  return flock;
}

export default function MurmurationVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = 0;
    let running = true;
    let flock = [];
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flock = buildFlock(w, h);
    };

    const draw = (progressGlobal, now) => {
      ctx.clearRect(0, 0, w, h);
      for (const b of flock) {
        const local = Math.max(0, Math.min(1,
          (progressGlobal * SETTLE_MS - b.delay) / (SETTLE_MS - 600)));
        const p = easeOutQuint(local);
        let x = lerp(b.sx, b.fx, p);
        let y = lerp(b.sy, b.fy, p);
        // ambient drift, fades in as the bird settles
        const idle = p * IDLE_AMP;
        x += Math.sin(now * 0.001 * b.speed + b.phase) * idle;
        y += Math.cos(now * 0.0008 * b.speed + b.phase) * idle;
        ctx.fillStyle = rgba(TEAL, VIOLET, b.t, b.alpha * (0.3 + 0.7 * p));
        ctx.fillRect(x, y, b.size, b.size);
      }
    };

    const frame = (now) => {
      if (!running) return;
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / SETTLE_MS);
      draw(progress, now);
      raf = requestAnimationFrame(frame);
    };

    resize();

    if (reduced) {
      // static final formation, no animation loop
      draw(1, 0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // pause when off-screen
    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(1, 0); });
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <figure className="murmuration">
      <span className="murmuration__label">[ ORCHESTRATION ]</span>
      <canvas ref={canvasRef} className="murmuration__canvas" aria-hidden="true" />
      <figcaption className="murmuration__caption">
        Independent agents. One formation.
      </figcaption>
    </figure>
  );
}
