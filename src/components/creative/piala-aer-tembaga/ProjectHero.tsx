"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { pialaAerTembagaProject, projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src={projectImages.hero}
          alt="Piala Aer Tembaga dari material plastik daur ulang untuk Bank Indonesia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/70 via-[#050806]/30 to-[#050806]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: springEase }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F87171]"
        >
          {pialaAerTembagaProject.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
          className="mt-4 font-serif text-[clamp(3rem,9vw,9rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
        >
          {pialaAerTembagaProject.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
          className="mt-3 text-sm text-[#F4F1EA]/70"
        >
          {pialaAerTembagaProject.clientLine}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: springEase }}
          className="mt-6 max-w-2xl font-serif italic text-[clamp(1.2rem,2.5vw,1.8rem)] leading-snug text-white/90"
        >
          {pialaAerTembagaProject.headline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: springEase }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {pialaAerTembagaProject.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#F4F1EA]/70"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-[#9CA3A0]/50"
        />
      </motion.div>
    </section>
  );
}
