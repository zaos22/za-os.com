"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { ArrowDown, FileText, ExternalLink, Eye, EyeOff } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  // Reactive state for toggle & user feedback
  const [isRevealed, setIsRevealed] = useState(false);
  const revealState = useRef({ hover: 0, scroll: 0, manual: 0 });

  // Helper to re-render visual styles on container and background
  const updateVisuals = useCallback(() => {
    if (!containerRef.current) return;
    const h = revealState.current.hover;
    const s = revealState.current.scroll;
    const m = revealState.current.manual;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll scrub curve:
    // 0.00 -> 0.32: ramps from faint (0.16) to 100% full visibility
    // 0.32 -> 0.62: maintains 100% visibility (current state)
    // 0.62 -> 1.00: exit transition into About section
    let scrollOpacity = 0.16;
    let textScale = 1;
    let blur = 0;

    if (s < 0.32) {
      scrollOpacity = 0.16 + (s / 0.32) * 0.84;
      textScale = prefersReducedMotion ? 1 : 1 + s * 0.08;
    } else if (s <= 0.62) {
      scrollOpacity = 1.0;
      textScale = prefersReducedMotion ? 1 : 1.025;
    } else {
      const exitProgress = (s - 0.62) / 0.38;
      scrollOpacity = Math.max(0, 1 - exitProgress * 1.05);
      textScale = prefersReducedMotion
        ? 1
        : 1.025 + exitProgress * (window.innerWidth < 768 ? 0.35 : 0.65);
      blur = prefersReducedMotion ? 0 : exitProgress * 5;
    }

    // Interactivity: mouse hover or manual toggle boosts visibility up to 1.0
    const interactiveBoost = Math.max(h, m);
    const effectiveOpacity =
      s > 0.62
        ? scrollOpacity
        : Math.min(1, Math.max(scrollOpacity, 0.16 + interactiveBoost * 0.84));

    gsap.set(containerRef.current, {
      opacity: effectiveOpacity,
      scale: textScale,
      filter: blur > 0.1 ? `blur(${blur}px)` : "none",
      transformOrigin: "center center",
    });

    if (bgImageRef.current) {
      const bgScale = prefersReducedMotion ? 1 : 1 + s * 0.18;
      const bgOpacity = 1 - s * 0.65;
      const bgBlur = prefersReducedMotion ? 0 : s * 5;
      gsap.set(bgImageRef.current, {
        scale: bgScale,
        opacity: bgOpacity,
        filter: bgBlur > 0.2 ? `blur(${bgBlur}px)` : "none",
        transformOrigin: "center 30%",
      });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Split title into letters for entrance reveal
    const letters = titleRef.current?.querySelectorAll(".hero-letter");
    if (letters && letters.length > 0) {
      if (prefersReducedMotion) {
        gsap.set(letters, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          letters,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }

    // Full Hero Background Photo entrance
    if (bgImageRef.current) {
      if (prefersReducedMotion) {
        gsap.set(bgImageRef.current, { opacity: 1, scale: 1 });
      } else {
        gsap.fromTo(
          bgImageRef.current,
          {
            opacity: 0,
            scale: 1.05,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }
    }

    // Set initial faint state on container
    updateVisuals();

    // Cinematic Parallax Camera Zoom & Scroll Scrub
    let trigger: ScrollTrigger | null = null;
    if (sectionRef.current && containerRef.current) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=75%",
        pin: true,
        scrub: prefersReducedMotion ? 0.3 : 0.6,
        onUpdate: (self) => {
          revealState.current.scroll = self.progress;
          updateVisuals();
        },
      });
    }

    return () => {
      if (trigger) trigger.kill();
    };
  }, [updateVisuals]);

  // Reactive mouse interaction handlers: stay illuminated while hovering hero
  const handleMouseEnter = () => {
    gsap.to(revealState.current, {
      hover: 1,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: updateVisuals,
    });
  };

  const handleMouseMove = () => {
    if (revealState.current.hover < 0.95) {
      gsap.to(revealState.current, {
        hover: 1,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: updateVisuals,
      });
    }
  };

  const handleMouseLeave = () => {
    if (revealState.current.manual === 0) {
      gsap.to(revealState.current, {
        hover: 0,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: updateVisuals,
      });
    }
  };

  // Toggle manual focus
  const toggleReveal = () => {
    const next = !isRevealed;
    setIsRevealed(next);
    gsap.to(revealState.current, {
      manual: next ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: updateVisuals,
    });
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    // If clicking a link or button, let default action happen
    if ((e.target as HTMLElement).closest("a, button")) return;
    // On touch devices, tap toggles visibility
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      toggleReveal();
    }
  };

  const titleWords = portfolioContent.hero.title.split(" ");

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-12 pt-4 sm:pt-8 lg:pt-14 pb-6 sm:pb-8 overflow-hidden select-none cursor-default"
    >
      {/* 16:9 Full Hero Cinematic Photo Layer */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none will-change-transform select-none"
        aria-hidden="true"
      >
        <Image
          src={portfolioContent.hero.image}
          alt={portfolioContent.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] sm:object-[center_22%] lg:object-center filter contrast-[1.04] brightness-[0.92] sm:brightness-[0.96]"
        />

        {/* Subtle, non-intrusive edge blends preserving Oussama's portrait */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-surface/85 via-surface/35 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-surface via-surface/65 to-transparent" />
        <div className="absolute inset-0 bg-primary/[0.03] mix-blend-screen pointer-events-none" />
      </div>

      {/* Floating Control: Quick Toggle to switch between clean photo & full details */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto flex justify-end mb-1 sm:mb-0">
        <button
          onClick={toggleReveal}
          type="button"
          aria-label={isRevealed ? "Atenuar texto para ver foto" : "Mostrar texto completo"}
          className="interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container/80 hover:bg-surface-container-high border border-outline-variant/40 text-on-surface-variant hover:text-on-surface text-[10px] sm:text-[11px] font-mono tracking-wide backdrop-blur-md transition-all duration-300 shadow-md active:scale-95"
        >
          {isRevealed ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-primary" />
              <span>Modo Foto Limpia</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>Ver Detalles</span>
            </>
          )}
        </button>
      </div>

      {/* Foreground Hero Typography & Interactive Controls (Reactive Visibility) */}
      <div
        ref={containerRef}
        style={{ opacity: 0.16 }}
        className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center my-auto py-4 sm:py-8 will-change-transform"
      >
        {/* Role kicker badge */}
        <div className="inline-flex items-center justify-center gap-2 mb-4 sm:mb-6 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface-container-high/90 border border-outline-variant/50 text-on-surface font-mono text-[10px] sm:text-xs tracking-wider uppercase backdrop-blur-md shadow-lg max-w-[92vw] text-center leading-snug">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
          <span>{portfolioContent.hero.role}</span>
        </div>

        {/* Giant Hero Title with Word-level Wrapping to prevent broken words on mobile */}
        <h1
          ref={titleRef}
          className="font-syne text-[2.5rem] xs:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-9xl tracking-tighter font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/75 max-w-6xl leading-[0.94] flex flex-wrap justify-center overflow-hidden py-1 sm:py-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
        >
          {titleWords.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-flex whitespace-nowrap mx-1.5 sm:mx-2.5 lg:mx-4"
            >
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="hero-letter inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle Description with subtle glass backdrop for crisp readability */}
        <p className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl font-inter text-sm sm:text-base lg:text-lg text-on-surface font-normal leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.98)] px-3 sm:px-4 py-1 rounded-xl">
          {portfolioContent.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md sm:max-w-none">
          <a
            href="#proyectos"
            className="interactive inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-syne text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_24px_-4px_rgba(77,142,255,0.5)] hover:shadow-[0_0_32px_-2px_rgba(77,142,255,0.7)] hover:-translate-y-0.5 min-h-[44px]"
          >
            <span>{portfolioContent.hero.ctaProjects}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            className="interactive inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface font-syne text-xs sm:text-sm font-semibold border border-outline-variant/60 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shadow-lg min-h-[44px]"
          >
            <FileText className="w-4 h-4 text-outline" />
            <span>{portfolioContent.hero.ctaCv}</span>
          </a>

          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="interactive inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface font-syne text-xs sm:text-sm font-medium border border-outline-variant/40 transition-all duration-300 backdrop-blur-md shadow-md min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 text-outline" />
            <span>{portfolioContent.hero.ctaLinkedIn}</span>
          </a>
        </div>
      </div>

      {/* Reactive Interaction Micro-Hint & Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-outline font-mono text-[10px] tracking-widest uppercase">
        <span className="text-[9px] text-outline/70 transition-opacity">
          Toca o haz scroll para desvelar
        </span>
        <div className="w-5 h-9 rounded-full border border-outline-variant/60 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
