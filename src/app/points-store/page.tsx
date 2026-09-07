"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, ArrowLeft, CheckCircle2, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCustomerAuth } from "@/lib/customer-auth-context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Reward = {
  id: number;
  title: string;
  description: string;
  cost_points: number;
  image_url: string;
  stock: number;
  is_active: boolean;
};

export default function PointsStorePage() {
  const { t } = useLanguage();
  const { customer, loading: authLoading, refresh } = useCustomerAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [success, setSuccess] = useState<Reward | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/customer/rewards")
      .then((r) => r.json())
      .then((d) => setRewards(d.rewards || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const redeem = async (reward: Reward) => {
    if (!customer) return;
    setError("");
    setRedeemingId(reward.id);
    try {
      const res = await fetch("/api/customer/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reward_id: reward.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("pointsStore.redemptionFailed"));
      } else {
        setSuccess(reward);
        await refresh();
      }
    } catch {
      setError(t("pointsStore.redemptionFailed"));
    } finally {
      setRedeemingId(null);
    }
  };

  const activeRewards = rewards.filter((r) => r.is_active && r.stock > 0);

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("pointsStore.title")} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: springEase }}
            className="flex flex-wrap items-start justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-emerald-400" />
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("pointsStore.label")}</p>
              </div>
              <h1 className="mt-4 font-serif text-[clamp(32px,5vw,52px)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
                {t("pointsStore.title")}
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">{t("pointsStore.desc")}</p>
            </div>

            {customer && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70">{t("pointsStore.poinSaya")}</p>
                <p className="mt-1 font-serif text-3xl text-amber-300 tabular-nums">{customer.total_points}</p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600">{t("points.poin")}</p>
              </div>
            )}
          </motion.div>

          {!authLoading && !customer && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.5rem] border border-emerald-500/15 bg-emerald-500/[0.04] px-6 py-5"
            >
              <p className="flex items-center gap-3 text-sm text-zinc-300">
                <Info className="h-4 w-4 text-emerald-400 shrink-0" />
                {t("pointsStore.perluMasuk")}
              </p>
              <Link href="/account" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors">
                {t("pointsStore.masukDaftar")}
              </Link>
            </motion.div>
          )}

          <div className="mt-14">
            {loading ? (
              <div className="py-20 text-center text-sm text-zinc-500">{t("pointsStore.memuat")}</div>
            ) : activeRewards.length === 0 ? (
              <div className="py-20 text-center text-zinc-500">{t("pointsStore.kosong")}</div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {activeRewards.map((reward, i) => {
                  const affordable = customer ? customer.total_points >= reward.cost_points : false;
                  return (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group flex flex-col rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur overflow-hidden hover:border-amber-500/20 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {reward.image_url ? (
                          <Image src={reward.image_url} alt={reward.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10">
                            <Gift className="h-12 w-12 text-emerald-400/50" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {reward.cost_points} {t("points.poin")}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-serif text-[19px] text-white">{reward.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-zinc-400 leading-relaxed line-clamp-3">{reward.description}</p>
                        <button
                          onClick={() => redeem(reward)}
                          disabled={!customer || !affordable || redeemingId === reward.id}
                          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition-all ${
                            !customer
                              ? "bg-white/5 text-zinc-500 cursor-not-allowed"
                              : affordable
                                ? "bg-amber-400 text-black hover:bg-amber-300"
                                : "bg-white/5 text-zinc-500 cursor-not-allowed"
                          }`}
                        >
                          <Sparkles className="h-4 w-4" />
                          {redeemingId === reward.id
                            ? t("pointsStore.menukarkan")
                            : customer && affordable
                              ? t("pointsStore.tukarPoin")
                              : t("pointsStore.poinKurang")}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-8 rounded-[1.25rem] border border-red-500/20 bg-red-500/[0.06] px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mt-16">
            <Link href="/account#points" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t("pointsStore.kembaliAkun")}
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
              onClick={() => setSuccess(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950 p-10 text-center shadow-2xl"
              >
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-white">{t("pointsStore.suksesTitle")}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {t("pointsStore.suksesDesc", { title: success.title })}
                </p>
                <button
                  onClick={() => setSuccess(null)}
                  className="mt-8 w-full rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-black hover:bg-emerald-400 transition-colors"
                >
                  {t("pointsStore.selesai")}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </main>
  );
}
