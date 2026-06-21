"use client";

import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const brandName = "Adair Systems";

const navigationItems = [
  { label: "Home", target: "top" },
  { label: "Capabilities", target: "capabilities" },
  { label: "Architecture", target: "featured-architecture" },
  { label: "Methodology", target: "methodology" }
];

function scrollToSection(target: string) {
  if (target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  document.getElementById(target)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function BrandLogo() {
  return (
    <a
      className="group flex items-center gap-3 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      href="#top"
      aria-label={`${brandName} home`}
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-[#09090E] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] transition duration-500 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_48px_rgba(186,102,255,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]">
        {/* Subtle Aurora Inner Background */}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(102,255,204,0.25)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(186,102,255,0.25)_0%,transparent_50%)]" />
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth={2} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10 h-7 w-7 drop-shadow-[0_0_12px_rgba(102,255,204,0.6)] transition duration-500 group-hover:scale-110" 
          aria-hidden="true"
        >
          <defs>
            {/* Gradient exclusively for the connecting lines */}
            <linearGradient id="connecting-lines" x1="5" y1="0" x2="19" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#66ffcc" />
              <stop offset="50%" stopColor="#90b2e5" />
              <stop offset="100%" stopColor="#ba66ff" />
            </linearGradient>

            {/* Dedicated Diagonal Gradient for the Top Box */}
            <linearGradient id="top-box-gradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#66ffcc" /> {/* Top Left: Mint */}
              <stop offset="100%" stopColor="#ba66ff" /> {/* Bottom Right: Purple */}
            </linearGradient>
          </defs>
          
          {/* Bottom Left Box: Pure Mint */}
          <rect x="2" y="16" width="6" height="6" rx="1" stroke="#66ffcc" />
          
          {/* Bottom Right Box: Pure Purple */}
          <rect x="16" y="16" width="6" height="6" rx="1" stroke="#ba66ff" />
          
          {/* Top Box: Diagonal Mint-to-Purple Gradient */}
          <rect x="9" y="2" width="6" height="6" rx="1" stroke="url(#top-box-gradient)" />
          
          {/* Horizontal Connecting Line: Mint to Purple Gradient */}
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" stroke="url(#connecting-lines)" />
          
          {/* Vertical Connecting Line: Solid Violet Blend */}
          <path d="M12 12V8" stroke="#90b2e5" />
        </svg>
      </div>

      <span 
        className="ml-1 text-[1.25rem] font-bold tracking-tight sm:text-[1.35rem]"
        style={{
          background: 'linear-gradient(to right, #66ffcc, #90b2e5, #ba66ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Adair Systems
      </span>
    </a>
  );
}

export function Navbar() {
  const [activeTarget, setActiveTarget] = useState("top");
  const isProgrammaticScroll = useRef(false);
  const scrollLockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNavigation(target: string) {
    isProgrammaticScroll.current = true;
    setActiveTarget(target);
    scrollToSection(target);

    if (scrollLockTimeout.current) {
      clearTimeout(scrollLockTimeout.current);
    }

    scrollLockTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      scrollLockTimeout.current = null;
    }, 1600);
  }

  useEffect(() => {
    function updateActiveTarget() {
      if (isProgrammaticScroll.current) {
        return;
      }

      const readingLine = window.scrollY + window.innerHeight * 0.32;
      let currentTarget = "top";
      let nearestSectionOffset = -1;

      for (const item of navigationItems.slice(1)) {
        const section = document.getElementById(item.target);

        if (
          section &&
          section.offsetTop <= readingLine &&
          section.offsetTop > nearestSectionOffset
        ) {
          currentTarget = item.target;
          nearestSectionOffset = section.offsetTop;
        }
      }

      setActiveTarget(currentTarget);
    }

    function finishProgrammaticScroll() {
      if (!isProgrammaticScroll.current) {
        return;
      }

      isProgrammaticScroll.current = false;

      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
        scrollLockTimeout.current = null;
      }

      updateActiveTarget();
    }

    updateActiveTarget();
    window.addEventListener("scroll", updateActiveTarget, { passive: true });
    window.addEventListener("scrollend", finishProgrammaticScroll);
    window.addEventListener("resize", updateActiveTarget);

    return () => {
      window.removeEventListener("scroll", updateActiveTarget);
      window.removeEventListener("scrollend", finishProgrammaticScroll);
      window.removeEventListener("resize", updateActiveTarget);

      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
    };
  }, []);

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="nav-shell" aria-label="Primary navigation">
        <div className="flex min-w-0 items-center gap-8">
          <BrandLogo />
          <div
            className="hidden h-[3.25rem] w-[clamp(31rem,44vw,52rem)] items-center gap-1 rounded-full border border-white/[0.09] bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_12px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:flex"
            aria-label="Page sections"
          >
            {navigationItems.map((item) => (
              <button
                className={`group relative isolate flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent px-4 text-[0.95rem] font-bold leading-none tracking-normal transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 xl:px-6 xl:text-base ${
                  activeTarget === item.target ? "text-white" : "text-slate-300 hover:text-white"
                }`}
                key={item.target}
                type="button"
                onClick={() => handleNavigation(item.target)}
                aria-current={activeTarget === item.target ? "page" : undefined}
              >
                {activeTarget === item.target && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full border border-white/[0.11] bg-[linear-gradient(135deg,rgba(102,255,204,0.11),rgba(144,178,229,0.08)_48%,rgba(186,102,255,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_24px_rgba(0,0,0,0.18)]"
                    layoutId="navbar-active-section"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/adairclark-design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/adair-clark-0380b9239"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-[#BA66FF]"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <a className="nav-cta" href="mailto:hello@adair.systems">
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
