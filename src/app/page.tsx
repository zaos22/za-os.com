import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubSection from "@/components/GithubSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -left-48 w-[480px] h-[480px] bg-secondary-container/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <Header />

      <main className="relative z-10 w-full pt-16 flex flex-col items-center">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AnalyticsSection />
        <ProjectsSection />
        <GithubSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
