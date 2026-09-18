"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaterialAsPattern() {
  const { materialPattern } = mataluntungProject;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Oversized headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <h2 className="font-serif text-[clamp(3rem,8vw,8rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white whitespace-pre-line">
            {materialPattern.headline}
          </h2>
        </motion.div>

        {/* Crop detail images — asymmetric */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
          {materialPattern.crops.map((crop, i) => (
            <motion.div
              key={crop.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: springEase }}
              className={`relative overflow-hidden ${i === 0 ? "sm:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={crop.src}
                  alt={crop.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
          className="mt-12 max-w-[60ch]"
        >
          {materialPattern.body.split("\n\n").map((p, i) => (
            <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
