"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Recycle, BarChart3, Sparkles, Users } from "lucide-react";

const FEATURES = [
  { icon: Recycle, titleKey: "endToEnd", statKey: "endToEnd" },
  { icon: BarChart3, titleKey: "digital", statKey: "digital" },
  { icon: Sparkles, titleKey: "creative", statKey: "creative" },
  { icon: Users, titleKey: "community", statKey: "community" },
];

const STATS = [
  { value: 1200, suffix: "+", labelKey: "sampah", unit: "ton" },
  { value: 80, suffix: "+", labelKey: "komunitas", unit: "komunitas" },
  { value: 25, suffix: "+", labelKey: "proyek", unit: "proyek" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative z-10 overflow-hidden">
      <div className="absolute -left-60 -top-52 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.14),transparent_65%)] pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <span className="h-[7px] w-[7px] rounded-full bg-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-300">{t("hero.ekosistem")}</span>
          </motion.div>

          <motion.h1 variants={childVariants} className="mt-7 text-6xl font-bold leading-none tracking-[-0.035em] text-white sm:text-7xl lg:text-[6rem]">
            Baciraro
            <span className="block font-serif font-normal italic text-accent">{t("hero.tagline")}</span>
          </motion.h1>

          <motion.p variants={childVariants} className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
            {t("hero.deskripsi")}
          </motion.p>

          <motion.div variants={childVariants} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-bold text-black transition-all hover:-translate-y-px hover:opacity-90"
            >
              {t("hero.mulaiKolaborasi")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#ecosystem"
              className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 text-[15px] font-bold text-white transition-all hover:bg-white/10"
            >
              {t("hero.jelajahiEkosistem")}
              <ArrowRight className="h-4 w-4 text-accent" />
            </Link>
          </motion.div>

          <motion.div variants={childVariants} className="mt-12 grid max-w-lg grid-cols-3 gap-7">
            {STATS.map((s) => (
              <div key={s.labelKey}>
                <p className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-zinc-400">{t("hero.stats." + s.labelKey)}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-surface sm:h-[520px] lg:h-[620px]"
        >
          <Image
            src="/Dialog Budaya/foto bersama dengan narasumber.webp"
            alt={t("hero.photoAlt")}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-3.5 bottom-3.5 rounded-[18px] border border-white/10 bg-[rgba(5,7,6,0.82)] px-[18px] py-3.5 text-[#fafafa] backdrop-blur-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fca5a5]">{t("hero.photoEyebrow")}</p>
            <p className="mt-0.5 text-lg font-bold leading-snug">{t("hero.photoTitle")}</p>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6 pb-14 lg:px-8">
        {FEATURES.map((f) => (
          <div key={f.titleKey} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/70 px-4 py-2 backdrop-blur-sm">
            <f.icon className="h-3.5 w-3.5 text-accent" />
            <span className="whitespace-nowrap text-[11px] font-semibold text-zinc-300">{t("hero.features." + f.titleKey)}</span>
            <span className="font-mono text-[9px] text-zinc-500">{t("hero.featureStats." + f.statKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
