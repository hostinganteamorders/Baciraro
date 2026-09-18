"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";
import ProcessStep from "./ProcessStep";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProcessStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative border-t border-white/5" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#34D399]">
            THE MAKING
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            From Caps to Trophy
          </h2>
        </motion.div>
      </div>

      {/* Progress line — desktop only */}
      <div className="absolute left-4 top-28 bottom-28 w-px bg-white/5 hidden lg:block">
        <motion.div
          className="w-full bg-gradient-to-b from-[#F87171] to-[#34D399]"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="lg:pl-12">
        {pialaAerTembagaProject.processSteps.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
