"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Check, Clock, Star } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface QrCode {
  id: string;
  product_slug: string;
  buyer_name: string | null;
  buyer_phone: string | null;
  review_text: string | null;
  review_rating: number | null;
  created_at: string;
  updated_at: string;
  products: { title: string } | null;
}

export default function QRDashboardPage() {
  const { t } = useLanguage();
  const [codes, setCodes] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const res = await fetch("/api/qr");
      if (res.status === 401) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCodes(data.qrCodes || []);
      setAuthed(true);
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-black text-[#fafafa]">
      <div className="page-bg" />
      <Header subtitle={t("dashboard.qr.title")} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-zinc-500 text-sm">{t("dashboard.qr.loading")}</div>
      <Footer />
    </main>
  );

  if (!authed) return (
    <main className="min-h-screen bg-black text-[#fafafa] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <p className="text-zinc-400 text-lg mb-4">{t("dashboard.qr.unauthTitle")}</p>
        <p className="text-sm text-zinc-600 mb-6">{t("dashboard.qr.unauthDesc")}</p>
        <Link href="/creative-studio" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-sm font-bold transition-all">
          {t("dashboard.qr.login")}
        </Link>
      </div>
    </main>
  );

  const claimed = codes.filter((c) => c.buyer_name);
  const reviewed = codes.filter((c) => c.review_text);

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("dashboard.qr.title")} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-2">
              {t("dashboard.qr.title")}
            </h1>
            <p className="text-sm text-zinc-500 mb-8">{t("dashboard.qr.totalQr", { n: codes.length })}</p>

            <div className="flex gap-4 mb-8">
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{t("dashboard.qr.total")}</p>
                <p className="font-serif text-[28px] text-white">{codes.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{t("dashboard.qr.claimed")}</p>
                <p className="font-serif text-[28px] text-emerald-400">{claimed.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{t("dashboard.qr.reviewed")}</p>
                <p className="font-serif text-[28px] text-amber-400">{reviewed.length}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-white/[0.05]">
                    <th className="pb-3 pr-4">{t("dashboard.qr.product")}</th>
                    <th className="pb-3 pr-4">{t("dashboard.qr.code")}</th>
                    <th className="pb-3 pr-4">{t("dashboard.qr.status")}</th>
                    <th className="pb-3 pr-4">{t("dashboard.qr.buyer")}</th>
                    <th className="pb-3 pr-4">{t("dashboard.qr.review")}</th>
                    <th className="pb-3 pr-4">{t("dashboard.qr.date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.id} className="border-b border-white/[0.03] text-sm hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-4">
                        <Link href={`/products/${c.product_slug}`} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                          {c.products?.title || c.product_slug}
                        </Link>
                      </td>
                      <td className="py-4 pr-4">
                        <code className="text-[11px] text-zinc-400 font-mono">{c.id.slice(0, 8)}...</code>
                      </td>
                      <td className="py-4 pr-4">
                        {c.review_text ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                            <Star className="h-3 w-3" /> {t("dashboard.qr.reviewedLabel")}
                          </span>
                        ) : c.buyer_name ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                            <Check className="h-3 w-3" /> {t("dashboard.qr.claimedLabel")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-600 text-[10px] font-bold uppercase tracking-wider">
                            <Clock className="h-3 w-3" /> {t("dashboard.qr.pending")}
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-zinc-300">{c.buyer_name || <span className="text-zinc-600">-</span>}</td>
                      <td className="py-4 pr-4 text-zinc-400 text-xs max-w-[200px] truncate">{c.review_text || <span className="text-zinc-600">-</span>}</td>
                      <td className="py-4 text-zinc-600 text-xs">{new Date(c.created_at).toLocaleDateString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
