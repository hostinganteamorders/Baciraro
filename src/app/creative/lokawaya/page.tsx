"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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

function MediaGrid({
  items,
  layout,
}: {
  items: { src: string; type: "video" | "image"; alt?: string }[];
  layout: { cols: number; rows: number }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item, i) => {
        const cell = layout[i % layout.length];
        return (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: springEase }}
            className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/40 group ${
              cell.cols === 2 ? "col-span-2" : "col-span-1"
            } ${cell.rows === 2 ? "row-span-2" : "row-span-1"}`}
            style={{ aspectRatio: cell.rows === 2 ? `${cell.cols}/${cell.rows}` : `${cell.cols}/1` }}
          >
            {item.type === "video" ? (
              <VideoReel src={item.src} />
            ) : (
              <Image
                src={item.src}
                alt={item.alt || ""}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function LokawayaPage() {
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
            src="/Lokawaya/kondisi lokawaya.mp4"
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
              {t("lokawaya.detail.heroSubtitle")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: springEase }}
              className="mt-4 font-serif text-[clamp(36px,7vw,80px)] font-normal leading-[1.1] tracking-[-0.03em] text-white"
            >
              {t("lokawaya.detail.heroTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
              className="mt-3 text-sm text-brand-gold/80"
            >
              {t("lokawaya.detail.heroDate")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: springEase }}
              className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base"
            >
              {t("lokawaya.detail.heroDesc")}
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

        {/* ───── BOOTH: FULL-BLEED HERO VIDEO ───── */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <VideoReel
            src="/Lokawaya/kondisi booth baciraro creative.mp4"
            className="absolute inset-0 h-full w-full object-cover"
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
                {t("lokawaya.detail.boothTitle")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(28px,5vw,56px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("lokawaya.detail.boothTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-300">
                {t("lokawaya.detail.boothDesc")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───── BOOTH: GRID ───── */}
        <section className="border-t border-white/5 px-4 py-12 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <MediaGrid
              items={[
                { src: "/Lokawaya/timelapse booth.mp4", type: "video" },
                { src: "/Lokawaya/video produk.mp4", type: "video" },
                { src: "/Lokawaya/kondisi lokawaya.mp4", type: "video" },
                { src: "/Lokawaya/kondisi lokawaya 2.mp4", type: "video" },
              ]}
              layout={[
                { cols: 1, rows: 1 },
                { cols: 1, rows: 1 },
                { cols: 2, rows: 1 },
                { cols: 2, rows: 1 },
              ]}
            />
          </div>
        </section>

        {/* ───── WORKSHOP: 50/50 SPLIT ───── */}
        <section className="relative border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(111,175,79,0.05),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Left: video proses */}
            <div className="relative h-[50vh] lg:h-auto overflow-hidden">
              <VideoReel
                src="/Lokawaya/proses pembuatan keychain anak dari USA.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: springEase }}
                  className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green/80"
                >
                  Proses
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
                  className="mt-1 text-sm text-white/70"
                >
                  Pembuatan Keychain
                </motion.p>
              </div>
            </div>

            {/* Right: foto hasil */}
            <div className="relative h-[50vh] lg:h-auto overflow-hidden">
              <Image
                src="/Lokawaya/customer anak dari USA setelah selesai membuat sendiri keychainnya dari tutup botol plastik.jpeg"
                alt="Hasil keychain"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
                  className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green/80"
                >
                  Hasil
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25, ease: springEase }}
                  className="mt-1 text-sm text-white/70"
                >
                  Keychain buatan sendiri
                </motion.p>
              </div>
            </div>
          </div>

          {/* Label + desc overlay di tengah split */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: springEase }}
              className="rounded-full border border-white/10 bg-background/80 px-5 py-2 backdrop-blur-xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-green">
                {t("lokawaya.detail.workshopTitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───── WORKSHOP: FULL-WIDTH REMAINING ───── */}
        <section className="border-t border-white/5 px-4 py-12 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Mobile label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: springEase }}
              className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-brand-green lg:hidden"
            >
              {t("lokawaya.detail.workshopTitle")}
            </motion.p>

            <MediaGrid
              items={[
                { src: "/Lokawaya/kondisi workshop baciraro creative.mp4", type: "video" },
                { src: "/Lokawaya/timelapse workshop.mp4", type: "video" },
              ]}
              layout={[
                { cols: 2, rows: 1 },
                { cols: 2, rows: 1 },
              ]}
            />
          </div>
        </section>

        {/* ───── VISITORS: TURIS ASING ───── */}
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
                {t("lokawaya.detail.visitorsTitle")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(24px,3.5vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("lokawaya.detail.visitorsTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                {t("lokawaya.detail.visitorsDesc")}
              </p>
            </motion.div>

            <MediaGrid
              items={[
                { src: "/Lokawaya/kunjungan dari turis asing.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan dari turis asing 2.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan dari turis asing 3.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan dari turis asing 4.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan dari turis asing 5.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan dari turis asing 6.mp4", type: "video" },
              ]}
              layout={[
                { cols: 1, rows: 1 },
                { cols: 1, rows: 1 },
                { cols: 1, rows: 1 },
                { cols: 1, rows: 1 },
                { cols: 2, rows: 1 },
                { cols: 2, rows: 1 },
              ]}
            />
          </div>
        </section>

        {/* ───── VISITORS: TURIS LOKAL ───── */}
        <section className="border-t border-white/5 px-4 py-16 sm:px-6 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <MediaGrid
              items={[
                { src: "/Lokawaya/kunjungan dari turis lokal dan asing.mp4", type: "video" },
                { src: "/Lokawaya/kunjungan turis dari USA.mp4", type: "video" },
              ]}
              layout={[
                { cols: 2, rows: 1 },
                { cols: 2, rows: 1 },
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
              {t("creative.heroCta")}
            </Link>
          </motion.div>
        </footer>

      </div>
    </main>
  );
}
