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
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,118,200,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F87171]">
            FINAL OBJECTS
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            The Final Objects
          </h2>
        </motion.div>

        {/* Full-width hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative aspect-[16/9] overflow-hidden rounded-2xl"
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

        {/* Award levels */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {pialaAerTembagaProject.awardLevels.map((level, i) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: springEase }}
              className="text-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F87171]/70">
                {level}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Secondary images */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
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
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
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
      </div>
    </section>
  );
}
