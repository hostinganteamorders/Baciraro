"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Handshake, Quote, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectDetailData } from "@/lib/site-sections-data";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { t } = useLanguage();

  const index = projectDetailData.findIndex((p) => slugify(p.title) === id);

  const related = useMemo(() => {
    if (index < 0) return [];
    const project = projectDetailData[index];
    return trackRecordData
      .flatMap((year) =>
        year.activities.map((a) => ({
          year: year.year,
          ...a,
        }))
      )
      .filter((a) => (a.location || "").toLowerCase().includes((project.partner || "").toLowerCase()))
      .slice(0, 3);
  }, [index]);

  if (index < 0) {
    return (
      <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
        <div aria-hidden="true" className="page-bg" />
        <div className="relative z-[1]">
          <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
          <Header subtitle={t("trackRecord.studiKasus")} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
            <p className="text-zinc-400 text-lg">{t("trackRecord.studiKasusNotFound")}</p>
            <Link href="/track-record" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t("trackRecord.kembali")}
            </Link>
          </div>
          <Footer />
        </div>
      </main>
    );
  }

  const project = projectDetailData[index];
  const prev = projectDetailData[(index - 1 + projectDetailData.length) % projectDetailData.length];
  const next = projectDetailData[(index + 1) % projectDetailData.length];

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("trackRecord.studiKasus")} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: springEase }}>
            <Link href="/track-record#case-studies" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t("trackRecord.kembali")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
            className="mt-10"
          >
            <div className="inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
              <project.icon className="h-8 w-8" />
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              <Handshake className="h-3.5 w-3.5" />
              {t("trackRecord.studiKasusMitra")}
            </div>
            <h1 className="mt-5 font-serif text-[clamp(32px,5vw,52px)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
              {project.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
              <Building2 className="h-4 w-4 text-emerald-400" />
              {project.partner}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: springEase }}
            className="mt-10 rounded-[2rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-8 sm:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Quote className="h-5 w-5 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("trackRecord.studiKasusRangkuman")}</p>
            </div>
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed whitespace-pre-line">{project.description}</p>
          </motion.div>

          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: springEase }}
              className="mt-16"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("trackRecord.studiKasusTerkait")}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <div key={a.id} className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{a.year}</p>
                    <h3 className="mt-2 font-serif text-[18px] text-white leading-snug">{t(a.titleKey || a.title)}</h3>
                    {a.location && <p className="mt-2 text-xs text-zinc-500">{a.location}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="mt-16 flex flex-wrap items-center justify-between gap-4"
          >
            <button
              onClick={() => router.push(`/track-record/case-studies/${slugify(prev.title)}`)}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{t("trackRecord.studiKasusSebelumnya")}:</span> {prev.title}
            </button>
            <button
              onClick={() => router.push(`/track-record/case-studies/${slugify(next.title)}`)}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              {t("trackRecord.studiKasusBerikutnya")}: {next.title}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
