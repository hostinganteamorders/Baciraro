"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { ArrowRight, ScrollText } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { YearScrubber } from "./YearScrubber";

export function CinematicHero({ onExploreStory, onBrowseArchive }: { onExploreStory?: () => void; onBrowseArchive?: () => void }) {
  const { t } = useLanguage();
  const featuredPhotos = trackRecordData.flatMap((y) =>
    y.activities.filter((a) => a.featured).flatMap((a) => a.photos)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeYear, setActiveYear] = useState(2026);

  const years = trackRecordData.map((y) => y.year);

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`chapter-${year}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveYear(year);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredPhotos.length]);

  const totalActivities = trackRecordData.reduce((s, y) => s + y.activities.length, 0);
  const totalPhotos = trackRecordData.reduce((s, y) => s + y.activities.reduce((a, b) => a + b.photos.length, 0), 0);
  const totalLocations = new Set(
    trackRecordData.flatMap((y) => y.activities.map((a) => a.location).filter(Boolean))
  ).size;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={featuredPhotos[currentIndex]?.src || "/Baciraro cap.png"}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08),_transparent_50%)]" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("trackRecord.heroTitle")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-6xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-[-0.05em] text-white"
          >
            Baciraro
            <br />
            <span className="text-emerald-400">{t("trackRecord.heroTitle")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl leading-relaxed text-zinc-300 max-w-2xl"
          >
            {years[0]}–{years[years.length - 1]} &middot; {totalActivities} {t("trackRecord.kegiatan")} &middot;{" "}
            {totalLocations} {t("trackRecord.wilayah")} &middot; {totalPhotos} {t("trackRecord.foto")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-2 text-base text-zinc-500 max-w-xl"
          >
            {t("trackRecord.heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={onExploreStory}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg hover:shadow-xl"
            >
              <ScrollText className="h-4 w-4" />
              {t("trackRecord.jelajahiCerita")}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </button>
            <button
              onClick={onBrowseArchive}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
            >
              {t("trackRecord.jelajahiArsip")}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
        <YearScrubber
          years={years}
          activeYear={activeYear}
          onYearChange={scrollToYear}
        />
      </div>
    </section>
  );
}
