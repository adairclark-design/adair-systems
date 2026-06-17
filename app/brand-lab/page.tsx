"use client";

import { useMemo, useState } from "react";

const brandName = "Adair Systems";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((char) => `${char}${char}`).join("")
    : value;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

function mixHex(colorA: string, colorB: string, amount = 0.5) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const mix = (start: number, end: number) => Math.round(start + (end - start) * amount);

  return `#${[mix(a.r, b.r), mix(a.g, b.g), mix(a.b, b.b)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

function rgbString(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `${r},${g},${b}`;
}

function BrandLabLogo({ colorA, colorB }: { colorA: string; colorB: string }) {
  const midColor = useMemo(() => mixHex(colorA, colorB), [colorA, colorB]);
  const colorARgb = useMemo(() => rgbString(colorA), [colorA]);
  const colorBRgb = useMemo(() => rgbString(colorB), [colorB]);

  return (
    <a
      className="group flex items-center gap-3 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      href="#top"
      aria-label={`${brandName} home`}
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-[#09090E] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] transition duration-500 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_48px_rgba(168,85,247,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]">
        <span
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 20%, rgba(${colorARgb}, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(${colorBRgb}, 0.25) 0%, transparent 50%)`
          }}
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 h-7 w-7 transition duration-500 group-hover:scale-110"
          style={{ filter: `drop-shadow(0 0 12px rgba(${colorARgb}, 0.6))` }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="brand-lab-connecting-lines" x1="5" y1="0" x2="19" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colorA} />
              <stop offset="50%" stopColor={midColor} />
              <stop offset="100%" stopColor={colorB} />
            </linearGradient>

            <linearGradient id="brand-lab-top-box-gradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor={colorA} />
              <stop offset="100%" stopColor={colorB} />
            </linearGradient>
          </defs>

          <rect x="2" y="16" width="6" height="6" rx="1" stroke={colorA} />
          <rect x="16" y="16" width="6" height="6" rx="1" stroke={colorB} />
          <rect x="9" y="2" width="6" height="6" rx="1" stroke="url(#brand-lab-top-box-gradient)" />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" stroke="url(#brand-lab-connecting-lines)" />
          <path d="M12 12V8" stroke={midColor} />
        </svg>
      </div>

      <span
        className="ml-1 text-[1.25rem] font-bold tracking-tight sm:text-[1.35rem]"
        style={{
          background: `linear-gradient(to right, ${colorA}, ${midColor}, ${colorB})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent"
        }}
      >
        Adair Systems
      </span>
    </a>
  );
}

export default function BrandLabPage() {
  const [colorA, setColorA] = useState("#3b82f6");
  const [colorB, setColorB] = useState("#a855f7");
  const midColor = useMemo(() => mixHex(colorA, colorB), [colorA, colorB]);

  return (
    <main className="min-h-screen bg-[#05050a] px-6 py-10 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(40,215,255,0.10),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
          <div className="rounded-full border border-white/10 bg-[#09090e]/80 px-7 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_80px_rgba(0,0,0,0.38)]">
            <BrandLabLogo colorA={colorA} colorB={colorB} />
          </div>
        </div>

        <aside className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">Brand Lab</p>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-white">Logo Color System</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Tune the two anchor colors and preview the production mark structure in real time.
          </p>

          <div className="mt-8 space-y-5">
            <label className="block rounded-2xl border border-white/10 bg-black/20 p-4">
              <span className="flex items-center justify-between text-sm font-semibold text-slate-200">
                Color A
                <span className="font-mono text-xs uppercase text-slate-500">{colorA}</span>
              </span>
              <input
                className="mt-4 h-12 w-full cursor-pointer rounded-xl border-0 bg-transparent p-0"
                type="color"
                value={colorA}
                onChange={(event) => setColorA(event.target.value)}
              />
            </label>

            <label className="block rounded-2xl border border-white/10 bg-black/20 p-4">
              <span className="flex items-center justify-between text-sm font-semibold text-slate-200">
                Color B
                <span className="font-mono text-xs uppercase text-slate-500">{colorB}</span>
              </span>
              <input
                className="mt-4 h-12 w-full cursor-pointer rounded-xl border-0 bg-transparent p-0"
                type="color"
                value={colorB}
                onChange={(event) => setColorB(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[colorA, midColor, colorB].map((color) => (
              <div
                key={color}
                className="h-12 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
