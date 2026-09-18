"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaterialPalette() {
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
        <div className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-6 items-start">
          {/* Left: large blue image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="group relative overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={pialaAerTembagaProject.materialPaletteItems[0].image}
                alt={pialaAerTembagaProject.materialPaletteItems[0].imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]">
                {pialaAerTembagaProject.materialPaletteItems[0].label}
              </span>
            </div>
          </motion.div>

          {/* Right: stacked images */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
              className="group relative overflow-hidden mt-8 lg:mt-16"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pialaAerTembagaProject.materialPaletteItems[1].image}
                  alt={pialaAerTembagaProject.materialPaletteItems[1].imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]">
                  {pialaAerTembagaProject.materialPaletteItems[1].label}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pialaAerTembagaProject.materialPaletteItems[2].image}
                  alt={pialaAerTembagaProject.materialPaletteItems[2].imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]">
                  {pialaAerTembagaProject.materialPaletteItems[2].label}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
