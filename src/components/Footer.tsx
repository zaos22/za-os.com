"use client";

import { portfolioContent } from "@/data/content";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { footer, personal } = portfolioContent;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full bg-surface-container-lowest mt-16 border-t border-outline-variant/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Role */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span
            translate="no"
            className="notranslate font-syne text-base font-bold text-on-surface tracking-tight"
          >
            {footer.title}
          </span>
          <p className="font-mono text-xs text-outline text-center md:text-left max-w-sm sm:max-w-none leading-relaxed break-words">
            {footer.role}
          </p>
        </div>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-on-surface-variant">
          <a
            href={`mailto:${personal.email}`}
            translate="no"
            className="notranslate interactive hover:text-primary transition-colors"
          >
            {personal.email}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            translate="no"
            className="notranslate interactive hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            translate="no"
            className="notranslate interactive hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="interactive flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
          >
            <span>{footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Copyright */}
        <div
          translate="no"
          className="notranslate font-mono text-xs text-outline text-center md:text-right"
        >
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
