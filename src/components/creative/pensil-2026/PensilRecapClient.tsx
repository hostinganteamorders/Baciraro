"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowDown, Calendar, Maximize2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import Lightbox from "@/components/track-record/Lightbox";
import { pensilGallery, projectImages } from "@/lib/creative-projects/pensil-2026";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PensilRecapClient() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: pageProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const photos = pensilGallery.map((photo) => ({
    src: photo.src,
    alt: t(photo.altKey),
  }));
  const captions = pensilGallery.map((photo) => t(photo.captionKey));

  const processSteps = [
    {
      number: "01",
      label: t("pensil2026.processDesignLabel"),
      title: t("pensil2026.processDesignTitle"),
      body: t("pensil2026.processDesignDesc"),
    },
    {
      number: "02",
      label: t("pensil2026.processProductionLabel"),
      title: t("pensil2026.processProductionTitle"),
      body: t("pensil2026.processProductionDesc"),
    },
    {
      number: "03",
      label: t("pensil2026.processHandoverLabel"),
      title: t("pensil2026.processHandoverTitle"),
      body: t("pensil2026.processHandoverDesc"),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-primary-text">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <motion.div
          className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-brand-orange"
          style={{ scaleX: pageProgress }}
        />

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: springEase }}
          className="fixed left-4 top-5 z-40 md:left-6"
        >
          <Link
            href="/creative"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3.5 py-2 text-xs text-zinc-400 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("pensil2026.backShort")}</span>
          </Link>
        </motion.div>

        {/* ───── HERO ───── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden border-b border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(217,122,43,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(111,175,79,0.08),transparent_50%)]" />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-28 sm:px-6 md:px-8 lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:py-28"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: springEase }}
                className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange"
              >
                {t("pensil2026.eyebrow")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: springEase }}
                className="mt-5 max-w-2xl font-serif text-[clamp(38px,6vw,76px)] font-normal leading-[1.04] tracking-[-0.03em] text-white"
              >
                {t("pensil2026.heroTitle")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: springEase }}
                className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base"
              >
                {t("pensil2026.heroDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: springEase }}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-zinc-400"
              >
                <span className="font-semibold text-white/80">
                  {t("pensil2026.partner")}
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                  {t("pensil2026.date")}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: springEase }}
                className="mt-9"
              >
                <a
                  href="#dokumentasi"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-orange/30 hover:text-white"
                >
                  {t("pensil2026.viewGallery")}
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </motion.div>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: springEase }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(217,122,43,0.14),transparent_65%)] blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40">
                <Image
                  src={projectImages.handover}
                  alt={t("pensil2026.photoAlts.handover")}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-xs leading-5 text-zinc-400">
                <span className="mt-1.5 h-1 w-4 shrink-0 bg-brand-orange" />
                {t("pensil2026.heroCaption")}
              </figcaption>
            </motion.figure>
          </motion.div>
        </section>

        {/* ───── IMPACT ───── */}
        <section id="dampak" className="relative border-b border-white/5 scroll-mt-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr] md:items-end md:gap-16 md:px-8 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                {t("pensil2026.impactLabel")}
              </p>
              <p className="mt-3 font-serif text-[clamp(4.5rem,13vw,10rem)] font-normal leading-[0.8] tracking-[-0.05em] text-white">
                2.904
              </p>
              <p className="mt-3 text-lg font-medium tracking-wide text-brand-orange">
                {t("pensil2026.impactUnit")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
              className="max-w-xl border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0"
            >
              <p className="text-base leading-8 text-zinc-300 sm:text-lg">
                {t("pensil2026.impactDescription")}
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {t("pensil2026.impactNote")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───── STORY ───── */}
        <section id="cerita" className="relative scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: springEase }}
                className="self-start lg:sticky lg:top-24"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                  {t("pensil2026.storyLabel")}
                </p>
                <h2 className="mt-4 font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                  {t("pensil2026.storyTitle")}
                </h2>
                <p className="mt-6 max-w-xs text-sm leading-6 text-zinc-400">
                  {t("pensil2026.storyAside")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
                className="max-w-2xl"
              >
                <p className="text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                  {t("pensil2026.storyParagraph1")}
                </p>
                <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                  {t("pensil2026.storyParagraph2")}
                </p>
                <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                  {t("pensil2026.storyParagraph3")}
                </p>

                <blockquote className="mt-12 border-y border-white/10 py-8">
                  <p className="font-serif text-[clamp(26px,3.5vw,42px)] italic leading-[1.15] tracking-[-0.02em] text-white">
                    {t("pensil2026.quote")}
                  </p>
                  <footer className="mt-5 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                    {t("pensil2026.closingLine")}
                  </footer>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── PROCESS ───── */}
        <section id="proses" className="relative scroll-mt-20 border-t border-white/5 py-20 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,212,121,0.04),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t("pensil2026.processLabel")}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                {t("pensil2026.processTitle")}
              </h2>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: springEase }}
                  className="border-t border-white/10 pt-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-orange">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-normal text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── GALLERY ───── */}
        <section
          id="dokumentasi"
          className="relative scroll-mt-20 border-t border-white/5 py-20 sm:py-28"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
              className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">
                  {t("pensil2026.galleryLabel")}
                </p>
                <h2 className="mt-4 font-serif text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                  {t("pensil2026.galleryTitle")}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-zinc-400">
                {t("pensil2026.galleryDesc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {pensilGallery.map((photo, i) => {
                const caption = t(photo.captionKey);
                return (
                  <motion.figure
                    key={photo.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: springEase }}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      aria-label={caption}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
                    >
                      <div className="relative aspect-[4/5] w-full">
                        <Image
                          src={photo.src}
                          alt={t(photo.altKey)}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur">
                          <Maximize2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </button>
                    <figcaption className="mt-3 flex items-start gap-2 text-xs leading-5 text-zinc-400">
                      <span className="mt-1.5 h-1 w-3 shrink-0 bg-brand-orange/70" />
                      {caption}
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {lightboxIndex !== null && (
              <Lightbox
                photos={photos}
                captions={captions}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                caption={t("pensil2026.galleryLabel")}
              />
            )}
          </AnimatePresence>
        </section>

        {/* ───── CLOSING ───── */}
        <section className="relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,122,43,0.1),transparent_60%)]" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t("pensil2026.thanksLabel")}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(30px,4.5vw,56px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("pensil2026.thanksTitle")}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                {t("pensil2026.thanksBody")}
              </p>
              <p className="mt-10 font-serif text-3xl italic tracking-[-0.02em] text-brand-orange sm:text-4xl">
                {t("pensil2026.closingLine")}
              </p>
              <div className="mt-10">
                <Link
                  href="/creative"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-orange/30 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  {t("pensil2026.backCta")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
