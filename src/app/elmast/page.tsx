"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, Leaf, Droplets, Zap, Award } from "lucide-react";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const galleryImages = [
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.07.jpeg", altIndex: 0 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.08 (1).jpeg", altIndex: 1 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.08.jpeg", altIndex: 2 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.09 (1).jpeg", altIndex: 3 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.09.jpeg", altIndex: 4 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.10 (1).jpeg", altIndex: 5 },
  { src: "/elmast/WhatsApp Image 2026-05-22 at 22.50.10.jpeg", altIndex: 6 },
];

const products = [
  { icon: Zap },
  { icon: Leaf },
  { icon: Droplets },
];

const solutions = [
  {},
  {},
];

const benefits = [
  { value: "40%" },
  { value: "100%" },
  { value: "+60%" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </p>
  );
}

function HeroSection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: springEase }}>
            <div className="mb-6">
              <SectionLabel>{t2("elmast.label")}</SectionLabel>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-[-0.04em] text-white">
              {t2("elmast.heroTitle")}
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl">
              {t2("elmast.heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#technology"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg"
              >
                {t2("elmast.lihatTeknologi")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
              >
                {t2("elmast.lihatManfaat")}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            className="relative"
          >
            <div className="absolute -left-8 top-1/4 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="absolute -right-8 bottom-1/4 h-40 w-40 rounded-full bg-amber-500/5 blur-2xl" />

            <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/20 p-6 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.15),_transparent_70%)]" />
              <Image
                src="/elmast.png"
                alt={t2("elmast.logoAlt")}
                fill
                className="object-contain p-8 drop-shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="technology" className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-square relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/20 p-6 shadow-2xl backdrop-blur-sm">
            <Image
              src="/elmast.png"
              alt={t2("elmast.techAlt")}
              fill
              className="object-contain p-8 drop-shadow-[0_15px_30px_rgba(16,185,129,0.15)]"
            />
          </div>

          <div>
            <h2 className="text-4xl font-normal leading-[1.15] tracking-tight text-white mb-6">{t2("elmast.teknologiTitle")}</h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-400">
              <p>{t2("elmast.paragraph1")}</p>
              <p>{t2("elmast.paragraph2")}</p>
              <p>{t2("elmast.paragraph3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { t: t2 } = useLanguage();
  const [activeImage, setActiveImage] = useState<{ src: string; altIndex: number } | null>(null);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <section className="relative py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionLabel>{t2("elmast.dokumentasiLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-4">{t2("elmast.dokumentasiTitle")}</h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400">
            {t2("elmast.dokumentasiDesc")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: springEase }}
              className="group overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/20 shadow-xl backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/30 transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                aria-label={t2("elmast.openFull")}
              >
                <Image
                  src={image.src}
                  alt={t2(`elmast.galleryAlt.${image.altIndex}`)}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
            </motion.div>
          ))}
        </div>

        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t2("elmast.previewAlt")}
          >
            <div className="relative h-[80vh] w-full max-w-5xl rounded-[2rem] border border-white/10 bg-zinc-950 p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <Image
                src={activeImage.src}
                alt={t2(`elmast.galleryAlt.${activeImage.altIndex}`)}
                fill
                className="object-contain p-4"
                sizes="100vw"
                priority
              />
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur shadow-xl transition-all duration-200"
                aria-label={t2("elmast.tutup")}
              >
                {t2("elmast.tutup")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductsSection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel>{t2("elmast.produkLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-4">{t2("elmast.produkTitle")}</h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            {t2("elmast.produkDesc")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: springEase }}
              className="group rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 shadow-xl backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/30 transition-all duration-300"
            >
              <div className="inline-flex rounded-2xl bg-emerald-500/10 p-3 mb-4 text-emerald-400">
                <product.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-3">{t2(`elmast.products.${index}.name`)}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{t2(`elmast.products.${index}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel>{t2("elmast.solusiLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-4">{t2("elmast.solusiTitle")}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: springEase }}
              className="rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-8 shadow-xl backdrop-blur-sm"
            >
              <Award className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-normal text-white mb-3">{t2(`elmast.solutions.${index}.title`)}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{t2(`elmast.solutions.${index}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="benefits" className="relative py-20 px-6 lg:px-8 bg-zinc-950/20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.1),_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="text-4xl font-normal tracking-tight mb-12 text-center text-white">{t2("elmast.manfaatTitle")}</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 backdrop-blur-sm shadow-xl"
            >
              <p className="text-5xl font-semibold text-emerald-400 mb-2">{benefit.value}</p>
              <h3 className="font-semibold text-white mb-2">{t2(`elmast.benefits.${index}.label`)}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t2(`elmast.benefits.${index}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[3rem] border border-white/5 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/20 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.1] tracking-tight text-white mb-4">{t2("elmast.ctaTitle")}</h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t2("elmast.ctaDesc")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:halo@baciraro.id"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black shadow-lg"
            >
              {t2("elmast.hubungiKami")}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
            >
              {t2("elmast.kembaliEkosistem")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ElmastPage() {
  const { t } = useLanguage();
  return (
    <main className="relative overflow-hidden text-foreground min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12] -z-10" />

      <Header subtitle={t("elmast.label")} />

      <HeroSection />
      <TechnologySection />
      <GallerySection />
      <ProductsSection />
      <SolutionsSection />
      <BenefitsSection />
      <CTASection />

      <Footer />
      </div>
    </main>
  );
}
