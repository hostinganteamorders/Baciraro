"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";
import { Calendar, Camera, MapPin, Activity } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
      {isInView ? value : 0}
      {suffix}
    </span>
  );
}

export function ImpactEvidenceSection() {
  const { t } = useLanguage();
  const totalYears = trackRecordData.length;
  const totalActivities = trackRecordData.reduce((s, y) => s + y.activities.length, 0);
  const totalPhotos = trackRecordData.reduce((s, y) => s + y.activities.reduce((a, b) => a + b.photos.length, 0), 0);
  const totalLocations = new Set(
    trackRecordData.flatMap((y) => y.activities.map((a) => a.location).filter(Boolean))
  ).size;

  const stats = [
    { icon: Calendar, value: totalYears, label: t("trackRecord.statTahun"), suffix: "" },
    { icon: Activity, value: totalActivities, label: t("trackRecord.statKegiatan"), suffix: "+" },
    { icon: Camera, value: totalPhotos, label: t("trackRecord.statFoto"), suffix: "+" },
    { icon: MapPin, value: totalLocations, label: t("trackRecord.statLokasi"), suffix: "+" },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.06),_transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 mx-auto">
                <stat.icon className="h-5 w-5" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-zinc-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
