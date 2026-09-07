"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, User, Mail, Lock, Phone, Globe } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useAdminAuth } from "@/lib/admin-auth-context";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
  const { login, register } = useCustomerAuth();
  const { loginAdmin } = useAdminAuth();
  const { t, lang, toggleLang } = useLanguage();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const compressed = await compressImage(file);
    setPhotoPreview(compressed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (mode === "login" && email === "baciraro@gmail.com") {
      const result = await loginAdmin(email, password);
      setSubmitting(false);
      if (result.error) {
        setError(result.error);
      } else {
        onSuccess?.();
        onClose();
        window.location.href = "/creative-studio";
      }
      return;
    }

    let photoUrl = "";
    if (photoFile && mode === "register") {
      const blob = await (await fetch(photoPreview)).blob();
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
        setError(errData.error || t("auth.gagalUpload"));
        setSubmitting(false);
        return;
      }
    }

    const result = mode === "login"
      ? await login(email, password)
      : await register(email, password, name, phone, photoUrl);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      onSuccess?.();
      onClose();
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 mb-1">
                {mode === "login" ? t("auth.masuk") : t("auth.daftar")}
              </p>
              <h3 className="font-serif text-lg text-white">
                {mode === "login" ? t("auth.selamatDatang") : t("auth.buatAkun")}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <>
                  <div className="flex justify-center mb-2">
                    <label className="relative cursor-pointer group">
                      <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/40">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-8 w-8 text-zinc-500" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Upload className="h-3.5 w-3.5 text-black" />
                      </div>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </label>
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("auth.namaLengkap")}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("auth.noHp")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                    />
                  </div>
                </>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email")}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.password")}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold transition-all disabled:opacity-40"
              >
                {submitting ? t("auth.memproses") : mode === "login" ? t("auth.masuk") : t("auth.daftar")}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-4">
              {mode === "login" ? t("auth.belumPunyaAkun") : t("auth.sudahPunyaAkun")}
              <button onClick={toggleMode} className="text-emerald-400 hover:text-emerald-300 underline">
                {mode === "login" ? t("auth.daftar") : t("auth.masuk")}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
