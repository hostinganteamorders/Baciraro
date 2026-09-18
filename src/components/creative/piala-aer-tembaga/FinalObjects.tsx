"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  projectImages,
  pialaAerTembagaProject,
} from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FinalObjects() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,118,200,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Headline — oversized reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F87171]">
            FINAL OBJECTS
          </p>
          <h2 className="mt-3 font-serif text-[clamp(3rem,8vw,8rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white whitespace-pre-line">
            {"The\nFinal\nObjects"}
          </h2>
        </motion.div>

        {/* Cinematic hero image — 21:9 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative aspect-[21/9] overflow-hidden"
        >
          <Image
            src={projectImages.hero}
            alt="Tiga piala Aer Tembaga final dari material plastik daur ulang"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/40 to-transparent" />
        </motion.div>

        {/* Secondary images — asymmetric */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={projectImages.trophyInHand}
              alt="Piala Aer Tembaga dipegang oleh tangan"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
            className="relative aspect-[4/3] overflow-hidden sm:mt-12"
          >
            <Image
              src={projectImages.finalGroup}
              alt="Komposisi tiga piala final Bank Indonesia"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Award levels — typography, not cards */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
          {pialaAerTembagaProject.awardLevels.map((level, i) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: springEase }}
            >
              <span className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-normal text-[#F87171]/60">
                {level}
              </span>
              {i < pialaAerTembagaProject.awardLevels.length - 1 && (
                <span className="hidden sm:inline ml-8 text-[#9CA3A0]/30">·</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
