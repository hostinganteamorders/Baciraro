"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import type { TrackRecordActivity } from "@/lib/track-record-types";
import { MapPin, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface Cell {
  cols: number;
  rows: number;
}

const layouts: Cell[][] = [
  [{ cols: 2, rows: 2 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 1 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }],
  [{ cols: 1, rows: 1 }, { cols: 2, rows: 2 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
  [{ cols: 1, rows: 2 }, { cols: 1, rows: 1 }, { cols: 2, rows: 2 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }],
  [{ cols: 3, rows: 2 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
  [{ cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 2 }, { cols: 1, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
  [{ cols: 2, rows: 1 }, { cols: 1, rows: 2 }, { cols: 1, rows: 1 }, { cols: 2, rows: 2 }, { cols: 1, rows: 1 }],
];

function getLayout(year: number, count: number): Cell[] {
  const pattern = layouts[year % layouts.length];
  const cells: Cell[] = [];
  for (let i = 0; i < Math.min(count, 8); i++) {
    cells.push(pattern[i % pattern.length]);
  }
  return cells;
}

const eraAccents: Record<string, string> = {
  awal: "from-emerald-600/40",
  tumbuh: "from-teal-600/40",
  meluas: "from-blue-600/40",
  transformasi: "from-amber-600/40",
};

const eraStyles: Record<string, { ring: string; text: string }> = {
  awal: { ring: "ring-emerald-500/30", text: "text-emerald-300" },
  tumbuh: { ring: "ring-teal-500/30", text: "text-teal-300" },
  meluas: { ring: "ring-blue-500/30", text: "text-blue-300" },
  transformasi: { ring: "ring-amber-500/30", text: "text-amber-300" },
};

const capabilityLabels: Record<string, string> = {
  "produksi-film": "Produksi Film",
  "strategi-kreatif": "Strategi Kreatif",
  "manajemen-kampanye": "Manajemen Kampanye",
  "pendampingan-komunitas": "Pendampingan Komunitas",
  "daur-ulang-plastik": "Daur Ulang Plastik",
  "pengembangan-sistem-digital": "Pengembangan Sistem Digital",
  "edukasi-lingkungan": "Edukasi Lingkungan",
  "pemberdayaan-perempuan": "Pemberdayaan Perempuan",
  "pengelolaan-sampah-organik": "Pengelolaan Sampah Organik",
  "pengelolaan-sampah-wisata": "Pengelolaan Sampah Wisata",
  "pengelolaan-sampah-pesisir": "Pengelolaan Sampah Pesisir",
  "biogas-energi-terbarukan": "Biogas & Energi Terbarukan",
};

function ActivityDetail({ activity, onClose }: { activity: TrackRecordActivity; onClose: () => void }) {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const photos = activity.photos;

  const eraLabelMap: Record<string, string> = {
    awal: t("trackRecord.eraAwal"),
    tumbuh: t("trackRecord.eraTumbuh"),
    meluas: t("trackRecord.eraMeluas"),
    transformasi: t("trackRecord.eraTransformasi"),
  };

  const catLabelMap: Record<string, string> = {
    lingkungan: t("trackRecord.catLingkungan"),
    sosial: t("trackRecord.catSosial"),
    ekonomi: t("trackRecord.catEkonomi"),
    teknologi: t("trackRecord.catTeknologi"),
    pendidikan: t("trackRecord.catPendidikan"),
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (lightboxIdx !== null) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, lightboxIdx]);

  const era = activity.era && eraStyles[activity.era];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="min-h-screen p-4 sm:p-8 lg:p-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Photo gallery */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {photos.map((photo, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setLightboxIdx(i)}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt || ""}
                      fill
                      className="object-cover object-top transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.button>
                ))}
              </div>

              {activity.beforeAfter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">{t("trackRecord.framesLabel")}</span>
                  </div>
                  <BeforeAfterSlider
                    before={activity.beforeAfter.before}
                    after={activity.beforeAfter.after}
                  />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-6"
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {era && (
                    <span className={`inline-flex items-center rounded-full ring-1 ${era.ring} ${era.text} bg-black/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm`}>
                      {activity.era ? eraLabelMap[activity.era] || activity.era : ""}
                    </span>
                  )}
                  {activity.location && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-sm uppercase tracking-wider ring-1 ring-white/10">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      {activity.location}
                    </span>
                  )}
                  {activity.role && (
                    <span className="inline-flex rounded-full bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300 backdrop-blur-sm uppercase tracking-wider ring-1 ring-emerald-800/30">
                      {activity.role}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-medium text-white leading-tight">
                  {t(activity.titleKey || activity.title)}
                </h2>

                {/* Full narrative */}
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {t(activity.narrativeKey || activity.narrative)}
                </p>

                {/* Highlights */}
                {activity.highlights && activity.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">{t("trackRecord.pencapaian")}</span>
                    </div>
                    <ul className="space-y-2">
                      {activity.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                {activity.categories && activity.categories.length > 0 && (
                  <div>
                    <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">{t("trackRecord.kategori")}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activity.categories.map((cat) => (
                        <span key={cat} className="inline-flex rounded-full bg-zinc-800/60 px-2.5 py-1 text-[10px] font-medium text-zinc-300 ring-1 ring-white/5">
                          {catLabelMap[cat] || cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Capabilities */}
                {activity.capabilities && activity.capabilities.length > 0 && (
                  <div>
                    <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">{t("trackRecord.kapabilitas")}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activity.capabilities.map((cap) => {
                        const translated = t("trackRecord.capability." + cap.replace(/-/g, '_'));
                        const fallback = capabilityLabels[cap] || cap;
                        const label = translated.startsWith("trackRecord.capability.") ? fallback : translated;
                        return (
                          <span key={cap} className="inline-flex rounded-full bg-emerald-950/30 px-2.5 py-1 text-[10px] font-medium text-emerald-300/80 ring-1 ring-emerald-800/20">
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx((prev) => (prev! - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx((prev) => (prev! + 1) % photos.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIdx].src}
                alt={photos[lightboxIdx].alt || ""}
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
            <div className="absolute bottom-6 flex items-center gap-3 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-sm text-zinc-400 font-medium">{lightboxIdx! + 1} / {photos.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PhotoWall() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TrackRecordActivity | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section ref={containerRef} className="relative">
        <div className="sticky top-0 left-0 right-0 z-30 h-0.5 bg-zinc-900">
          <motion.div
            className="h-full bg-emerald-400"
            style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          />
        </div>

        {trackRecordData.map((yearData, yearIdx) => {
          const allPhotos = yearData.activities.flatMap((a) => a.photos);
          const era = yearData.activities[0]?.era || "awal";

          return (
            <div key={yearData.year} className="relative">
              {/* Year divider */}
              <div
                id={`chapter-${yearData.year}`}
                className="relative h-screen flex items-center justify-center overflow-hidden"
              >
                {allPhotos[0] && (
                  <Image
                    src={allPhotos[0].src}
                    alt=""
                    fill
                    className="object-cover"
                    priority={yearIdx === 0}
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-b ${eraAccents[era]} via-black/50 to-black z-10`} />

                <div className="relative z-20 text-center">
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="block text-[20vw] sm:text-[18vw] font-bold leading-none text-white/30 select-none"
                  >
                    {yearData.year}
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-4 text-sm uppercase tracking-[0.3em] text-zinc-400 font-medium"
                  >
                    {yearData.activities.length} {t("trackRecord.kegiatan")} &middot; {allPhotos.length} {t("trackRecord.foto")}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-3 max-w-xl mx-auto text-xs text-zinc-500 leading-relaxed px-4 line-clamp-2"
                  >
                    {t(yearData.activities[0]?.narrativeKey || yearData.activities[0]?.narrative) || ""}
                  </motion.p>
                </div>
              </div>

              {/* Photo grid — no cards, just images with text overlay */}
              <div className="px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
                <div className="mx-auto max-w-7xl">
                  {yearData.activities.map((activity, actIdx) => {
                    const photos = activity.photos;
                    if (photos.length === 0) return null;
                    const layout = getLayout(actIdx + yearData.year, photos.length);

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: actIdx * 0.1 }}
                        className="mb-6 last:mb-0"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                          {/* Title row — text over first photo */}
                          {photos.slice(0, 8).map((photo, i) => {
                            const cell = layout[i] || { cols: 1, rows: 1 };
                            return (
                              <div
                                key={i}
                                className={`relative overflow-hidden group cursor-pointer ${
                                  cell.cols === 2 ? "col-span-2" : "col-span-1"
                                } ${
                                  cell.rows === 2 ? "row-span-2" : "row-span-1"
                                }`}
                                style={{
                                  aspectRatio: cell.rows === 2 ? `${cell.cols}/${cell.rows}` : `${cell.cols}/1`,
                                  minHeight: cell.rows === 2 ? "300px" : "150px",
                                }}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt || ""}
                                  fill
                                  className="object-cover transition-all duration-700 group-hover:scale-105"
                                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />

                                {/* Text overlay — only on first photo of each activity */}
                                {i === 0 && (
                                  <button
                                    onClick={() => setSelected(activity)}
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                  >
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        {activity.location && (
                                          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-medium text-zinc-300 backdrop-blur-sm uppercase tracking-wider">
                                            <MapPin className="h-2.5 w-2.5 text-emerald-400" />
                                            {activity.location}
                                          </span>
                                        )}
                                        {activity.role && (
                                          <span className="inline-flex rounded-full bg-emerald-950/60 px-2 py-0.5 text-[9px] font-medium text-emerald-300 backdrop-blur-sm uppercase tracking-wider">
                                            {activity.role}
                                          </span>
                                        )}
                                      </div>
                                      <h3 className="text-sm sm:text-base font-medium text-white leading-tight">
                                        {t(activity.titleKey || activity.title)}
                                      </h3>
                                      {activity.narrative && (
                                        <p className={`mt-1.5 text-xs text-zinc-300/80 leading-relaxed ${
                                          photos.length <= 2 ? "line-clamp-4" : "line-clamp-2"
                                        }`}>
                                          {t(activity.narrativeKey || activity.narrative)}
                                        </p>
                                      )}
                                    </div>
                                  </button>
                                )}
                              </div>
                            );
                          })}


                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Activity detail overlay */}
      <AnimatePresence>
        {selected && (
          <ActivityDetail activity={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
