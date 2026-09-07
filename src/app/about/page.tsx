"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Recycle, Users, Sprout, Cpu, MapPin, Handshake, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { trackRecordData } from "@/lib/track-record-data";
import { ecosystemRegionData, partnerCategories } from "@/lib/site-sections-data";
import type { TrackRecordActivity } from "@/lib/track-record-types";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const valueIcons = [Recycle, Users, Sprout, Cpu];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </p>
  );
}

function useRealStats() {
  return useMemo(() => {
    let activities = 0;
    let photos = 0;
    const locations = new Set<string>();
    for (const year of trackRecordData) {
      activities += year.activities.length;
      for (const a of year.activities) {
        photos += a.photos.length;
        if (a.location) locations.add(a.location);
      }
    }
    const partners = partnerCategories.reduce((sum, c) => sum + c.items.length, 0);
    return { years: trackRecordData.length, activities, photos, locations: locations.size, partners };
  }, []);
}

const timelinePhotoFallback: Record<number, string> = {
  2020: "/2020/IMG_20201121_132829.jpg",
};

function buildTimeline(): { year: number; activity: TrackRecordActivity; photo: { src: string; alt: string } }[] {
  return trackRecordData.map((year) => {
    const activity = year.activities.find((a) => a.featured) || year.activities[0];
    const fallback = timelinePhotoFallback[year.year];
    const photo = fallback
      ? { src: fallback, alt: activity.title }
      : activity.photos[0];
    return { year: year.year, activity, photo };
  });
}

export default function AboutPage() {
  const { t } = useLanguage();
  const stats = useRealStats();

  const timeline = buildTimeline();

  return (
    <main className="relative overflow-hidden text-foreground min-h-screen bg-background">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <Header subtitle={t("about.label")} />

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: springEase }}>
              <SectionLabel>{t("about.label")}</SectionLabel>
              <h1 className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("about.heroTitle")} <br />
                <span className="font-serif italic text-emerald-300">{t("about.heroTitleItalic")}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {t("about.heroDesc")}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.28em] text-zinc-500">
                {stats.years} {t("trackRecord.statTahun")} · {stats.activities}+ {t("trackRecord.statKegiatan")} · {stats.partners}+ {t("about.statMitra")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro — Ekosistem Terpadu */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <SectionLabel>{t("about.ekosistemLabel")}</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("about.ekosistemTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              {t("about.ekosistemDesc")}
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: springEase }}
                className="rounded-[1.75rem] border border-white/5 bg-black/25 p-6 text-sm leading-relaxed text-zinc-400 shadow-xl backdrop-blur-sm"
              >
                {t(`about.ekosistemItems.${i}`)}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Band — dari data real */}
        <section className="border-t border-white/5 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
              {[
                { value: stats.years, suffix: "", label: t("trackRecord.statTahun") },
                { value: stats.activities, suffix: "+", label: t("trackRecord.statKegiatan") },
                { value: stats.photos, suffix: "+", label: t("trackRecord.statFoto") },
                { value: stats.locations, suffix: "", label: t("trackRecord.statLokasi") },
                { value: stats.partners, suffix: "+", label: t("about.statMitra") },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: springEase }}
                  className="rounded-[1.75rem] border border-white/5 bg-black/25 p-6 text-center shadow-xl backdrop-blur-sm"
                >
                  <p className="font-serif text-[clamp(32px,4vw,44px)] font-normal text-emerald-400 tabular-nums">
                    {s.value.toLocaleString()}<span className="text-emerald-500/60">{s.suffix}</span>
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-semibold">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="border-t border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/5 bg-black/25 p-8 shadow-xl backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-normal text-white">{t("about.visi")}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {t("about.visiDesc")}
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/5 bg-black/25 p-8 shadow-xl backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-normal text-white">{t("about.misi")}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {t("about.misiDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perjalanan — dari data real */}
        <section id="sejarah" className="border-t border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <SectionLabel>{t("about.timelineLabel")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("about.timelineTitle")} <span className="font-serif italic text-emerald-300">{t("about.timelineTitleItalic")}</span>
              </h2>
            </div>
            <div className="relative mt-16">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent" />
              <div className="space-y-14">
                {timeline.map(({ year, activity, photo }, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative flex flex-col md:flex-row items-start gap-6 pl-14 md:pl-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                  >
                    <div className="absolute left-5 md:left-1/2 top-2 h-5 w-5 -translate-x-1/2 rounded-full border border-emerald-500/30 bg-black flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </div>
                    {photo && (
                      <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5">
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{year}</span>
                      <h3 className="mt-1 text-lg font-semibold text-white">{t(activity.titleKey || activity.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {t(activity.narrativeKey || activity.narrative).split(". ").slice(0, 2).join(". ")}.
                      </p>
                      {activity.location && (
                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-zinc-500">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 flex justify-center">
                <Link
                  href="/track-record"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-white/30"
                >
                  {t("about.lihatPerjalanan")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Wilayah Kerja — dari data real */}
        <section className="border-t border-white/5 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <SectionLabel>{t("siteSections.ekosistem")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("siteSections.ekosistemTitle")}
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystemRegionData.map((region, i) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: springEase }}
                  className="rounded-[1.75rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 shrink-0">
                      <region.icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{region.titleKey ? t(region.titleKey) : region.region}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {region.pointsKey?.[0] ? t(region.pointsKey[0]) : region.points[0]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mitra — dari data real */}
        <section className="border-t border-white/5 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <SectionLabel>{t("siteSections.mitra")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("siteSections.mitraTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">{t("siteSections.mitraDesc")}</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {partnerCategories.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: springEase }}
                  className="rounded-[1.75rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm"
                >
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
                    <Handshake className="h-4 w-4" />
                    {cat.titleKey ? t(cat.titleKey) : cat.category}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item, j) => (
                      <span
                        key={j}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-300"
                      >
                        {cat.itemKeys?.[j] ? t(cat.itemKeys[j]) : item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nilai */}
        <section className="border-t border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <SectionLabel>{t("about.nilaiLabel")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("about.nilaiTitle")}
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {valueIcons.map((Icon, i) => (
                <div key={i} className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{t(`about.values.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(`about.values.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <SectionLabel>{t("about.kolaborasiLabel")}</SectionLabel>
            <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl">
              {t("about.kolaborasiTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              {t("about.kolaborasiDesc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg hover:bg-zinc-100"
              >
                {t("about.hubungiKami")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </Link>
              <Link
                href="/track-record"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-white/30"
              >
                {t("about.lihatPerjalanan")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-white/30"
              >
                {t("about.lihatLeadership")}
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
