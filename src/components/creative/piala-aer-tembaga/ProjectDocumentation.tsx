"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projectImages, pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectDocumentation() {
  const { impact } = pialaAerTembagaProject;

  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: springEase }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={projectImages.weighing}
                alt="Dokumentasi proses penimbangan material piala daur ulang"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 to-transparent" />
            {/* Micro caption on photo */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/40">
                Documented batch weighing — 2.078 g
              </span>
            </div>
          </motion.div>

          {/* Text + Impact stat */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/60">
                DOCUMENTATION
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                Documenting the Making Process
              </h2>
            </motion.div>

            {/* Impact stat — big highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
              className="mt-8"
            >
              <div className="border-l-2 border-[#0076C8] pl-6">
                <p className="font-serif text-[clamp(3rem,6vw,5rem)] font-normal leading-none tracking-[-0.03em] text-white">
                  {impact.plasticWeight}{" "}
                  <span className="text-[0.5em] text-[#9CA3A0]">{impact.unit}</span>
                </p>
                <p className="mt-2 text-sm text-[#0076C8]">
                  {impact.bottleEquiv}
                </p>
                <p className="mt-1 text-xs text-[#9CA3A0]/60">
                  {impact.label}
                </p>
              </div>
            </motion.div>

            {/* Frames counter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F87171]/20 bg-[#F87171]/5">
                <span className="font-serif text-lg text-[#F87171]">
                  {pialaAerTembagaProject.documentedFrames}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Project Frames</p>
                <p className="text-xs text-[#9CA3A0]">Making process documented</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
