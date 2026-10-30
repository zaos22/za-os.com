"use client";

import { useEffect, useRef } from "react";
import { portfolioContent } from "@/data/content";
import { ArrowDown, FileText, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Split title into letters for mask reveal
    const letters = titleRef.current?.querySelectorAll(".hero-letter");
    if (letters && letters.length > 0) {
      if (prefersReducedMotion) {
        gsap.set(letters, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          letters,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.035,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }

    // Camera zoom pin effect on scroll
    if (!prefersReducedMotion && sectionRef.current && containerRef.current) {
      const isMobile = window.innerWidth < 768;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          // Scale camera zoom towards name
          const scale = isMobile ? 1 + progress * 0.35 : 1 + progress * 0.75;
          const opacity = 1 - progress * 0.85;
          const blur = progress * 4;

          gsap.set(containerRef.current, {
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transformOrigin: "center center",
          });
        },
      });

      return () => {
        trigger.kill();
      };
    }
  }, []);

  const titleText = portfolioContent.hero.title;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-12 pt-24 pb-8 overflow-hidden select-none"
    >
      {/* Focal Ambient Radial Light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[800px] h-[350px] sm:h-[600px] lg:h-[800px] bg-primary/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center my-auto py-12 will-change-transform"
      >
        {/* Role kicker badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-surface-container-high/60 border border-outline-variant/30 text-outline font-mono text-xs tracking-wider uppercase backdrop-blur-sm">
          <span>{portfolioContent.hero.role}</span>
        </div>

        {/* Giant Hero Title with Letter Mask Animation */}
        <h1
          ref={titleRef}
          className="font-syne text-5xl sm:text-7xl lg:text-9xl tracking-tighter font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-b from-on-surface via-on-surface to-on-surface-variant/40 max-w-6xl leading-[0.92] flex flex-wrap justify-center overflow-hidden py-2"
        >
          {titleText.split("").map((char, index) => (
            <span
              key={index}
              className={`hero-letter inline-block ${
                char === " " ? "w-4 sm:w-6 lg:w-8" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Factual Subtitle Description */}
        <p className="mt-6 max-w-2xl font-inter text-base sm:text-lg text-on-surface-variant font-normal leading-relaxed">
          {portfolioContent.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#proyectos"
            className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-syne text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_24px_-4px_rgba(77,142,255,0.45)] hover:shadow-[0_0_32px_-2px_rgba(77,142,255,0.65)] hover:-translate-y-0.5"
          >
            <span>{portfolioContent.hero.ctaProjects}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface font-syne text-xs sm:text-sm font-semibold border border-outline-variant/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4 text-outline" />
            <span>{portfolioContent.hero.ctaCv}</span>
          </a>

          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="interactive inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-syne text-xs sm:text-sm font-medium border border-outline-variant/30 transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4 text-outline" />
            <span>{portfolioContent.hero.ctaLinkedIn}</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-outline font-mono text-[10px] tracking-widest uppercase">
        <span>{portfolioContent.hero.scrollIndicator}</span>
        <div className="w-5 h-9 rounded-full border border-outline-variant/60 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
