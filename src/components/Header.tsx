"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Award, LayoutDashboard, Globe, Gift, ChevronDown } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useAdminAuth } from "@/lib/admin-auth-context";
import { useLanguage } from "@/lib/i18n/context";
import { entities } from "@/components/redesign/content";
import AuthModal from "./AuthModal";

const navLinks = [
  { nameKey: "about", href: "/about" },
  { nameKey: "produk", href: "/products" },
  { nameKey: "seniman", href: "/artists" },
  { nameKey: "trackRecord", href: "/track-record" },
  { nameKey: "leadership", href: "/leadership" },
  { nameKey: "contact", href: "/contact" },
];

const menuItem = "flex w-full items-center gap-3 px-4 py-3 text-left text-[length:var(--text-sm)] font-semibold text-[color:var(--ink-2)] transition-colors hover:bg-[color:var(--orange-50)] hover:text-[color:var(--ink)]";

export default function Header(_props?: { subtitle?: string }) {
  const { customer, loading, logout } = useCustomerAuth();
  const { admin, logoutAdmin } = useAdminAuth();
  const { t, lang, toggleLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);
  const lastScrollY = useRef(0);
  const accountRef = useRef<HTMLDivElement>(null);
  const ecoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (Math.abs(delta) < 12) {
        lastScrollY.current = currentScrollY;
        return;
      } else if (delta > 0) {
        setIsVisible(false);
        setDropdownOpen(false);
        setEcoOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (ecoRef.current && !ecoRef.current.contains(e.target as Node)) setEcoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setEcoOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const initials =
    customer?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";
  const L = (id: string, en: string) => (lang === "id" ? id : en);
  const accountBtn = "bc-btn bc-btn--line bc-btn--sm";

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="bc-header"
    >
      <div className="bc-wrap flex items-center justify-between gap-4" style={{ height: "calc(var(--u) * 4.236)" }}>
        <Link href="/" className="flex items-center gap-3" aria-label={t("header.brandName")}>
          <Image src="/Baciraro cap.png" alt={t("footer.baciraroLogoAlt")} width={36} height={38} className="h-9 w-auto" priority />
          <span className="leading-none">
            <span className="block text-[1.25rem] font-extrabold tracking-tight">Baciraro</span>
            <span className="mt-1 hidden text-[0.62rem] font-bold uppercase tracking-[.22em] text-[color:var(--ink-3)] sm:block">Circular Economy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={L("Navigasi utama", "Main navigation")}>
          <div ref={ecoRef} className="relative">
            <button type="button" className="bc-nav-link inline-flex items-center gap-1" aria-expanded={ecoOpen} aria-haspopup="true" onClick={() => setEcoOpen((v) => !v)}>
              {L("Ekosistem", "Ecosystem")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${ecoOpen ? "rotate-180" : ""}`} />
            </button>
            {ecoOpen && (
              <div className="bc-menu">
                {entities.map((e) => (
                  <Link key={e.id} href={e.href} onClick={() => setEcoOpen(false)}>
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: e.color }} />
                    <span>
                      <span className="block text-[0.9375rem] font-bold leading-tight">{e.name}</span>
                      <span className="block text-[length:var(--fc)] text-[color:var(--ink-3)]">{lang === "id" ? e.role.id : e.role.en}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <Link key={link.nameKey} href={link.href} className="bc-nav-link">
              {t("nav." + link.nameKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div ref={accountRef} className="relative">
            {loading ? (
              <div className="hidden h-9 w-24 animate-pulse rounded-full bg-[color:var(--surface2)] sm:block" />
            ) : admin ? (
              <button onClick={() => setDropdownOpen((v) => !v)} className={accountBtn} aria-expanded={dropdownOpen}>
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">{t("nav.admin")}</span>
              </button>
            ) : customer ? (
              <button onClick={() => setDropdownOpen((v) => !v)} className={accountBtn} aria-expanded={dropdownOpen}>
                {customer.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={customer.photo_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--orange)] text-[10px] font-bold text-[color:var(--ink)]">{initials}</span>
                )}
                <span className="hidden sm:inline">{customer.name}</span>
              </button>
            ) : (
              <span className="hidden sm:block">
                <button onClick={() => setAuthModalOpen(true)} className="bc-btn bc-btn--orange bc-btn--sm">
                  <User className="h-4 w-4" />
                  {t("nav.daftarMasuk")}
                </button>
              </span>
            )}

            <AnimatePresence>
              {dropdownOpen && (admin || customer) && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-[calc(100%+0.6rem)] z-[100] w-56 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[#ffffff] shadow-[0_24px_48px_-24px_rgb(0_0_0/.3)]"
                >
                  {admin ? (
                    <>
                      <div className="border-b border-[color:var(--line)] px-4 py-3">
                        <p className="text-[length:var(--fc)] font-bold uppercase tracking-wider text-[color:var(--green-ink)]">{t("nav.admin")}</p>
                        <p className="text-[length:var(--text-sm)] text-[color:var(--ink-2)]">{admin.name}</p>
                      </div>
                      <button onClick={() => { logoutAdmin(); setDropdownOpen(false); }} className={`${menuItem} border-t border-[color:var(--line)]`}>
                        <LogOut className="h-4 w-4 text-[color:var(--ink-3)]" />
                        {t("nav.keluar")}
                      </button>
                    </>
                  ) : (
                    customer && (
                      <>
                        <div className="border-b border-[color:var(--line)] px-4 py-3">
                          <p className="text-[length:var(--fc)] text-[color:var(--ink-3)]">{t("nav.totalPoin")}</p>
                          <p className="text-[length:var(--text-2xl)] font-extrabold leading-none text-[color:var(--orange)]">{customer.total_points}</p>
                        </div>
                        <Link href="/account" onClick={() => setDropdownOpen(false)} className={menuItem}>
                          <User className="h-4 w-4 text-[color:var(--ink-3)]" />
                          {t("nav.profil")}
                        </Link>
                        <Link href="/account#points" onClick={() => setDropdownOpen(false)} className={menuItem}>
                          <Award className="h-4 w-4 text-[color:var(--ink-3)]" />
                          {t("nav.riwayatPoin")}
                        </Link>
                        <Link href="/points-store" onClick={() => setDropdownOpen(false)} className={menuItem}>
                          <Gift className="h-4 w-4 text-[color:var(--ink-3)]" />
                          {t("nav.storePoin")}
                        </Link>
                        <button onClick={() => { logout(); setDropdownOpen(false); }} className={`${menuItem} border-t border-[color:var(--line)]`}>
                          <LogOut className="h-4 w-4 text-[color:var(--ink-3)]" />
                          {t("nav.keluar")}
                        </button>
                      </>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={toggleLang} className="bc-btn bc-btn--line bc-btn--sm" aria-label={t("footer.toggleLang")}>
            <Globe className="h-4 w-4" />
            {lang.toUpperCase()}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] bg-[#ffffff] xl:hidden"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-[color:var(--line)] bg-[#ffffff] xl:hidden"
          >
            <div className="bc-wrap py-5">
              <p className="bc-label mb-3">{L("Ekosistem", "Ecosystem")}</p>
              <div className="grid grid-cols-2 gap-2">
                {entities.map((e) => (
                  <Link key={e.id} href={e.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 border border-[color:var(--line)] px-3 py-2.5 text-[length:var(--text-sm)] font-semibold">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: e.color }} />
                    <span className="leading-tight">{e.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link key={link.nameKey} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[color:var(--line)] py-3 text-[length:var(--text-base)] font-semibold">
                    {t("nav." + link.nameKey)}
                  </Link>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {admin ? (
                  <>
                    <button onClick={() => { logoutAdmin(); setIsMobileMenuOpen(false); }} className="bc-btn bc-btn--line justify-center">{t("nav.keluar")}</button>
                  </>
                ) : customer ? (
                  <>
                    <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="bc-btn bc-btn--orange justify-center">{t("header.mobileProfilPoin")}</Link>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="bc-btn bc-btn--line justify-center">{t("nav.keluar")}</button>
                  </>
                ) : (
                  <button onClick={() => { setAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="bc-btn bc-btn--orange justify-center">{t("nav.daftarMasuk")}</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </motion.header>
  );
}
