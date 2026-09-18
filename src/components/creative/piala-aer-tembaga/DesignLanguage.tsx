"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pialaAerTembagaProject, projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const annotationPositions = [
  { top: "12%", left: "55%" },
  { top: "35%", left: "60%" },
  { top: "58%", left: "52%" },
  { top: "80%", left: "58%" },
];

const lineDirections = [
  { width: "w-16", x: -64, y: 0 },
  { width: "w-12", x: -48, y: 0 },
  { width: "w-14", x: -56, y: 0 },
  { width: "w-10", x: -40, y: 0 },
];

export default function DesignLanguage() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(52,211,153,0.02),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#34D399]">
            DESIGN LANGUAGE
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Four Elements
          </h2>
        </motion.div>

        {/* Full-width image with annotation lines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative aspect-[16/9] overflow-hidden"
        >
          <Image
            src={projectImages.emblemDetail}
            alt="Close-up detail emblem Bank Indonesia pada piala"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-[#050806]/20" />

          {/* Annotation lines — desktop overlay */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {pialaAerTembagaProject.designAnnotations.map((annotation, i) => (
              <motion.div
                key={annotation.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: springEase }}
                className="absolute group"
                style={{ top: annotationPositions[i].top, left: annotationPositions[i].left }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-px ${lineDirections[i].width} bg-[#F87171]/40`} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA] whitespace-nowrap">
                    {annotation.title}
                  </span>
                </div>
                <p className="mt-1 ml-[calc(100%+12px)] max-w-[35ch] text-[13px] leading-relaxed text-[#9CA3A0]/70">
                  {annotation.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: annotation list below image */}
        <div className="mt-10 flex flex-col gap-8 lg:hidden">
          {pialaAerTembagaProject.designAnnotations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: springEase }}
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#F87171]/40" />
                <h3 className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#F4F1EA]">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 ml-11 max-w-[45ch] text-[15px] leading-relaxed text-[#9CA3A0]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
          className="mt-12 max-w-[55ch]"
        >
          <p className="font-serif italic text-[clamp(1.3rem,2.5vw,2rem)] leading-snug text-[#F4F1EA]/80">
            {pialaAerTembagaProject.closingQuote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
