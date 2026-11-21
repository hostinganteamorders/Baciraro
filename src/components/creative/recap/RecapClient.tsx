"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import Lightbox from "@/components/track-record/Lightbox";
import { PaperBar, PaperFilters, usePaperBody } from "@/components/creative/paper/PaperChrome";
import { recapPhotoUrl, showcaseUrl, type L, type RecapProject } from "@/lib/creative-projects/recaps";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RecapClient({ project: p }: { project: RecapProject }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  usePaperBody();
  const tx = (v: L) => v[lang];
  const t = (id: string, en: string) => (lang === "id" ? id : en);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showIndex, setShowIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const photos = p.photos.map((photo) => ({ src: recapPhotoUrl(p, photo.n), alt: tx(photo.alt) }));
  const captions = p.photos.map((photo) => tx(photo.caption));
  const showcase = p.showcase
    ? Array.from({ length: p.showcase.count }, (_, i) => ({ src: showcaseUrl(p, i + 1), alt: `${tx(p.showcase!.label)} ${i + 1}` }))
    : [];
  const tints = ["var(--cp-terra-soft)", "var(--cp-sun)", "var(--cp-leaf)", "var(--cp-card)"];
  const heroPhoto = p.photos.find((x) => x.n === p.hero) ?? p.photos[0];

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease },
        };

  const aspects = ["aspect-[4/5]", "aspect-[1/1]", "aspect-[4/3]", "aspect-[5/6]"];

  return (
    <main className="cp">
      <PaperFilters />
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-[color:var(--cp-brick)]" style={{ scaleX: scrollYProgress }} />
      <PaperBar base="/creative" />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden">
        <span className="cp-torn hidden md:block" style={{ "--c": "var(--cp-leaf)", top: -30, right: 170, width: 170, height: 130 } as React.CSSProperties} aria-hidden="true" />
        <span className="cp-torn hidden md:block" style={{ "--c": "var(--cp-sun)", top: -40, right: -30, width: 190, height: 150 } as React.CSSProperties} aria-hidden="true" />

        <div className="cp-wrap relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
          <div>
            <Link href="/creative#karya" className="flex w-fit items-center gap-2 text-sm font-semibold text-[color:var(--cp-ink-2)] hover:text-[color:var(--cp-ink)]">
              <ArrowLeft className="h-4 w-4" />
              {t("Semua karya", "All work")}
            </Link>
            <motion.p {...(reduce ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease } })} className="cp-eyebrow !flex mt-6 w-fit">
              {tx(p.eyebrow)}
            </motion.p>
            <motion.h1 {...(reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1, ease } })} className="cp-title mt-4">
              {tx(p.title)}
            </motion.h1>
            <span className="cp-underline" aria-hidden="true" />
            <motion.p {...reveal(0.2)} className="cp-lead mt-7 max-w-xl">
              {tx(p.description)}
            </motion.p>
            <motion.div {...reveal(0.3)} className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              <span className="cp-chip">{tx(p.partner)}</span>
              <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--cp-ink-2)]">
                <Calendar className="h-4 w-4 text-[color:var(--cp-terra)]" />
                {tx(p.date)}
              </span>
            </motion.div>
            <motion.div {...reveal(0.4)} className="mt-9">
              <a href="#dokumentasi" className="cp-btn">
                {t("Lihat dokumentasi", "View gallery")}
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.figure {...(reduce ? {} : { initial: { opacity: 0, scale: 0.96, rotate: 3 }, animate: { opacity: 1, scale: 1, rotate: 2 }, transition: { duration: 0.9, delay: 0.15, ease } })} className="cp-photo !pb-14 mx-auto w-full max-w-md rotate-2 lg:max-w-none">
            <div className="relative aspect-[4/5]">
              <Image src={recapPhotoUrl(p, heroPhoto.n)} alt={tx(heroPhoto.alt)} fill priority unoptimized sizes="(max-width: 1023px) 90vw, 40vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
            </div>
            <figcaption className="!bottom-1 !text-[.8rem] !leading-tight font-medium">{tx(p.heroCaption)}</figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ───── IMPACT ───── */}
      {p.impact && (
        <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-terra)] text-white">
          <div className="cp-wrap grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:py-20">
            <motion.div {...reveal()}>
              <p className="cp-display !normal-case text-[clamp(4rem,12vw,9rem)] leading-[0.85]">{p.impact.value}</p>
              <p className="mt-3 text-lg font-bold uppercase tracking-[0.12em]">{tx(p.impact.unit)}</p>
            </motion.div>
            <motion.div {...reveal(0.1)} className="max-w-xl border-t-2 border-white/60 pt-6 md:border-l-2 md:border-t-0 md:pl-10 md:pt-0">
              <p className="text-lg font-medium leading-8">{tx(p.impact.description)}</p>
              {p.impact.note && <p className="mt-4 text-sm leading-6 text-white/90">{tx(p.impact.note)}</p>}
            </motion.div>
          </div>
        </section>
      )}

      {/* ───── STORY ───── */}
      <section className="cp-wrap py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div {...reveal()} className="self-start lg:sticky lg:top-24">
            <span className="cp-eyebrow">{tx(p.story.label)}</span>
            <h2 className="cp-h2 mt-4">{tx(p.story.title)}</h2>
            <p className="cp-hand mt-6 max-w-xs text-2xl leading-snug text-[color:var(--cp-brick)]">{tx(p.story.aside)}</p>
          </motion.div>
          <motion.div {...reveal(0.1)} className="max-w-2xl">
            {p.story.paragraphs.map((para, i) => (
              <p key={i} className={`text-base leading-8 text-[color:var(--cp-ink-2)] sm:text-lg sm:leading-9 ${i > 0 ? "mt-5" : ""}`}>
                {tx(para)}
              </p>
            ))}
            {p.story.quote && (
              <blockquote className="cp-quote">
                <p className="cp-hand text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.1]">{tx(p.story.quote)}</p>
              </blockquote>
            )}
          </motion.div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      {p.process && (
        <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
          <div className="cp-wrap py-20 sm:py-24">
            <motion.div {...reveal()} className="max-w-2xl">
              <span className="cp-eyebrow">{tx(p.process.label)}</span>
              <h2 className="cp-h2 mt-4">{tx(p.process.title)}</h2>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {p.process.steps.map((step, i) => (
                <motion.div key={i} {...reveal(i * 0.08)} className="cp-step">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[color:var(--cp-ink)] text-sm font-extrabold" style={{ background: ["var(--cp-terra)", "var(--cp-leaf)", "var(--cp-sun)"][i % 3], color: i % 3 === 0 ? "#fff" : "var(--cp-ink)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[.7rem] font-bold uppercase tracking-[0.2em] text-[color:var(--cp-brick)]">{tx(step.label)}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight">{tx(step.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--cp-ink-2)]">{tx(step.body)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── SHOWCASE (foto produk berlatar transparan) ───── */}
      {p.showcase && (
        <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
          <div className="cp-wrap py-20 sm:py-24">
            <motion.div {...reveal()} className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="cp-eyebrow">{tx(p.showcase.label)}</span>
                <h2 className="cp-h2 mt-4">{tx(p.showcase.title)}</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[color:var(--cp-ink-2)]">{tx(p.showcase.desc)}</p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {showcase.map((it, i) => (
                <motion.button
                  key={it.src}
                  type="button"
                  {...reveal(Math.min(i % 5, 4) * 0.04)}
                  onClick={() => setShowIndex(i)}
                  aria-label={it.alt}
                  className="cp-shot group !p-0"
                  style={{ background: tints[(i * 7) % tints.length] }}
                >
                  <div className="relative aspect-[3/4] w-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]">
                    <Image src={it.src} alt={it.alt} fill unoptimized loading="lazy" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw" style={{ objectFit: "contain" }} className="p-2" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {showIndex !== null && <Lightbox photos={showcase} index={showIndex} onClose={() => setShowIndex(null)} caption={tx(p.showcase.label)} />}
          </AnimatePresence>
        </section>
      )}

      {/* ───── GALLERY ───── */}
      <section id="dokumentasi" className="cp-wrap scroll-mt-20 py-20 sm:py-28">
        <motion.div {...reveal()} className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="cp-eyebrow">{tx(p.gallery.label)}</span>
            <h2 className="cp-h2 mt-4">{tx(p.gallery.title)}</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[color:var(--cp-ink-2)]">{tx(p.gallery.desc)}</p>
        </motion.div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {p.photos.map((photo, i) => {
            const caption = tx(photo.caption);
            return (
              <motion.figure key={photo.n} {...reveal(Math.min(i % 3, 2) * 0.05)} className="mb-7 break-inside-avoid">
                <button type="button" onClick={() => setLightboxIndex(i)} aria-label={caption} className="cp-shot">
                  <div className={`relative w-full ${aspects[i % aspects.length]}`}>
                    <Image src={recapPhotoUrl(p, photo.n, true)} alt={tx(photo.alt)} fill unoptimized loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                </button>
                <figcaption className="mt-3 flex items-start gap-2 text-xs leading-5 text-[color:var(--cp-ink-2)]">
                  <span className="mt-1.5 h-[3px] w-4 shrink-0 rounded bg-[color:var(--cp-brick)]" />
                  {caption}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox photos={photos} captions={captions} index={lightboxIndex} onClose={() => setLightboxIndex(null)} caption={tx(p.gallery.label)} />
          )}
        </AnimatePresence>
      </section>

      {/* ───── CLOSING ───── */}
      <section className="cp-wrap pb-20 sm:pb-28">
        <motion.div {...reveal()} className="relative overflow-hidden rounded-[2rem] border-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-leaf)] px-6 py-14 shadow-[6px_6px_0_var(--cp-ink)] sm:px-14 sm:py-18">
          <span className="cp-torn hidden sm:block" style={{ "--c": "var(--cp-sun)", right: -40, top: -40, width: 200, height: 170 } as React.CSSProperties} aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="cp-hand text-3xl">{tx(p.thanks.label)}</p>
            <h2 className="cp-h2 mt-2">{tx(p.thanks.title)}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--cp-ink)]/90">{tx(p.thanks.body)}</p>
            <p className="cp-hand mt-8 text-4xl text-[color:var(--cp-ink)]">{tx(p.thanks.closing)}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/creative#karya" className="cp-btn cp-btn--light">
                <ArrowLeft className="h-4 w-4" />
                {t("Kembali ke Baciraro Creative", "Back to Baciraro Creative")}
              </Link>
              <Link href="/contact" className="cp-btn">
                {t("Ajak kolaborasi", "Start a project")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
