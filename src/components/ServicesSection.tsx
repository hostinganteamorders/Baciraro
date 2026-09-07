"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, Factory, Building2, MapPin, Quote } from "lucide-react";

const TERRACOTTA = "#D4785C";

const SERVICES = [
  {
    titleKey: "perusahaan",
    icon: Factory,
    points: ["Program CSR pengelolaan sampah terukur", "Pelaporan dampak & dashboard digital", "Suvenir & plakat dari bahan daur ulang"],
    caseStudy: { partner: "BNI 46 Manado", result: "50+ ton sampah terkelola melalui program CSR bank sampah", badge: "CSR Tersertifikasi" },
    quote: "Kolaborasi dengan Baciraro membantu kami mewujudkan program TJSL yang terukur dan berdampak langsung.",
    href: "/track-record",
  },
  {
    titleKey: "pemerintah",
    icon: Building2,
    points: ["Penguatan layanan persampahan daerah", "Edukasi & pendampingan sistem digital", "Pemetaan timbulan sampah partisipatif"],
    caseStudy: { partner: "KKP & Kemenparekraf", result: "Program edukasi lingkungan di 5 desa wisata pesisir", badge: "Kemitraan Strategis" },
    quote: "Pendekatan Baciraro yang partisipatif sangat cocok untuk program pemberdayaan masyarakat pesisir.",
    href: "/track-record",
  },
  {
    titleKey: "desa",
    icon: MapPin,
    points: ["Model bank sampah terpadu", "Pelatihan pemilahan & daur ulang", "Akses pasar offtaker & produk kreatif"],
    caseStudy: { partner: "Desa Wisata Likupang", result: "Bank sampah aktif dengan 200+ nasabah dan produksi ecobrick", badge: "Dampak Lokal" },
    quote: "Baciraro membantu desa kami mengelola sampah jadi produk yang punya nilai jual.",
    href: "/tananyiurlestari",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 py-20 lg:py-24 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("services.label")}
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("services.title")}{" "}
            <span className="font-serif italic text-emerald-300">{t("services.titleItalic")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-[#D4785C]/20 hover:bg-black/30 hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl bg-[#D4785C]/10 p-3.5 text-[#D4785C] w-fit">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-normal text-white">{t("services." + service.titleKey + ".title")}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400 flex-1">
                  {service.points.map((_, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{t("services." + service.titleKey + ".points." + i)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4">
                  <div className="flex items-start gap-2">
                    <Quote className="h-3 w-3 text-[#D4785C] shrink-0 mt-0.5" />
                    <p className="text-xs italic leading-relaxed text-zinc-400">{t("services." + service.titleKey + ".quote")}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#D4785C]">{t("services." + service.titleKey + ".caseStudy.partner")}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 max-w-[180px]">{t("services." + service.titleKey + ".caseStudy.result")}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="rounded-full bg-[#D4785C]/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-[#D4785C]">
                      {t("services." + service.titleKey + ".caseStudy.badge")}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-zinc-500 group-hover:text-[#D4785C] transition-colors">
                  {t("services.lihatDetail")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
