"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, AtSign, Boxes, Palette, Recycle, Search, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { categoryLabel, works, type WorkCategory } from "@/lib/creative-projects/works";
import { recapPhotoUrl, recapProjects } from "@/lib/creative-projects/recaps";
import { projectImages as pensilImages } from "@/lib/creative-projects/pensil-2026";
import { PaperBar, PaperFilters, usePaperBody } from "@/components/creative/paper/PaperChrome";
import "./creative-paper.css";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
};

const IG = "https://www.instagram.com/baciraro_creative/";

const heroPhotos = (() => {
  const ag = recapProjects.find((p) => p.slug === "annual-games-2026")!;
  const ka = recapProjects.find((p) => p.slug === "atribut-kawasaran")!;
  return {
    trophy: recapPhotoUrl(ag, 19, true),
    handover: pensilImages.trophies,
    dancer: recapPhotoUrl(ka, 16, true),
  };
})();

export default function CreativePage() {
  const { lang } = useLanguage();
  usePaperBody();
  const reduce = useReducedMotion();
  const tx = (id: string, en: string) => (lang === "id" ? id : en);

  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const items: Product[] = data?.products || data || [];
        setProducts(items.slice(0, 8));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const shown = useMemo(() => (filter === "all" ? works : works.filter((w) => w.category === filter)), [filter]);
  const cats = Object.keys(categoryLabel) as WorkCategory[];
  const aspects = ["aspect-[4/5]", "aspect-[1/1]", "aspect-[4/3]", "aspect-[5/6]"];

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease },
        };

  const stats = [
    { cls: "cp-stat--terra", value: "2.078", unit: tx("gram", "grams"), label: tx("tutup botol jadi Piala Aer Tembaga", "bottle caps became the Aer Tembaga trophies") },
    { cls: "cp-stat--leaf", value: "2.904", unit: tx("gram", "grams"), label: tx("plastik jadi piala PENSIL 2026", "plastic became PENSIL 2026 trophies") },
    { cls: "cp-stat--sun", value: "312", unit: tx("penghargaan", "awards"), label: tx("27 piala + 285 medali Annual Games 2026", "27 trophies + 285 medals for Annual Games 2026") },
    { cls: "cp-stat--paper", value: String(works.length), unit: tx("proyek", "projects"), label: tx("terdokumentasi di halaman ini", "documented on this page") },
  ];

  const pillars = [
    { icon: Sparkles, title: tx("Tradisi & Inovasi", "Tradition & Innovation"), body: tx("Memadukan kearifan lokal dengan teknologi daur ulang modern.", "Blending local wisdom with modern recycling technology.") },
    { icon: Recycle, title: tx("Ekonomi Sirkular", "Circular Economy"), body: tx("Mengubah limbah plastik menjadi produk bernilai budaya tinggi.", "Turning plastic waste into products of high cultural value.") },
    { icon: Users, title: tx("Kolaborasi Komunitas", "Community Collaboration"), body: tx("Memberdayakan seniman, desainer, dan komunitas untuk masa depan berkelanjutan.", "Empowering artists, designers and communities for a sustainable future.") },
  ];

  const tickerWords = ["Recycle", "Create", "Collaborate"];
  const ticker = Array.from({ length: 12 }, (_, i) => tickerWords[i % 3]);

  return (
    <main className="cp">
      <PaperFilters />
      <PaperBar />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden">
        <span className="cp-torn hidden md:block" style={{ "--c": "var(--cp-leaf)", top: -30, right: 170, width: 190, height: 150 } as React.CSSProperties} aria-hidden="true" />
        <span className="cp-torn hidden md:block" style={{ "--c": "var(--cp-sun)", top: -40, right: -30, width: 210, height: 170 } as React.CSSProperties} aria-hidden="true" />
        <span className="cp-torn hidden md:block" style={{ "--c": "var(--cp-terra)", top: 110, right: -40, width: 150, height: 170 } as React.CSSProperties} aria-hidden="true" />

        <div className="cp-wrap relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28 lg:pt-20">
          <div>
            <motion.p {...(reduce ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease } })} className="cp-hand text-2xl text-[color:var(--cp-brick)]">
              {tx("halo, kami…", "hello, we are…")}
            </motion.p>

            <motion.h1
              {...(reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1, ease } })}
              className="cp-display mt-3 text-[clamp(2.6rem,7.4vw,6.4rem)]"
            >
              <span className="cp-block">{tx("Dari sampah,", "From waste,")}</span>
              <br />
              <span>{tx("jadi karya.", "to creation.")}</span>
              <span className="cp-underline" aria-hidden="true" />
            </motion.h1>

            <motion.p {...reveal(0.2)} className="cp-lead mt-8 max-w-xl">
              {tx(
                "Baciraro Creative adalah creative arm dari Baciraro Recycle — membawa semangat circular economy ke desain, produk, komunikasi visual, teknologi, dan kolaborasi.",
                "Baciraro Creative is the creative arm of Baciraro Recycle — bringing the spirit of the circular economy to design, products, visual communication, technology and collaboration.",
              )}
            </motion.p>

            <motion.div {...reveal(0.3)} className="mt-6">
              <span className="cp-search">
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>{tx("oke google apa itu baciraro creative", "ok google what is baciraro creative")}</span>
                <span className="cp-caret" aria-hidden="true" />
              </span>
            </motion.div>

            <motion.div {...reveal(0.4)} className="mt-9 flex flex-wrap gap-4">
              <a href="#karya" className="cp-btn">
                {tx("Lihat karya kami", "See our work")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#tentang" className="cp-btn cp-btn--ghost">
                {tx("Kenali kami", "About us")}
              </a>
            </motion.div>
          </div>

          {/* kolase foto */}
          <motion.div {...(reduce ? {} : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, delay: 0.15, ease } })} className="relative mx-auto h-[28rem] w-full max-w-[34rem] sm:h-[34rem]">
            <figure className="cp-photo absolute left-0 top-6 w-[52%] -rotate-[5deg]">
              <div className="relative aspect-[3/4]">
                <Image src={heroPhotos.trophy} alt={tx("Piala Annual Games 2026 dari plastik daur ulang", "Annual Games 2026 trophy from recycled plastic")} fill sizes="(max-width: 640px) 50vw, 280px" priority unoptimized />
              </div>
              <figcaption className="cp-hand">{tx("piala juara", "champion trophy")}</figcaption>
            </figure>
            <figure className="cp-photo absolute right-0 top-0 w-[46%] rotate-[4deg]">
              <div className="relative aspect-[4/5]">
                <Image src={heroPhotos.handover} alt={tx("Deretan piala PENSIL 2026", "PENSIL 2026 trophies lined up")} fill sizes="(max-width: 640px) 46vw, 250px" priority unoptimized />
              </div>
              <figcaption className="cp-hand">{tx("PENSIL 2026", "PENSIL 2026")}</figcaption>
            </figure>
            <figure className="cp-photo absolute bottom-0 right-[10%] w-[50%] rotate-[-2deg]">
              <div className="relative aspect-[4/3]">
                <Image src={heroPhotos.dancer} alt={tx("Atribut Kawasaran dari plastik daur ulang", "Kawasaran attributes from recycled plastic")} fill sizes="(max-width: 640px) 50vw, 270px" unoptimized />
              </div>
              <figcaption className="cp-hand">{tx("atribut Kawasaran", "Kawasaran attributes")}</figcaption>
            </figure>

            {/* stiker putar */}
            <div className="absolute bottom-6 left-2 h-28 w-28 sm:h-32 sm:w-32" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="cp-spin h-full w-full">
                <defs>
                  <path id="cp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="var(--cp-leaf)" stroke="var(--cp-ink)" strokeWidth="2" />
                <text fontSize="11.5" fontWeight="700" letterSpacing="2.2" fill="var(--cp-ink)">
                  <textPath href="#cp-circle">RECYCLE • CREATE • COLLABORATE •</textPath>
                </text>
              </svg>
              <Recycle className="absolute inset-0 m-auto h-9 w-9 text-[color:var(--cp-ink)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── PITA BERJALAN ───── */}
      <div className="cp-ticker" aria-hidden="true">
        <div className="cp-ticker-track">
          {[...ticker, ...ticker].map((w, i) => (
            <span key={i} className="cp-display flex shrink-0 items-center gap-6 px-6 py-3 text-lg sm:text-xl">
              {w}
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[color:var(--cp-ink)]" />
            </span>
          ))}
        </div>
      </div>

      {/* ───── ANGKA ───── */}
      <section className="cp-wrap py-20 sm:py-24">
        <motion.div {...reveal()} className="max-w-2xl">
          <span className="cp-eyebrow">{tx("Dampak nyata", "Real impact")}</span>
          <h2 className="cp-h2 mt-4">{tx("Sampah yang kami ubah jadi sesuatu.", "Waste we turned into something.")}</h2>
        </motion.div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...reveal(i * 0.07)} className={`cp-stat ${s.cls}`} style={{ rotate: i % 2 ? "0.6deg" : "-0.6deg" }}>
              <p className="cp-display text-[clamp(2.6rem,5vw,3.8rem)] !normal-case leading-none">{s.value}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em]">{s.unit}</p>
              <p className="mt-4 text-sm leading-6 opacity-90">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── TENTANG ───── */}
      <section id="tentang" className="scroll-mt-20 border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <motion.div {...reveal()}>
            <span className="cp-eyebrow">{tx("Tentang kami", "About us")}</span>
            <h2 className="cp-h2 mt-4">
              {tx("Kreativitas itu cara memberi ", "Creativity is a way of giving ")}
              <span className="cp-block cp-block--sun">{tx("nilai baru", "new value")}</span>
              {tx(" pada material, ide, dan peluang kolaborasi.", " to material, ideas and chances to collaborate.")}
            </h2>
            <p className="cp-lead mt-8 max-w-xl">
              {tx(
                "Mulai dari pengembangan produk daur ulang, kebutuhan creative media, hingga project kolaboratif bersama komunitas, brand, institusi, dan berbagai stakeholder — Baciraro Creative tumbuh sebagai ruang untuk menciptakan karya yang relevan, berkelanjutan, dan berdampak.",
                "From recycled-product development and creative-media needs to collaborative projects with communities, brands, institutions and stakeholders — Baciraro Creative grows as a space for relevant, sustainable, high-impact work.",
              )}
            </p>
            <p className="cp-hand mt-6 text-3xl text-[color:var(--cp-brick)]">{tx("setiap proses membuka kemungkinan baru.", "every process opens a new possibility.")}</p>
          </motion.div>

          <ul className="grid gap-5">
            {pillars.map((p, i) => (
              <motion.li key={p.title} {...reveal(i * 0.08)} className="flex gap-4 rounded-2xl border-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-card)] p-5 shadow-[4px_4px_0_var(--cp-ink)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[color:var(--cp-ink)]" style={{ background: ["var(--cp-terra)", "var(--cp-leaf)", "var(--cp-sun)"][i] }}>
                  <p.icon className="h-6 w-6" style={{ color: i === 0 ? "#fff" : "var(--cp-ink)" }} />
                </span>
                <div>
                  <h3 className="text-base font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--cp-ink-2)]">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── CARA KERJA ───── */}
      <section className="cp-wrap py-20 sm:py-24">
        <motion.div {...reveal()} className="max-w-2xl">
          <span className="cp-eyebrow">{tx("Cara kerja", "How we work")}</span>
          <h2 className="cp-h2 mt-4">{tx("Dari tumpukan plastik ke benda yang bercerita.", "From a pile of plastic to an object with a story.")}</h2>
          <p className="cp-lead mt-4">
            {tx(
              "Baciraro Recycle mengelola sampahnya; Baciraro Creative mengubahnya jadi desain, produk, dan karya kolaboratif.",
              "Baciraro Recycle handles the waste; Baciraro Creative turns it into design, products and collaborative work.",
            )}
          </p>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Boxes, color: "var(--cp-terra)", fg: "#fff", n: "01", title: tx("Kumpulkan & pilah", "Collect & sort"), body: tx("Plastik bekas dikumpulkan, dibersihkan, dan dipilah per jenis dan warna.", "Used plastic is collected, cleaned and sorted by type and colour.") },
            { icon: Recycle, color: "var(--cp-leaf)", fg: "var(--cp-ink)", n: "02", title: tx("Olah jadi material", "Process into material"), body: tx("Dicacah dan dipres menjadi papan bermotif — setiap warna jadi pola yang tidak akan pernah sama.", "Shredded and pressed into patterned boards — every colour becomes a pattern that is never the same twice.") },
            { icon: Palette, color: "var(--cp-sun)", fg: "var(--cp-ink)", n: "03", title: tx("Desain & kolaborasi", "Design & collaborate"), body: tx("Bersama klien dan komunitas, papan itu dibentuk jadi piala, produk, dan karya budaya.", "Together with clients and communities, the boards are shaped into trophies, products and cultural work.") },
          ].map((st, i) => (
            <motion.div key={st.n} {...reveal(i * 0.08)} className="cp-step">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[color:var(--cp-ink)]" style={{ background: st.color }}>
                <st.icon className="h-6 w-6" style={{ color: st.fg }} />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--cp-brick)]">{st.n}</p>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight">{st.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--cp-ink-2)]">{st.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── KARYA ───── */}
      <section id="karya" className="cp-wrap scroll-mt-20 py-20 sm:py-28">
        <motion.div {...reveal()} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="cp-eyebrow">{tx("Karya & proyek", "Work & projects")}</span>
            <h2 className="cp-h2 mt-4">{tx("Semua yang sudah kami buat.", "Everything we've made.")}</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={tx("Filter karya", "Filter work")}>
            <button type="button" className="cp-filter" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              {tx("Semua", "All")} ({works.length})
            </button>
            {cats.map((c) => (
              <button key={c} type="button" className="cp-filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {categoryLabel[c][lang]} ({works.filter((w) => w.category === c).length})
              </button>
            ))}
          </div>
        </motion.div>

        <div key={filter} className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {shown.map((w, i) => (
            <motion.div key={w.slug} {...(reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: Math.min(i, 8) * 0.05, ease } })}>
              <Link href={w.href} className="cp-card">
                <div className={`cp-card-img ${aspects[i % aspects.length]}`}>
                  <Image
                    src={w.image}
                    alt={w.title[lang]}
                    fill
                    unoptimized
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: w.focus ?? "50% 50%" }}
                  />
                  <span className="cp-chip absolute left-3 top-3" data-cat={w.category}>
                    {w.tag[lang]}
                  </span>
                  {w.figure && <span className="cp-badge">{w.figure}</span>}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-snug tracking-tight">{w.title[lang]}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--cp-brick)]">{w.partner[lang]}</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--cp-ink-2)]">{w.blurb[lang]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                    {w.cta[lang]}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── DIPERCAYA OLEH ───── */}
      <section className="border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]/70">
        <div className="cp-wrap py-14">
          <p className="cp-eyebrow">{tx("Dipercaya & didukung oleh", "Trusted & supported by")}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {["Bank Indonesia", "PT Bintan Industrial Estate", "Masarang Foundation", "Universitas Negeri Manado", "Kementerian Kebudayaan RI", "LPDP", "Dana Indonesiaraya", "Mataluntung Coffee & Culture", "SMA Negeri 1 Manado", "Galeri Investasi BEI FEB UNIMA"].map((n) => (
              <li key={n} className="cp-partner">{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── KATALOG PRODUK ───── */}
      <section id="katalog" className="scroll-mt-20 border-y-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-leaf)]/25">
        <div className="cp-wrap py-20 sm:py-24">
          <motion.div {...reveal()} className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="cp-eyebrow">{tx("Katalog produk", "Product catalog")}</span>
              <h2 className="cp-h2 mt-4">{tx("Bisa dibawa pulang.", "Take it home.")}</h2>
              <p className="cp-lead mt-4">{tx("Produk daur ulang dari studio kami — ganci, aksesori, hingga perlengkapan.", "Recycled products from our studio — keychains, accessories and more.")}</p>
            </div>
            <Link href="/products" className="cp-btn cp-btn--light self-start md:self-auto">
              {tx("Lihat semua produk", "See all products")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }, (_, i) => <div key={i} className="cp-skel aspect-[4/5]" />)
              : products.map((p, i) => (
                  <motion.div key={p.id} {...reveal(Math.min(i, 7) * 0.05)}>
                    <Link href={`/products/${p.slug}`} className="cp-prod">
                      <div className="relative aspect-square overflow-hidden border-b-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-paper-2)]">
                        <Image src={p.image_url} alt={p.title} fill unoptimized loading="lazy" sizes="(max-width: 1024px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="p-3 sm:p-4">
                        <span className="cp-chip" data-cat={p.category === "plastic" ? "produk" : p.category === "art" ? "budaya" : undefined}>
                          {p.category}
                        </span>
                        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug">{p.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ───── KOLABORASI / PENUTUP ───── */}
      <section id="kolaborasi" className="cp-wrap scroll-mt-20 py-20 sm:py-28">
        <motion.div {...reveal()} className="relative overflow-hidden rounded-[2rem] border-2 border-[color:var(--cp-ink)] bg-[color:var(--cp-terra)] px-6 py-14 text-white shadow-[6px_6px_0_var(--cp-ink)] sm:px-14 sm:py-20">
          <span className="cp-torn" style={{ "--c": "var(--cp-sun)", right: -50, top: -50, width: 220, height: 200 } as React.CSSProperties} aria-hidden="true" />
          <span className="cp-torn" style={{ "--c": "var(--cp-leaf)", right: 120, bottom: -60, width: 200, height: 150 } as React.CSSProperties} aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="cp-hand text-3xl">{tx("yuk bikin sesuatu bareng", "let's make something together")}</p>
            <h2 className="cp-display mt-3 text-[clamp(2rem,5.4vw,4.2rem)]">{tx("Punya sampah, ide, atau acara?", "Got waste, an idea, or an event?")}</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/95">
              {tx(
                "Piala, merchandise, produk custom, workshop, sampai project budaya — kita ubah jadi karya yang bercerita.",
                "Trophies, merchandise, custom products, workshops, even cultural projects — we'll turn them into work that tells a story.",
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="cp-btn cp-btn--light">
                {tx("Ajak kolaborasi", "Start a project")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={IG} target="_blank" rel="noopener noreferrer" className="cp-btn cp-btn--light" style={{ background: "transparent", color: "#fff", borderColor: "#fff", boxShadow: "3px 3px 0 var(--cp-ink)" }}>
                <AtSign className="h-4 w-4" />
                @baciraro_creative
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t-2 border-[color:var(--cp-ink)] py-10 text-center">
        <p className="cp-display text-sm tracking-[0.2em]">Recycle • Create • Collaborate</p>
        <p className="mt-2 text-xs text-[color:var(--cp-ink-2)]">
          {tx("Baciraro Creative — bagian dari ekosistem", "Baciraro Creative — part of the")} <Link href="/" className="font-bold underline">Baciraro</Link>
          {lang === "en" ? " ecosystem" : ""}
        </p>
      </footer>
    </main>
  );
}
