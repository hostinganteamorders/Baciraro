"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Check, X, ExternalLink, CheckCheck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import idData from "@/lib/i18n/id.json";
import enData from "@/lib/i18n/en.json";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WA_NUMBER = "6282293494989";
const GROUP_LINK = "https://chat.whatsapp.com/KlZJa0QTgMX5RyxUnM2heI";

export default function UndanganPage() {
  const { t, lang } = useLanguage();
  const [nama, setNama] = useState("");
  const [mewakili, setMewakili] = useState("");
  const [minuman, setMinuman] = useState("");
  const [submitted, setSubmitted] = useState<"idle" | "hadir" | "tidakHadir">("idle");

  const beverageKeys = (lang === "id" ? idData : enData).undangan.beverages as string[];

  const buildWaMessage = (type: "hadir" | "tidakHadir") => {
    if (type === "hadir") {
      return `Nama: ${nama}\nMewakili: ${mewakili}\nMinuman: ${minuman}\nHadir ✅`;
    }
    return `Mohon maaf, saya tidak dapat hadir:\nNama: ${nama}\nMewakili: ${mewakili}`;
  };

  const handleHadir = () => {
    if (!nama.trim() || !mewakili.trim() || !minuman) return;
    setSubmitted("hadir");
    const msg = buildWaMessage("hadir");
    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleTidakHadir = () => {
    if (!nama.trim()) return;
    setSubmitted("tidakHadir");
    const msg = buildWaMessage("tidakHadir");
    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const isValidHadir = nama.trim() && mewakili.trim() && minuman;
  const isValidTidakHadir = nama.trim();

  return (
    <main className="relative min-h-screen overflow-hidden text-primary-text">
      <div aria-hidden="true" className="page-bg" />
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.06]" />
      <div className="relative z-[1]">

        {/* ───── HERO INVITATION ───── */}
        <section className="relative h-screen overflow-hidden px-4 sm:px-6">
          <video
            src="/teaser dialog budaya.mp4"
            autoPlay
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
          <div className="relative z-10 mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <Image
                src="/Logo Baciraro Creative.png"
                alt={t("creative.heroLogoAlt")}
                width={100}
                height={34}
                className="mx-auto mb-6 h-auto w-24 object-contain"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: springEase }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold"
            >
              {t("undangan.label")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
              className="mt-4 font-serif text-[clamp(24px,5vw,52px)] font-normal leading-[1.08] tracking-[-0.02em] text-white"
            >
              {t("undangan.heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
              className="mt-4 max-w-xl mx-auto text-sm italic text-zinc-400"
            >
              &ldquo;{t("undangan.heroTagline")}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: springEase }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 sm:text-sm"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-terracotta" />
                {t("undangan.heroDate")}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-orange" />
                {t("undangan.heroTime")}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: springEase }}
              className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500 sm:text-sm"
            >
              <MapPin className="h-3.5 w-3.5 text-brand-gold" />
              {t("undangan.heroVenue")}
            </motion.p>
          </div>
        </section>

        {/* ───── GREETING ───── */}
        <section className="px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: springEase }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center backdrop-blur sm:p-8"
            >
              <h2 className="font-serif text-lg font-normal text-white sm:text-xl">
                {t("undangan.greeting")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {t("undangan.greetingBody")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───── EVENT DETAIL ───── */}
        <section className="px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">
                {t("undangan.tentang")}
              </p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-300">
                <p>{t("undangan.detail1")}</p>
                <p>{t("undangan.detail2")}</p>
                <p>{t("undangan.detail3")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── LOKASI ───── */}
        <section className="px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t("undangan.lokasiTitle")}
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07]">
                <iframe
                  src="https://www.google.com/maps?q=Kedai+Kana+Desa+Sukur+Minahasa+Utara&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter brightness-[0.85] contrast-[1.1]"
                />
              </div>
              <div className="mt-3 text-center">
                <a
                  href="https://maps.google.com/?q=Kedai+Kana,+Desa+Sukur,+Minahasa+Utara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400 backdrop-blur transition-all hover:border-brand-gold/30 hover:text-white"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                  {t("undangan.bukaMaps")}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── RUNDOWN ───── */}
        <section className="px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">
                {t("creative.rundownTitle")}
              </p>
              <div className="mt-4 space-y-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur sm:p-6">
                {[
                  "08.30\u201309.00", "09.00\u201309.15", "09.15\u201309.25", "09.25\u201309.55",
                  "09.55\u201312.00", "12.00\u201314.00", "14.00\u201314.15", "14.15\u201314.30",
                  "14.30\u201314.45", "14.45\u201315.00", "15.00\u2013selesai",
                ].map((time, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-l-2 border-white/5 py-3 pl-4 transition-colors hover:border-brand-orange/40"
                  >
                    <span className="min-w-[75px] shrink-0 text-xs font-mono text-brand-orange sm:min-w-[90px] sm:text-sm">
                      {time}
                    </span>
                    <span className="text-xs text-zinc-300 sm:text-sm">
                      {t(`creative.rundown.${i}`)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── RSVP FORM ───── */}
        <section className="px-4 py-10 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              {submitted === "idle" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: springEase }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur sm:p-8"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                    {t("undangan.rsvpTitle")}
                  </p>

                  <a
                    href={GROUP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-6 py-3 text-sm font-medium text-brand-green transition-all hover:bg-brand-green/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t("undangan.joinGroup")}
                  </a>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400">
                        {t("undangan.formNama")} <span className="text-brand-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder={t("undangan.formNamaPlaceholder")}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-brand-terracotta/50 focus:bg-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400">
                        {t("undangan.formMewakili")} <span className="text-brand-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        value={mewakili}
                        onChange={(e) => setMewakili(e.target.value)}
                        placeholder={t("undangan.formMewakiliPlaceholder")}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-brand-terracotta/50 focus:bg-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400">
                        {t("undangan.formMinuman")} <span className="text-brand-terracotta">*</span>
                      </label>
                      <select
                        value={minuman}
                        onChange={(e) => setMinuman(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand-terracotta/50 focus:bg-white/10"
                      >
                        <option value="" disabled className="text-zinc-600">
                          {t("undangan.formMinumanPlaceholder")}
                        </option>
                        {beverageKeys.map((b, i) => (
                          <option key={i} value={b} className="text-black">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleHadir}
                      disabled={!isValidHadir}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-terracotta px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-orange disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Check className="h-4 w-4" />
                      {t("undangan.hadir")}
                    </button>
                    <button
                      type="button"
                      onClick={handleTidakHadir}
                      disabled={!isValidTidakHadir}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <X className="h-4 w-4" />
                      {t("undangan.tidakHadir")}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="konfirmasi"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: springEase }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center backdrop-blur sm:p-8"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCheck className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h2 className="mt-4 font-serif text-xl font-normal text-white">
                    {submitted === "hadir" ? t("undangan.konfirmasiHadir") : t("undangan.konfirmasiTidak")}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    {submitted === "hadir" ? t("undangan.konfirmasiHadirBody") : t("undangan.konfirmasiTidakBody")}
                  </p>

                  <div className="mt-6 space-y-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-left text-xs text-zinc-400">
                    <p><span className="text-white/60">{t("undangan.formNama")}:</span> {nama}</p>
                    <p><span className="text-white/60">{t("undangan.formMewakili")}:</span> {mewakili}</p>
                    {submitted === "hadir" && (
                      <p><span className="text-white/60">{t("undangan.formMinuman")}:</span> {minuman}</p>
                    )}
                  </div>

                  {submitted === "hadir" && (
                    <a
                      href={GROUP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-6 py-3 text-sm font-medium text-brand-green transition-all hover:bg-brand-green/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("undangan.joinGroup")}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(submitted === "hadir" ? buildWaMessage("hadir") : buildWaMessage("tidakHadir"))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-terracotta/30 bg-brand-terracotta/10 px-6 py-3 text-sm font-medium text-brand-terracotta transition-all hover:bg-brand-terracotta/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("undangan.kirimWA")}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ───── FOOTER ───── */}
        <footer className="border-t border-white/5 px-4 py-10 text-center">
          <Image
            src="/Logo Baciraro Creative.png"
            alt={t("creative.heroLogoAlt")}
            width={80}
            height={28}
            className="mx-auto mb-3 h-auto w-20 object-contain opacity-50"
          />
          <p className="text-xs text-zinc-600">{t("creative.footerTagline")}</p>
        </footer>

      </div>
    </main>
  );
}
