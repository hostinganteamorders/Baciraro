"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sprout, Leaf, Droplets, Calendar, Package, ArrowLeft, Timer, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Bucket = {
  id: number;
  code: string;
  start_date: string;
  estimated_harvest: string;
  status: string;
  type: string;
  material: string;
  notes: string;
};

export default function CompostTrackerPage() {
  const params = useParams();
  const code = params.code as string;
  const { t } = useLanguage();
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!code) return;
    fetch(`/api/compost/${code}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((d) => setBucket(d.bucket))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [code]);

  const statusMap: Record<string, { label: string; icon: typeof Timer; color: string; bar: string }> = {
    fermenting: {
      label: t("creativeStudio.statusFermentasi"),
      icon: Timer,
      color: "bg-amber-500/20 text-amber-300 border-amber-500/20",
      bar: "bg-amber-400",
    },
    ready: {
      label: t("creativeStudio.statusSiapPanen"),
      icon: CheckCircle2,
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
      bar: "bg-emerald-400",
    },
    harvested: {
      label: t("creativeStudio.statusSudahDipanen"),
      icon: CheckCircle2,
      color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/20",
      bar: "bg-zinc-400",
    },
  };

  const typeLabel = (type: string) => {
    const map: Record<string, string> = { compost: t("creativeStudio.typeKompos"), liquid: t("creativeStudio.typePoc"), both: t("creativeStudio.typeKomposPoc") };
    return map[type] || type;
  };

  const renderBody = () => {
    if (loading) {
      return <div className="py-20 text-center text-sm text-zinc-500">{t("compost.memuat")}</div>;
    }

    if (notFound || !bucket) {
      return (
        <div className="py-20 text-center">
          <Package className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg">{t("compost.tidakDitemukan")}</p>
          <Link href="/track-record" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t("compost.kembali")}
          </Link>
        </div>
      );
    }

    const status = statusMap[bucket.status] || statusMap.fermenting;
    const StatusIcon = status.icon;
    const start = new Date(bucket.start_date);
    const harvest = new Date(bucket.estimated_harvest);
    const now = new Date();
    const totalMs = harvest.getTime() - start.getTime();
    const elapsedMs = now.getTime() - start.getTime();
    const progress = totalMs > 0 ? Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100))) : 0;
    const daysLeft = Math.max(0, Math.ceil((harvest.getTime() - now.getTime()) / 86400000));

    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: springEase }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
            <Sprout className="h-8 w-8" />
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("compost.label")}</p>
          <h1 className="mt-3 font-serif text-[clamp(28px,4vw,40px)] font-normal text-white">{bucket.code}</h1>
          <span className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-10 rounded-[2rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-8">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">{new Date(bucket.start_date).toLocaleDateString()}</span>
            <span className="text-emerald-400 font-bold">{progress}%</span>
            <span className="text-zinc-500">{new Date(bucket.estimated_harvest).toLocaleDateString()}</span>
          </div>
          <div className="mt-3 h-2.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className={`h-full rounded-full ${status.bar} transition-all duration-700`} style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-5 flex items-center justify-between rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("compost.sisaWaktu")}</p>
                <p className="mt-0.5 font-serif text-xl text-white">{daysLeft} {t("compost.hari")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" />
              {typeLabel(bucket.type)}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="h-4 w-4 text-emerald-400" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("compost.jenisKompos")}</p>
            </div>
            <p className="text-sm text-zinc-300">{typeLabel(bucket.type)}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("compost.tanggal")}</p>
            </div>
            <p className="text-sm text-zinc-300">
              {new Date(bucket.start_date).toLocaleDateString()} → {new Date(bucket.estimated_harvest).toLocaleDateString()}
            </p>
          </div>
          {bucket.material && (
            <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 sm:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-4 w-4 text-emerald-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("compost.bahan")}</p>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{bucket.material}</p>
            </div>
          )}
          {bucket.notes && (
            <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 sm:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Sprout className="h-4 w-4 text-emerald-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("compost.catatan")}</p>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{bucket.notes}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("compost.label")} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20">{renderBody()}</div>
        <Footer />
      </div>
    </main>
  );
}
