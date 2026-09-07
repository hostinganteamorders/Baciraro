"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ecosystemRegionData } from "@/lib/site-sections-data";
import { MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const REGION_POSITIONS: Record<string, { x: number; y: number }> = {
  "Kota Bitung": { x: 88, y: 62 },
  "Minahasa Utara": { x: 72, y: 52 },
  "Manado": { x: 62, y: 42 },
  "Minahasa": { x: 52, y: 58 },
  "Kepulauan Sangihe": { x: 78, y: 14 },
  "Kota Tomohon": { x: 48, y: 70 },
};

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function InteractiveRegionMap() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const region = ecosystemRegionData[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 items-start">
      {/* Map canvas */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: springEase }}
        className="relative rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 sm:p-8 shadow-xl backdrop-blur-sm"
      >
        <div className="aspect-[4/3] w-full relative">
          {/* Connecting lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g stroke="rgba(16,185,129,0.15)" strokeWidth="0.4">
              <path d="M48 70 C 55 62, 60 52, 62 42" fill="none" />
              <path d="M62 42 C 66 46, 70 50, 72 52" fill="none" />
              <path d="M72 52 C 78 55, 84 58, 88 62" fill="none" />
              <path d="M48 70 C 50 62, 51 58, 52 58" fill="none" />
              <path d="M62 42 C 70 30, 74 20, 78 14" fill="none" />
            </g>
          </svg>

          {/* Region nodes */}
          {ecosystemRegionData.map((r, i) => {
            const pos = REGION_POSITIONS[r.region] || { x: 50, y: 50 };
            const isActive = i === active;
            return (
              <button
                key={r.region}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span
                  className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? "h-12 w-12 border-emerald-400/60 bg-emerald-500/20 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                      : "h-8 w-8 border-white/10 bg-zinc-900/80 text-zinc-500 hover:border-emerald-500/40 hover:text-emerald-400"
                  }`}
                >
                  <MapPin className={isActive ? "h-5 w-5" : "h-3.5 w-3.5"} />
                </span>
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "top-full mt-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "top-full mt-1 bg-zinc-900/90 text-zinc-500 border border-white/5 opacity-70"
                  }`}
                >
                  {r.titleKey ? t(r.titleKey) : r.region}
                </span>
              </button>
            );
          })}
        </div>

        {/* Region chips (mobile fallback) */}
        <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
          {ecosystemRegionData.map((r, i) => (
            <button
              key={r.region}
              onClick={() => setActive(i)}
              className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all ${
                i === active
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {r.titleKey ? t(r.titleKey) : r.region}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: springEase }}
          className="rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-8 sm:p-10 shadow-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 shrink-0">
              <region.icon className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-normal text-white">{region.titleKey ? t(region.titleKey) : region.region}</h3>
          </div>

          <ul className="space-y-4">
            {region.points.map((point, i) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-400 leading-relaxed">
                  {region.pointsKey?.[i] ? t(region.pointsKey[i]) : point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-2 border-t border-white/5 pt-6">
            <ChevronRight className="h-4 w-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              {active + 1} / {ecosystemRegionData.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
