"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh after fonts load
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
