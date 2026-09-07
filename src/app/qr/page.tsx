"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useLanguage } from "@/lib/i18n/context";

export default function QRPage() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1000;
    canvas.width = size;
    canvas.height = size;

    QRCode.toCanvas(canvas, "https://baciraro.net", {
      width: size,
      margin: 3,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(() => {
      const logoSize = size * 0.22;
      const cx = size / 2;
      const cy = size / 2;

      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, logoSize / 2 + 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cx, cy, logoSize / 2 + 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const logo = new Image();
      logo.crossOrigin = "anonymous";
      logo.src = "/Baciraro cap.png";
      logo.onload = () => {
        const s = logoSize * 0.82;
        ctx.drawImage(logo, cx - s / 2, cy - s / 2, s, s);
      };
    });
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "baciraro-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 gap-6">
      <div className="w-[min(90vw,80vh)] aspect-square rounded-2xl overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
      </div>
      <button
        onClick={handleDownload}
        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-full transition-colors shadow-lg"
      >
        {t("qr.download")}
      </button>
    </div>
  );
}
