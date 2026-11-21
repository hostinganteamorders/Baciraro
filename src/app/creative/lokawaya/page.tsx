"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PaperClosing, PaperGallery, PaperHero, PaperShell, SectionHead, useReveal, type GalleryItem } from "@/components/creative/paper/blocks";

const src = (name: string) => `/Lokawaya/web/${name}.webp`;
// [lebar, tinggi] setelah dikompres, dipakai sebagai rasio asli supaya foto tidak terpotong
const P: [number, number] = [619, 1100];
const Ls: [number, number] = [1100, 619];
const item = (name: string, size: [number, number], alt: string, caption?: string): GalleryItem => ({
  src: src(name),
  alt,
  caption,
  ratio: `${size[0]}/${size[1]}`,
});

export default function LokawayaPage() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const d = (k: string) => t(`lokawaya.detail.${k}`);
  const tx = (id: string, en: string) => (lang === "id" ? id : en);

  const booth = [
    item("timelapse-booth", Ls, d("boothTitle"), tx("Timelapse pemasangan booth", "Booth setup timelapse")),
    item("video-produk", P, d("boothTitle"), tx("Produk daur ulang Baciraro Creative", "Baciraro Creative recycled products")),
    item("kondisi-lokawaya", P, "Lokawaya", tx("Suasana Lokawaya", "Lokawaya atmosphere")),
    item("kondisi-lokawaya-2", P, "Lokawaya"),
    item("kondisi-booth-baciraro-creative", P, d("boothTitle"), tx("Menyambut pengunjung di booth", "Welcoming visitors at the booth")),
  ];
  const workshop = [
    item("proses-pembuatan-keychain-anak-dari-USA", P, d("workshopTitle"), tx("Anak dari USA membuat keychain-nya sendiri", "A child from the USA makes their own keychain")),
    item("kondisi-workshop-baciraro-creative", P, d("workshopTitle")),
    item("timelapse-workshop", Ls, d("workshopTitle"), tx("Timelapse workshop", "Workshop timelapse")),
  ];
  const visitors = [
    item("kunjungan-dari-turis-asing", Ls, d("visitorsTitle")),
    item("kunjungan-dari-turis-asing-2", P, d("visitorsTitle")),
    item("kunjungan-dari-turis-asing-3", P, d("visitorsTitle")),
    item("kunjungan-dari-turis-asing-4", P, d("visitorsTitle")),
    item("kunjungan-dari-turis-asing-5", P, d("visitorsTitle")),
    item("kunjungan-dari-turis-asing-6", P, d("visitorsTitle")),
    item("kunjungan-dari-turis-lokal-dan-asing", P, d("visitorsTitle")),
    item("kunjungan-turis-dari-USA", P, d("visitorsTitle")),
  ];

  return (
    <PaperShell>
      <PaperHero
        eyebrow={d("heroSubtitle")}
        title={d("heroTitle")}
        desc={d("heroDesc")}
        portrait
        image={{ src: src("kunjungan-dari-turis-asing-4"), alt: d("visitorsTitle"), caption: d("visitorsTitle") }}
        cta={{ href: "#booth", label: tx("Lihat dokumentasi", "View gallery") }}
        meta={
          <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--cp-ink-2)]">
            <Calendar className="h-4 w-4 text-[color:var(--cp-terra)]" />
            {d("heroDate")}
          </span>
        }
      />

      {/* ───── BOOTH ───── */}
      <section id="booth" className="scroll-mt-20 border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap py-20 sm:py-24">
          <SectionHead label="Booth" title={d("boothTitle")} desc={d("boothDesc")} />
          <PaperGallery items={booth} lightboxLabel={d("boothTitle")} />
        </div>
      </section>

      {/* ───── WORKSHOP ───── */}
      <section className="cp-wrap py-20 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div {...reveal()} className="self-start lg:sticky lg:top-24">
            <span className="cp-eyebrow">Workshop</span>
            <h2 className="cp-h2 mt-4">{d("workshopTitle")}</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[color:var(--cp-ink-2)]">{d("workshopDesc")}</p>
            <p className="cp-hand mt-6 text-2xl text-[color:var(--cp-brick)]">1 Dobu = Rp 1</p>
          </motion.div>
          <motion.figure {...reveal(0.1)} className="cp-photo !pb-12 mx-auto w-full max-w-sm rotate-1 lg:max-w-md">
            <div className="relative aspect-[3/4]">
              <Image src={workshop[0].src} alt={workshop[0].alt} fill unoptimized loading="lazy" sizes="(max-width: 1024px) 90vw, 40vw" style={{ objectFit: "cover" }} className="!rounded-[3px]" />
            </div>
            <figcaption className="!bottom-1 !text-[.8rem] font-medium">{workshop[0].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="mt-16">
          <PaperGallery items={workshop.slice(1)} columns="columns-1 gap-6 sm:columns-2" lightboxLabel={d("workshopTitle")} />
        </div>
      </section>

      {/* ───── PENGUNJUNG ───── */}
      <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap py-20 sm:py-28">
          <SectionHead label={tx("Pengunjung", "Visitors")} title={d("visitorsTitle")} desc={d("visitorsDesc")} />
          <PaperGallery items={visitors} lightboxLabel={d("visitorsTitle")} />
        </div>
      </section>

      <PaperClosing label={tx("Terima kasih, Lokawaya", "Thank you, Lokawaya")} title={d("visitorsTitle")} body={d("visitorsDesc")} />
    </PaperShell>
  );
}
