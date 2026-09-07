"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import QRCode from "qrcode";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface QRModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function QRModal({ open, onClose, url, title }: QRModalProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoSize = 64;

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    QRCode.toCanvas(canvas, url, {
      width: 320,
      margin: 2,
      color: { dark: "#fafafa", light: "#000000" },
    }, () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const cx = (canvas.width - logoSize) / 2;
        const cy = (canvas.height - logoSize) / 2;

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(cx + logoSize / 2, cy + logoSize / 2, logoSize / 2 + 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx + logoSize / 2, cy + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, cx, cy, logoSize, logoSize);
        ctx.restore();
      };
      img.src = "/Baciraro cap.png";
    });
  }, [open, url]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `baciraro-qr-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
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

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 mb-1">
                {t("qrModal.title")}
              </p>
              <h3 className="font-serif text-lg text-white mb-6">{title}</h3>

              <div className="rounded-2xl border border-white/10 bg-black p-4 flex justify-center">
                <canvas ref={canvasRef} width={320} height={320} className="block" />
              </div>

              <button
                onClick={handleDownload}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:gap-3"
              >
                <Download className="h-4 w-4" />
                {t("qrModal.download")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
