"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projectImages, pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectDocumentation() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image — larger, no rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: springEase }}
            className="relative overflow-hidden"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={projectImages.weighing}
                alt="Dokumentasi proses penimbangan material piala daur ulang"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                Documented batch weighing — 2.078 g
              </span>
            </div>
          </motion.div>

          {/* Text + Frames counter */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mute/70">
                DOCUMENTATION
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
                Documenting the Process
              </h2>
            </motion.div>

            {/* Frames counter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
              className="mt-10 flex items-center gap-5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                <span className="font-serif text-xl text-accent">
                  {pialaAerTembagaProject.documentedFrames}
                </span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-white">Project Frames</p>
                <p className="text-[13px] text-mute">Making process documented</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
