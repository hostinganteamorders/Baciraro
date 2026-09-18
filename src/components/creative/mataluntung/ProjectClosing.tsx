"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectClosing() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width cinematic image */}
      <div className="relative h-[85vh] min-h-[500px]">
        <Image
          src={mataluntungProject.realContext.heroImage}
          alt="Tiga objek Mataluntung dalam konteks lifestyle"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/50 via-[#050806]/15 to-[#050806]" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white whitespace-pre-line"
            >
              {mataluntungProject.closingHeadline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
              className="mt-6 text-[15px] text-[#F4F1EA]/60 whitespace-pre-line"
            >
              {mataluntungProject.closingAttribution}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
