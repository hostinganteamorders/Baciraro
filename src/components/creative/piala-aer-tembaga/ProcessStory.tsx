"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";
import ProcessStep from "./ProcessStep";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProcessStory() {
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative" ref={progressRef}>
      {/* Progress line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
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
