"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pialaAerTembagaProject } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectCTA() {
  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(52,211,153,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white"
        >
          {pialaAerTembagaProject.ctaHeading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
          className="mt-4 mx-auto max-w-[55ch] text-sm leading-relaxed text-[#9CA3A0] sm:text-base"
        >
          {pialaAerTembagaProject.ctaBody}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#F4F1EA] px-7 py-3 text-sm font-medium text-[#050806] transition-all hover:bg-white hover:gap-4"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/creative"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-[#F4F1EA]/70 backdrop-blur transition-all hover:border-[#34D399]/30 hover:text-white"
          >
            Explore Baciraro Creative
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Footer signature */}
      <div className="relative mt-24 border-t border-white/5 px-4 py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/40">
          © {pialaAerTembagaProject.year} {pialaAerTembagaProject.brand}
        </p>
      </div>
    </section>
  );
}
