"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const TERRACOTTA = "#D4785C";

const PRODUCTS = [
  { image: "/produk/kriya/Flat Lay Katalog Medali.png", slug: "/products/souvenir-csr" },
  { image: "/produk/kriya/Lifestyle Sofa.png", slug: "/products/sofa-puff-ecobrick" },
  { image: "/produk/kriya/Lifestyle Beruang 2.png", slug: "/products/karya-kreatif" },
];

export default function CreativeShowcase() {
  const { t } = useLanguage();
  return (
    <section id="creative-showcase" className="relative z-10 py-20 lg:py-24 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(212,120,92,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[#D4785C] animate-pulse" />
            {t("creativeShowcase.label")}
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("creativeShowcase.title")}
            <span className="font-serif italic text-[#D4785C]">{t("creativeShowcase.titleItalic")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 max-w-xl mx-auto">
            {t("creativeShowcase.subtitle")}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-black/30"
            >
              <Link href={product.slug} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={product.image} alt={t("creativeShowcase.products." + i + ".title")} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/70 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="relative z-10">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#D4785C]">{t("creativeShowcase.products." + i + ".label")}</p>
                      <h3 className="mt-1.5 text-lg font-semibold text-white drop-shadow-lg">{t("creativeShowcase.products." + i + ".title")}</h3>
                      <p className="mt-1 text-xs text-zinc-300 max-w-sm drop-shadow-md">{t("creativeShowcase.products." + i + ".desc")}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/10">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/creative-studio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-300 backdrop-blur transition-all hover:bg-white/10 hover:border-[#D4785C]/30 hover:text-white"
          >
            {t("creativeShowcase.cta")}
            <ArrowRight className="h-4 w-4 text-[#D4785C] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
