"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { ArrowDown, FileText, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  // Clean Photo toggle state & animation refs
  const [isCleanPhoto, setIsCleanPhoto] = useState(false);
  const stateRef = useRef({
    hover: 0,
    scroll: 0,
    cleanPhoto: false,
  });

  // Helper to re-render visual styles on container and background
  const updateVisuals = useCallback(() => {
    if (!containerRef.current) return;
    const h = stateRef.current.hover;
    const s = stateRef.current.scroll;
    const isClean = stateRef.current.cleanPhoto;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll scrub curve:
    // 0.00 -> 0.35: ramps from faint (0.18) to 1.0 full visibility
    // 0.35 -> 0.65: maintains 1.0 full visibility
    // 0.65 -> 1.00: exit transition into About section
    let scrollOpacity = 0.18;
    let textScale = 1;
    let blur = 0;

    if (s < 0.35) {
      scrollOpacity = 0.18 + (s / 0.35) * 0.82;
      textScale = prefersReducedMotion ? 1 : 1 + s * 0.08;
    } else if (s <= 0.65) {
      scrollOpacity = 1.0;
      textScale = prefersReducedMotion ? 1 : 1.025;
    } else {
      const exitProgress = (s - 0.65) / 0.35;
      scrollOpacity = Math.max(0, 1 - exitProgress * 1.05);
      textScale = prefersReducedMotion
        ? 1
        : 1.025 + exitProgress * (window.innerWidth < 768 ? 0.35 : 0.65);
      blur = prefersReducedMotion ? 0 : exitProgress * 5;
    }

    // Effective opacity:
    let effectiveOpacity: number;
    if (isClean && s < 0.25) {
      // In clean photo mode at top of page, hide text completely
      effectiveOpacity = 0;
    } else if (s > 0.65) {
      effectiveOpacity = scrollOpacity;
    } else {
      // Direct hover over text container illuminates to 1.0, otherwise follow scroll scrub
      const hoverBoost = h * (1.0 - scrollOpacity);
      effectiveOpacity = Math.min(1, Math.max(0, scrollOpacity + hoverBoost));
    }

    gsap.set(containerRef.current, {
      opacity: effectiveOpacity,
      scale: textScale,
      filter: blur > 0.1 ? `blur(${blur}px)` : "none",
      transformOrigin: "center center",
      pointerEvents: effectiveOpacity < 0.08 ? "none" : "auto",
    });

    if (bgImageRef.current) {
      const bgScale = prefersReducedMotion ? 1 : 1 + s * 0.18;
      const bgOpacity = 1 - s * 0.65;
      const bgBlur = prefersReducedMotion ? 0 : s * 5;
      gsap.to(bgImageRef.current, {
        scale: bgScale,
        opacity: bgOpacity,
        filter: bgBlur > 0.2 ? `blur(${bgBlur}px)` : "none",
        transformOrigin: "center 30%",
        duration: prefersReducedMotion ? 0 : 0.25,
        ease: "power2.out",
        overwrite: "auto",
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
        invalidateOnRefresh: true,
        scrub: prefersReducedMotion ? 0.3 : 0.6,
        onUpdate: (self) => {
          stateRef.current.scroll = self.progress;
          updateVisuals();
        },
      });
    }

    return () => {
      if (trigger) trigger.kill();
    };
  }, [updateVisuals]);

  // Reactive text hover: illuminates only when hovering over text
  const handleTextMouseEnter = () => {
    if (stateRef.current.cleanPhoto) return;
    gsap.to(stateRef.current, {
      hover: 1,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: updateVisuals,
    });
  };

  const handleTextMouseLeave = () => {
    gsap.to(stateRef.current, {
      hover: 0,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: updateVisuals,
    });
  };

  // Toggle clean photo mode
  const toggleCleanPhoto = () => {
    const next = !isCleanPhoto;
    setIsCleanPhoto(next);
    stateRef.current.cleanPhoto = next;
    stateRef.current.hover = 0;
    updateVisuals();
  };

  // Smooth scroll directly to the Details & About section (#sobre-mi)
  const handleScrollToDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCleanPhoto) {
      setIsCleanPhoto(false);
      stateRef.current.cleanPhoto = false;
      updateVisuals();
    }
    const target = document.getElementById("sobre-mi");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      toggleCleanPhoto();
    }
  };

  const titleWords = portfolioContent.hero.title.split(" ");

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden select-none cursor-default"
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
          className="object-cover object-[center_20%] sm:object-[center_24%] lg:object-[center_28%] filter contrast-[1.04] brightness-[0.92] sm:brightness-[0.96] transition-[object-position,filter,transform] duration-500 ease-out motion-reduce:transition-none"
        />

        {/* Subtle, non-intrusive edge blends preserving Oussama's portrait */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-surface/85 via-surface/35 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-surface via-surface/65 to-transparent" />
        <div className="absolute inset-0 bg-primary/[0.03] mix-blend-screen pointer-events-none" />
      </div>

      {/* Foreground Hero Typography & Interactive Controls (Reactive Visibility) */}
      <div
        ref={containerRef}
        onMouseEnter={handleTextMouseEnter}
        onMouseLeave={handleTextMouseLeave}
        style={{ opacity: 0.18 }}
        className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center my-auto py-4 sm:py-8 will-change-transform"
      >
        {/* Role kicker badge */}
        <div className="inline-flex items-center justify-center gap-2 mb-4 sm:mb-6 px-4 py-2 rounded-2xl sm:rounded-full bg-surface-container-high/90 border border-outline-variant/50 text-on-surface font-mono text-[10px] sm:text-xs tracking-wider uppercase backdrop-blur-md shadow-lg max-w-[92vw] text-center leading-snug">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="break-words">{portfolioContent.hero.role}</span>
        </div>

        {/* Giant Hero Title with Word-level Wrapping to prevent broken words on mobile */}
        <h1
          ref={titleRef}
          translate="no"
          className="notranslate font-syne text-[2.25rem] xs:text-[3rem] sm:text-6xl md:text-7xl lg:text-9xl tracking-tighter font-extrabold uppercase text-on-surface max-w-6xl leading-[0.94] flex flex-wrap justify-center overflow-hidden py-1 sm:py-2 drop-shadow-2xl"
        >
          {titleWords.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-flex whitespace-nowrap mx-2 sm:mx-3 lg:mx-4"
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
        <p className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl font-inter text-sm sm:text-base lg:text-lg text-on-surface font-normal leading-relaxed drop-shadow-lg px-4 py-2 rounded-xl break-words">
          {portfolioContent.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full max-w-md sm:max-w-none">
          <a
            href="#proyectos"
            className="interactive inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-syne text-xs sm:text-sm font-semibold transition-all duration-300 motion-reduce:transition-none shadow-lg hover:-translate-y-0.5 min-h-[44px]"
          >
            <span>{portfolioContent.hero.ctaProjects}</span>
            <ArrowDown className="w-4 h-4 shrink-0" />
          </a>

          <a
            href="#contacto"
            className="interactive inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface font-syne text-xs sm:text-sm font-semibold border border-outline-variant/60 transition-all duration-300 motion-reduce:transition-none backdrop-blur-md hover:-translate-y-0.5 shadow-lg min-h-[44px]"
          >
            <FileText className="w-4 h-4 text-outline shrink-0" />
            <span>{portfolioContent.hero.ctaCv}</span>
          </a>

          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            translate="no"
            className="notranslate interactive inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface font-syne text-xs sm:text-sm font-medium border border-outline-variant/40 transition-all duration-300 motion-reduce:transition-none backdrop-blur-md shadow-md min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 text-outline shrink-0" />
            <span>{portfolioContent.hero.ctaLinkedIn}</span>
          </a>
        </div>
      </div>

      {/* Reactive Interaction Micro-Hint & Clickable Scroll Indicator */}
      <a
        href="#sobre-mi"
        onClick={handleScrollToDetails}
        className="interactive relative z-10 flex flex-col items-center gap-2 text-on-surface hover:text-primary font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-200 motion-reduce:transition-none group cursor-pointer text-center px-2"
        aria-label="Ver detalles y desplazarse al perfil"
      >
        <span className="px-4 py-1.5 rounded-full bg-surface-container-lowest/90 border border-outline-variant/70 group-hover:border-primary backdrop-blur-md shadow-lg text-on-surface group-hover:text-primary transition-colors motion-reduce:transition-none">
          {portfolioContent.hero.scrollIndicator}
        </span>
        <div className="w-6 h-10 rounded-full bg-surface-container-lowest/90 border-2 border-primary/80 group-hover:border-primary backdrop-blur-md shadow-lg flex items-start justify-center p-1 transition-colors motion-reduce:transition-none">
          <div className="w-2 h-2.5 rounded-full bg-primary animate-bounce motion-reduce:animate-none" />
        </div>
      </a>
    </section>
  );
}
