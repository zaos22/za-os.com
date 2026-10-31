"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Ensure viewport starts at the top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

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

    // Slightly longer cinematic load sequence (~2.3s total)
    const startTime = Date.now();
    const duration = 2100; // ms to reach 100%

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before smooth fade-out
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 500); // Wait for CSS opacity transition
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity duration-500 ease-in-out ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Cargando portafolio de Oussama Zazou..."
      role="status"
    >
      <div className="relative flex flex-col items-center text-center px-4">
        {/* Ambient Halo Glow */}
        <div
          className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl opacity-75 animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Profile Avatar Frame with Electric Blue Rotating Halo */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-tr from-primary via-secondary-container to-accent-main shadow-[0_0_50px_rgba(77,142,255,0.45)] mb-6">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-container">
            <Image
              src={portfolioContent.personal.profileImage}
              alt={portfolioContent.personal.name}
              fill
              loading="eager"
              sizes="112px"
              className="object-cover"
            />
          </div>
          {/* Subtle Outer Spinner Ring */}
          <div
            className="absolute -inset-2 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
            style={{ animationDuration: "3s" }}
            aria-hidden="true"
          />
        </div>

        {/* Name and Role */}
        <h2
          translate="no"
          className="notranslate font-syne text-base sm:text-lg font-bold text-on-surface tracking-wider uppercase mb-1"
        >
          {portfolioContent.personal.name}
        </h2>
        <p className="font-mono text-[10px] sm:text-xs text-on-surface-variant max-w-xs mb-5">
          {portfolioContent.hero.role}
        </p>

        {/* Progress Bar & Counter */}
        <div className="w-40 sm:w-48 flex flex-col items-center gap-2">
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent-main transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_rgba(77,142,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between font-mono text-[10px] text-outline tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>INICIALIZANDO</span>
            </span>
            <span className="text-primary font-semibold tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
