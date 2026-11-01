"use client";

import { useRef, useState } from "react";
import { portfolioContent, type ContactButton } from "@/data/content";
import { Briefcase, Download, Terminal, Mail } from "lucide-react";

function MagneticButtonWrapper({
  button,
}: {
  button: ContactButton;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Disable magnetic pull on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Gentle magnetic pull (factor of 0.28)
    setOffset({ x: x * 0.28, y: y * 0.28 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const icons: Record<string, React.ElementType> = {
    linkedin: Briefcase,
    cv: Download,
    github: Terminal,
  };

  const IconComponent = icons[button.type] || Briefcase;

  const styleClasses =
    button.type === "linkedin"
      ? "bg-primary-container hover:bg-tertiary-container text-on-primary-container shadow-[0_0_20px_rgba(77,142,255,0.35)]"
      : button.type === "cv"
      ? "bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/50"
      : "bg-surface-container/60 hover:bg-surface-container-high text-on-surface border border-outline-variant/30";

  const handleCvDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (button.type !== "cv") return;
    e.preventDefault();
    const currentLang =
      typeof window !== "undefined" ? localStorage.getItem("preferred_lang") : "en";
    const isSpanish = currentLang === "es";
    const fileName = isSpanish ? "MyCV_es.pdf" : "MyCV_en.pdf";
    const link = document.createElement("a");
    link.href = `/files/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <a
      ref={btnRef}
      href={button.href}
      download={button.type === "cv" ? true : undefined}
      target={button.type === "cv" || button.isPlaceholder ? undefined : "_blank"}
      rel={button.type === "cv" ? undefined : "noreferrer"}
      onClick={button.type === "cv" ? handleCvDownload : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? "transform 0.4s ease-out" : "none",
      }}
      className={`interactive inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-syne text-xs sm:text-sm font-semibold transition-colors duration-200 w-full xs:w-auto min-h-[44px] ${styleClasses}`}
    >
      <IconComponent className="w-4 h-4" />
      <span>{button.label}</span>
    </a>
  );
}

export default function ContactSection() {
  const { contact, personal } = portfolioContent;

  return (
    <section
      id="contacto"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      <div className="relative rounded-3xl bg-surface-container-lowest/90 border border-outline-variant/40 p-6 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
        {/* Glow Ambient Light Center */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] bg-primary/10 rounded-full blur-[110px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-3 sm:mb-4">
            <span>{contact.badge}</span>
          </div>

          <h2 className="font-syne text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface uppercase mb-4 sm:mb-6 leading-tight break-words">
            {contact.heading}
          </h2>

          <p className="font-inter text-sm sm:text-lg text-on-surface-variant mb-8 sm:mb-10 max-w-xl leading-relaxed break-words">
            {contact.description}
          </p>

          {/* Magnetic Buttons Row */}
          <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-4 mb-8 sm:mb-12 w-full max-w-xs xs:max-w-none">
            {contact.buttons.map((button, index) => (
              <MagneticButtonWrapper key={index} button={button} />
            ))}
          </div>

          {/* Direct Details Footer */}
          <div className="w-full pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-on-surface-variant">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>{contact.emailLabel}</span>
              <a
                href={`mailto:${personal.email}`}
                translate="no"
                className="notranslate interactive text-on-surface hover:text-primary transition-colors font-medium"
              >
                {personal.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
