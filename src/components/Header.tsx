"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioContent } from "@/data/content";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY <= 20);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 flex items-center justify-center pt-2 px-4 sm:px-6 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
        isVisible ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div
        className={`relative z-50 h-14 sm:h-16 w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between border rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${
          isAtTop && !mobileMenuOpen
            ? "opacity-95 bg-surface-container-lowest/90 backdrop-blur-xl border-outline-variant/35 shadow-md lg:landscape:opacity-20 lg:landscape:hover:opacity-100 lg:landscape:focus-within:opacity-100 lg:landscape:bg-surface-container-lowest/35 lg:landscape:hover:bg-surface-container-lowest/85 lg:landscape:focus-within:bg-surface-container-lowest/85 lg:landscape:backdrop-blur-md lg:landscape:hover:backdrop-blur-xl lg:landscape:border-outline-variant/15 lg:landscape:hover:border-outline-variant/40 lg:landscape:shadow-sm lg:landscape:hover:shadow-lg"
            : "opacity-100 bg-surface-container-lowest/95 lg:landscape:bg-surface-container-lowest/85 backdrop-blur-xl border-outline-variant/40 lg:landscape:border-outline-variant/30 shadow-lg"
        }`}
      >
        {/* Brand / Logo with Profile Photo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
          aria-label="Inicio del portafolio - Oussama Zazou"
        >
          <div className="relative w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-primary via-secondary-container to-accent-main overflow-hidden shadow-sm transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110">
            <Image
              src={portfolioContent.personal.profileImage}
              alt={portfolioContent.personal.name}
              width={32}
              height={32}
              className="w-full h-full rounded-full object-cover"
              priority
            />
          </div>
          <span
            translate="no"
            className="notranslate hidden sm:inline-block font-syne text-xs md:text-sm font-bold text-on-surface tracking-tight uppercase group-hover:text-primary transition-colors whitespace-nowrap"
          >
            {portfolioContent.nav.brandFullName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-8"
          aria-label="Navegación principal"
        >
          {portfolioContent.nav.links.map((link) => {
            const isProperNoun = link.label === "Google Analytics";
            return (
              <a
                key={link.href}
                href={link.href}
                translate={isProperNoun ? "no" : undefined}
                className={`font-inter text-xs lg:text-sm text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:text-primary whitespace-nowrap ${
                  isProperNoun ? "notranslate" : ""
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Language Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />

          <a
            href={portfolioContent.nav.ctaCv.href}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-inter text-xs font-semibold transition-all duration-200 motion-reduce:transition-none shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <span>{portfolioContent.nav.ctaCv.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-surface-container-lowest/75 backdrop-blur-sm md:hidden animate-fade-in motion-reduce:animate-none"
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-20 z-50 md:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border border-outline-variant/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 motion-reduce:transition-none">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-outline-variant/30">
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                Navegación
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface hover:text-primary transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Cerrar menú de navegación"
              >
                <span className="font-syne text-xs font-semibold">Cerrar</span>
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Menú móvil">
              {portfolioContent.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-syne text-base font-semibold text-on-surface hover:text-primary transition-colors py-2.5 border-b border-outline-variant/20 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-outline" />
                </a>
              ))}
              <a
                href={portfolioContent.nav.ctaCv.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-container text-on-primary-container font-syne text-sm font-semibold transition-colors min-h-[44px]"
              >
                <span>{portfolioContent.nav.ctaCv.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
