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
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/15 to-background" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: springEase }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent"
        >
          {pialaAerTembagaProject.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
          className="mt-4 font-serif text-[clamp(4.5rem,9vw,9rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
        >
          {pialaAerTembagaProject.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
          className="mt-3 text-[15px] text-foreground/70"
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
          className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50"
        >
          <span>Custom Trophy</span>
          <span className="w-1 h-1 rounded-full bg-accent/50" />
          <span>Recycled Plastic</span>
          <span className="w-1 h-1 rounded-full bg-accent/50" />
          <span>Circular Design</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-mute">
          Scroll
        </span>
        <div className="h-8 w-px bg-mute/40" />
      </motion.div>
    </section>
  );
}
