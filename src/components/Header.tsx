"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioContent } from "@/data/content";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 flex items-center justify-center pt-2 px-3 sm:px-6 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div className="h-16 w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Brand / Logo */}
        <Link
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
          aria-label="Inicio del portafolio"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high font-syne text-sm font-bold text-primary tracking-tight transition-transform duration-300 group-hover:scale-105 border border-primary/20">
            {portfolioContent.nav.brand}
          </span>
          <span className="hidden sm:inline-block font-syne text-xs md:text-sm font-bold text-on-surface tracking-tight uppercase group-hover:text-primary transition-colors">
            {portfolioContent.nav.brandFullName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Navegación principal"
        >
          {portfolioContent.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-inter text-xs lg:text-sm text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Avatar */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioContent.nav.ctaCv.href}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-inter text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_16px_rgba(77,142,255,0.4)]"
          >
            <span>{portfolioContent.nav.ctaCv.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="relative w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr from-primary to-accent-main overflow-hidden shadow-sm">
            <Image
              src={portfolioContent.personal.profileImage}
              alt={portfolioContent.personal.profileImageAlt}
              width={32}
              height={32}
              className="w-full h-full rounded-full object-cover"
              priority
            />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-3 top-20 z-50 md:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border border-outline-variant/50 rounded-2xl p-6 shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-4" aria-label="Menú móvil">
            {portfolioContent.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-syne text-base font-semibold text-on-surface hover:text-primary transition-colors py-2 border-b border-outline-variant/20 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-outline" />
              </a>
            ))}
            <a
              href={portfolioContent.nav.ctaCv.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-container text-on-primary-container font-syne text-sm font-semibold transition-colors"
            >
              <span>{portfolioContent.nav.ctaCv.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
