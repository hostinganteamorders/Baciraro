"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProductAsbak() {
  const { asbak } = mataluntungProject;

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
            PRODUCT 03
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white whitespace-pre-line">
            {asbak.heading}
          </h2>
        </motion.div>

        {/* Main collection image — large, 70-85vw */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative mx-auto max-w-[85vw] overflow-hidden"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={asbak.collectionImage}
              alt={asbak.collectionAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 85vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/40 to-transparent" />

            {/* Micro labels */}
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-4">
              {asbak.microLabels.map((label) => (
                <span
                  key={label}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/60"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Square detail + body */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            className="relative overflow-hidden"
          >
            <div className="relative aspect-[1/1]">
              <Image
                src={asbak.squareImage}
                alt={asbak.squareAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
            className="flex flex-col justify-center"
          >
            {asbak.body.split("\n\n").map((p, i) => (
              <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
