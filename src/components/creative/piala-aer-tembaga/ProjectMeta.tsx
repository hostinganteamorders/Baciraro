"use client";

import { motion } from "framer-motion";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const metaItems = [
  { label: "CLIENT", value: pialaAerTembagaProject.client },
  { label: "PROJECT", value: pialaAerTembagaProject.title },
  { label: "CATEGORY", value: pialaAerTembagaProject.category },
  { label: "MATERIAL", value: pialaAerTembagaProject.material },
  { label: "YEAR", value: String(pialaAerTembagaProject.year) },
  {
    label: "AWARD LEVELS",
    value: pialaAerTembagaProject.awardLevels.join(" · "),
  },
  {
    label: "DOCUMENTATION",
    value: `${pialaAerTembagaProject.documentedFrames} Project Frames`,
  },
];

export default function ProjectMeta() {
  return (
    <section className="border-t border-white/5 px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-x-8 gap-y-5 md:gap-x-12">
          {metaItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: springEase }}
              className="min-w-[120px]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]/60">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
