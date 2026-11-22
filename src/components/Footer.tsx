"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, MessageCircle, Music, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Flake } from "@/components/redesign/ui";

const ecosystemLinks = [
  { entityKey: "tnl", href: "/tananyiurlestari" },
  { entityKey: "trc", href: "/trashrecyclecenter" },
  { entityKey: "elmast", href: "/elmast" },
  { entityKey: "orders", href: "/orders" },
];

export default function Footer() {
  const { t, lang, toggleLang } = useLanguage();
  const L = (id: string, en: string) => (lang === "id" ? id : en);
  const col = "mb-[var(--s2)] text-[length:var(--fc)] font-bold uppercase tracking-[.16em] text-[#ffd29b]";
  const circle = "grid h-10 w-10 place-items-center rounded-full border border-[rgb(255_255_255/0.35)] transition-colors hover:bg-[color:var(--orange)] hover:text-[#141414] hover:border-[color:var(--orange)]";

  return (
    <footer className="bc-footer relative overflow-hidden bg-[#141414]">
      <Flake c="var(--orange)" w="7rem" h="2.2rem" x="82%" y="-1rem" r={-24} />
      <Flake c="var(--green)" w="5rem" h="1.7rem" x="90%" y="2.2rem" r={32} />
      <div className="bc-wrap relative py-[var(--s5)]">
        <div className="grid gap-[var(--s4)] md:grid-cols-2 lg:grid-cols-[1.618fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Baciraro cap.png" alt={t("footer.baciraroLogoAlt")} width={44} height={46} className="h-11 w-auto" />
              <span className="text-[1.75rem] font-extrabold tracking-tight">Baciraro</span>
            </div>
            <p className="bc-t-sub mt-[var(--s2)] max-w-sm">{t("footer.tagline").replace(/^"|"$/g, "")}</p>
            <p className="bc-t-cap mt-[var(--s1)]">{t("footer.center")}</p>
            <div className="mt-[var(--s2)] flex gap-3">
              <a href="https://instagram.com/baciraro_creative" target="_blank" rel="noopener noreferrer" aria-label={t("footer.instagram")} className={circle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://tiktok.com/@baciraro" target="_blank" rel="noopener noreferrer" aria-label={t("footer.tiktok")} className={circle}>
                <Music className="h-4 w-4" />
              </a>
              <a href="https://wa.me/6288212835350" target="_blank" rel="noopener noreferrer" aria-label={t("footer.whatsapp")} className={circle}>
                <MessageCircle className="h-4 w-4" />
              </a>
              <button onClick={toggleLang} className={`${circle} text-[0.6875rem] font-bold`} aria-label={t("footer.toggleLang")}>
                <Globe className="h-4 w-4" />
                <span className="ml-0.5">{lang.toUpperCase()}</span>
              </button>
            </div>
          </div>

          <div>
            <p className={col}>{t("footer.ekosistemSirkular")}</p>
            {ecosystemLinks.map((item) => (
              <Link key={item.entityKey} href={item.href} className="bc-footlink">
                {t("ecosystem.entities." + item.entityKey + ".name")}
                <span className="block text-[length:var(--fc)] text-[rgb(255_255_255/0.6)]">{t("ecosystem.entities." + item.entityKey + ".role")}</span>
              </Link>
            ))}
            <Link href="/creative" className="bc-footlink">
              {t("ecosystem.entities.creative.name")}
              <span className="block text-[length:var(--fc)] text-[rgb(255_255_255/0.6)]">{t("ecosystem.entities.creative.role")}</span>
            </Link>
          </div>

          <div>
            <p className={col}>{t("footer.produkLayanan")}</p>
            <Link href="/products" className="bc-footlink">{t("footer.semuaProduk")}</Link>
            <Link href="/artists" className="bc-footlink">{t("footer.seniman")}</Link>
            <Link href="/products" className="bc-footlink">{t("footer.plastik")}</Link>
            <Link href="/products" className="bc-footlink">{t("footer.kriya")}</Link>
            <Link href="/products" className="bc-footlink">{t("footer.organik")}</Link>
            <Link href="/products/print" className="bc-footlink">{t("catalog.cetakKatalog")}</Link>
            <Link href="/account" className="bc-footlink">{t("footer.akunSaya")}</Link>
            <Link href="/contact" className="bc-footlink">{t("footer.kontakKami")}</Link>
            <a
              href="https://wa.me/6288212835350?text=Halo%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20produk%20Baciraro."
              target="_blank"
              rel="noopener noreferrer"
              className="bc-btn bc-btn--orange bc-btn--sm mt-[var(--s2)]"
            >
              <MessageCircle className="h-4 w-4" />
              {t("footer.pesanWA")}
            </a>
          </div>

          <div>
            <p className={col}>{t("footer.digdayaOleh")}</p>
            <Link href="/orders" className="group block border-t-[3px] border-[color:var(--orange)] pt-[var(--s2)]">
              <span className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ffffff] p-2">
                  <Image src="/Orders.png" alt={t("footer.ordersLogoAlt")} fill sizes="48px" className="object-contain p-1.5" />
                </span>
                <span>
                  <span className="block text-[length:var(--text-lg)] font-extrabold leading-tight">{t("footer.ordersBrand")}</span>
                  <span className="block text-[length:var(--fc)] uppercase tracking-wider text-[rgb(255_255_255/0.6)]">{t("footer.technology")}</span>
                </span>
              </span>
              <span className="mt-[var(--s2)] block text-[length:var(--text-sm)] text-[rgb(255_255_255/0.78)]">{t("footer.ordersDesc")}</span>
              <span className="mt-[var(--s1)] inline-flex items-center gap-1.5 text-[length:var(--text-sm)] font-bold text-[#ffd29b]">
                {t("footer.kunjungiOrders")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-[var(--s4)] flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(255_255_255/0.2)] pt-[var(--s2)]">
          <p className="bc-t-cap">{t("footer.copyright", { year: new Date().getFullYear() })} · {t("footer.bottomDigdaya")} <Link href="/orders" className="font-semibold text-[#ffd29b]">{t("footer.ordersBrand")}</Link></p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bc-btn bc-btn--white bc-btn--sm">
            <ArrowUp className="h-4 w-4" />
            {L("Ke atas", "Back to top")}
          </button>
        </div>
      </div>
    </footer>
  );
}
