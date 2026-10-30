"use client";

import { useEffect, useRef } from "react";
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

    // Full Hero Background Photo entrance
    if (bgImageRef.current) {
      if (prefersReducedMotion) {
        gsap.set(bgImageRef.current, { opacity: 1 });
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

    // Cinematic Parallax Camera Zoom on Scroll
    if (!prefersReducedMotion && sectionRef.current && containerRef.current) {
      const isMobile = window.innerWidth < 768;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=65%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;

          // Parallax depth: Foreground typography zooms faster than background
          const textScale = isMobile ? 1 + progress * 0.35 : 1 + progress * 0.65;
          const bgScale = 1 + progress * 0.2;
          const opacity = 1 - progress * 0.88;
          const blur = progress * 4;

          gsap.set(containerRef.current, {
            scale: textScale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transformOrigin: "center center",
          });

          if (bgImageRef.current) {
            gsap.set(bgImageRef.current, {
              scale: bgScale,
              opacity: 1 - progress * 0.7,
              filter: `blur(${progress * 6}px)`,
              transformOrigin: "center 35%",
            });
          }
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
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-12 pt-20 pb-8 overflow-hidden select-none"
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
          className="object-cover object-[center_35%] sm:object-[center_28%] lg:object-center filter contrast-[1.08] brightness-[0.72] sm:brightness-[0.78]"
        />
        {/* Gradient Scrims: Obsidian surface blend & AAA Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/90 via-surface/30 to-surface" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/80" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-color-dodge blur-[90px]" />
      </div>

      {/* Foreground Hero Typography & Interactive Controls */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center my-auto py-8 sm:py-12 will-change-transform"
      >
        {/* Role kicker badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/40 text-on-surface font-mono text-xs tracking-wider uppercase backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{portfolioContent.hero.role}</span>
        </div>

        {/* Giant Hero Title with Letter Mask Animation */}
        <h1
          ref={titleRef}
          className="font-syne text-5xl sm:text-7xl lg:text-9xl tracking-tighter font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70 max-w-6xl leading-[0.92] flex flex-wrap justify-center overflow-hidden py-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
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
        <p className="mt-6 max-w-2xl font-inter text-base sm:text-lg text-on-surface font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          {portfolioContent.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#proyectos"
            className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-syne text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_24px_-4px_rgba(77,142,255,0.5)] hover:shadow-[0_0_32px_-2px_rgba(77,142,255,0.7)] hover:-translate-y-0.5"
          >
            <span>{portfolioContent.hero.ctaProjects}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface font-syne text-xs sm:text-sm font-semibold border border-outline-variant/60 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shadow-lg"
          >
            <FileText className="w-4 h-4 text-outline" />
            <span>{portfolioContent.hero.ctaCv}</span>
          </a>

          <a
            href={portfolioContent.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="interactive inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container/70 hover:bg-surface-container-high text-on-surface font-syne text-xs sm:text-sm font-medium border border-outline-variant/40 transition-all duration-300 backdrop-blur-md shadow-md"
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
