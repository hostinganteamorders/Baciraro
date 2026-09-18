"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaterialPalette() {
  const { materialPalette } = mataluntungProject;

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
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/70">
            MATERIAL PALETTE
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Color & Texture
          </h2>
        </motion.div>

        {/* Asymmetric moodboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-6 items-start">
          {/* Left: large first image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="group relative overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={materialPalette.groups[0].image}
                alt={materialPalette.groups[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]">
                {materialPalette.groups[0].label}
              </span>
            </div>
          </motion.div>

          {/* Right: stacked images */}
          <div className="flex flex-col gap-6">
            {materialPalette.groups.slice(1).map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: springEase }}
                className={`group relative overflow-hidden ${i === 0 ? "mt-8 lg:mt-16" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={group.image}
                    alt={group.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]">
                    {group.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
