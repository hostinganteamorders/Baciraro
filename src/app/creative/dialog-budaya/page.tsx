"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import Lightbox from "@/components/track-record/Lightbox";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function VideoReel({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className={className || "h-full w-full object-cover"}
    />
  );
}

function Tile({
  src,
  alt,
  ratioClass,
  onClick,
  delay,
  rotateDeg = 0,
}: {
  src: string;
  alt: string;
  ratioClass: string;
  onClick: () => void;
  delay: number;
  rotateDeg?: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: springEase }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
    >
      <div className={`relative w-full ${ratioClass}`}>
        <div
          className="absolute inset-0"
          style={{ transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur">
            <Maximize2 className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function GalleryGroup({
  title,
  desc,
  srcs,
  ratioClass,
  diptychFirst = false,
  rotateDeg = 0,
}: {
  title: string;
  desc: string;
  srcs: string[];
  ratioClass: string;
  diptychFirst?: boolean;
  rotateDeg?: number;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = srcs.map((src) => ({ src, alt: title }));
  const firstTwo = diptychFirst ? srcs.slice(0, 2) : [];
  const rest = diptychFirst ? srcs.slice(2) : srcs;

  return (
    <div className="mb-14 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: springEase }}
        className="mb-6"
      >
        <h3 className="font-serif text-xl font-normal text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 text-xs text-zinc-500">{desc}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {diptychFirst && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: springEase }}
            className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {firstTwo.map((src, i) => (
              <Tile key={src} src={src} alt={title} ratioClass={ratioClass} rotateDeg={rotateDeg} delay={0} onClick={() => setLightboxIndex(i)} />
            ))}
          </motion.div>
        )}
        {rest.map((src, i) => (
          <Tile
            key={src}
            src={src}
            alt={title}
            ratioClass={ratioClass}
            rotateDeg={rotateDeg}
            delay={0.06}
            onClick={() => setLightboxIndex(i + (diptychFirst ? 2 : 0))}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            caption={title}
            rotateDeg={rotateDeg}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DialogBudayaPage() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: pageProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative overflow-hidden text-primary-text min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">

        {/* ───── PROGRESS BAR ───── */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-brand-terracotta origin-left"
          style={{ scaleX: pageProgress }}
        />

        {/* ───── STICKY BACK ───── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: springEase }}
          className="fixed top-5 left-4 z-40 md:left-6"
        >
          <Link
            href="/creative"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3.5 py-2 text-xs text-zinc-400 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        </motion.div>

        {/* ───── HERO VIDEO ───── */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <VideoReel
            src="/Dialog Budaya/spech nyong sulut.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: springEase }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold"
            >
              {t("dialogBudaya.detail.heroSubtitle")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
              className="mt-4 font-serif text-[clamp(36px,7vw,80px)] font-normal leading-[1.1] tracking-[-0.03em] text-white"
            >
              {t("dialogBudaya.detail.heroTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
              className="mt-3 text-sm text-brand-gold/80"
            >
              {t("dialogBudaya.detail.heroDate")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: springEase }}
              className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base"
            >
              {t("dialogBudaya.detail.heroDesc")}
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 animate-pulse">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-zinc-500"
            />
          </motion.div>
        </section>

        {/* ───── REGISTRASI: FULL-BLEED ───── */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <Image
            src="/Dialog Budaya/registrasi.jpeg"
            alt={t("dialogBudaya.detail.registrasiTitle")}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-background/60" />

          <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="max-w-xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-terracotta">
                {t("dialogBudaya.detail.registrasiTitle")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(28px,5vw,56px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("dialogBudaya.detail.registrasiTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-300">
                {t("dialogBudaya.detail.registrasiDesc")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───── FOTO BERSAMA ───── */}
        <section className="relative border-t border-white/5 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,212,121,0.04),transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
              className="mb-12 max-w-3xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t("dialogBudaya.detail.fotoBersamaTitle")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(24px,3.5vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("dialogBudaya.detail.fotoBersamaTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                {t("dialogBudaya.detail.fotoBersamaDesc")}
              </p>
            </motion.div>

            <GalleryGroup
              title={t("dialogBudaya.detail.narasumberTitle")}
              desc={t("dialogBudaya.detail.narasumberDesc")}
              ratioClass="aspect-[4/3]"
              diptychFirst
              srcs={[
                "/Dialog Budaya/foto bersama dengan narasumber.webp",
                "/Dialog Budaya/foto bersama dengan narasumber 2.webp",
                "/Dialog Budaya/foto bersama dengan narasumber 3.webp",
                "/Dialog Budaya/foto bersama dengan narasumber 4.webp",
                "/Dialog Budaya/foto bersama dengan narasumber 5.webp",
                "/Dialog Budaya/foto bersama dengan narasumber 6.webp",
              ]}
            />

            <GalleryGroup
              title={t("dialogBudaya.detail.tamuUndanganTitle")}
              desc={t("dialogBudaya.detail.tamuUndanganDesc")}
              ratioClass="aspect-video"
              srcs={[
                "/Dialog Budaya/foto bersama dengan narasumber dan tamu undangan2.jpeg",
                "/Dialog Budaya/foto bersama dengan narasumber dan tamu undangan 3.jpeg",
                "/Dialog Budaya/foto bersama dengan narasumber dan tamu undangan 4.jpeg",
                "/Dialog Budaya/foto bersama dengan narasumber dan tamu undangan 5.jpeg",
                "/Dialog Budaya/foto bersama dengan narasumber dan tamu undangan 6.jpeg",
              ]}
            />

            <GalleryGroup
              title={t("dialogBudaya.detail.panitiaTitle")}
              desc={t("dialogBudaya.detail.panitiaDesc")}
              ratioClass="aspect-[4/3]"
              rotateDeg={90}
              srcs={[
                "/Dialog Budaya/foto bersama panitia.webp",
                "/Dialog Budaya/foto bersama panitia 2.webp",
                "/Dialog Budaya/foto bersama panitia 3.webp",
                "/Dialog Budaya/foto bersama panitia 4.webp",
                "/Dialog Budaya/foto bersama panitia 5.webp",
                "/Dialog Budaya/foto bersama panitia 6.webp",
                "/Dialog Budaya/foto bersama panitia 7.webp",
                "/Dialog Budaya/foto bersama panitia 8.webp",
                "/Dialog Budaya/foto bersama panitia 9.webp",
                "/Dialog Budaya/foto bersama panitia 10.webp",
                "/Dialog Budaya/foto bersama panitia 11.webp",
                "/Dialog Budaya/foto bersama panitia 12.webp",
                "/Dialog Budaya/foto bersama panitia 13.webp",
                "/Dialog Budaya/foto bersama panitia 14.webp",
              ]}
            />
          </div>
        </section>

        {/* ───── FOOTER ───── */}
        <footer className="relative border-t border-white/5 px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: springEase }}
          >
            <Link
              href="/creative"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-gold/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {t("creative.heroCtaRecap")}
            </Link>
          </motion.div>
        </footer>

      </div>
    </main>
  );
}
