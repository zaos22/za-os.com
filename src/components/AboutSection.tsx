"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioContent } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Globe } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Soft Parallax on Photo
    if (photoRef.current && sectionRef.current) {
      gsap.fromTo(
        photoRef.current,
        { y: -20 },
        {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    // Word-by-word lighting scrub
    const words = textRef.current?.querySelectorAll(".scrub-word");
    if (words && words.length > 0 && sectionRef.current) {
      gsap.fromTo(
        words,
        {
          opacity: 0.25,
          color: "var(--color-outline)",
        },
        {
          opacity: 1,
          color: "var(--color-on-surface)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.8,
          },
        }
      );
    }
  }, []);

  const bioWords = portfolioContent.about.bio.split(" ");

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20"
    >
      <div className="relative rounded-3xl bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
        {/* Ambient Corner Glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[90px]"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Profile Photo with Radiant Electric Blue Halo */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div ref={photoRef} className="relative group will-change-transform">
              {/* Radiant Halo Ring */}
              <div
                className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-primary/40 via-secondary-container/40 to-accent-main/30 blur-xl opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-surface-container border border-primary/50 shadow-[0_0_32px_rgba(77,142,255,0.35)] overflow-hidden">
                <Image
                  src={portfolioContent.personal.profileImage}
                  alt={portfolioContent.about.heading}
                  width={224}
                  height={224}
                  className="w-full h-full rounded-full object-cover grayscale-[10%] contrast-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Factual Information & Quick Channels */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{portfolioContent.about.badge}</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              {portfolioContent.about.heading}
            </h2>

            {/* Word-by-word lighted bio */}
            <p
              ref={textRef}
              className="font-inter text-lg sm:text-xl leading-relaxed text-on-surface-variant"
            >
              {bioWords.map((word, index) => (
                <span key={index} className="scrub-word inline-block mr-1.5 transition-colors">
                  {word}
                </span>
              ))}
            </p>

            {/* Official Channels Details Box */}
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-outline text-[11px] pb-2 border-b border-outline-variant/20 tracking-wider uppercase">
                <span>{portfolioContent.about.directChannelsLabel}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-outline block text-[10px] mb-1">
                    {portfolioContent.about.emailLabel}
                  </span>
                  <a
                    href={`mailto:${portfolioContent.personal.email}`}
                    className="interactive text-on-surface hover:text-primary transition-colors flex items-center gap-1.5 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{portfolioContent.personal.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-outline block text-[10px] mb-1">
                    {portfolioContent.about.domainLabel}
                  </span>
                  <a
                    href={portfolioContent.personal.website}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>zaos.com</span>
                  </a>
                </div>

                <div>
                  <span className="text-outline block text-[10px] mb-1">
                    {portfolioContent.about.githubLabel}
                  </span>
                  <a
                    href={portfolioContent.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>zaos22</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
