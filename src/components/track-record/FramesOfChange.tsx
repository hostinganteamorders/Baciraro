"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";
import { X, ChevronLeft, ChevronRight, Maximize2, Filter } from "lucide-react";

const PHOTOS_PER_BATCH = 40;
const INITIAL_PHOTOS = 60;

function Lightbox({ photos, index, onClose }: { photos: { src: string; alt: string }[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
        <X className="h-5 w-5" />
      </button>

      {photos.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative h-full w-full max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[current].src}
          alt={photos[current].alt}
          fill
          className="object-contain"
          quality={100}
        />
      </motion.div>
      <div className="absolute bottom-6 flex items-center gap-3">
        <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm text-zinc-400 font-medium backdrop-blur-sm">
          {current + 1} / {photos.length}
        </span>
      </div>
    </motion.div>
  );
}

export function FramesOfChange() {
  const { t } = useLanguage();

  const categoryLabels: Record<string, string> = {
    lingkungan: t("trackRecord.catLingkungan"),
    sosial: t("trackRecord.catSosial"),
    ekonomi: t("trackRecord.catEkonomi"),
    teknologi: t("trackRecord.catTeknologi"),
    pendidikan: t("trackRecord.catPendidikan"),
  };

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PHOTOS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos = useMemo(() => {
    const items: { src: string; alt: string; year: number; category: string }[] = [];
    trackRecordData.forEach((yearData) => {
      yearData.activities.forEach((activity) => {
        const cats = activity.categories || ["lingkungan"];
        activity.photos.forEach((photo) => {
          items.push({
            ...photo,
            year: yearData.year,
            category: cats[0],
          });
        });
      });
    });
    return items;
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    trackRecordData.forEach((y) => y.activities.forEach((a) => (a.categories || ["lingkungan"]).forEach((c) => set.add(c))));
    return Array.from(set).sort();
  }, []);

  const years = useMemo(() => trackRecordData.map((y) => y.year), []);

  const filtered = useMemo(() => {
    let items = allPhotos;
    if (filterYear) items = items.filter((p) => p.year === filterYear);
    if (filterCategory) items = items.filter((p) => p.category === filterCategory);
    return items;
  }, [allPhotos, filterYear, filterCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="frames" className="relative py-20 px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.04),_transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
            <Filter className="h-3 w-3" />
            {t("trackRecord.framesLabel")}
          </p>
          <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("trackRecord.framesTitle")}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
            {filtered.length} {t("trackRecord.foto")} {t("trackRecord.framesCount")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => { setFilterYear(null); setFilterCategory(null); }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              !filterYear && !filterCategory
                ? "bg-emerald-400 text-black"
                : "border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
            }`}
          >
            {t("trackRecord.semua")}
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setFilterYear(filterYear === y ? null : y)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filterYear === y
                  ? "bg-emerald-400 text-black"
                  : "border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              }`}
            >
              {y}
            </button>
          ))}
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(filterCategory === c ? null : c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filterCategory === c
                  ? "bg-emerald-400 text-black"
                  : "border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              }`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {visible.map((photo, i) => (
            <motion.button
              key={photo.src + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.01, 0.3) }}
              onClick={() => setLightboxIndex(i)}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-emerald-500/30 transition-all duration-300 break-inside-avoid aspect-[4/3]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[10px] text-white/80 font-medium">{photo.year}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((p) => p + PHOTOS_PER_BATCH)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {t("trackRecord.tampilkanLagi")} ({filtered.length - visibleCount} {t("trackRecord.tersisa")})
            </button>
          </div>
        )}

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              photos={filtered}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
