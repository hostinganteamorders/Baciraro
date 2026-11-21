"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import "@/app/creative/creative-paper.css";

/** Filter SVG untuk tepi sobek ala poster. Taruh sekali di dalam <main className="cp">. */
export function PaperFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <filter id="cp-rough" x="-10%" y="-20%" width="120%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="8" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Samakan warna body dengan kertas agar tidak ada kilat gelap saat overscroll. */
export function usePaperBody() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#f4f4f2";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);
}

/**
 * Bilah atas skin kertas.
 * base = "" di /creative (anchor lokal), base = "/creative" di sub-halaman (anchor menuju /creative#...).
 */
export function PaperBar({ base = "" }: { base?: string }) {
  const { lang, toggleLang } = useLanguage();
  const tx = (id: string, en: string) => (lang === "id" ? id : en);
  const a = (hash: string) => `${base}${hash}`;
  return (
    <header className="cp-bar">
      <div className="cp-wrap flex h-16 items-center justify-between gap-4">
        <Link href="/creative" aria-label="Baciraro Creative" className="flex items-center gap-3">
          <span className="cp-logo-mask h-11 w-12" role="img" aria-label="Baciraro Creative" />
        </Link>
        <nav className="cp-nav hidden items-center gap-7 md:flex" aria-label="Creative">
          <Link href={a("#karya")}>{tx("Karya", "Work")}</Link>
          <Link href={a("#tentang")}>{tx("Tentang", "About")}</Link>
          <Link href={a("#katalog")}>{tx("Katalog", "Catalog")}</Link>
          <Link href={a("#kolaborasi")}>{tx("Kolaborasi", "Collaborate")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleLang} className="cp-filter inline-flex items-center gap-1.5 !px-3 !py-1.5 !text-xs" aria-label="Language">
            <Languages className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <Link href="/" className="cp-filter hidden !px-3 !py-1.5 !text-xs sm:inline-block">
            baciraro.net
          </Link>
        </div>
      </div>
    </header>
  );
}
