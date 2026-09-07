"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, BookOpen, Heart, Leaf } from "lucide-react";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const programs = [
  { icon: Leaf },
  { icon: BookOpen },
  { icon: Leaf },
];

const impactData = [
  { number: "20+" },
  { number: "2.500+" },
  { number: "12" },
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
              <SectionLabel>{t2("tananyiurlestari.label")}</SectionLabel>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-[-0.04em] text-white">
              {t2("tananyiurlestari.heroTitle")}
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl">
              {t2("tananyiurlestari.heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#programs"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg"
              >
                {t2("tananyiurlestari.lihatProgram")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </a>
              <a
                href="#impact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
              >
                {t2("tananyiurlestari.lihatDampak")}
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
                src="/tnl-transparent.png"
                alt={t2("tananyiurlestari.heroAlt")}
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

function AboutSection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-square relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/20 p-6 shadow-2xl backdrop-blur-sm">
            <Image
              src="/tnl-transparent.png"
              alt={t2("tananyiurlestari.aboutAlt")}
              fill
              className="object-contain p-8 drop-shadow-[0_15px_30px_rgba(16,185,129,0.15)]"
            />
          </div>

          <div>
            <h2 className="text-4xl font-normal leading-[1.15] tracking-tight text-white mb-6">{t2("tananyiurlestari.tentangLabel")}</h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-400">
              <p>{t2("tananyiurlestari.paragraph1")}</p>
              <p>{t2("tananyiurlestari.paragraph2")}</p>
              <p>{t2("tananyiurlestari.paragraph3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="programs" className="relative py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel>{t2("tananyiurlestari.programLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-4">
            {t2("tananyiurlestari.programTitle")}
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            {t2("tananyiurlestari.programDesc")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: springEase }}
              className="group rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 shadow-xl backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/30 transition-all duration-300"
            >
              <div className="inline-flex rounded-2xl bg-emerald-500/10 p-3 mb-4 text-emerald-400">
                <program.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-3">{t2(`tananyiurlestari.programs.${index}.name`)}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{t2(`tananyiurlestari.programs.${index}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="impact" className="relative py-20 px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.1),_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="text-4xl font-normal tracking-tight mb-12 text-center text-white">{t2("tananyiurlestari.dampakTitle")}</h2>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {impactData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 backdrop-blur-sm text-center shadow-xl"
            >
              <p className="text-5xl font-semibold text-emerald-400 mb-2">{data.number}</p>
              <p className="text-sm tracking-wider uppercase text-zinc-400 font-semibold">{t2(`tananyiurlestari.impactData.${index}.label`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/40 p-4 shadow-md">
              <Heart className="h-5 w-5 shrink-0 text-emerald-400" />
              <span className="text-sm text-zinc-300 font-medium">{t2(`tananyiurlestari.benefits.${i}`)}</span>
            </div>
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
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.1] tracking-tight text-white mb-4">{t2("tananyiurlestari.ctaTitle")}</h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t2("tananyiurlestari.ctaDesc")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:halo@baciraro.id"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black shadow-lg"
            >
              {t2("tananyiurlestari.hubungiKami")}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
            >
              {t2("tananyiurlestari.kembaliEkosistem")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TanaNyiurPage() {
  const { t } = useLanguage();
  return (
    <main className="relative overflow-hidden text-foreground min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12] -z-10" />

      <Header subtitle={t("tananyiurlestari.label")} />

      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <CTASection />
      
      <Footer />
      </div>
    </main>
  );
}
