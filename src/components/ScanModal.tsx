"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scan, LogIn, Award, RefreshCw } from "lucide-react";
import jsQR from "jsqr";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useLanguage } from "@/lib/i18n/context";
import AuthModal from "./AuthModal";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ScanModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ScanModal({ open, onClose }: ScanModalProps) {
  const { customer } = useCustomerAuth();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animRef = useRef<number>(0);

  const customerRef = useRef(customer);
  customerRef.current = customer;

  const [status, setStatus] = useState<"scanning" | "success" | "error" | "nologin">("scanning");
  const [productTitle, setProductTitle] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scanningCode, setScanningCode] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setStatus("error");
    }
  }, []);

  const handleScanResultRef = useRef<(data: string) => Promise<void>>(async () => {});
  handleScanResultRef.current = async (data: string) => {
    const match = data.match(/\/claim\/([^/]+)\/([^/]+)/);
    if (!match) {
      setStatus("error");
      return;
    }

    const code = match[2];
    setScanningCode(data);

    const qrRes = await fetch(`/api/qr/${code}`);
    if (qrRes.ok) {
      const qrData = await qrRes.json();
      setProductTitle(qrData.qr?.products?.title || match[1]);
    }

    const c = customerRef.current;
    if (!c) {
      setStatus("nologin");
      return;
    }

    const qrData = qrRes.ok ? await qrRes.json() : null;
    if (qrData?.qr?.customer_id && qrData.qr.customer_id !== c.id) {
      setStatus("error");
      return;
    }
    if (qrData?.qr?.claimed_at || qrData?.qr?.buyer_name) {
      setStatus("error");
      return;
    }

    const claimRes = await fetch(`/api/qr/${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyer_name: c.name, buyer_phone: c.phone }),
    });

    if (claimRes.ok) {
      const productPoints = qrData?.qr?.products?.points_per_scan || 10;
      setPointsEarned(productPoints);
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const scanLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animRef.current = requestAnimationFrame(scanLoop);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      stopCamera();
      handleScanResultRef.current?.(code.data);
      return;
    }

    animRef.current = requestAnimationFrame(scanLoop);
  }, [stopCamera]);

  useEffect(() => {
    if (open) {
      setStatus("scanning");
      setProductTitle("");
      setPointsEarned(0);
      setScanningCode(null);
      const t = setTimeout(() => startCamera(), 300);
      return () => clearTimeout(t);
    } else {
      stopCamera();
    }
  }, [open, startCamera, stopCamera]);

  useEffect(() => {
    if (open && status === "scanning") {
      const timer = setTimeout(() => {
        animRef.current = requestAnimationFrame(scanLoop);
      }, 800);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animRef.current);
      };
    }
  }, [open, status, scanLoop]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    handleClose();
  };

  const handleRetry = () => {
    setStatus("scanning");
    setProductTitle("");
    setPointsEarned(0);
    startCamera();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: springEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-[2rem] border border-white/10 bg-[#0c0f0c] p-6 shadow-2xl max-w-sm w-full"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all z-10"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 mb-1">
                  {t("scan.title")}
                </p>
                <h3 className="font-serif text-lg text-white mb-6">{t("scan.heading")}</h3>

                {status === "scanning" && (
                  <div className="relative rounded-2xl border border-white/10 bg-black overflow-hidden">
                    <video ref={videoRef} className="w-full aspect-square object-cover" playsInline muted />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 rounded-2xl border-2 border-emerald-400/60" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                        {t("scan.scanning")}
                      </p>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <div className="py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <Award className="h-10 w-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="font-serif text-2xl text-white mb-2">{t("scan.successTitle")}</h2>
                    <p className="text-emerald-400 font-semibold text-lg mb-1">{customer?.name}</p>
                    <p className="text-2xl font-bold text-amber-400 mb-3">+{pointsEarned} {t("points.poin")}</p>
                    <p className="text-sm text-zinc-400">{t("scan.successProduct", { title: productTitle })}</p>
                  </div>
                )}

                {status === "nologin" && (
                  <div className="py-8">
                    <div className="w-20 h-20 rounded-full bg-zinc-500/10 flex items-center justify-center mx-auto mb-6">
                      <Scan className="h-10 w-10 text-zinc-400" />
                    </div>
                    <h2 className="font-serif text-2xl text-white mb-2">{t("scan.nologinTitle")}</h2>
                    <p className="text-sm text-zinc-400 mb-2">{t("scan.nologinProduct", { title: productTitle })}</p>
                    <p className="text-xs text-zinc-500 mb-6">
                      {t("scan.nologinDesc")}
                    </p>
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-sm font-bold transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      {t("scan.daftarMasuk")}
                    </button>
                  </div>
                )}

                {status === "error" && (
                  <div className="py-8">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                      <X className="h-10 w-10 text-red-400" />
                    </div>
                    <h2 className="font-serif text-2xl text-white mb-2">{t("scan.errorTitle")}</h2>
                    <p className="text-sm text-zinc-400">{t("scan.errorDesc")}</p>
                    <button
                      onClick={handleRetry}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-6 py-3 text-sm font-bold transition-all hover:bg-white/10"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("scan.scanLagi")}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
    </>
  );
}
