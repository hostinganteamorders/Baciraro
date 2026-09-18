"use client";

import { motion } from "framer-motion";
import { mataluntungProject } from "@/lib/creative-projects/mataluntung";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const metaItems = [
  { label: "CLIENT", value: mataluntungProject.client },
  { label: "CREATIVE", value: mataluntungProject.creative },
  { label: "PROJECT", value: mataluntungProject.projectType },
  { label: "PRODUCTS", value: mataluntungProject.products.join(" · ") },
  { label: "MATERIAL", value: mataluntungProject.material },
  { label: "YEAR", value: String(mataluntungProject.year) },
];

export default function ProjectSnapshot() {
  return (
    <section className="border-t border-white/5 px-4 py-12 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
          {metaItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: springEase }}
              className="min-w-[120px]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]/60">
                {item.label}
              </p>
              <p className="mt-1.5 text-[15px] font-medium text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
