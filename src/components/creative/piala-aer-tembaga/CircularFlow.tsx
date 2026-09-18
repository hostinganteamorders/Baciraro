"use client";

import { motion } from "framer-motion";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CircularFlow() {
  const steps = pialaAerTembagaProject.circularFlowSteps;
  const bodyParagraphs = pialaAerTembagaProject.closingBody.split("\n\n");

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(52,211,153,0.02),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#34D399]">
            CIRCULAR FLOW
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Material Journey
          </h2>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-center justify-between gap-3 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: springEase }}
              className="flex items-center gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/10 text-[11px] font-bold text-[#34D399]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-center text-[11px] font-bold uppercase tracking-wider text-[#F4F1EA]/70 max-w-[80px]">
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px w-10 bg-gradient-to-r from-[#34D399]/30 to-[#34D399]/10 mb-6" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="flex flex-col gap-4 md:hidden mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: springEase }}
              className="flex items-center gap-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/10 text-[11px] font-bold text-[#34D399]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#F4F1EA]/70">
                {step}
              </span>
              {i < steps.length - 1 && (
                <span className="ml-auto text-[#34D399]/30">↓</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Narrative */}
        <div className="max-w-[60ch]">
          {bodyParagraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: springEase }}
              className="text-base leading-8 text-[#9CA3A0] mb-4 last:mb-0"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Impact highlight — left border only, no card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: springEase }}
          className="mt-12 max-w-[60ch] border-l-2 border-[#0076C8] pl-6"
        >
          <p className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-none tracking-[-0.03em] text-white">
            {pialaAerTembagaProject.impact.plasticWeight}{" "}
            <span className="text-[0.4em] text-[#9CA3A0]">
              {pialaAerTembagaProject.impact.unit}
            </span>
          </p>
          <p className="mt-3 text-[15px] text-[#0076C8]">
            {pialaAerTembagaProject.impact.bottleEquiv} telah didaur ulang
            menjadi piala penghargaan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
