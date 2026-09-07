"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";
import { MapPin, Users } from "lucide-react";

type Chapter = {
  year: number;
  activities: typeof trackRecordData[number]["activities"];
  era: string;
};

function ChapterSlide({
  photo,
  index,
  activeIndex,
  priority,
}: {
  photo: string;
  index: number;
  activeIndex: MotionValue<number>;
  priority: boolean;
}) {
  const opacity = useTransform(activeIndex, (idx) => {
    const dist = Math.abs(Math.round(idx) - index);
    return dist === 0 ? 1 : 0;
  });

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <Image src={photo} alt="" fill className="object-cover" priority={priority} />
    </motion.div>
  );
}

function EraBadge({ chapter }: { chapter: MotionValue<Chapter> }) {
  const { t } = useLanguage();
  const text = useTransform(chapter, (c) => {
    const labels: Record<string, string> = {
      awal: t("trackRecord.scrollEraAwal"),
      tumbuh: t("trackRecord.scrollEraTumbuh"),
      meluas: t("trackRecord.scrollEraMeluas"),
      transformasi: t("trackRecord.scrollEraTransformasi"),
    };
    return c ? labels[c.era] || "" : "";
  });

  return (
    <motion.span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-sm">
      {text}
    </motion.span>
  );
}

function YearDisplay({ chapter }: { chapter: MotionValue<Chapter> }) {
  const year = useTransform(chapter, (c) => String(c?.year || ""));
  return (
    <motion.span className="text-[160px] sm:text-[200px] font-bold leading-none text-white/10 select-none">
      {year}
    </motion.span>
  );
}

export function ScrollytellingJourney() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const chapters: Chapter[] = trackRecordData.map((yearData) => ({
    year: yearData.year,
    activities: yearData.activities,
    era: yearData.activities[0]?.era || "awal",
  }));

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, chapters.length - 1]);
  const currentChapter = useTransform(currentIndex, (i) => chapters[Math.round(i)] || chapters[0]);

  return (
    <section ref={containerRef} className="relative">
      {/* Progress bar */}
      <div className="sticky top-0 left-0 right-0 z-30 h-1 bg-zinc-900">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        />
      </div>

      {/* Sticky visual panel */}
      <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />

        {chapters.map((chapter, i) => {
          const allPhotos = chapter.activities.flatMap((a) => a.photos);
          return (
            <ChapterSlide
              key={chapter.year}
              photo={allPhotos[0]?.src || ""}
              index={i}
              activeIndex={currentIndex}
              priority={i === 0}
            />
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10" />

        <div className="absolute top-24 left-6 lg:left-12 z-20">
          <EraBadge chapter={currentChapter} />
        </div>

        <div className="absolute bottom-8 right-6 lg:right-12 z-20">
          <YearDisplay chapter={currentChapter} />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-20 pointer-events-none">
        {chapters.map((chapter) => (
          <div
            key={chapter.year}
            id={`chapter-${chapter.year}`}
            className="min-h-[80vh] flex items-center justify-center px-6 lg:px-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              className="pointer-events-auto w-full max-w-3xl bg-zinc-950/70 backdrop-blur-md rounded-[2rem] border border-white/10 p-8 sm:p-10 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-bold text-emerald-400 border border-emerald-500/20">
                  {chapter.year}
                </span>
                <span className="text-sm text-zinc-500">
                  {chapter.activities.length} {t("trackRecord.kegiatan")}
                </span>
              </div>

              <div className="space-y-5">
                {chapter.activities.map((activity) => {
                  const photoCount = activity.photos.length;
                  return (
                    <div key={activity.id}>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <h3 className="text-xl font-normal text-white">
                          {t(activity.titleKey || activity.title)}
                        </h3>
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
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                        {t(activity.narrativeKey || activity.narrative)}
                      </p>

                      {photoCount > 0 && (
                        <div className="mt-3 flex gap-2">
                          {activity.photos.slice(0, 4).map((p, pi) => (
                            <div
                              key={pi}
                              className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/5 shrink-0"
                            >
                              <Image src={p.src} alt="" fill className="object-cover object-top" />
                            </div>
                          ))}
                          {photoCount > 4 && (
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/5 bg-zinc-900/60 text-xs text-zinc-500 shrink-0">
                              +{photoCount - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
