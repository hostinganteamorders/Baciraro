"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProductGanci() {
  const { ganci } = mataluntungProject;

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
            PRODUCT 01
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white whitespace-pre-line">
            {ganci.heading}
          </h2>
        </motion.div>

        {/* Main image with subtle secondary overlap */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: springEase }}
            className="relative aspect-[4/5] overflow-hidden lg:aspect-[16/10]"
          >
            <Image
              src={ganci.mainImage}
              alt={ganci.mainAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 to-transparent" />

            {/* Micro captions */}
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-4">
              {ganci.microCaptions.map((caption) => (
                <span
                  key={caption}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/60"
                >
                  {caption}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Secondary image — overlap on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: springEase }}
            className="relative -mt-16 ml-auto w-2/3 overflow-hidden sm:w-1/2 lg:-mt-24 lg:w-2/5"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={ganci.secondaryImage}
                alt={ganci.secondaryAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 35vw"
              />
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
          {ganci.body.split("\n\n").map((p, i) => (
            <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
