"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

export type L = { id: string; en: string };

/** Bahasa aktif + penerjemah L → string. */
export function useTx() {
  const { lang, toggleLang } = useLanguage();
  const tx = (l: L) => (lang === "id" ? l.id : l.en);
  const pick = (id: string, en: string) => (lang === "id" ? id : en);
  return { lang, toggleLang, tx, pick };
}

/** Samakan warna body dengan latar putih agar tidak ada kilat gelap saat overscroll. */
export function useLightBody() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);
}

/** Angka yang naik saat terlihat; langsung final bila reduced-motion. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref}>
      {(reduce ? to : v).toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/** Kepala bagian editorial: label bernomor → judul (φ²) → subjudul (φ¹) → deskripsi (φ⁰). */
export function SectionHead({
  no, label, title, sub, desc, accent = "orange", right,
}: { no: string; label: string; title: ReactNode; sub?: string; desc?: string; accent?: "orange" | "green"; right?: ReactNode }) {
  return (
    <div className="mb-[var(--s5)] flex flex-col gap-[var(--s3)] md:flex-row md:items-end md:justify-between">
      <div className="max-w-[44rem]">
        <span className="bc-label"><b>{no}</b>{label}</span>
        <h2 className="bc-t-title mt-[var(--s2)]" data-a={accent}>{title}</h2>
        {sub && <p className="bc-t-sub mt-[var(--s2)]">{sub}</p>}
        {desc && <p className="bc-t-desc mt-[var(--s2)]">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

/** Serpihan plastik daur ulang: motif identitas Baciraro (dekoratif). */
export function Flake({ c, w, h, x, y, r, className = "" }: { c: string; w: string; h: string; x: string; y: string; r: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bc-flake ${className}`}
      style={{ background: c, width: w, height: h, left: x, top: y, transform: `rotate(${r}deg)` }}
    />
  );
}
