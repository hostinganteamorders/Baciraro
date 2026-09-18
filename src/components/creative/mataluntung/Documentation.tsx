"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Documentation() {
  const { documentation } = mataluntungProject;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image — smaller, documentary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: springEase }}
            className="relative overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={documentation.image}
                alt={documentation.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/40 to-transparent" />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/70">
                DOCUMENTATION
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white whitespace-pre-line">
                {documentation.heading}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
              className="mt-6"
            >
              {documentation.body.split("\n\n").map((p, i) => (
                <p key={i} className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
