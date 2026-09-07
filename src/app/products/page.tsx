"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Recycle, Leaf, Palette, Code2, Paintbrush, Cpu, MessageCircle, Search, ArrowDownWideNarrow, Tags } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { formatRupiah, formatMinutes, variantPrice } from "@/lib/pricing";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const priceRanges = [
  { key: "all", min: 0, max: Infinity },
  { key: "under50", min: 0, max: 50000 },
  { key: "50to150", min: 50000, max: 150000 },
  { key: "150to300", min: 150000, max: 300000 },
  { key: "over300", min: 300000, max: Infinity },
];

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  story: string;
  materials: string;
  total_plastic_kg: number;
  image_url: string;
  gallery: string;
  weight_g?: number | null;
  print_time_min?: number | null;
  variants?: unknown;
  totalKg?: number;
};

const categories = [
  { key: "all", label: "", icon: null },
  { key: "plastic", label: "", icon: Recycle },
  { key: "organic", label: "", icon: Leaf },
  { key: "craft", label: "", icon: Palette },
  { key: "digital", label: "", icon: Code2 },
  { key: "art", label: "", icon: Paintbrush },
  { key: "3dprint", label: "", icon: Cpu },
];

const categoryColors: Record<string, string> = {
  plastic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  organic: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  craft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  digital: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  art: "bg-[#f2d479]/10 text-[#f2d479] border-[#f2d479]/20",
  "3dprint": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function priceFromVariants(raw: unknown): number | null {
  if (!raw) return null;
  let variants: { weight_g?: number }[] = [];
  if (Array.isArray(raw)) variants = raw as { weight_g?: number }[];
  else if (typeof raw === "string") {
    try {
      variants = JSON.parse(raw) as { weight_g?: number }[];
    } catch {
      variants = [];
    }
  }
  const weights = variants.map((v) => v.weight_g).filter((w): w is number => typeof w === "number" && w > 0);
  return weights.length ? variantPrice(Math.min(...weights)) : null;
}

const priceRangeLabels: Record<string, string> = {
  all: "all",
  under50: "≤ Rp 50rb",
  "50to150": "Rp 50–150rb",
  "150to300": "Rp 150–300rb",
  over300: "Rp 300rb+",
};

export default function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "name" | "kg" | "price-asc" | "price-desc">("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  const filtered = (products || [])
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.story || "").toLowerCase().includes(q)
      );
    })
    .filter((p) => {
      const range = priceRanges.find((r) => r.key === priceRange) || priceRanges[0];
      const price = p.variants != null ? priceFromVariants(p.variants) : (p.weight_g != null ? variantPrice(p.weight_g) : null);
      if (price == null) return true;
      return price >= range.min && price < range.max;
    })
    .map((p) => {
      const materials = typeof p.materials === "string" ? JSON.parse(p.materials || "[]") : (p.materials || []);
      const totalKg = materials.reduce((sum: number, m: { amount: number }) => sum + m.amount, 0);
      return { ...p, totalKg };
    })
    .sort((a, b) => {
      if (a.slug === "custom") return -1;
      if (b.slug === "custom") return 1;
      switch (sort) {
        case "name":
          return a.title.localeCompare(b.title);
        case "kg":
          return b.totalKg - a.totalKg;
        case "oldest":
          return a.id - b.id;
        case "price-asc":
          return (priceFromVariants(a.variants) ?? Infinity) - (priceFromVariants(b.variants) ?? Infinity);
        case "price-desc":
          return (priceFromVariants(b.variants) ?? -Infinity) - (priceFromVariants(a.variants) ?? -Infinity);
        default:
          return b.id - a.id;
      }
    });

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
      <Header subtitle={t("products.title")} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: springEase }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("products.title")}
          </p>
          <h1 className="mt-6 font-serif text-[clamp(40px,6vw,72px)] font-normal leading-[1.08] tracking-[-0.04em] text-white">
            {t("products.headline")}<br /><span className="text-emerald-400">{t("products.headlineHighlight")}</span>
          </h1>
          <p className="mt-4 max-w-[600px] text-[15px] text-zinc-300 leading-relaxed">
            {t("products.subtitle")}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: springEase }} className="mt-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.key
                  ? "bg-emerald-500 text-black"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
              {cat.key === "all" ? t("products.semua") : t("products." + cat.key)}
            </button>
          ))}
        </motion.div>

        {/* Search & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("products.cari")}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="h-4 w-4 text-zinc-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 focus:outline-none focus:border-emerald-500/40 cursor-pointer appearance-none"
            >
              <option value="newest" className="bg-zinc-900 text-zinc-300">{t("products.sortTerbaru")}</option>
              <option value="oldest" className="bg-zinc-900 text-zinc-300">{t("products.sortTerlama")}</option>
              <option value="name" className="bg-zinc-900 text-zinc-300">{t("products.sortNama")}</option>
              <option value="kg" className="bg-zinc-900 text-zinc-300">{t("products.sortKg")}</option>
              <option value="price-asc" className="bg-zinc-900 text-zinc-300">{t("products.sortHargaTerendah")}</option>
              <option value="price-desc" className="bg-zinc-900 text-zinc-300">{t("products.sortHargaTertinggi")}</option>
            </select>
          </div>
        </motion.div>

        {/* Price Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: springEase }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            <Tags className="h-3 w-3" />
            {t("products.filterHarga")}
          </span>
          {priceRanges.map((r) => (
            <button
              key={r.key}
              onClick={() => setPriceRange(r.key)}
              className={`rounded-full px-4 py-2 text-[11px] font-bold transition-all ${
                priceRange === r.key
                  ? "bg-emerald-500 text-black"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              {priceRangeLabels[r.key]}
            </button>
          ))}
        </motion.div>

        {/* Result count */}
        {!loading && (
          <p className="mt-4 text-xs text-zinc-500">
            {t("products.jumlahProduk", { count: filtered.length })}
          </p>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="mt-16 text-center text-zinc-500 text-sm">{t("products.memuat")}</div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 text-center text-zinc-500 text-sm">{t("products.kosong")}</div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => {
              const totalKg = product.totalKg || 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: springEase }}
                >
                  {product.slug === "custom" ? (
                    <a
                      href={`https://wa.me/6288212835350?text=${encodeURIComponent(t("products.customWaMessage", { name: product.title }))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/[0.03] backdrop-blur overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-zinc-900/50 relative overflow-hidden">
                        <Image src={product.image_url} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border bg-emerald-500 text-black border-emerald-500">
                            {t("products.custom")}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-[10px] font-bold text-emerald-300">
                            <MessageCircle className="h-3 w-3" />
                            {t("products.customCta")}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-[17px] text-white group-hover:text-emerald-400 transition-colors">{product.title}</h3>
                        <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">{product.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(`https://wa.me/6288212835350?text=${encodeURIComponent(t("products.customWaMessage", { name: product.title }))}`, '_blank', 'noopener');
                            }}
                            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-black hover:bg-emerald-400 transition-all"
                          >
                            <MessageCircle className="h-3 w-3" />
                            {t("products.pesan")}
                          </button>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1"
                    >
                    <div className="aspect-[16/10] bg-zinc-900/50 relative overflow-hidden">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Recycle className="h-10 w-10 text-zinc-700" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${categoryColors[product.category] || categoryColors.craft}`}>
                          {t("products." + product.category) || product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      {product.weight_g != null && (
                        <div className="mb-3 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            ±{product.weight_g} g · PLA
                          </span>
                          {product.print_time_min != null && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-zinc-300">
                              ±{formatMinutes(product.print_time_min)}
                            </span>
                          )}
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold text-emerald-300">
                            {t("products.dari")} {formatRupiah(variantPrice(product.weight_g))}
                          </span>
                        </div>
                      )}
                      <h3 className="font-serif text-[17px] text-white group-hover:text-emerald-400 transition-colors">{product.title}</h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        {product.total_plastic_kg > 0 && (
                          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {t("products.bahanTerselamatkan", { kg: totalKg })}
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(`https://wa.me/6288212835350?text=${encodeURIComponent(t("products.waMessage", { title: product.title }))}`, '_blank', 'noopener');
                          }}
                          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                        >
                          <MessageCircle className="h-3 w-3" />
                          {t("products.pesan")}
                        </button>
                      </div>
                    </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
      </div>
    </main>
  );
}
