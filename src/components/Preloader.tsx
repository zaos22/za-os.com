"use client";

import { useEffect, useState } from "react";
import { portfolioContent } from "@/data/content";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      let active = true;
      requestAnimationFrame(() => {
        if (active) {
          setShouldRender(false);
        }
      });
      return () => {
        active = false;
      };
    }

    // Run short cinematic reveal (< 1.3s)
    const timer = setTimeout(() => {
      setIsLoaded(true);
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 400); // Wait for fade-out transition
      return () => clearTimeout(removeTimer);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity duration-400 ease-in-out ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Cargando portafolio..."
      role="status"
    >
      <div className="relative flex flex-col items-center">
        {/* Ambient Ring */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-30" />
          <span className="font-syne text-3xl font-extrabold text-primary tracking-tighter animate-pulse">
            {portfolioContent.personal.initials}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-outline tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>INICIALIZANDO</span>
        </div>
      </div>
    </div>
  );
}
