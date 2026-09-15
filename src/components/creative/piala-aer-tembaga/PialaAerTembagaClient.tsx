"use client";

import { useRef } from "react";
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

export default function PialaAerTembagaClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={pageRef}
      className="relative overflow-hidden text-[#F4F1EA] min-h-screen"
      style={{ background: "#050806" }}
    >
      <div aria-hidden="true" className="page-bg opacity-[0.03]" />
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

        {/* Sections */}
        <ProjectHero />
        <ProjectMeta />
        <ProjectIntro />
        <ProjectBrief />
        <ProcessStory />
        <DesignLanguage />
        <MaterialPalette />
        <CircularFlow />
        <ProjectDocumentation />
        <DetailsGallery />
        <FinalObjects />
        <ProjectArchive />
        <ProjectClosing />
        <ProjectCTA />
      </div>
    </main>
  );
}
