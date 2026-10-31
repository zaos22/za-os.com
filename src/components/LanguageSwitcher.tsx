"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type LangCode = "en" | "es" | "de" | "fr" | "ar";

interface LanguageOption {
  code: LangCode;
  label: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

const STORAGE_KEY = "preferred_lang";

function FlagIcon({ code }: { code: LangCode }) {
  switch (code) {
    case "en":
      return (
        <svg viewBox="0 0 60 40" className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" aria-hidden="true">
          <rect width="60" height="40" fill="var(--flag-uk-blue)" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="var(--flag-white)" strokeWidth="6" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="var(--flag-uk-red)" strokeWidth="3.5" />
          <path d="M30,0 V40 M0,20 H60" stroke="var(--flag-white)" strokeWidth="10" />
          <path d="M30,0 V40 M0,20 H60" stroke="var(--flag-uk-red)" strokeWidth="6" />
        </svg>
      );
    case "es":
      return (
        <svg viewBox="0 0 60 40" className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" aria-hidden="true">
          <rect width="60" height="40" fill="var(--flag-es-red)" />
          <rect y="10" width="60" height="20" fill="var(--flag-es-yellow)" />
        </svg>
      );
    case "de":
      return (
        <svg viewBox="0 0 60 40" className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" aria-hidden="true">
          <rect width="60" height="13.33" fill="var(--flag-black)" />
          <rect y="13.33" width="60" height="13.33" fill="var(--flag-de-red)" />
          <rect y="26.66" width="60" height="13.34" fill="var(--flag-de-gold)" />
        </svg>
      );
    case "fr":
      return (
        <svg viewBox="0 0 60 40" className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" aria-hidden="true">
          <rect width="20" height="40" fill="var(--flag-fr-blue)" />
          <rect x="20" width="20" height="40" fill="var(--flag-white)" />
          <rect x="40" width="20" height="40" fill="var(--flag-fr-red)" />
        </svg>
      );
    case "ar":
      return (
        <svg viewBox="0 0 60 40" className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" aria-hidden="true">
          <rect width="60" height="40" fill="var(--flag-sa-green)" />
          <rect x="14" y="14" width="32" height="5" rx="1.5" fill="var(--flag-white)" opacity="0.9" />
          <rect x="18" y="23" width="24" height="2.5" rx="1.25" fill="var(--flag-white)" />
        </svg>
      );
  }
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              autoDisplay: boolean;
            },
            elementId: string
          ): unknown;
        };
      };
    };
  }
}

function setGoogTransCookie(targetLang: LangCode) {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;

  if (targetLang === "es") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
  } else {
    const cookieVal = `/es/${targetLang}`;
    document.cookie = `googtrans=${cookieVal}; path=/; SameSite=Lax`;
    if (hostname !== "localhost" && !/^(\d+\.){3}\d+$/.test(hostname)) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname}; SameSite=Lax`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${hostname}; SameSite=Lax`;
    }
  }
}

function triggerGoogleTranslate(targetLang: LangCode) {
  setGoogTransCookie(targetLang);

  const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;

  if (targetLang === "es") {
    // Restore original Spanish content
    const bannerIframe = document.querySelector(
      ".goog-te-banner-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd"
    ) as HTMLIFrameElement | null;
    if (bannerIframe?.contentDocument) {
      const restoreBtn =
        bannerIframe.contentDocument.getElementById(":1.restore") ||
        (bannerIframe.contentDocument.querySelector(".goog-close-link") as HTMLElement | null);
      if (restoreBtn) {
        restoreBtn.click();
        return;
      }
    }

    if (selectEl) {
      selectEl.value = "";
      selectEl.dispatchEvent(new Event("change"));
    }

    // If the document is still marked as translated by Google Translate, reload cleanly
    setTimeout(() => {
      if (
        document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl")
      ) {
        window.location.reload();
      }
    }, 150);
    return;
  }

  if (selectEl) {
    selectEl.value = targetLang;
    selectEl.dispatchEvent(new Event("change"));
  } else {
    // Wait briefly in case script is still initializing
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (combo) {
        combo.value = targetLang;
        combo.dispatchEvent(new Event("change"));
        clearInterval(interval);
      } else if (attempts >= 20) {
        clearInterval(interval);
      }
    }, 200);
  }
}

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState<LangCode>("en");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    const initialLang: LangCode =
      saved && LANGUAGES.some((l) => l.code === saved) ? saved : "en";

    setSelectedLang(initialLang);
    localStorage.setItem(STORAGE_KEY, initialLang);
    setGoogTransCookie(initialLang);

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,es,de,fr,ar",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        if (initialLang !== "es") {
          setTimeout(() => {
            triggerGoogleTranslate(initialLang);
          }, 300);
        }
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      triggerGoogleTranslate(initialLang);
    }

    const hideGoogleBanner = () => {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
      const banners = document.querySelectorAll<HTMLElement>(
        "body > .skiptranslate, iframe.goog-te-banner-frame, iframe.VIpgJd-ZVi9od-ORHb-OEVmcd, #goog-gt-tt"
      );
      banners.forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("height", "0px", "important");
      });
    };

    hideGoogleBanner();
    const observer = new MutationObserver(hideGoogleBanner);
    observer.observe(document.body, {
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (code: LangCode) => {
    setSelectedLang(code);
    localStorage.setItem(STORAGE_KEY, code);
    setIsOpen(false);
    triggerGoogleTranslate(code);
  };

  const currentOption = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative inline-block notranslate" translate="no">
      {/* Hidden container required by Google Translate */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Idioma: ${currentOption.label}`}
        title={currentOption.label}
        className="interactive inline-flex items-center justify-center gap-1 h-8 px-2 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <FlagIcon code={selectedLang} />
        <ChevronDown
          className={`w-3 h-3 text-on-surface-variant transition-transform duration-200 motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Seleccionar idioma"
          className="absolute right-0 mt-2 p-1 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/40 shadow-lg flex flex-col gap-1 z-50 min-w-[44px]"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === selectedLang;
            return (
              <li key={lang.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  aria-label={lang.label}
                  title={lang.label}
                  className={`interactive w-full flex items-center justify-center p-2 rounded-xl transition-colors duration-150 motion-reduce:transition-none ${
                    isSelected
                      ? "bg-primary-container/25 ring-1 ring-primary/50"
                      : "hover:bg-surface-container-high"
                  }`}
                >
                  <FlagIcon code={lang.code} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
