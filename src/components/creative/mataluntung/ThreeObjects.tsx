"use client";

import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ThreeObjects() {
  const { threeObjects } = mataluntungProject;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Editorial flow */}
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          {threeObjects.flow.map((item, i) => (
            <motion.div
              key={item.object}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: springEase }}
              className="flex items-center gap-4"
            >
              <span className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal text-white">
                {item.object}
              </span>
              <span className="text-[#F87171]/40">→</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]/70">
                {item.action}
              </span>
              {i < threeObjects.flow.length - 1 && (
                <span className="hidden sm:inline ml-4 text-[#9CA3A0]/20">·</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: springEase }}
          className="mt-16"
        >
          <p className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white/90 whitespace-pre-line">
            {threeObjects.statement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
