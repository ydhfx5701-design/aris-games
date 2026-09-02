"use client";

import { useEffect, useRef } from "react";

export function HeroArt() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrap?.style.setProperty("--px", x.toFixed(3));
        wrap?.style.setProperty("--py", y.toFixed(3));
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 overflow-hidden [--px:0] [--py:0]"
      aria-hidden
    >
      {/* base atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 78% 38%, rgba(139,92,246,0.16) 0%, rgba(91,124,250,0.08) 32%, transparent 68%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(91,124,250,0.10) 0%, transparent 60%)",
        }}
      />

      {/* faint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="aris-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aris-grid)" />
      </svg>

      {/* portal rings */}
      <div
        className="absolute right-[6%] top-1/2 h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] -translate-y-1/2 transition-transform duration-300 ease-out sm:right-[10%]"
        style={{
          transform: `translate(calc(var(--px) * 10px), calc(-50% + var(--py) * 10px))`,
        }}
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <defs>
            <linearGradient id="ring-grad-outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5b7cfa" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="ring-grad-inner" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5b7cfa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="300" cy="300" r="260" fill="none" stroke="url(#ring-grad-outer)" strokeWidth="1.5" opacity="0.6" />
          <circle cx="300" cy="300" r="215" fill="none" stroke="url(#ring-grad-inner)" strokeWidth="10" className="animate-pulse-slow" />
          <circle cx="300" cy="300" r="215" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          <circle cx="300" cy="300" r="170" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 10" />

          <circle cx="300" cy="300" r="60" fill="url(#core-glow)" className="animate-pulse-slow" />

          {/* logo mark echo — small triangle */}
          <polygon points="300,255 320,292 280,292" fill="#c4b5fd" opacity="0.85" />
        </svg>
      </div>

      {/* vignette to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
    </div>
  );
}
