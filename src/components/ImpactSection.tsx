"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Package, Users, Sprout, Cpu, Recycle, Building2 } from "lucide-react";

const TERRACOTTA = "#D4785C";
const EMERALD = "#10B981";

const METRICS = [
  { value: 1200, suffix: "+", labelKey: "sampah", unit: "ton", icon: Package, color: EMERALD, percent: 85 },
  { value: 80, suffix: "+", labelKey: "komunitas", unit: "komunitas", icon: Users, color: TERRACOTTA, percent: 75 },
  { value: 40, suffix: "+", labelKey: "produk", unit: "karya", icon: Sprout, color: "#F59E0B", percent: 60 },
  { value: 25, suffix: "+", labelKey: "proyek", unit: "proyek", icon: Cpu, color: "#8B5CF6", percent: 70 },
  { value: 85, suffix: "%", labelKey: "reduksi", unit: "persen", icon: Recycle, color: EMERALD, percent: 85 },
  { value: 15, suffix: "+", labelKey: "mitra", unit: "mitra", icon: Building2, color: TERRACOTTA, percent: 65 },
];

function ProgressRing({ percent, color, size = 72 }: { percent: number; color: string; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function AnimatedCount({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => { cur += inc; if (cur >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(cur)); }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function ImpactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="relative z-10 py-20 lg:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("impact.label")}
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("impact.title")}{" "}
            <span className="font-serif italic text-emerald-300">{t("impact.titleItalic")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {t("impact.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm flex items-center gap-5"
            >
              <ProgressRing percent={m.percent} color={m.color} size={72} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <m.icon className="h-4 w-4" style={{ color: m.color }} />
                  <p className="text-2xl font-bold text-white tabular-nums">
                    <AnimatedCount target={m.value} suffix={m.suffix} inView={inView} />
                  </p>
                </div>
                <p className="text-sm text-zinc-400">{t("impact.metrics." + m.labelKey)}</p>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider">{t("impact.metricsUnits." + m.unit)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t("impact.dashboard.title")}</p>
              <p className="text-xs text-zinc-500">{t("impact.dashboard.desc")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
