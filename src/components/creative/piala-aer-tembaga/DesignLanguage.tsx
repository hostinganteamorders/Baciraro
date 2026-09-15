"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pialaAerTembagaProject, projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const annotationPositions = [
  { top: "8%", left: "60%", lineEnd: "top: 15%; left: 52%;" },
  { top: "30%", right: "8%", lineEnd: "top: 35%; right: 18%;" },
  { top: "55%", left: "58%", lineEnd: "top: 50%; left: 48%;" },
  { top: "78%", right: "10%", lineEnd: "top: 72%; right: 20%;" },
];

export default function DesignLanguage() {
  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(52,211,153,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#34D399]">
            DESIGN LANGUAGE
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Four Elements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: image with annotations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: springEase }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={projectImages.emblemDetail}
                alt="Close-up detail emblem Bank Indonesia pada piala"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/40 to-transparent" />
            </div>

            {/* Annotation lines — decorative overlay */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {pialaAerTembagaProject.designAnnotations.map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: annotationPositions[i].top, left: annotationPositions[i].left || "auto", right: annotationPositions[i].right || "auto" }}
                >
                  <div className="h-px w-12 bg-[#F87171]/40" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: annotations */}
          <div className="flex flex-col justify-center gap-8">
            {pialaAerTembagaProject.designAnnotations.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: springEase }}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#F87171]/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#F87171]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#F4F1EA]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 ml-11 max-w-[45ch] text-sm leading-relaxed text-[#9CA3A0]">
                  {item.description}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: springEase }}
              className="mt-4 ml-11"
            >
              <p className="font-serif italic text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-[#F4F1EA]/80">
                {pialaAerTembagaProject.closingQuote}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
