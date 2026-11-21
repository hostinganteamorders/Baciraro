"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  projectImages,
  pialaAerTembagaProject,
} from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectClosing() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width cinematic image — taller */}
      <div className="relative h-[85vh] min-h-[500px]">
        <Image
          src={projectImages.trophyInHand}
          alt="Piala Aer Tembaga dari material plastik daur ulang"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/15 to-background" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white whitespace-pre-line"
            >
              {pialaAerTembagaProject.finalHeadline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
              className="mt-4 text-[15px] text-foreground/60"
            >
              {pialaAerTembagaProject.finalSubheadline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Closing body */}
      <div className="px-4 py-20 sm:px-6 md:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[60ch]">
          {pialaAerTembagaProject.closingFinalBody
            .split("\n\n")
            .map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: springEase,
                }}
                className="text-base leading-8 text-mute mb-5 last:mb-0"
              >
                {p}
              </motion.p>
            ))}
        </div>
      </div>
    </section>
  );
}
