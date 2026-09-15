"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  projectImages,
  pialaAerTembagaProject,
} from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectClosing() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width cinematic image */}
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src={projectImages.trophyInHand}
          alt="Piala Aer Tembaga dari material plastik daur ulang"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/60 via-[#050806]/20 to-[#050806]" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="font-serif text-[clamp(2rem,5vw,5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white whitespace-pre-line"
            >
              {pialaAerTembagaProject.finalHeadline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
              className="mt-4 text-sm text-[#F4F1EA]/60"
            >
              {pialaAerTembagaProject.finalSubheadline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Closing body */}
      <div className="px-4 py-16 sm:px-6 md:px-8 sm:py-24">
        <div className="mx-auto max-w-[60ch]">
          {pialaAerTembagaProject.closingFinalBody
            .split("\n\n")
            .map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: springEase,
                }}
                className="text-sm leading-7 text-[#9CA3A0] sm:text-base mb-4 last:mb-0"
              >
                {p}
              </motion.p>
            ))}
        </div>
      </div>
    </section>
  );
}
