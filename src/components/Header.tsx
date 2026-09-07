"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Award, LayoutDashboard, Globe, Gift } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useAdminAuth } from "@/lib/admin-auth-context";
import { useLanguage } from "@/lib/i18n/context";
import AuthModal from "./AuthModal";

const navLinks = [
  { nameKey: "home", href: "/" },
  { nameKey: "about", href: "/about" },
  { nameKey: "produk", href: "/products" },
  { nameKey: "seniman", href: "/artists" },
  { nameKey: "trackRecord", href: "/track-record" },
  { nameKey: "leadership", href: "/leadership" },
  { nameKey: "creativeStudio", href: "/creative-studio" },
  { nameKey: "creative", href: "/creative" },
  { nameKey: "contact", href: "/contact" },
];

export default function Header(_props?: { subtitle?: string }) {
  const { customer, loading, logout } = useCustomerAuth();
  const { admin, logoutAdmin } = useAdminAuth();
  const { t, lang, toggleLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ right: 0, top: 0 });
  const lastScrollY = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateDropdownPos = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ right: window.innerWidth - rect.right, top: rect.bottom + 8 });
    }
  };

  const initials = customer?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2"
    >
      <div className="mx-auto max-w-7xl rounded-3xl md:rounded-full border border-white/5 bg-[#0c0f0c]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.06),_transparent_75%)] pointer-events-none" />
        <div className="bg-noise absolute inset-0 opacity-[0.03] pointer-events-none" />

        <div className="flex items-center justify-between px-6 py-3.5 relative z-10">
          <Link href="/" className="transition-colors hover:text-white" aria-label={t("header.brandName")}>
            <Image
              src="/Baciraro cap.png"
              alt={t("footer.baciraroLogoAlt")}
              width={52}
              height={52}
              className="object-contain transition-transform hover:scale-105 duration-300"
            />
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 border text-zinc-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/5"
              >
                {t("nav." + link.nameKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {loading ? (
              <div className="hidden sm:block h-9 w-9 rounded-full border border-white/10 bg-white/5 animate-pulse" />
            ) : admin ? (
              <button
                ref={buttonRef}
                onClick={() => { updateDropdownPos(); setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">{t("nav.admin")}</span>
              </button>
            ) : customer ? (
              <button
                ref={buttonRef}
                onClick={() => { updateDropdownPos(); setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 duration-300"
              >
                {customer.photo_url ? (
                  <img src={customer.photo_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <span className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black">
                    {initials}
                  </span>
                )}
                <span className="hidden sm:inline">{customer.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white transition-all hover:scale-102 hover:bg-white/10 hover:border-white/20 duration-300"
              >
                <User className="h-3 w-3 text-emerald-400" />
                {t("nav.daftarMasuk")}
              </button>
            )}

            <button
              onClick={toggleLang}
              className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-[10px] font-bold uppercase tracking-wider"
              aria-label={t("footer.toggleLang")}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="ml-0.5">{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-all focus:outline-none"
              aria-label={t("nav.toggleMenu")}
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
              className="md:hidden border-t border-white/5 bg-[#0c0f0c]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-2 relative z-10 will-change-[transform,opacity]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.nameKey}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl transition-all border text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                >
                  {t("nav." + link.nameKey)}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-4 mt-2">
                {admin ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/creative-studio"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                    >
                      {t("header.mobileCreativeStudio")}
                    </Link>
                    <button
                      onClick={() => { logoutAdmin(); setIsMobileMenuOpen(false); }}
                      className="py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl border border-white/5 text-zinc-400"
                    >
                      {t("nav.keluar")}
                    </button>
                  </div>
                ) : customer ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                    >
                      {t("header.mobileProfilPoin")}
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl border border-white/5 text-zinc-400"
                    >
                      {t("nav.keluar")}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  >
                    {t("nav.daftarMasuk")}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dropdownOpen && (admin || customer) && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{ position: "fixed", right: dropdownPos.right, top: dropdownPos.top }}
            className="w-48 rounded-2xl border border-white/10 bg-[#0c0f0c] backdrop-blur-xl shadow-2xl overflow-hidden z-[100]"
          >
            {admin ? (
              <>
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs text-emerald-400 font-semibold">{t("nav.admin")}</p>
                  <p className="text-sm text-zinc-400">{admin.name}</p>
                </div>
                <Link
                  href="/creative-studio"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <LayoutDashboard className="h-4 w-4 text-zinc-500" />
                  {t("nav.creativeStudio")}
                </Link>
                <button
                  onClick={() => { logoutAdmin(); setDropdownOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-300 hover:text-red-400 hover:bg-white/5 transition-all border-t border-white/5"
                >
                  <LogOut className="h-4 w-4 text-zinc-500" />
                  {t("nav.keluar")}
                </button>
              </>
            ) : customer && (
              <>
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs text-zinc-400">{t("nav.totalPoin")}</p>
                  <p className="text-lg font-bold text-emerald-400">{customer.total_points}</p>
                </div>
                <Link
                  href="/account"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <User className="h-4 w-4 text-zinc-500" />
                  {t("nav.profil")}
                </Link>
                <Link
                  href="/account#points"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Award className="h-4 w-4 text-zinc-500" />
                  {t("nav.riwayatPoin")}
                </Link>
                <Link
                  href="/points-store"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Gift className="h-4 w-4 text-zinc-500" />
                  {t("nav.storePoin")}
                </Link>
                <button
                  onClick={() => { logout(); setDropdownOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-300 hover:text-red-400 hover:bg-white/5 transition-all border-t border-white/5"
                >
                  <LogOut className="h-4 w-4 text-zinc-500" />
                  {t("nav.keluar")}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </motion.header>
  );
}
