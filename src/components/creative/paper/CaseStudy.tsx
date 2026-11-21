"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PaperClosing, PaperGallery, PaperHero, PaperShell, SectionHead, useReveal, type GalleryItem } from "@/components/creative/paper/blocks";

export type CaseImage = { src: string; alt: string; caption?: string };

export type CaseChapter = {
  number?: string;
  kicker?: string;
  heading: string;
  body: string;
  images: CaseImage[];
  chips?: string[];
};

export type CaseData = {
  eyebrow: string;
  title: string;
  desc: string;
  client: string;
  year: number | string;
  tags: string[];
  hero: CaseImage;
  stat?: { value: string; unit: string; note: string };
  intro: { kicker: string; heading: string; body: string };
  brief: { kicker: string; statement: string; concepts: { title: string; description: string }[] };
  chapters: CaseChapter[];
  notes?: { kicker: string; heading: string; items: { title: string; description: string }[] };
  palette?: { kicker: string; heading: string; items: { label: string; src: string; alt: string }[] };
  flow?: { kicker: string; heading: string; steps: string[] };
  closing: { quote: string; body: string; attribution?: string };
  archive: { kicker: string; title: string; categories: string[]; items: (GalleryItem & { category: string })[] };
  cta: { heading: string; body: string };
};

/** "Baris satu\nBaris dua" → dua baris. */
const nl = (s: string): ReactNode =>
  s.split("\n").map((line, i, a) => (
    <Fragment key={i}>
      {line}
      {i < a.length - 1 && <br />}
    </Fragment>
  ));

const paras = (s: string) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
const accents = ["var(--cp-terra)", "var(--cp-leaf)", "var(--cp-sun)"];
const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

