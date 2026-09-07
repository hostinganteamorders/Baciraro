"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, Recycle, TrendingUp, Package, Zap } from "lucide-react";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wasteTypes = [
  { icon: Package },
  { icon: Recycle },
  { icon: TrendingUp },
];

const processSteps = [
  {},
  {},
  {},
  {},
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
              <SectionLabel>{t2("trashrecyclecenter.label")}</SectionLabel>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-[-0.04em] text-white">
              {t2("trashrecyclecenter.heroTitle")}
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl">
              {t2("trashrecyclecenter.heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#process"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg"
              >
                {t2("trashrecyclecenter.lihatProses")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </a>
              <a
                href="#output"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
              >
                {t2("trashrecyclecenter.lihatOutput")}
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
                src="/trc.png"
                alt={t2("trashrecyclecenter.heroAlt")}
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

function WasteTypesSection() {
  const { t: t2 } = useLanguage();
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel>{t2("trashrecyclecenter.komoditasLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-4">
            {t2("trashrecyclecenter.komoditasTitle")}
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            {t2("trashrecyclecenter.komoditasDesc")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {wasteTypes.map((waste, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: springEase }}
              className="group rounded-[2.25rem] border border-white/5 bg-zinc-900/20 p-6 shadow-xl backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/30 transition-all duration-300"
            >
              <div className="inline-flex rounded-2xl bg-emerald-500/10 p-3 mb-4 text-emerald-400">
                <waste.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-3">{t2(`trashrecyclecenter.wasteTypes.${index}.name`)}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{t2(`trashrecyclecenter.wasteTypes.${index}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="process" className="relative py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel>{t2("trashrecyclecenter.alurLabel")}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.15] tracking-tight text-white mt-6 mb-12">
            {t2("trashrecyclecenter.alurTitle")}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((_, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: springEase }}
                className="rounded-[2rem] border border-white/5 bg-zinc-900/20 p-6 backdrop-blur-sm shadow-xl"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 font-bold text-emerald-400 mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-white mb-2">{t2(`trashrecyclecenter.processSteps.${index}.step`)}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{t2(`trashrecyclecenter.processSteps.${index}.desc`)}</p>
              </motion.div>
              {index < processSteps.length - 1 && (
                <ArrowRight className="absolute -right-2 top-1/2 hidden md:block -translate-y-1/2 text-emerald-500/30 h-5 w-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputSection() {
  const { t: t2 } = useLanguage();
  return (
    <section id="output" className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-normal leading-[1.15] tracking-tight text-white mb-6">{t2("trashrecyclecenter.outputTitle")}</h2>
            <div className="space-y-6">
              {[
                { icon: Package, titleKey: "trashrecyclecenter.outputCards.0.title", descKey: "trashrecyclecenter.outputCards.0.desc" },
                { icon: Zap, titleKey: "trashrecyclecenter.outputCards.1.title", descKey: "trashrecyclecenter.outputCards.1.desc" },
                { icon: TrendingUp, titleKey: "trashrecyclecenter.outputCards.2.title", descKey: "trashrecyclecenter.outputCards.2.desc" },
              ].map((card) => (
                <div key={card.titleKey} className="rounded-[2rem] border border-white/5 bg-zinc-900/20 p-6 shadow-xl backdrop-blur-sm">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <card.icon className="h-5 w-5 text-emerald-400" />
                    {t2(card.titleKey)}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t2(card.descKey)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/20 p-6 shadow-2xl backdrop-blur-sm">
            <Image
              src="/trc.png"
              alt={t2("trashrecyclecenter.outputAlt")}
              fill
              className="object-contain p-8 drop-shadow-[0_15px_30px_rgba(16,185,129,0.15)]"
            />
          </div>
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
          <h2 className="text-3xl sm:text-4xl font-normal leading-[1.1] tracking-tight text-white mb-4">{t2("trashrecyclecenter.ctaTitle")}</h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t2("trashrecyclecenter.ctaDesc")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:halo@baciraro.id"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black shadow-lg"
            >
              {t2("trashrecyclecenter.hubungiKami")}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
            >
              {t2("trashrecyclecenter.kembaliEkosistem")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TrashRecycleCenterPage() {
  const { t } = useLanguage();
  return (
    <main className="relative overflow-hidden text-foreground min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12] -z-10" />

      <Header subtitle={t("trashrecyclecenter.label")} />

      <HeroSection />
      <WasteTypesSection />
      <ProcessSection />
      <OutputSection />
      <CTASection />
      
      <Footer />
      </div>
    </main>
  );
}
