"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Star, Send, LogIn } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useLanguage } from "@/lib/i18n/context";
import AuthModal from "@/components/AuthModal";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ClaimPage() {
  const params = useParams();
  const code = params.code as string;

  const { customer, loading: authLoading } = useCustomerAuth();
  const { t } = useLanguage();
  const [qr, setQr] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [done, setDone] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const fetchQr = async () => {
    const res = await fetch(`/api/qr/${code}`);
    if (!res.ok) { setError(t("claim.notFound")); setLoading(false); return; }
    const data = await res.json();
    setQr(data.qr);
    if (data.qr.review_text) setReviewText(data.qr.review_text);
    if (data.qr.review_rating) setReviewRating(data.qr.review_rating);
    setLoading(false);
  };

  useEffect(() => { fetchQr(); }, [code]);

  useEffect(() => {
    if (customer && qr && !qr.buyer_name) {
      setName(customer.name);
      setPhone(customer.phone || "");
    }
  }, [customer, qr]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await fetch(`/api/qr/${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyer_name: name, buyer_phone: phone }),
    });
    setSubmitting(false);

    if (customer) {
      const productPoints = qr?.is_event ? 10 : (qr?.products?.points_per_scan ?? 0);
      setPointsEarned(productPoints);
    }

    await fetchQr();
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewRating) return;
    setSubmittingReview(true);
    await fetch(`/api/qr/${code}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review_text: reviewText, review_rating: reviewRating }),
    });
    setSubmittingReview(false);
    setDone(true);
    await fetchQr();
  };

  if (loading || authLoading) return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">{t("claim.loading")}</p>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-zinc-400">{error}</p>
      </div>
    </main>
  );

  const isClaimed = qr?.buyer_name;
  const hasReview = qr?.review_text && qr?.review_rating;

  return (
    <main className="min-h-screen bg-black text-[#fafafa] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: springEase }}
        className="w-full max-w-md"
      >
        {!isClaimed ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="font-serif text-2xl text-white mb-2">{t("claim.registrasi")}</h1>
            <p className="text-sm text-zinc-400 mb-6">{t("claim.registrasiDesc")}</p>

            {!customer && (
              <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-xs text-zinc-400 mb-3">{t("claim.loginPrompt")}</p>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  {t("claim.masukDaftar")}
                </button>
              </div>
            )}

            {customer && (
              <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-3">
                  {customer.photo_url ? (
                    <img src={customer.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-black">
                      {customer.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm text-white font-semibold">{customer.name}</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      {t("points.youHave", { poin: customer.total_points })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleClaim} className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("claim.namaPembeli")}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("claim.noHp")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
              />
              <button
                type="submit"
                disabled={submitting || !name.trim()}
                className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold transition-all disabled:opacity-40"
              >
                {submitting ? t("claim.menyimpan") : customer ? t("claim.klaimDapatkanPoin") : t("claim.simpan")}
              </button>
            </form>
          </div>
        ) : hasReview && done ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="h-10 w-10 text-emerald-400" fill="#34d399" />
            </motion.div>
            <h1 className="font-serif text-3xl text-white mb-2">{t("claim.terimaKasihTitle")}</h1>
            <p className="text-emerald-400 font-semibold text-lg mb-1">{qr.buyer_name}</p>
            {pointsEarned > 0 && (
              <p className="text-sm text-amber-400 font-semibold mb-1">{t("claim.poinEarned", { poin: pointsEarned })}</p>
            )}
            <p className="text-sm text-zinc-400 mb-6">{t("claim.terimaKasihSubtitle")}</p>
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="h-5 w-5" fill="#fbbf24" stroke="#fbbf24" />
              ))}
            </div>
            <p className="text-sm text-zinc-300 italic">&ldquo;{qr.review_text}&rdquo;</p>
          </div>
        ) : !hasReview ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-7 w-7 text-emerald-400" fill="#34d399" />
            </div>
            <h1 className="font-serif text-2xl text-white mb-1">{t("claim.terimaKasihClaimed")}</h1>
            <p className="text-emerald-400 font-semibold text-lg mb-4">{qr.buyer_name}</p>
            {pointsEarned > 0 && (
              <p className="text-sm text-amber-400 font-semibold mb-4">{t("claim.poinEarned", { poin: pointsEarned })}</p>
            )}
            <p className="text-sm text-zinc-400 mb-6">{t("claim.reviewPrompt")}</p>
            <form onSubmit={handleReview} className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} type="button" onClick={() => setReviewRating(s)}>
                    <Star className={`h-8 w-8 transition-all ${s <= reviewRating ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={t("claim.reviewPlaceholder")}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 resize-none"
              />
              <button
                type="submit"
                disabled={submittingReview || !reviewText.trim() || !reviewRating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                {submittingReview ? t("claim.mengirim") : t("claim.kirim")}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-7 w-7 text-emerald-400" fill="#34d399" />
            </div>
            <h1 className="font-serif text-2xl text-white mb-1">{t("claim.terimaKasihClaimed")}</h1>
            <p className="text-emerald-400 font-semibold text-lg mb-1">{qr.buyer_name}</p>
            <p className="text-xs text-zinc-500 mb-6">{t("claim.sudahReview")}</p>
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="h-5 w-5" fill={s <= qr.review_rating ? "#fbbf24" : "none"} stroke={s <= qr.review_rating ? "#fbbf24" : "#52525b"} />
              ))}
            </div>
            <p className="text-sm text-zinc-300 italic">&ldquo;{qr.review_text}&rdquo;</p>
            <button
              onClick={() => setDone(false)}
              className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline"
            >
              {t("claim.editReview")}
            </button>
          </div>
        )}
      </motion.div>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={() => fetchQr()} />
    </main>
  );
}
