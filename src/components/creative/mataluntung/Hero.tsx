"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { mataluntungProject, projectImages } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  return (
    <section ref={ref} className="relative h-[95svh] overflow-hidden">
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src={projectImages.hero}
          alt="Koleksi Mataluntung — ganci, coaster, dan asbak dari material plastik daur ulang"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/45 via-[#050806]/10 to-[#050806]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050806] to-transparent" />

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
          {mataluntungProject.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
          className="mt-4 font-serif text-[clamp(4rem,9vw,9rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
        >
          {mataluntungProject.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
          className="mt-3 text-[15px] text-[#F4F1EA]/70"
        >
          {mataluntungProject.clientLine}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: springEase }}
          className="mt-6 max-w-2xl font-serif italic text-[clamp(1.2rem,2.5vw,1.8rem)] leading-snug text-white/90 whitespace-pre-line"
        >
          {mataluntungProject.headline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: springEase }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/50"
        >
          {mataluntungProject.tags.map((tag, i) => (
            <span key={tag.label} className="flex items-center gap-3">
              <span>{tag.label}</span>
              {tag.separator && (
                <span className="text-[#F87171]/40">{tag.separator}</span>
              )}
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
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]">
          Scroll
        </span>
        <div className="h-8 w-px bg-[#9CA3A0]/40" />
      </motion.div>
    </section>
  );
}
