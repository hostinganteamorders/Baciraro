"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pialaAerTembagaProject, projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectBrief() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,118,200,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <h2 className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
                The Brief
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
              className="mt-6 max-w-[55ch] font-serif italic text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-foreground/90"
            >
              {pialaAerTembagaProject.briefStatement}
            </motion.p>

            <div className="mt-10 space-y-8">
              {pialaAerTembagaProject.briefConcepts.map((concept, i) => (
                <motion.div
                  key={concept.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    ease: springEase,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[12px] font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.25em] text-white">
                      {concept.title}
                    </h3>
                  </div>
                  <p className="mt-2 ml-11 text-[15px] leading-relaxed text-mute">
                    {concept.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: image — no rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
            className="relative overflow-hidden lg:mt-16"
          >
            <div className="relative aspect-[3/5]">
              <Image
                src={projectImages.emblemDetail}
                alt="Close-up emblem Bank Indonesia pada piala daur ulang"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                Bank Indonesia Identity Detail
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
