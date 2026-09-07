"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Paperclip, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WA_NUMBER = "6288212835350";

export default function CustomPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [refUrl, setRefUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-referensi", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "upload failed");
      setRefUrl(data.url);
    } catch {
      setUploadError(true);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const send = () => {
    if (!name.trim()) {
      alert(t("customNamaDiperlukan"));
      return;
    }
    if (!idea.trim()) {
      alert(t("customIdeaDiperlukan"));
      return;
    }
    const lines = [
      `Halo Baciraro, saya ${name.trim()} ingin membuat custom order.`,
      "",
      `Ide: ${idea.trim()}`,
    ];
    if (refUrl) {
      lines.push(`Referensi gambar: ${refUrl}`);
    }
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
  };

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle="Custom" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: springEase }}>
            <Link href="/products" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t("products.kembali")}
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: springEase }} className="mt-8 overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02]">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/produk/custom/custom-hero.png" alt="Baciraro Custom" className="w-full object-cover" />
            </div>
            <div className="p-8 lg:p-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" /> {t("products.custom")}
              </p>
              <h1 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
                {t("products.custom")} <span className="text-emerald-400">{t("products.headlineHighlight")}</span>
              </h1>
              <p className="mt-3 max-w-[560px] text-[15px] text-zinc-300 leading-relaxed">{t("products.customTagline")}</p>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: springEase }} className="mt-14">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.customStepsTitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 transition-all hover:border-emerald-500/20">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <span className="font-serif text-lg">{n}</span>
                  </div>
                  <h3 className="font-serif text-[18px] text-white">{t(`products.customStep${n}Title`)}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{t(`products.customStep${n}Desc`)}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Form */}
          <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: springEase }} className="mt-14 rounded-[2rem] border border-emerald-500/10 bg-emerald-500/[0.03] backdrop-blur p-8 lg:p-10">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.customFormTitle")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">{t("products.customName")}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("products.customNamePlaceholder")}
                    className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">{t("products.customIdea")}</label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={t("products.customIdeaPlaceholder")}
                    rows={4}
                    className="w-full resize-none rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">{t("products.customReference")}</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex flex-col items-center justify-center gap-2 rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center transition-all hover:border-emerald-500/30 disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
                  ) : refUrl ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <Paperclip className="h-6 w-6 text-zinc-500" />
                  )}
                  <span className="mt-2 text-xs text-zinc-400">
                    {uploading ? t("products.customUploading") : refUrl ? t("products.customUploaded") : t("products.customReferenceHint")}
                  </span>
                </button>
                {uploadError && <p className="text-xs text-red-400">{t("products.customUploadFail")}</p>}
              </div>
            </div>

            <button
              onClick={send}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-8 py-4 text-sm font-bold text-black transition-all hover:gap-3"
            >
              <MessageCircle className="h-5 w-5" />
              {t("products.customKirim")}
            </button>
          </motion.section>
        </div>

        <Footer />
      </div>
    </main>
  );
}