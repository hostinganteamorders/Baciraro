"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function CEOSection() {
  const { t } = useLanguage();
  return (
    <section id="leadership" className="relative z-10 overflow-hidden py-20 text-white lg:py-24 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,120,92,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#D4785C]/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left: Photo + Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/Marlon.png"
                  alt="Marlon Kamagi"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-4 shadow-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4785C]">{t("ceoSection.label")}</p>
                <p className="mt-1 text-sm font-semibold text-white">Marlon Kamagi</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur-md shadow-lg w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
{t("leadership.ceoFallback")}
            </p>

            <blockquote className="mt-8">
              <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-zinc-200">
                &ldquo;{t("ceoSection.quote")}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#D4785C]/50" />
                <span className="text-xs text-zinc-500">{t("ceoSection.name")}</span>
              </footer>
            </blockquote>

            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              {t("ceoSection.bio")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:gap-3"
              >
                {t("ceoSection.bacaPerjalanan")}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                  <ArrowRight className="h-2.5 w-2.5 text-white" />
                </span>
              </Link>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-[#D4785C]/30"
              >
                {t("ceoSection.lihatLeadership")}
                <ArrowRight className="h-3 w-3 text-[#D4785C]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
