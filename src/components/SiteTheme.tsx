"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Menyalakan sistem desain editorial (putih bersih, Open Sans, oranye + hijau) di seluruh situs
 * kecuali /creative, yang punya kulit kertas sendiri. Skrip di <head> menerapkan hal yang sama
 * sebelum halaman tampil; komponen ini menjaganya saat berpindah halaman tanpa muat ulang.
 */
export default function SiteTheme() {
  const path = usePathname() ?? "";
  useEffect(() => {
    const creative = path === "/creative" || path.startsWith("/creative/");
    const el = document.documentElement;
    if (creative) {
      delete el.dataset.site;
      let theme = "dark";
      try {
        theme = localStorage.getItem("bc-theme") === "light" ? "light" : "dark";
      } catch {
        /* abaikan: penyimpanan tidak tersedia */
      }
      el.dataset.theme = theme;
    } else {
      el.dataset.site = "brand";
      el.dataset.theme = "light";
    }
  }, [path]);
  return null;
}
