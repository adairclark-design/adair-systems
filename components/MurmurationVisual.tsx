// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

/**
 * MurmurationVisual v2 — hero right-side element.
 *
 * Squares converge from the canvas edges into an exact golden-rectangle
 * Fibonacci tiling (55×34 units; squares 34-21-13-8-5-3-2-1-1), rendered
 * as a dense cell grid, centered in the panel. The settled state IS the
 * brand mark's geometry: composed, architectural, finished.
 *
 * Register: cockpit instrument. No drift. Idle life = occasional
 * single-cell status blinks. prefers-reduced-motion renders the final
 * composition statically. Deterministic seed — identical on every visit.
 */

const TEAL = [31, 182, 166];    // #1FB6A6
const VIOLET = [124, 92, 240];  // #7C5CF0

// Exact tiling of a 55×34 golden rectangle. [side, x, y] in units.
// Verified: full coverage, no overlaps.
const TILES = [
  [34, 0, 0], [21, 34, 0], [13, 42, 21], [8, 34, 26],
  [5, 34, 21], [3, 39, 23], [2, 40, 21], [1, 39, 21], [1, 39, 22],
];
// Cells per tile side (dense enough to read as a grid, ~94 particles total)
const GRID = [6, 5, 4, 3, 2, 1, 1, 1, 1];

const SETTLE_MS = 2600;
const TILE_STAGGER = 160;       // largest square lands first, sequence assembles
const BLINK_EVERY_MS = 2400;
const BLINK_MS = 600;

const lerp = (a, b, t) => a + (b - a) * t;
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
function rgba(t, alpha) {
  const r = Math.round(lerp(TEAL[0], VIOLET[0], t));
  const g = Math.round(lerp(TEAL[1], VIOLET[1], t));
  const b = Math.round(lerp(TEAL[2], VIOLET[2], t));
  return `rgba(${r},${g},${b},${alpha})`;
}
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// random point on the canvas perimeter — birds arrive from the edges
function edgePoint(rand, w, h) {
  const side = Math.floor(rand() * 4);
  if (side === 0) return [rand() * w, -20];
  if (side === 1) return [w + 20, rand() * h];
  if (side === 2) return [rand() * w, h + 20];
  return [-20, rand() * h];
}

function build(w, h) {
  const rand = mulberry32(47);
  // scale tiling to occupy ~76% of canvas width, centered
  const s = Math.min((w * 0.76) / 55, (h * 0.76) / 34);
  const ox = (w - 55 * s) / 2;
  const oy = (h - 34 * s) / 2;

  const cells = [];
  const outlines = [];
  TILES.forEach(([side, tx, ty], ti) => {
    const colorT = ti / (TILES.length - 1);   // big teal → small violet
    const px = ox + tx * s, py = oy + ty * s, ps = side * s;
    outlines.push([px, py, ps]);
    const n = GRID[ti];
    const cell = ps / n;
    const inset = cell * 0.14;                // gap between cells
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const [sx, sy] = edgePoint(rand, w, h);
        cells.push({
          sx, sy,
          fx: px + i * cell + inset,
          fy: py + j * cell + inset,
          size: cell - inset * 2,
          colorT,
          alpha: 0.55 + rand() * 0.35,
          delay: ti * TILE_STAGGER + rand() * 220,
        });
      }
    }
  });
  return { cells, outlines };
}

export default function MurmurationVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0, start = 0, running = true;
    let cells = [], outlines = [], w = 0, h = 0;
    let blink = null;                          // { index, at }
    const blinkRand = mulberry32(101);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ({ cells, outlines } = build(w, h));
    };

    const totalMs = SETTLE_MS + TILES.length * TILE_STAGGER;

    const draw = (elapsed, now) => {
      ctx.clearRect(0, 0, w, h);
      const settled = elapsed >= totalMs;

      cells.forEach((c, idx) => {
        const p = easeOutQuint(
          Math.max(0, Math.min(1, (elapsed - c.delay) / SETTLE_MS))
        );
        const x = lerp(c.sx, c.fx, p);
        const y = lerp(c.sy, c.fy, p);
        let a = c.alpha * (0.25 + 0.75 * p);
        // cockpit blink: one cell at a time, brief brighten then decay
        if (blink && blink.index === idx) {
          const bt = (now - blink.at) / BLINK_MS;
          if (bt < 1) a = Math.min(1, a + Math.sin(bt * Math.PI) * 0.4);
        }
        ctx.fillStyle = rgba(c.colorT, a);
        ctx.fillRect(x, y, c.size, c.size);
      });

      // hairline tile boundaries fade in as the composition locks
      const lockT = Math.max(0, Math.min(1, (elapsed - totalMs * 0.85) / (totalMs * 0.3)));
      if (lockT > 0) {
        ctx.strokeStyle = `rgba(255,255,255,${0.09 * lockT})`;
        ctx.lineWidth = 1;
        outlines.forEach(([x, y, s]) => ctx.strokeRect(x, y, s, s));
      }

      // schedule the next blink only once settled
      if (settled && !reduced) {
        if (!blink || now - blink.at > BLINK_EVERY_MS) {
          blink = { index: Math.floor(blinkRand() * cells.length), at: now };
        }
      }
    };

    const frame = (now) => {
      if (!running) return;
      if (!start) start = now;
      draw(now - start, now);
      raf = requestAnimationFrame(frame);
    };

    resize();

    if (reduced) {
      draw(totalMs + 1, 0);                    // final composition, static
    } else {
      raf = requestAnimationFrame(frame);
    }

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

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(totalMs + 1, 0);
    });
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
