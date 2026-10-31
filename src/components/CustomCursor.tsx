"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Strictly restrict to desktop PC with true mouse/trackpad (no touch / coarse screens)
    const checkIsDesktopPC = () => {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isTouch =
        "ontouchstart" in window ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      const isWideScreen = window.innerWidth >= 1024;

      return (
        hasHover &&
        hasFinePointer &&
        !isCoarse &&
        !isTouch &&
        isWideScreen &&
        !prefersReducedMotion
      );
    };

    if (!checkIsDesktopPC()) {
      return;
    }

    let active = true;
    requestAnimationFrame(() => {
      if (active) {
        setIsEnabled(true);
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // If user touches the screen at any moment, immediately disable custom cursor
    const handleTouch = () => {
      if (active) {
        setIsEnabled(false);
        setIsVisible(false);
      }
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, .interactive"
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      active = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className="custom-cursor-element fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary pointer-events-none z-[9999] transition-transform duration-75 ease-out shadow-[0_0_10px_rgba(77,142,255,0.8)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
      {/* Expanding Ambient Ring */}
      <div
        className={`custom-cursor-element fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/40 transition-all duration-200 ease-out ${
          isHovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-primary/10 border-primary scale-110 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            : "w-7 h-7 -ml-3.5 -mt-3.5 opacity-60"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
}
