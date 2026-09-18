"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProjectHero from "@/components/creative/piala-aer-tembaga/ProjectHero";
import ProjectIntro from "@/components/creative/piala-aer-tembaga/ProjectIntro";
import ProjectMeta from "@/components/creative/piala-aer-tembaga/ProjectMeta";
import ProjectBrief from "@/components/creative/piala-aer-tembaga/ProjectBrief";
import ProcessStory from "@/components/creative/piala-aer-tembaga/ProcessStory";
import DesignLanguage from "@/components/creative/piala-aer-tembaga/DesignLanguage";
import MaterialPalette from "@/components/creative/piala-aer-tembaga/MaterialPalette";
import CircularFlow from "@/components/creative/piala-aer-tembaga/CircularFlow";
import ProjectDocumentation from "@/components/creative/piala-aer-tembaga/ProjectDocumentation";
import DetailsGallery from "@/components/creative/piala-aer-tembaga/DetailsGallery";
import FinalObjects from "@/components/creative/piala-aer-tembaga/FinalObjects";
import ProjectArchive from "@/components/creative/piala-aer-tembaga/ProjectArchive";
import ProjectClosing from "@/components/creative/piala-aer-tembaga/ProjectClosing";
import ProjectCTA from "@/components/creative/piala-aer-tembaga/ProjectCTA";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navItems = [
  { label: "STORY", id: "story" },
  { label: "MATERIAL", id: "material" },
  { label: "MAKING", id: "making" },
  { label: "OBJECT", id: "object" },
];

export default function PialaAerTembagaClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const [activeSection, setActiveSection] = useState("story");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative overflow-hidden text-[#F4F1EA] min-h-screen"
    >
      <div aria-hidden="true" className="page-bg" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-[0.08]" />
      <div className="relative z-[1]">
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gradient-to-r from-[#F87171] to-[#34D399] origin-left"
          style={{ scaleX: pageProgress }}
        />

        {/* Sticky back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: springEase }}
          className="fixed top-5 left-4 z-40 md:left-6"
        >
          <Link
            href="/creative"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#050806]/80 px-3.5 py-2 text-xs text-[#9CA3A0] backdrop-blur-xl transition-all hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        </motion.div>

        {/* Desktop sidebar navigation */}
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-6">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1, ease: springEase }}
                onClick={() => scrollTo(item.id)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? "text-[#34D399]" : "text-[#9CA3A0]/50 group-hover:text-white/70"}`}>
                  {item.label}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-[#34D399]" : "bg-[#9CA3A0]/30"}`} />
              </motion.button>
            );
          })}
        </nav>

        {/* Sections */}
        <div id="story">
          <ProjectHero />
          <ProjectMeta />
          <ProjectIntro />
          <ProjectBrief />
          <ProcessStory />
        </div>
        <div id="material">
          <DesignLanguage />
          <MaterialPalette />
        </div>
        <div id="making">
          <CircularFlow />
          <ProjectDocumentation />
          <DetailsGallery />
        </div>
        <div id="object">
          <FinalObjects />
          <ProjectArchive />
        </div>
        <ProjectClosing />
        <ProjectCTA />
      </div>
    </main>
  );
}
