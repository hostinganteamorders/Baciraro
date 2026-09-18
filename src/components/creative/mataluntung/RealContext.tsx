"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RealContext() {
  const { realContext } = mataluntungProject;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <h2 className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            {realContext.heading}
          </h2>
        </motion.div>

        {/* Hero lifestyle image — large */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative aspect-[21/9] overflow-hidden"
        >
          <Image
            src={realContext.heroImage}
            alt={realContext.heroAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/40 to-transparent" />
        </motion.div>

        {/* Two smaller images */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {realContext.images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: springEase }}
              className="relative overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
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
          transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
          className="mt-12 max-w-[60ch]"
        >
          {realContext.body.split("\n\n").map((p, i) => (
            <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