function Polaroids({ images }: { images: CaseImage[] }) {
  const reveal = useReveal();
  const shown = images.slice(0, 3);
  if (shown.length === 1) {
    return (
      <motion.figure {...reveal()} className="cp-photo !pb-12 mx-auto w-full max-w-lg rotate-1">
        <div className="relative aspect-[4/3]">
          <Image src={shown[0].src} alt={shown[0].alt} fill unoptimized loading="lazy" sizes="(max-width: 1024px) 90vw, 45vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
        </div>
        {shown[0].caption && <figcaption className="!bottom-1 !text-[.8rem] font-medium">{shown[0].caption}</figcaption>}
      </motion.figure>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-5">
      {shown.map((im, i) => (
        <motion.figure key={im.src} {...reveal(i * 0.08)} className={`cp-photo !pb-10 ${tilt[i % tilt.length]} ${i === 0 && shown.length === 3 ? "col-span-2 mx-auto w-4/5" : ""}`}>
          <div className={`relative ${i === 0 && shown.length === 3 ? "aspect-[4/3]" : "aspect-[1/1]"}`}>
            <Image src={im.src} alt={im.alt} fill unoptimized loading="lazy" sizes="(max-width: 1024px) 45vw, 22vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
          </div>
          {im.caption && <figcaption className="!bottom-1 !text-[.7rem] font-medium">{im.caption}</figcaption>}
        </motion.figure>
      ))}
    </div>
  );
}

export default function CaseStudy({ data: d }: { data: CaseData }) {
  const { lang } = useLanguage();
  const reveal = useReveal();
  const t = (id: string, en: string) => (lang === "id" ? id : en);
  const [cat, setCat] = useState<string>("ALL");
  const [all, setAll] = useState(false);

  const limit = 12;
  const filtered = useMemo(() => (cat === "ALL" ? d.archive.items : d.archive.items.filter((i) => i.category === cat)), [cat, d.archive.items]);
  const visible = all ? filtered : filtered.slice(0, limit);

  return (
    <PaperShell>
      <PaperHero
        eyebrow={d.eyebrow}
        title={nl(d.title)}
        desc={d.desc}
        image={d.hero}
        cta={{ href: "#arsip", label: t("Lihat arsip foto", "View photo archive") }}
        meta={
          <>
            <span className="cp-chip">{d.client}</span>
            <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--cp-ink-2)]">
              <Calendar className="h-4 w-4 text-[color:var(--cp-terra)]" />
              {d.year}
            </span>
            {d.tags.slice(0, 3).map((x) => (
              <span key={x} className="rounded-full border-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-card)] px-3 py-1 text-xs font-bold">
                {x}
              </span>
            ))}
          </>
        }
      />

      {d.stat && (
        <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-terra)] text-white">
          <div className="cp-wrap grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:py-20">
            <motion.div {...reveal()}>
              <p className="cp-display !normal-case text-[clamp(4rem,12vw,9rem)] leading-[0.85]">{d.stat.value}</p>
              <p className="mt-3 text-lg font-bold uppercase tracking-[0.12em]">{d.stat.unit}</p>
            </motion.div>
            <motion.p {...reveal(0.1)} className="max-w-xl border-t-2 border-white/60 pt-6 text-lg font-medium leading-8 md:border-l-2 md:border-t-0 md:pl-10 md:pt-0">
              {d.stat.note}
            </motion.p>
          </div>
        </section>
      )}

      {/* ───── INTRO ───── */}
      <section className="cp-wrap py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div {...reveal()} className="self-start lg:sticky lg:top-24">
            <span className="cp-eyebrow">{d.intro.kicker}</span>
            <h2 className="cp-h2 mt-4">{nl(d.intro.heading)}</h2>
          </motion.div>
          <motion.div {...reveal(0.1)} className="max-w-2xl">
            {paras(d.intro.body).map((p, i) => (
              <p key={i} className={`text-base leading-8 text-[color:var(--cp-ink-2)] sm:text-lg sm:leading-9 ${i > 0 ? "mt-5" : ""}`}>
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── BRIEF ───── */}
      <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap py-20 sm:py-24">
          <motion.div {...reveal()} className="max-w-3xl">
            <span className="cp-eyebrow">{d.brief.kicker}</span>
            <blockquote className="cp-quote mt-6">
              <p className="cp-hand text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.1]">{nl(d.brief.statement)}</p>
            </blockquote>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {d.brief.concepts.map((c, i) => (
              <motion.div key={c.title} {...reveal(i * 0.08)} className="cp-step">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[color:var(--cp-ink)] text-sm font-extrabold" style={{ background: accents[i % 3], color: i % 3 === 0 ? "#fff" : "var(--cp-ink)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold uppercase tracking-wide">{c.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--cp-ink-2)]">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CHAPTERS ───── */}
      {d.chapters.map((c, i) => (
        <section key={c.heading + i} className={i % 2 ? "border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70" : ""}>
          <div className={`cp-wrap grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <motion.div {...reveal()}>
              <div className="flex items-center gap-3">
                {c.number && (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[color:var(--cp-ink)] text-sm font-extrabold" style={{ background: accents[i % 3], color: i % 3 === 0 ? "#fff" : "var(--cp-ink)" }}>
                    {c.number}
                  </span>
                )}
                {c.kicker && <span className="cp-eyebrow">{c.kicker}</span>}
              </div>
              <h2 className="cp-h2 mt-5">{nl(c.heading)}</h2>
              {paras(c.body).map((p, k) => (
                <p key={k} className="mt-5 max-w-xl text-base leading-8 text-[color:var(--cp-ink-2)]">
                  {p}
                </p>
              ))}
              {c.chips && c.chips.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.chips.map((x) => (
                    <span key={x} className="cp-chip">
                      {x}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
            <Polaroids images={c.images} />
          </div>
        </section>
      ))}

      {/* ───── NOTES ───── */}
      {d.notes && (
        <section className="cp-wrap py-20 sm:py-24">
          <SectionHead label={d.notes.kicker} title={nl(d.notes.heading)} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.notes.items.map((n, i) => (
              <motion.div key={n.title} {...reveal(i * 0.06)} className="cp-step">
                <span className="block h-2 w-14 rounded" style={{ background: accents[i % 3] }} />
                <h3 className="mt-4 text-base font-extrabold uppercase tracking-wide">{n.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--cp-ink-2)]">{n.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ───── PALETTE ───── */}
      {d.palette && (
        <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
          <div className="cp-wrap py-20 sm:py-24">
            <SectionHead label={d.palette.kicker} title={nl(d.palette.heading)} />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {d.palette.items.map((p, i) => (
                <motion.figure key={p.label} {...reveal(i * 0.05)} className={`cp-photo !pb-9 ${tilt[i % tilt.length]}`}>
                  <div className="relative aspect-square">
                    <Image src={p.src} alt={p.alt} fill unoptimized loading="lazy" sizes="(max-width: 640px) 45vw, 20vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
                  </div>
                  <figcaption className="!bottom-1 !text-[.65rem] font-bold uppercase tracking-wider">{p.label}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── FLOW ───── */}
      {d.flow && (
        <section className="cp-wrap py-20 sm:py-24">
          <SectionHead label={d.flow.kicker} title={nl(d.flow.heading)} />
          <motion.ol {...reveal()} className="flex flex-wrap items-center gap-x-3 gap-y-4">
            {d.flow.steps.map((s, i) => (
              <Fragment key={s}>
                <li className="rounded-full border-2 border-[color:var(--cp-ink)] px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-[3px_3px_0_var(--cp-ink)]" style={{ background: accents[i % 3], color: i % 3 === 0 ? "#fff" : "var(--cp-ink)" }}>
                  {s}
                </li>
                {i < d.flow!.steps.length - 1 && <ArrowRight className="h-4 w-4 text-[color:var(--cp-ink-2)]" aria-hidden="true" />}
              </Fragment>
            ))}
          </motion.ol>
        </section>
      )}

      {/* ───── CLOSING QUOTE ───── */}
      <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-brick)] text-white">
        <div className="cp-wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <motion.p {...reveal()} className="cp-hand text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
            {nl(d.closing.quote)}
          </motion.p>
          <motion.div {...reveal(0.1)}>
            {paras(d.closing.body).map((p, i) => (
              <p key={i} className={`text-base leading-8 text-white/90 ${i > 0 ? "mt-4" : ""}`}>
                {p}
              </p>
            ))}
            {d.closing.attribution && <p className="mt-6 whitespace-pre-line text-xs font-bold uppercase tracking-[0.2em] text-white/80">{d.closing.attribution}</p>}
          </motion.div>
        </div>
      </section>

      {/* ───── ARCHIVE ───── */}
      <section id="arsip" className="cp-wrap scroll-mt-20 py-20 sm:py-28">
        <SectionHead label={d.archive.kicker} title={d.archive.title} />
        <div className="mb-10 flex flex-wrap gap-2">
          {["ALL", ...d.archive.categories].map((c) => (
            <button
              key={c}
              type="button"
              className="cp-filter"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setAll(false);
              }}
            >
              {c === "ALL" ? t("SEMUA", "ALL") : c}
            </button>
          ))}
        </div>
        <PaperGallery key={cat + String(all)} items={visible} lightboxLabel={d.archive.title} />
        {filtered.length > limit && (
          <div className="mt-4 flex justify-center">
            <button type="button" className="cp-btn" onClick={() => setAll((v) => !v)}>
              {all ? t("Tampilkan lebih sedikit", "Show fewer") : t(`Lihat semua ${filtered.length} foto`, `View all ${filtered.length} photos`)}
            </button>
          </div>
        )}
      </section>

      <PaperClosing title={nl(d.cta.heading)} body={d.cta.body} />
    </PaperShell>
  );
}
