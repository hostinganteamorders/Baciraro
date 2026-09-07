"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Recycle, BarChart3, Sparkles, Users } from "lucide-react";

const TERRACOTTA = "#D4785C";

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

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const count = Math.min(60, Math.floor((w * h) / 20000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? TERRACOTTA : "#10B981",
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = TERRACOTTA;
            ctx.globalAlpha = 0.04 * (1 - dist / 120);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const scrollToNext = () => {
    const el = containerRef.current?.nextElementSibling;
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,120,92,0.08),transparent_60%)] pointer-events-none" />

      <motion.div style={{ opacity, scale }} className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 py-20">
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={childVariants} className="relative mb-6 h-56 w-56 md:h-64 md:w-64 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,120,92,0.15),transparent_70%)] animate-pulse" />
            <Image src="/Baciraro cap.png" alt="Baciraro" fill priority sizes="256px" className="object-contain p-2 drop-shadow-[0_25px_60px_rgba(212,120,92,0.3)]" />
          </motion.div>

          <motion.p variants={childVariants} className="font-serif text-xl md:text-2xl italic tracking-tight text-[#D4785C]">
            {t("hero.ekosistem")}
          </motion.p>

          <motion.div variants={childVariants} className="mt-2">
            <h1 className="text-5xl font-normal leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl md:text-8xl lg:text-[7.5rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              Baciraro
            </h1>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#D4785C]/80 mt-1 tracking-tight"
            >
              {t("hero.tagline")}
            </motion.span>
          </motion.div>

          <motion.p variants={childVariants} className="mx-auto mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-zinc-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("hero.deskripsi")}
          </motion.p>

          <motion.div variants={childVariants} className="mt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {STATS.map((s) => (
              <div key={s.labelKey} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{t("hero.stats." + s.labelKey)}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={childVariants} className="mt-8 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <div key={f.titleKey} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-sm">
                <f.icon className="h-3.5 w-3.5 text-[#D4785C]" />
                <span className="text-[10px] font-semibold text-zinc-300 whitespace-nowrap">{t("hero.features." + f.titleKey)}</span>
                <span className="text-[8px] text-zinc-600 font-mono">{t("hero.featureStats." + f.statKey)}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={childVariants} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-zinc-100"
            >
              {t("hero.mulaiKolaborasi")}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </Link>
            <Link
              href="#ecosystem"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-[#D4785C]/30"
            >
              {t("hero.jelajahiEkosistem")}
              <ArrowRight className="h-3.5 w-3.5 text-[#D4785C]" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <button onClick={scrollToNext} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-white transition-colors animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
}
