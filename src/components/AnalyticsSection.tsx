"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioContent } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, CheckCircle2, LayoutDashboard, ExternalLink } from "lucide-react";

export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.4s ease-out",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Card Soft Zoom in
    if (cardRef.current && sectionRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.95,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Abstract Bar Chart sequential animation
    if (barsRef.current && sectionRef.current) {
      const bars = barsRef.current.querySelectorAll(".abstract-chart-bar");
      gsap.fromTo(
        bars,
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: barsRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  // 3D Tilt on Certificate Badge
  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = badgeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 14;
    const rotateY = (x / (rect.width / 2)) * 14;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.08s ease-out",
    });
  };

  const handleBadgeMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  const analyticsData = portfolioContent.analytics;

  return (
    <section
      ref={sectionRef}
      id="google-analytics"
      className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20"
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl bg-surface-container-lowest/90 border border-outline-variant/40 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl"
      >
        {/* Glow Ambient Backdrop */}
        <div
          className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Official Google Credential Card */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-surface-container/70 border border-outline-variant/50 p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              {/* Badge with 3D Tilt Hover and Conic Gradient Ring */}
              <div
                ref={badgeRef}
                onMouseMove={handleBadgeMouseMove}
                onMouseLeave={handleBadgeMouseLeave}
                style={tiltStyle}
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-highest p-1 shadow-inner cursor-pointer will-change-transform shrink-0"
              >
                <div
                  className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-[#EA4335] via-[#4285F4] to-[#34A853]"
                  aria-hidden="true"
                />
                <div className="relative w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
                  <Award className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest border border-outline-variant/40 font-mono text-[10px] text-primary uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{analyticsData.badge}</span>
                </span>
                <h3 className="font-syne text-lg sm:text-xl font-bold text-on-surface mt-1.5">
                  {analyticsData.title}
                </h3>
                <p className="font-mono text-xs text-outline">{analyticsData.issuer}</p>
              </div>
            </div>

            {/* Official Certification Metadata */}
            <div className="rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 p-4 font-mono text-xs space-y-2.5 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-outline">Emitido:</span>
                <span className="text-on-surface font-medium">{analyticsData.issueDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline">Válido hasta:</span>
                <span className="text-on-surface font-medium">{analyticsData.expiryDate}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/20">
                <span className="text-outline">ID de certificado:</span>
                <span className="text-primary font-bold">{analyticsData.certId}</span>
              </div>
            </div>

            {/* Action: Verify Certificate */}
            <a
              href={analyticsData.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="interactive w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary-container font-syne text-xs sm:text-sm font-semibold transition-all duration-200 shadow-[0_0_16px_rgba(77,142,255,0.3)] hover:-translate-y-0.5"
            >
              <span>{analyticsData.ctaVerify}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Technical Value & Abstract Animated Chart */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="font-syne text-xl sm:text-2xl font-bold text-on-surface mb-2">
                {analyticsData.valueHeading}
              </h4>
              <p className="font-inter text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
                {analyticsData.valueDescription}
              </p>

              {/* Exact Verified 3 Bullet Points */}
              <ul className="space-y-3 font-inter text-sm sm:text-base text-on-surface">
                {analyticsData.valuePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Complementary Tool Callout */}
              <div className="mt-6 p-3.5 rounded-xl bg-surface-container/40 border border-outline-variant/30 font-mono text-xs text-outline flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-primary shrink-0" />
                <span>{analyticsData.complementaryTool}</span>
              </div>
            </div>

            {/* Abstract Dashboard Chart without Fake Data */}
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-4">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-outline uppercase tracking-wider">
                <span>{analyticsData.chartTitle}</span>
                <span className="w-2 h-2 rounded-full bg-primary" />
              </div>

              {/* Bars scaled strictly visually without numerical claims */}
              <div
                ref={barsRef}
                className="h-24 w-full flex items-end justify-between gap-2 sm:gap-3 px-2 pb-1 border-b border-outline-variant/30"
              >
                <div className="abstract-chart-bar w-full bg-primary/20 rounded-t h-[45%]" />
                <div className="abstract-chart-bar w-full bg-primary/40 rounded-t h-[70%]" />
                <div className="abstract-chart-bar w-full bg-primary/60 rounded-t h-[55%]" />
                <div className="abstract-chart-bar w-full bg-primary/30 rounded-t h-[85%]" />
                <div className="abstract-chart-bar w-full bg-primary/80 rounded-t h-[65%]" />
                <div className="abstract-chart-bar w-full bg-primary rounded-t h-[95%]" />
                <div className="abstract-chart-bar w-full bg-secondary-container rounded-t h-[50%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
