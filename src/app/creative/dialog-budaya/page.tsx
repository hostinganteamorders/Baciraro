"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { PaperClosing, PaperGallery, PaperHero, PaperShell, SectionHead, useReveal, type GalleryItem } from "@/components/creative/paper/blocks";
import { Calendar } from "lucide-react";

const DIR = "/Dialog Budaya";
const full = (name: string) => `${DIR}/${name}.webp`;
const thumb = (name: string) => `${DIR}/thumb/${name}.webp`;

const narasumber = ["", " 2", " 3", " 4", " 5", " 6"].map((s) => `foto bersama dengan narasumber${s}`);
const panitia = ["", ...Array.from({ length: 13 }, (_, i) => ` ${i + 2}`)].map((s) => `foto bersama panitia${s}`);

export default function DialogBudayaPage() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const d = (k: string) => t(`dialogBudaya.detail.${k}`);

  const speakerItems: GalleryItem[] = narasumber.map((n, i) => ({
    src: full(n),
    thumb: thumb(n),
    alt: d("narasumberTitle"),
    caption: i === 0 ? d("narasumberTitle") : undefined,
    ratio: "4/3",
  }));
  const committeeItems: GalleryItem[] = panitia.map((n) => ({ src: full(n), thumb: thumb(n), alt: d("panitiaTitle") }));

  return (
    <PaperShell>
      <PaperHero
        eyebrow={d("heroSubtitle")}
        title={d("heroTitle")}
        desc={d("heroDesc")}
        image={{ src: thumb(narasumber[0]), alt: d("narasumberTitle"), caption: d("narasumberTitle") }}
        cta={{ href: "#dokumentasi", label: lang === "id" ? "Lihat dokumentasi" : "View gallery" }}
        meta={
          <>
            <span className="cp-chip">Kedai Kana, Sukur</span>
            <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--cp-ink-2)]">
              <Calendar className="h-4 w-4 text-[color:var(--cp-terra)]" />
              {d("heroDate")}
            </span>
          </>
        }
      />

      {/* ───── REGISTRASI ───── */}
      <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <motion.div {...reveal()} className="lg:order-2">
            <span className="cp-eyebrow">{lang === "id" ? "Suasana" : "Atmosphere"}</span>
            <h2 className="cp-h2 mt-4">{d("registrasiTitle")}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[color:var(--cp-ink-2)]">{d("registrasiDesc")}</p>
          </motion.div>
          <motion.figure {...reveal(0.1)} className="cp-photo !pb-12 mx-auto w-full max-w-lg -rotate-1 lg:order-1">
            <div className="relative aspect-[4/3]">
              <Image src={thumb(narasumber[2])} alt={d("registrasiTitle")} fill unoptimized loading="lazy" sizes="(max-width: 1024px) 90vw, 45vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
            </div>
            <figcaption className="!bottom-1 !text-[.8rem] font-medium">{d("registrasiTitle")}</figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ───── DOKUMENTASI ───── */}
      <section id="dokumentasi" className="cp-wrap scroll-mt-20 py-20 sm:py-28">
        <SectionHead label={d("fotoBersamaTitle")} title={d("narasumberTitle")} desc={d("narasumberDesc")} />
        <PaperGallery items={speakerItems} lightboxLabel={d("narasumberTitle")} />

        <div className="mt-20">
          <SectionHead label={d("fotoBersamaTitle")} title={d("panitiaTitle")} desc={d("panitiaDesc")} />
          <PaperGallery items={committeeItems} rotate lightboxLabel={d("panitiaTitle")} />
        </div>
      </section>

      <PaperClosing label={lang === "id" ? "Terima kasih" : "Thank you"} title={d("fotoBersamaTitle")} body={d("fotoBersamaDesc")} />
    </PaperShell>
  );
}
