"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";
import Lightbox from "@/components/track-record/Lightbox";
import {
  ChevronDown, MapPin, Users, CheckCircle2, Maximize2,
} from "lucide-react";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PhotoGrid({ photos }: { photos: { src: string; alt: string }[] }) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const displayPhotos = showAll ? photos : photos.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {displayPhotos.map((photo, i) => (
          <motion.button
            key={photo.src + i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-emerald-500/30 transition-all duration-300"
          >
            <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-all duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
            </div>
          </motion.button>
        ))}
      </div>
      {photos.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          {showAll ? t("trackRecord.tampilkanSedikit") : t("trackRecord.tampilkanSemua", { n: photos.length })}
          <ChevronDown className={`h-3 w-3 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export function ArchiveIndex() {
  const { t } = useLanguage();
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([2019]));

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  return (
    <section id="archive-index" className="py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
            {t("trackRecord.arsipTitle")}
          </p>
          <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("trackRecord.arsipLabel")}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
            {t("trackRecord.arsipDesc")}
          </p>
        </div>

        <div className="space-y-6">
          {trackRecordData.map((yearData) => {
            const isOpen = expandedYears.has(yearData.year);
            return (
              <motion.div
                key={yearData.year}
                id={`chapter-${yearData.year}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: springEase }}
                className="rounded-[2.25rem] border border-white/5 bg-zinc-900/20 overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleYear(yearData.year)}
                  className="flex w-full items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/10 font-bold text-white">
                      {yearData.year}
                    </div>
                    <div>
                      <h3 className="text-xl font-normal text-white">
                        {yearData.year <= 2019
                          ? t("trackRecord.tahun", { year: yearData.year })
                          : t(yearData.activities[0]?.titleKey || yearData.activities[0]?.title) || t("trackRecord.tahun", { year: yearData.year })}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {yearData.activities.length} {t("trackRecord.kegiatan")} &middot;{' '}
                        {yearData.activities.reduce((sum, a) => sum + a.photos.length, 0)} {t("trackRecord.foto")}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 px-6 sm:px-8 pb-6 sm:pb-8">
                        {yearData.activities.map((activity) => (
                          <div key={activity.id} className="mt-6">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <h4 className="text-base font-semibold text-emerald-400">
                                {t(activity.titleKey || activity.title)}
                              </h4>
                              <div className="flex flex-wrap gap-2 shrink-0">
                                {activity.location && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-zinc-950/60 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                                    <MapPin className="h-2.5 w-2.5 text-emerald-400" />
                                    {activity.location}
                                  </span>
                                )}
                                {activity.role && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/15 bg-emerald-950/30 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                                    <Users className="h-2.5 w-2.5" />
                                    {activity.role}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                              {t(activity.narrativeKey || activity.narrative)}
                            </p>
                            {activity.highlights && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {activity.highlights.map((h) => (
                                  <span key={h} className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-zinc-950/40 px-3 py-1 text-[10px] font-medium text-zinc-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                    {h}
                                  </span>
                                ))}
                              </div>
                            )}
                            <PhotoGrid photos={activity.photos} />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
