"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, User, Mail, Palette, Recycle, Leaf, Music, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const categoryLinks = [
  { key: "semuaProduk", href: "/products", icon: null, color: "" },
  { key: "seniman", href: "/artists", icon: Palette, color: "bg-emerald-500" },
  { key: "plastik", href: "/products", icon: Recycle, color: "bg-blue-500" },
  { key: "kriya", href: "/products", icon: Palette, color: "bg-amber-500" },
  { key: "organik", href: "/products", icon: Leaf, color: "bg-emerald-500" },
];

const ecosystemLinks = [
  { entityKey: "tnl", href: "/tananyiurlestari" },
  { entityKey: "trc", href: "/trashrecyclecenter" },
  { entityKey: "elmast", href: "/elmast" },
  { entityKey: "orders", href: "/orders" },
];

export default function Footer() {
  const { t, lang, toggleLang } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0c0f0c] text-zinc-400 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.04),_transparent_70%)] pointer-events-none" />
      <div className="bg-noise absolute inset-0 opacity-[0.02] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20 relative z-10">
        <div className="grid gap-12 sm:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Column 1 — BACIRARO */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-inner">
                <Image
                  src="/Baciraro cap.png"
                  alt={t("footer.baciraroLogoAlt")}
                  fill
                  sizes="40px"
                  className="object-contain p-1.5"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400 flex items-center gap-1.5">
{t("footer.baciraroBrand")}
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f87171] animate-pulse" />
                </p>
                <p className="text-[11px] text-zinc-500 font-medium">{t("footer.center")}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 max-w-xs font-serif italic text-emerald-100/60">
              {t("footer.tagline")}
            </p>
            <p className="text-[10px] tracking-wide text-zinc-600 mt-2">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow hover:bg-white/10 transition-all"
            >
              {t("footer.kembaliKeAtas")}
            </button>
          </div>

          {/* Column 2 — Ekosistem Sirkular */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white mb-6">
              {t("footer.ekosistemSirkular")}
            </p>
            <ul className="space-y-5 text-xs font-medium">
              {ecosystemLinks.map((item) => (
                <li key={item.entityKey}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 transition-all duration-300 hover:text-emerald-400 hover:translate-x-1 group"
                  >
                    {t("ecosystem.entities." + item.entityKey + ".name")}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                  <p className="text-[10px] text-zinc-600 italic mt-0.5">{t("ecosystem.entities." + item.entityKey + ".role")}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Produk & Layanan */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white mb-6">
              {t("footer.produkLayanan")}
            </p>
            <ul className="space-y-4 text-xs font-medium">
              {categoryLinks.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
                  >
                    {cat.color ? (
                      <span className={`h-1.5 w-1.5 rounded-full ${cat.color}`} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    )}
                    {t("footer." + cat.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/5 my-5" />

            <ul className="space-y-4 text-xs font-medium">
              <li>
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
                >
                  <User className="h-3 w-3 text-zinc-500" />
                  {t("footer.akunSaya")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-3 w-3 text-zinc-500" />
                  {t("footer.kontakKami")}
                </Link>
              </li>
            </ul>

            <div className="mt-5">
              <a
                href="https://wa.me/6288212835350?text=Halo%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20produk%20Baciraro."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500 px-4 py-2 text-[11px] font-bold text-emerald-400 hover:text-black transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t("footer.pesanWA")}
              </a>
            </div>
          </div>

          {/* Column 4 — Digdaya oleh ORDERS */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
              {t("footer.digdayaOleh")}
            </p>

            <Link
              href="/orders"
              className="group block rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-950 to-orange-950/20 p-5 transition-all duration-300 hover:border-orange-400/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-2 flex items-center justify-center border border-white/10 shadow-inner shrink-0">
                  <Image
                    src="/Orders.png"
                    alt={t("footer.ordersLogoAlt")}
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                    {t("footer.ordersBrand")}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {t("footer.technology")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                {t("footer.ordersDesc")}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                {t("footer.kunjungiOrders")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/baciraro"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/10 transition-all"
                aria-label={t("footer.instagram")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@baciraro"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                aria-label={t("footer.tiktok")}
              >
                <Music className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://wa.me/6288212835350"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all"
                aria-label={t("footer.whatsapp")}
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={toggleLang}
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all text-[9px] font-bold"
                aria-label={t("footer.toggleLang")}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="ml-0.5">{lang.toUpperCase()}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[10px] text-zinc-600">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>
            {t("footer.bottomDigdaya")}{" "}
            <Link href="/orders" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              {t("footer.ordersBrand")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
