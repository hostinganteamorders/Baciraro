"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Globe, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WA_NUMBER = "6288212835350";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </p>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Tim Baciraro,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <main className="relative overflow-hidden text-foreground min-h-screen bg-background">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <Header subtitle={t("contact.label")} />

        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: springEase }}>
              <SectionLabel>{t("contact.label")}</SectionLabel>
              <h1 className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("contact.heroTitle")} <span className="font-serif italic text-emerald-300">{t("contact.heroTitleItalic")}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {t("contact.heroDesc")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <div className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t("contact.emailCard")}</h3>
              <p className="mt-2 text-sm text-zinc-400">creativebaciraro@gmail.com</p>
              <a
                href="mailto:creativebaciraro@gmail.com"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors pt-6"
              >
                {t("contact.kirimEmail")} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t("contact.waCard")}</h3>
              <p className="mt-2 text-sm text-zinc-400">+62 882-1283-5350</p>
              <a
                href={"https://wa.me/6288212835350?text=" + encodeURIComponent(t("contact.waMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors pt-6"
              >
                {t("contact.hubungi")} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Lokasi */}
            <div className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t("contact.lokasiCard")}</h3>
              <p className="mt-2 text-sm text-zinc-400">Tumaluntung, Minahasa Utara, Sulawesi Utara</p>
            </div>
          </div>
        </section>

        {/* Social Media & CTA */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <SectionLabel>{t("contact.sosmedLabel")}</SectionLabel>
                <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl">
                  {t("contact.sosmedTitle")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {t("contact.sosmedDesc")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/baciraro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                    Instagram
                  </a>
                  <Link
                    href="https://baciraro.net"
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                    baciraro.net
                  </Link>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-[2rem] border border-white/5 bg-black/25 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <h3 className="text-xl font-semibold text-white">{t("contact.formTitle")}</h3>
                <p className="mt-2 text-sm text-zinc-400">{t("contact.formDesc")}</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("contact.formNama")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur outline-none focus:border-emerald-500/50 transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("contact.formEmail")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.formPesan")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                  {sent ? (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
                      {t("contact.formSent")}
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:gap-3 shadow-lg hover:bg-zinc-100"
                    >
                      {t("contact.kirimPesan")}
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                        <Send className="h-3 w-3 text-white" />
                      </span>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <SectionLabel>{t("contact.ctaLabel")}</SectionLabel>
            <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl">
              {t("contact.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              {t("contact.ctaDesc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={"https://wa.me/6288212835350?text=" + encodeURIComponent(t("contact.waMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:gap-3 shadow-lg"
              >
                {t("contact.hubungiWA")}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/50 hover:border-white/30"
              >
                {t("contact.kembaliBeranda")}
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
