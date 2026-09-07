"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles, Target, Recycle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
};

const categoryAccent: Record<string, string> = {
  plastic: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  organic: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  craft: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  digital: "border-purple-500/20 bg-purple-500/10 text-purple-400",
  art: "border-[#f2d479]/20 bg-[#f2d479]/10 text-[#f2d479]",
};

export default function CreativePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const items: Product[] = data?.products || data || [];
        setProducts(items.slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative overflow-hidden text-primary-text min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">

        {/* ───── SECTION 1: HERO ───── */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <video
            src="/teaser dialog budaya.mp4"
            autoPlay loop playsInline preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: springEase }}
            >
              <Image
                src="/Logo Baciraro Creative.png"
                alt={t("creative.heroLogoAlt")}
                width={140}
                height={48}
                className="mb-8 h-auto w-28 object-contain md:w-36"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: springEase }}
              className="max-w-4xl font-serif text-[clamp(24px,5vw,56px)] font-normal leading-[1.1] tracking-[-0.02em] text-white"
            >
              {t("creative.heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: springEase }}
              className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base md:text-lg"
            >
              {t("creative.heroTagline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: springEase }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-orange" />
                {t("creative.heroDate")}
              </span>
              <span className="hidden text-white/20 sm:inline">&middot;</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-terracotta" />
                {t("creative.heroVenue")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: springEase }}
              className="mt-10"
            >
              <a
                href="#dialog-budaya"
                className="group inline-flex items-center gap-3 rounded-full bg-brand-terracotta px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-orange hover:gap-4"
              >
                {t("creative.heroCtaRecap")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ───── SECTION 2: TENTANG BACIRARO CREATIVE ───── */}
        <section className="relative border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,74,58,0.08),transparent_60%)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: springEase }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold"
            >
              {t("creative.tentangLabel")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
              className="mt-4 font-serif text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em] text-white"
            >
              {t("creative.tentangTitle")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
              className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base md:text-lg"
            >
              {t("creative.tentangBody")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: springEase }}
              className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                { icon: Sparkles, color: "text-brand-terracotta", key: "Tradisi & Inovasi", desc: "Memadukan kearifan lokal dengan teknologi daur ulang modern." },
                { icon: Recycle, color: "text-brand-green", key: "Ekonomi Sirkular", desc: "Mengubah limbah plastik menjadi produk bernilai budaya tinggi." },
                { icon: Target, color: "text-brand-orange", key: "Kolaborasi Komunitas", desc: "Memberdayakan seniman, desainer, dan komunitas untuk masa depan berkelanjutan." },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center backdrop-blur">
                  <item.icon className={`mx-auto h-8 w-8 ${item.color}`} />
                  <h3 className="mt-4 text-sm font-semibold text-white">{item.key}</h3>
                  <p className="mt-2 text-xs text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───── SECTION 3: PORTFOLIO PRODUK ───── */}
        <section className="relative border-t border-white/5 px-4 py-20 sm:px-6 md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(111,175,79,0.05),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
              className="text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-green">
                {t("creative.portfolioTitle")}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(24px,3.5vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                {t("creative.portfolioTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
                {t("creative.portfolioSubtitle")}
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p className="col-span-full text-center text-sm text-zinc-500">{t("creative.portfolioLoading")}</p>
              ) : (
                products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: springEase }}
                  >
                    <Link href={`/products/${product.slug}`} className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all hover:border-white/20 hover:bg-white/[0.05]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${categoryAccent[product.category] || categoryAccent.craft}`}>
                          {product.category}
                        </span>
                        <h3 className="mt-2 text-sm font-semibold text-white transition-colors group-hover:text-brand-gold">
                          {product.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                          {product.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
              className="mt-10 text-center"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-green/30 hover:text-white"
              >
                {t("creative.portfolioCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ───── SECTION 4: DIALOG BUDAYA RECAP ───── */}
        <section id="dialog-budaya" className="relative border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,74,58,0.06),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: photo full-height */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="relative h-[50vh] lg:h-auto overflow-hidden"
            >
              <Image
                src="/Dialog Budaya/foto bersama dengan narasumber.webp"
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent lg:bg-gradient-to-r lg:from-background/80 lg:via-background/20 lg:to-transparent" />
            </motion.div>

            {/* Right: content */}
            <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: springEase }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                  {t("dialogBudaya.label")}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(24px,4vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                  {t("dialogBudaya.title")}
                </h2>
                <p className="mt-1.5 text-sm text-brand-gold/80">
                  {t("dialogBudaya.date")}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
                  {t("dialogBudaya.description")}
                </p>
              </motion.div>

              {/* Media thumbnails row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                  <Image
                    src="/Dialog Budaya/registrasi.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{t("dialogBudaya.detail.registrasiTitle")}</span>
                  </div>
                </div>
                <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                  <video
                    src="/Dialog Budaya/spech nyong sulut.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{t("dialogBudaya.detail.pidatoTitle")}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: springEase }}
                className="mt-6"
              >
                <Link
                  href="/creative/dialog-budaya"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-gold/30 hover:text-white"
                >
                  {t("dialogBudaya.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── SECTION 5: LOKAWAYA RECAP ───── */}
        <section className="relative border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,212,121,0.06),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: photo full-height */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEase }}
              className="relative h-[50vh] lg:h-auto overflow-hidden"
            >
              <Image
                src="/Lokawaya/customer anak dari USA setelah selesai membuat sendiri keychainnya dari tutup botol plastik.jpeg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent lg:bg-gradient-to-r lg:from-background/80 lg:via-background/20 lg:to-transparent" />
            </motion.div>

            {/* Right: content */}
            <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: springEase }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                  {t("lokawaya.label")}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(24px,4vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                  {t("lokawaya.title")}
                </h2>
                <p className="mt-1.5 text-sm text-brand-gold/80">
                  {t("lokawaya.date")}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
                  {t("lokawaya.description")}
                </p>
              </motion.div>

              {/* Video thumbnails row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                  <video
                    src="/Lokawaya/kondisi booth baciraro creative.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Booth</span>
                  </div>
                </div>
                <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                  <video
                    src="/Lokawaya/kunjungan dari turis asing.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Kunjungan</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: springEase }}
                className="mt-6"
              >
                <Link
                  href="/creative/lokawaya"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 backdrop-blur transition-all hover:border-brand-gold/30 hover:text-white"
                >
                  {t("lokawaya.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── SECTION 6: FOOTER SIGNATURE ───── */}
        <footer className="relative border-t border-white/5 px-4 py-16 text-center">
          <div className="mx-auto max-w-md">
            <Image
              src="/Logo Baciraro Creative.png"
              alt={t("creative.heroLogoAlt")}
              width={100}
              height={34}
              className="mx-auto mb-4 h-auto w-24 object-contain opacity-60"
            />
            <p className="text-xs text-zinc-500">
              {t("creative.footerTagline")}
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
