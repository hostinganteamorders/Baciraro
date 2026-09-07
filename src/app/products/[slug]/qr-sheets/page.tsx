"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";
import { Loader2, Printer } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type QRItem = { code: string; claimUrl: string };

const QR_SIZE = 400;
const LOGO_SIZE = 80;
const LOGO_PAD = 4;

async function generateQRDataUrl(
  text: string,
  logo: HTMLImageElement
): Promise<string> {
  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, text, {
    width: QR_SIZE,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
    errorCorrectionLevel: "Q",
  });

  const ctx = canvas.getContext("2d")!;
  const cx = (canvas.width - LOGO_SIZE) / 2;
  const cy = (canvas.height - LOGO_SIZE) / 2;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(
    cx + LOGO_SIZE / 2,
    cy + LOGO_SIZE / 2,
    LOGO_SIZE / 2 + LOGO_PAD,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx + LOGO_SIZE / 2, cy + LOGO_SIZE / 2, LOGO_SIZE / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(logo, cx, cy, LOGO_SIZE, LOGO_SIZE);
  ctx.restore();

  return canvas.toDataURL("image/png");
}

export default function QRSheetsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  const [productTitle, setProductTitle] = useState("");
  const [qrImages, setQrImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((d) => setProductTitle(d.product?.title || slug))
      .catch(() => setProductTitle(slug));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    fetch("/api/qr/generate-bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_slug: slug, count: 50 }),
    })
      .then((r) => r.json())
      .then(async (d) => {
        if (cancelled) return;
        const list: QRItem[] = d.codes || [];
        if (list.length === 0) return;

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
          logo.onload = () => resolve();
          logo.onerror = () => reject();
          logo.src = "/Baciraro cap.png";
        });

        if (cancelled) return;
        const batchSize = 10;
        const all: string[] = [];
        for (let i = 0; i < list.length; i += batchSize) {
          const batch = list.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map((qr) => generateQRDataUrl(qr.claimUrl, logo))
          );
          all.push(...results);
          if (!cancelled) setQrImages([...all]);
        }
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="no-print fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mx-auto" />
          <p className="mt-4 text-sm text-zinc-500">
            {t("qrSheets.loading")}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {t("qrSheets.progress", { done: qrImages.length })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-8 py-3.5 text-sm font-bold shadow-lg hover:bg-zinc-800 transition-all"
        >
          <Printer className="h-4 w-4" />
          {t("qrSheets.print")}
        </button>
        <p className="text-[10px] text-zinc-400 bg-white/80 px-3 py-1 rounded-full">
          {t("qrSheets.ready", { count: qrImages.length })}
        </p>
      </div>

      <div className="a4-sheet">
        <div className="sheet-header">
          <div>
            <h1 className="sheet-title">{productTitle}</h1>
            <p className="sheet-subtitle">
              {t("qrSheets.title")}
            </p>
          </div>
          <div className="sheet-brand">{t("qrSheets.brand")}</div>
        </div>

        <div className="qr-grid">
          {qrImages.map((src, i) => (
            <div key={i} className="qr-cell">
              <div className="qr-cell-inner">
                <img
                  src={src}
                  alt={`QR ${i + 1}`}
                  className="qr-cell-img"
                  loading="lazy"
                />
                <span className="qr-cell-number">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="sheet-footer">
          {t("qrSheets.footer")}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .a4-sheet {
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .qr-cell {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
        @media screen {
          body {
            margin: 0;
            padding: 20px 0;
            background: #e5e7eb;
          }
        }
      `}</style>

      <style jsx>{`
        .a4-sheet {
          width: 210mm;
          min-height: 297mm;
          padding: 8mm 6mm 6mm;
          box-sizing: border-box;
          background: #fff;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          display: flex;
          flex-direction: column;
          border-radius: 2px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        }
        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 3mm;
          margin-bottom: 3mm;
          border-bottom: 2px solid #000;
          flex-shrink: 0;
        }
        .sheet-title {
          font-size: 14pt;
          font-weight: 700;
          margin: 0;
          color: #000;
          line-height: 1.2;
        }
        .sheet-subtitle {
          font-size: 7.5pt;
          color: #666;
          margin: 1.5pt 0 0;
        }
        .sheet-brand {
          font-size: 8pt;
          color: #999;
          text-align: right;
          white-space: nowrap;
        }
        .qr-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(10, 1fr);
          gap: 0;
        }
        .qr-cell {
          border: 0.5px dashed #bbb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1mm;
          box-sizing: border-box;
        }
        .qr-cell-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .qr-cell-img {
          width: 100%;
          max-width: 28mm;
          height: auto;
          display: block;
          flex-shrink: 1;
        }
        .qr-cell-number {
          font-size: 6.5pt;
          font-weight: 600;
          color: #000;
          margin-top: 0.5mm;
          flex-shrink: 0;
        }
        .sheet-footer {
          text-align: center;
          font-size: 6.5pt;
          color: #999;
          margin-top: 2mm;
          padding-top: 2mm;
          border-top: 1px solid #ddd;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
