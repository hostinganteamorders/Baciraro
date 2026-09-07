"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const GOLD = "#F2D479";

const ACTIVITIES = [
  {
    image: "/Dialog Budaya/foto bersama dengan narasumber.webp",
    slug: "/creative/dialog-budaya",
    labelKey: "dialogBudaya.label",
    titleKey: "dialogBudaya.title",
    dateKey: "dialogBudaya.date",
    descKey: "dialogBudaya.description",
    ctaKey: "dialogBudaya.cta",
    dateColor: GOLD,
  },
  {
    image: "/Lokawaya/customer anak dari USA setelah selesai membuat sendiri keychainnya dari tutup botol plastik.jpeg",
    slug: "/creative/lokawaya",
    labelKey: "lokawaya.label",
    titleKey: "lokawaya.title",
    dateKey: "lokawaya.date",
    descKey: "lokawaya.description",
    ctaKey: "lokawaya.cta",
    dateColor: GOLD,
  },
];

export default function ActivitiesSection() {
  const { t } = useLanguage();
  return (
    <section id="activities" className="relative z-10 py-20 lg:py-24 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(242,212,121,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[#F2D479] animate-pulse" />
            {t("activities.label")}
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("activities.title")}
            <span className="font-serif italic text-[#D4785C]">{t("activities.titleItalic")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 max-w-xl mx-auto">
            {t("activities.subtitle")}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-black/30"
            >
              <Link href={activity.slug} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={t(activity.titleKey)}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 group-hover:from-black/75 transition-all duration-300" />

                  <div className="absolute top-4 right-4">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F2D479] backdrop-blur">
                      {t(activity.dateKey)}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="relative z-10">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#F2D479]">{t(activity.labelKey)}</p>
                      <h3 className="mt-1.5 text-lg font-semibold text-white drop-shadow-lg">{t(activity.titleKey)}</h3>
                      <p className="mt-1 text-xs text-zinc-300 max-w-sm drop-shadow-md">{t(activity.descKey)}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/10">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
