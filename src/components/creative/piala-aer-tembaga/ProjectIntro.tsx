"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pialaAerTembagaProject, projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectIntro() {
  const paragraphs = pialaAerTembagaProject.introBody.split("\n\n");

  return (
    <section className="relative border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative h-[50vh] lg:h-auto lg:min-h-[80vh] overflow-hidden">
          <Image
            src={projectImages.trophyInHand}
            alt="Piala Aer Tembaga dari material plastik daur ulang dipegang oleh tangan"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#050806]/60 lg:via-[#050806]/10 lg:to-transparent" />
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
              {pialaAerTembagaProject.introHeading}
            </h2>
          </motion.div>

          <div className="mt-8 space-y-5 max-w-[55ch]">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: springEase }}
                className="text-sm leading-7 text-[#9CA3A0] sm:text-base"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
