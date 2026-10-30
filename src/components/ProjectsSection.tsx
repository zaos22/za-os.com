"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioContent, type ProjectItem } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, ExternalLink, Globe, AlertCircle, Coffee, Compass, Stethoscope } from "lucide-react";

const projectIcons: Record<string, React.ElementType> = {
  ohana: Coffee,
  arahmatours: Compass,
  fisiomed: Stethoscope,
};

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [iframeError, setIframeError] = useState(false);
  const IconComponent = projectIcons[project.id] || Globe;

  return (
    <div
      className="project-stacked-card rounded-3xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-4px_rgba(77,142,255,0.25)] mb-8"
      style={{ zIndex: 10 + index }}
    >
      <div>
        {/* Browser Mockup Top Bar */}
        <div className="bg-surface-container-high/90 px-5 py-3 flex items-center justify-between border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]/70" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs text-outline max-w-[220px] sm:max-w-xs truncate">
            <Lock className="w-3 h-3 text-primary shrink-0" />
            <span className="truncate">{project.displayUrl}</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Live Preview / Fallback Frame */}
        <div className="relative w-full h-56 sm:h-72 bg-surface-container-low border-b border-outline-variant/20 overflow-hidden flex items-center justify-center">
          {!project.isPlaceholder && !iframeError ? (
            <iframe
              src={project.url}
              title={`Vista previa de ${project.title}`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onError={() => setIframeError(true)}
              className="w-full h-full border-0 pointer-events-none opacity-90 transition-opacity duration-300 hover:opacity-100"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/40 shadow-inner">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <span className="font-syne text-lg font-bold text-on-surface">
                {project.title}
              </span>
              <span className="font-mono text-xs text-outline">
                {project.isPlaceholder
                  ? "Despliegue privado en preparación"
                  : "Previsualización interactiva disponible en enlace directo"}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="font-syne text-2xl font-bold text-on-surface">
              {project.title}
            </h3>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-xs text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="font-inter text-sm sm:text-base text-on-surface-variant mb-6">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
        {project.isPlaceholder ? (
          <div className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container/40 border border-outline-variant/30 text-outline font-syne text-xs sm:text-sm font-semibold cursor-not-allowed">
            <AlertCircle className="w-4 h-4 text-outline" />
            <span>{portfolioContent.projects.ctaComingSoon}</span>
          </div>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="interactive w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-syne text-xs sm:text-sm font-semibold border border-outline-variant/40 transition-all duration-200 shadow-sm"
          >
            <span>{portfolioContent.projects.ctaViewLive}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Smooth card stagger on viewport entry
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".project-stacked-card");
      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5">
            {portfolioContent.projects.badge}
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
            {portfolioContent.projects.heading}
          </h2>
        </div>
        <p className="font-inter text-sm text-outline max-w-md">
          {portfolioContent.projects.description}
        </p>
      </div>

      {/* Projects Grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {portfolioContent.projects.items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
