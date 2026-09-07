"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, Code, Smartphone, BarChart3, Zap } from "lucide-react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const products = [
  { icon: Code },
  { icon: Smartphone },
  { icon: BarChart3 },
];

const solutions = [
  {},
  {},
  {},
];

const visionPoints = ["", "", "", ""];

export default function OrdersPage() {
  const { t } = useLanguage();
  return (
    <main className="relative overflow-hidden text-white min-h-screen">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.06] z-0" />

      <Header subtitle={t("orders.label")} />

      {/* GSAP Story Scroll Presentation */}
      <FlowArt aria-label={t("orders.storyFlowLabel")}>
        
        {/* Slide 01: Hero / Who We Are */}
        <FlowSection aria-label={t("orders.heroLabel")} style={{ backgroundColor: '#050805', color: '#fff' }}>
          <div className="flex flex-col h-full justify-between gap-6 pt-[2vh]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">{t("orders.slide01Label")}</p>
              <span className="text-xs font-mono opacity-50">{t("orders.label")} {t("orders.ecosystemSuffix")}</span>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="my-auto flex flex-col lg:flex-row gap-12 lg:items-center justify-between">
              <div className="flex-1 space-y-6">
                <h1 className="text-[clamp(2.5rem,7vw,7.5rem)] font-bold leading-[0.9] uppercase tracking-tight text-white">
                  {t("orders.slide01Title")}
                  <br />
                  <span className="text-emerald-400">{t("orders.slide01Title2")}</span>
                  <br />
                  {t("orders.slide01Title3")}
                </h1>
                <p className="max-w-[55ch] text-[clamp(0.95rem,1.8vw,1.25rem)] font-normal leading-relaxed text-zinc-400">
                  {t("orders.slide01Desc")}
                </p>
              </div>
              
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 bg-white p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08),_transparent_70%)] pointer-events-none" />
                  <Image
                    src="/Orders.png"
                    alt={t("orders.logoAlt")}
                    fill
                    className="object-contain p-8 drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                    priority
                  />
                </div>
              </div>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="flex justify-between items-center text-xs opacity-60">
              <span>{t("orders.slide01Footer")}</span>
            </div>
          </div>
        </FlowSection>

        {/* Slide 02: Tentang / Our Mission */}
        <FlowSection aria-label={t("orders.tentangLabel")} style={{ backgroundColor: '#022c22', color: '#fff' }}>
          <div className="flex flex-col h-full justify-between gap-6 pt-[2vh]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">{t("orders.slide02Label")}</p>
              <span className="text-xs font-mono opacity-50">{t("orders.label")}</span>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="my-auto grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-[clamp(2.5rem,6vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight text-white">
                  {t("orders.slide02Title")}
                  <br />
                  {t("orders.slide02Title2")}
                  <br />
                  <span className="text-emerald-300">{t("orders.slide02Title3")}</span>
                </h2>
                <div className="space-y-4 text-[clamp(0.9rem,1.5vw,1.15rem)] font-normal leading-relaxed text-zinc-300">
                  <p>{t("orders.slide02Paragraph1")}</p>
                  <p>{t("orders.slide02Paragraph2")}</p>
                </div>
              </div>
              
              <div className="rounded-[2rem] border border-white/10 bg-zinc-950/40 p-8 space-y-6 backdrop-blur shadow-2xl">
                <h3 className="text-lg font-bold uppercase tracking-wider text-emerald-300">{t("orders.visiKeberlanjutan")}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t("orders.slide02DescVisi")}
                </p>
                <div className="pt-6 border-t border-white/5 flex gap-8">
                  <div>
                    <p className="text-emerald-300 text-2xl font-bold font-mono">100%</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{t("orders.slide02OpenSource")}</p>
                  </div>
                  <div>
                    <p className="text-emerald-300 text-2xl font-bold font-mono">Secure</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{t("orders.slide02SecureAudits")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            <p className="text-xs opacity-60">{t("orders.slide02Footer")}</p>
          </div>
        </FlowSection>

        {/* Slide 03: Produk & Karya */}
        <FlowSection aria-label={t("orders.produkLabel")} style={{ backgroundColor: '#064e3b', color: '#fff' }}>
          <div className="flex flex-col h-full justify-between gap-6 pt-[2vh]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">{t("orders.slide03Label")}</p>
              <span className="text-xs font-mono opacity-50">{t("orders.slide03Title")}</span>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="my-auto space-y-6">
              <div>
                <h2 className="text-[clamp(2rem,5vw,5.5rem)] font-bold uppercase tracking-tight text-white mb-2 leading-none">
                  {t("orders.slide03Title")}
                </h2>
                <p className="text-zinc-300 text-sm max-w-xl">
                  {t("orders.slide03Desc")}
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {products.map((product, index) => {
                  const IconComponent = product.icon;
                  return (
                    <div
                      key={index}
                      className="group rounded-[2rem] border border-white/10 bg-zinc-950/60 p-6 shadow-xl backdrop-blur-sm hover:border-emerald-400/30 hover:bg-zinc-950/80 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                    >
                      <div>
                        <div className="inline-flex rounded-xl bg-emerald-500/10 p-3 mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{t(`orders.products.${index}.name`)}</h3>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-xs">{t(`orders.products.${index}.description`)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            <p className="text-xs opacity-60">{t("orders.slide03Footer")}</p>
          </div>
        </FlowSection>

        {/* Slide 04: Solusi & Visi */}
        <FlowSection aria-label={t("orders.solusiLabel")} style={{ backgroundColor: '#0f172a', color: '#fff' }}>
          <div className="flex flex-col h-full justify-between gap-6 pt-[2vh]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">{t("orders.slide04Label")}</p>
              <span className="text-xs font-mono opacity-50">{t("orders.visiKeberlanjutan")}</span>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="my-auto grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-[clamp(2rem,5vw,5.5rem)] font-bold uppercase tracking-tight text-white leading-[0.95]">
                  {t("orders.slide04Title")}
                  <br />
                  <span className="text-indigo-400">{t("orders.slide04Title2")}</span>
                  <br />
                  {t("orders.slide04Title3")}
                </h2>
                
                <div className="space-y-3">
                  {solutions.map((sol, index) => (
                    <div key={index} className="flex gap-4 items-start p-3.5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
                      <div className="h-2 w-2 rounded-full bg-indigo-400 mt-2 shrink-0 animate-pulse" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t(`orders.solutions.${index}.name`)}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">{t(`orders.solutions.${index}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-8 space-y-6">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">{t("orders.visiDigitalisasi")}</h3>
                <p className="text-xs text-zinc-400">
                  {t("orders.slide04Desc")}
                </p>
                
                <div className="grid gap-3">
                  {visionPoints.map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-full border border-white/5 bg-zinc-900/20 p-3 shadow-md hover:bg-zinc-900/40 transition-colors"
                    >
                      <Zap className="h-4 w-4 shrink-0 text-indigo-400" />
                      <span className="text-xs text-zinc-300 font-medium">{t(`orders.visionPoints.${index}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            <p className="text-xs opacity-60">{t("orders.slide04Footer")}</p>
          </div>
        </FlowSection>

        {/* Slide 05: Kolaborasi & CTA */}
        <FlowSection aria-label={t("orders.hubungiLabel")} style={{ backgroundColor: '#0a0d0a', color: '#fff' }}>
          <div className="flex flex-col h-full justify-between gap-6 pt-[2vh]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">{t("orders.slide05Label")}</p>
              <span className="text-xs font-mono opacity-50">{t("orders.hubungiKami")}</span>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="my-auto text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-[clamp(2.5rem,6vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight text-white">
                {t("orders.slide05Title")} <br />
                <span className="text-emerald-400">{t("orders.slide05Title2")}</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                {t("orders.slide05Desc")}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <a
                  href="mailto:halo@baciraro.id"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 duration-300"
                >
                  {t("orders.hubungiKami")}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                    <ArrowRight className="h-3.5 w-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10 transition-all duration-300"
                >
                  {t("orders.kembaliEkosistem")}
                </Link>
              </div>
            </div>
            
            <hr className="border-none border-t border-white/10" />
            
            <div className="flex justify-between items-center text-[10px] md:text-xs opacity-60">
              <span>{t("orders.slideCopyright", { year: new Date().getFullYear() })}</span>
              <span>{t("orders.slide05Footer")}</span>
            </div>
          </div>
        </FlowSection>
      </FlowArt>

      {/* Global Footer (slides up naturally after FlowArt is finished scrolling) */}
      <Footer />
      </div>
    </main>
  );
}
