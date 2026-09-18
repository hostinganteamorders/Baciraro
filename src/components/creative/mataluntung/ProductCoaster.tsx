"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProductCoaster() {
  const { coaster } = mataluntungProject;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F87171]">
            PRODUCT 02
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white whitespace-pre-line">
            {coaster.heading}
          </h2>
        </motion.div>

        {/* Visual sequence: OBJECT → MATERIAL → IN USE */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {/* OBJECT — material hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={coaster.materialImage}
                alt={coaster.materialAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 to-transparent" />
            </div>
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#34D399]">
                {coaster.sequence[0]}
              </span>
            </div>
          </motion.div>

          {/* MATERIAL — warm detail */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            className="relative lg:mt-12"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={coaster.warmImage}
                alt={coaster.warmAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 to-transparent" />
            </div>
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#34D399]">
                {coaster.sequence[1]}
              </span>
            </div>
          </motion.div>

          {/* IN USE — functional proof */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
            className="relative lg:mt-24"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={coaster.useImage}
                alt={coaster.useAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 to-transparent" />
            </div>
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#34D399]">
                {coaster.sequence[2]}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
          className="mt-12 max-w-[55ch]"
        >
          {coaster.body.split("\n\n").map((p, i) => (
            <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
