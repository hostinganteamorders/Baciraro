"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import Lightbox from "@/components/track-record/Lightbox";
import { PaperBar, PaperFilters, usePaperBody } from "@/components/creative/paper/PaperChrome";

export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Animasi muncul saat di-scroll; otomatis mati bila pengguna memilih reduced-motion. */
export function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease },
        };
}

/** Pembungkus halaman: kertas, filter sobek, progress bar, dan bar atas. */
export function PaperShell({ children }: { children: ReactNode }) {
  usePaperBody();
  const { scrollYProgress } = useScroll();
  return (
    <main className="cp">
      <PaperFilters />
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-[color:var(--cp-brick)]" style={{ scaleX: scrollYProgress }} />
      <PaperBar base="/creative" />
      {children}
    </main>
  );
}

const torn = (c: string, pos: CSSProperties) => ({ "--c": c, ...pos }) as CSSProperties;

export type HeroImage = { src: string; alt: string; caption?: string; focus?: string };

export function PaperHero({
  eyebrow,
  title,
  desc,
  meta,
  image,
  cta,
  portrait = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc: string;
  meta?: ReactNode;
  image: HeroImage;
  cta?: { href: string; label: string };
  portrait?: boolean;
}) {
  const { lang } = useLanguage();
  const reveal = useReveal();
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <span className="cp-torn hidden md:block" style={torn("var(--cp-leaf)", { top: -30, right: 170, width: 170, height: 130 })} aria-hidden="true" />
      <span className="cp-torn hidden md:block" style={torn("var(--cp-sun)", { top: -40, right: -30, width: 190, height: 150 })} aria-hidden="true" />
      <div className="cp-wrap relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <Link href="/creative#karya" className="flex w-fit items-center gap-2 text-sm font-semibold text-[color:var(--cp-ink-2)] hover:text-[color:var(--cp-ink)]">
            <ArrowLeft className="h-4 w-4" />
            {lang === "id" ? "Semua karya" : "All work"}
          </Link>
          <motion.p {...(reduce ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease } })} className="cp-eyebrow !flex mt-6 w-fit">
            {eyebrow}
          </motion.p>
          <motion.h1 {...(reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1, ease } })} className="cp-title mt-4">
            {title}
          </motion.h1>
          <span className="cp-underline" aria-hidden="true" />
          <motion.p {...reveal(0.2)} className="cp-lead mt-7 max-w-xl">
            {desc}
          </motion.p>
          {meta && (
            <motion.div {...reveal(0.3)} className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              {meta}
            </motion.div>
          )}
          {cta && (
            <motion.div {...reveal(0.4)} className="mt-9">
              <a href={cta.href} className="cp-btn">
                {cta.label}
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </div>

        <motion.figure {...(reduce ? {} : { initial: { opacity: 0, scale: 0.96, rotate: 3 }, animate: { opacity: 1, scale: 1, rotate: 2 }, transition: { duration: 0.9, delay: 0.15, ease } })} className="cp-photo !pb-14 mx-auto w-full max-w-md rotate-2 lg:max-w-none">
          <div className={`relative ${portrait ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
            <Image src={image.src} alt={image.alt} fill priority unoptimized sizes="(max-width: 1023px) 90vw, 40vw" style={{ objectFit: "cover", objectPosition: image.focus }} className="!rounded-[3px]" />
          </div>
          {image.caption && <figcaption className="!bottom-1 !text-[.8rem] !leading-tight font-medium">{image.caption}</figcaption>}
        </motion.figure>
      </div>
    </section>
  );
}

export function SectionHead({ label, title, desc, className = "" }: { label?: string; title: ReactNode; desc?: string; className?: string }) {
  const reveal = useReveal();
  return (
    <motion.div {...reveal()} className={`mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {label && <span className="cp-eyebrow">{label}</span>}
        <h2 className="cp-h2 mt-4">{title}</h2>
      </div>
      {desc && <p className="max-w-sm text-sm leading-6 text-[color:var(--cp-ink-2)]">{desc}</p>}
    </motion.div>
  );
}

export type GalleryItem = {
  src: string;
  thumb?: string;
  alt: string;
  caption?: string;
  /** posisi crop, mis. "top" untuk tangkapan layar yang isinya di atas */
  focus?: string;
  /** rasio kotak, mis. "4/3" */
  ratio?: string;
};

/**
 * Galeri masonry bertema kertas + lightbox.
 * rotate = true untuk foto yang tersimpan menyamping (diputar 90° searah jarum jam).
 */
export function PaperGallery({
  items,
  rotate = false,
  ratios = ["4/5", "1/1", "4/3", "5/6"],
  lightboxLabel,
  columns = "columns-1 gap-6 sm:columns-2 lg:columns-3",
}: {
  items: GalleryItem[];
  rotate?: boolean;
  ratios?: string[];
  lightboxLabel?: string;
  columns?: string;
}) {
  const reveal = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className={columns}>
        {items.map((it, i) => {
          const ratio = rotate ? "3/4" : (it.ratio ?? ratios[i % ratios.length]);
          return (
            <motion.figure key={`${it.src}-${i}`} {...reveal(Math.min(i % 3, 2) * 0.05)} className="mb-7 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} aria-label={it.caption ?? it.alt} className="cp-shot">
                {rotate ? (
                  <div className="relative w-full overflow-hidden [container-type:size]" style={{ aspectRatio: ratio }}>
                    <div className="absolute left-1/2 top-1/2" style={{ width: "100cqh", height: "100cqw", transform: "translate(-50%,-50%) rotate(90deg)" }}>
                      <Image src={it.thumb ?? it.src} alt={it.alt} fill unoptimized loading="lazy" sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full" style={{ aspectRatio: ratio }}>
                    <Image src={it.thumb ?? it.src} alt={it.alt} fill unoptimized loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: it.focus }} />
                  </div>
                )}
              </button>
              {it.caption && (
                <figcaption className="mt-3 flex items-start gap-2 text-xs leading-5 text-[color:var(--cp-ink-2)]">
                  <span className="mt-1.5 h-[3px] w-4 shrink-0 rounded bg-[color:var(--cp-brick)]" />
                  {it.caption}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>
      <AnimatePresence>
        {open !== null && (
          <Lightbox
            photos={items.map((x) => ({ src: x.src, alt: x.alt }))}
            captions={items.map((x) => x.caption ?? x.alt)}
            index={open}
            onClose={() => setOpen(null)}
            caption={lightboxLabel}
            rotateDeg={rotate ? 90 : 0}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Penutup hijau dengan tombol kembali dan ajak kolaborasi. */
export function PaperClosing({ label, title, body, closing }: { label?: string; title: ReactNode; body?: string; closing?: string }) {
  const { lang } = useLanguage();
  const reveal = useReveal();
  const t = (id: string, en: string) => (lang === "id" ? id : en);
  return (
    <section className="cp-wrap pb-20 sm:pb-28">
      <motion.div {...reveal()} className="relative overflow-hidden rounded-[2rem] border-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-leaf)] px-6 py-14 shadow-[6px_6px_0_var(--cp-ink)] sm:px-14 sm:py-18">
        <span className="cp-torn hidden sm:block" style={torn("var(--cp-sun)", { right: -40, top: -40, width: 200, height: 170 })} aria-hidden="true" />
        <div className="relative max-w-2xl">
          {label && <p className="cp-hand text-3xl">{label}</p>}
          <h2 className="cp-h2 mt-2">{title}</h2>
          {body && <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--cp-ink)]/90">{body}</p>}
          {closing && <p className="cp-hand mt-8 text-4xl text-[color:var(--cp-ink)]">{closing}</p>}
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
  );
}
