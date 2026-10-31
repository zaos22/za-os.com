"use client";

import { useEffect, useRef } from "react";
import { portfolioContent } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Server,
  Layers,
  RefreshCw,
  BarChart3,
  LineChart,
  Store,
  Bot,
  Network,
} from "lucide-react";

const moduleIcons: Record<string, React.ElementType> = {
  "mod-1": Code2,
  "mod-2": Server,
  "mod-3": Layers,
  "mod-4": RefreshCw,
  "mod-5": BarChart3,
  "mod-6": LineChart,
  "mod-7": Store,
  "mod-8": Bot,
  "mod-9": Network,
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Staggered Entrance of Bento Cards
    if (!prefersReducedMotion && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".bento-skill-card");

      gsap.fromTo(
        cards,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Cursor tracking glow on desktop bento cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = cardsContainerRef.current?.querySelectorAll<HTMLElement>(".bento-skill-card");
      if (!cards) return;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5">
            {portfolioContent.skills.badge}
          </div>
          <h2 className="font-syne text-2xl sm:text-4xl font-bold tracking-tight text-on-surface">
            {portfolioContent.skills.heading}
          </h2>
        </div>
        <p className="font-inter text-sm text-outline max-w-md">
          {portfolioContent.skills.description}
        </p>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div
        dir="ltr"
        className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest/60 border border-outline-variant/30 py-4 mb-6 sm:mb-10 select-none"
      >
        <div className="animate-marquee gap-8 font-mono text-xs text-on-surface-variant uppercase tracking-widest">
          {/* Double array for continuous seamless loop */}
          {[...portfolioContent.skills.marqueeAreas, ...portfolioContent.skills.marqueeAreas].map(
            (area, index) => (
              <span key={index} className="inline-flex items-center gap-6 shrink-0">
                <span className="hover:text-primary transition-colors">{area}</span>
                <span className="text-primary">•</span>
              </span>
            )
          )}
        </div>
      </div>

      {/* Bento Grid (9 Modules) */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {portfolioContent.skills.modules.map((module) => {
          const IconComponent = moduleIcons[module.id] || Code2;
          const hasChips = module.chips && module.chips.length > 0;

          return (
            <div
              key={module.id}
              className="bento-skill-card bento-glow-card group relative rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 motion-reduce:transition-none hover:shadow-xl flex flex-col justify-between min-w-0"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/40 group-hover:border-primary/40 transition-colors shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-mono text-[11px] text-outline uppercase tracking-wider text-right">
                    {module.moduleNumber}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-bold text-on-surface mb-2 break-words">
                  {module.name}
                </h3>
                <p className="font-inter text-sm text-on-surface-variant leading-relaxed mb-4 break-words">
                  {module.description}
                </p>
              </div>

              {/* Render verified chips only; no residual empty tags if chips array is empty */}
              {hasChips && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-outline-variant/20">
                  {module.chips.map((chip, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 rounded-full bg-surface-container border border-outline-variant/40 font-mono text-[11px] text-on-surface hover:border-primary/40 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
