"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, User, Phone, Mail, ArrowLeft, Star, X, Upload, Pencil, Gift } from "lucide-react";
import Link from "next/link";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import AuthModal from "@/components/AuthModal";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Transaction {
  id: number;
  points: number;
  description: string;
  created_at: string;
  qr_codes: { code: string; product_slug: string } | null;
}

export default function AccountPage() {
  const { t } = useLanguage();
  const { customer, loading, logout, updateProfile } = useCustomerAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState("");
  const editFileRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, maxW = 400): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          if (width > maxW) { height = (height * maxW) / width; width = maxW; }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditPhotoFile(file);
    const compressed = await compressImage(file);
    setEditPhotoPreview(compressed);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSubmitting(true);

    let photoUrl = customer?.photo_url || "";
    if (editPhotoFile && editPhotoPreview) {
      const blob = await (await fetch(editPhotoPreview)).blob();
      const formData = new FormData();
      formData.append("file", blob, "photo.jpg");
      const uploadRes = await fetch("/api/upload/customer-photo", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        photoUrl = url;
      } else {
        const errData = await uploadRes.json().catch(() => ({}));
        setEditError(errData.error || "Gagal mengunggah foto");
        setEditSubmitting(false);
        return;
      }
    }

    const result = await updateProfile(editName, editPhone, photoUrl);
    setEditSubmitting(false);
    if (result.error) {
      setEditError(result.error);
    } else {
      setEditOpen(false);
    }
  };

  const openEdit = () => {
    setEditName(customer?.name || "");
    setEditPhone(customer?.phone || "");
    setEditPhotoPreview(customer?.photo_url || "");
    setEditPhotoFile(null);
    setEditError("");
    setEditOpen(true);
  };

  const openAuthModal = () => setAuthModalOpen(true);

  useEffect(() => {
    if (!customer) return;
    fetch("/api/customer/points")
      .then((r) => r.json())
      .then((d) => setTransactions(d.transactions || []))
      .finally(() => setTxLoading(false));
  }, [customer]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">{t("account.loading")}</p>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-black text-[#fafafa] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <User className="h-7 w-7 text-emerald-400" />
          </div>
          <h1 className="font-serif text-2xl text-white mb-2">{t("account.loginTitle")}</h1>
          <p className="text-sm text-zinc-400 mb-6">{t("account.loginDesc")}</p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-sm font-bold transition-all"
          >
            {t("account.daftarMasuk")}
          </button>
          <div className="mt-4">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 underline">
              {t("account.kembaliBeranda")}
            </Link>
          </div>
          <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-[#fafafa]">
      <div className="page-bg" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("account.kembaliBeranda")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: springEase }}
          className="space-y-8"
        >
          {/* Profile Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8">
            <div className="flex items-center gap-5">
              {customer.photo_url ? (
                <img src={customer.photo_url} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-emerald-500/30" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-bold text-black">
                  {customer.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
              <div className="flex-1">
                <h1 className="font-serif text-2xl text-white mb-1">{customer.name}</h1>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {customer.email}
                  </span>
                  {customer.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {customer.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={openEdit}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <Pencil className="h-3 w-3" />
                  {t("account.editProfil")}
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                  {t("account.keluar")}
                </button>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-7 w-7 text-amber-400" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 mb-1">{t("account.totalPoin")}</p>
            <p className="font-serif text-5xl text-amber-400 mb-1">{customer.total_points}</p>
            <p className="text-xs text-zinc-500">{t("account.poinDesc")}</p>
            <Link
              href="/points-store"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-500/20 px-5 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <Gift className="h-4 w-4" />
              {t("account.tukarPoin")}
            </Link>
          </div>

          {/* Points History */}
          <div id="points" className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur p-8">
            <h2 className="font-serif text-xl text-white mb-6">{t("account.riwayatPoin")}</h2>
            {txLoading ? (
              <p className="text-sm text-zinc-500 text-center py-8">{t("account.loading")}</p>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <Star className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">{t("account.belumAdaTx")}</p>
                <p className="text-xs text-zinc-600 mt-1">{t("account.txHint")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">+{tx.points} {t("account.poinLabel")}</p>
                        <p className="text-xs text-zinc-500">{tx.description}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-600">{new Date(tx.created_at).toLocaleDateString("id-ID")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: springEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-[2rem] border border-white/10 bg-[#0c0f0c] p-8 shadow-2xl max-w-sm w-full"
            >
              <button
                onClick={() => setEditOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 mb-1">
                  {t("account.editProfil")}
                </p>
                <h3 className="font-serif text-lg text-white">
                  {t("account.perbaruiData")}
                </h3>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div className="flex justify-center mb-2">
                  <label className="relative cursor-pointer group">
                    <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/40">
                      {editPhotoPreview ? (
                        <img src={editPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-zinc-500" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Upload className="h-3.5 w-3.5 text-black" />
                    </div>
                    <input ref={editFileRef} type="file" accept="image/*" onChange={handleEditFile} className="hidden" />
                  </label>
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder={t("account.placeholderNama")}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder={t("account.placeholderHP")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                  />
                </div>

                {editError && (
                  <p className="text-red-400 text-xs text-center">{editError}</p>
                )}

                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold transition-all disabled:opacity-40"
                >
                  {editSubmitting ? t("account.menyimpan") : t("account.simpan")}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
