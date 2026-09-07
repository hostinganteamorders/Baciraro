"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projectDetailData } from "@/lib/site-sections-data";
import { MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function CaseStudyEditorial() {
  const { t } = useLanguage();
  return (
    <section id="case-studies" className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.04),_transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
            {t("trackRecord.studiKasus")}
          </p>
          <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("trackRecord.proyekUnggulan")}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
            {t("trackRecord.studiKasusDesc")}
          </p>
        </div>

        <div className="space-y-8">
          {projectDetailData.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: springEase }}
              className="group relative rounded-[2.25rem] border border-white/5 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10 p-6 sm:p-8 shadow-xl backdrop-blur-sm hover:border-emerald-500/20 transition-all duration-500"
            >
              <Link href={`/track-record/case-studies/${slugify(project.title)}`} className="flex items-start gap-4 sm:gap-6">
                <div className="inline-flex shrink-0 rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
                  <project.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="text-xl font-normal text-white group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  </div>
                  <p className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                    <MapPin className="h-3 w-3" />
                    {project.partner}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:gap-3 transition-all">
                    {t("trackRecord.studiKasusBaca")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
