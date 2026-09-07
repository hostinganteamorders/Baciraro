"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Recycle, Leaf, Palette, Code2, Paintbrush, Cpu, QrCode, Package, ArrowLeft, Trash2, Star, Heart, MessageCircle, Printer } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRModal from "@/components/QRModal";
import { useAdminAuth } from "@/lib/admin-auth-context";
import { useLanguage } from "@/lib/i18n/context";
import { formatRupiah, formatMinutes, parseVariants, variantPrice, PRICE_PER_GRAM } from "@/lib/pricing";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  artists: string;
  weight_g?: number | null;
  print_time_min?: number | null;
  variants?: unknown;
};

type Material = {
  name: string;
  amount: number;
  unit: string;
};

type Artist = {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
};

const categoryIcons: Record<string, typeof Recycle> = {
  plastic: Recycle,
  organic: Leaf,
  craft: Palette,
  digital: Code2,
  art: Paintbrush,
  "3dprint": Cpu,
};

const categoryAccent: Record<string, string> = {
  plastic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  organic: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  craft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  digital: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  art: "bg-[#f2d479]/10 text-[#f2d479] border-[#f2d479]/20",
  "3dprint": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const { admin } = useAdminAuth();
  const { t } = useLanguage();
  const [notFound, setNotFound] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [hasModel, setHasModel] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);
  const [viewMode, setViewMode] = useState<"image" | "3d">("image");
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    let mounted = true;
    import("@google/model-viewer")
      .then(() => mounted && setViewerReady(true))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setProduct(data.product))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
    fetch(`/api/reviews/${slug}`)
      .then((res) => res.ok && res.json())
      .then((data) => data?.reviews && setReviews(data.reviews))
      .catch(() => {});
    fetch(`/models/${slug}.glb`, { method: "HEAD" })
      .then((res) => setHasModel(res.ok))
      .catch(() => {});
  }, [slug]);

  const openQR = async () => {
    const res = await fetch("/api/qr/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_slug: slug }),
    });
    if (res.ok) {
      const data = await res.json();
      setQrUrl(data.claimUrl || data.claim_url);
      setShowQR(true);
    }
  };

  if (loading) {
    return (
      <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
        <div aria-hidden="true" className="page-bg" />
        <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("products.title")} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center text-zinc-500 text-sm">{t("products.memuat")}</div>
        <Footer />
        </div>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
        <div aria-hidden="true" className="page-bg" />
        <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("products.title")} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <Package className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg">{t("products.tidakDitemukan")}</p>
          <Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t("products.kembali")}
          </Link>
        </div>
        <Footer />
        </div>
      </main>
    );
  }

  const materials: Material[] = Array.isArray(product.materials) ? product.materials : JSON.parse(product.materials || "[]");
  const artists: Artist[] = Array.isArray(product.artists) ? product.artists : (() => {
    try {
      return JSON.parse(product.artists || "[]");
    } catch {
      return [];
    }
  })();
  const gallery: string[] = Array.isArray(product.gallery) ? product.gallery : (() => {
    try {
      return JSON.parse(product.gallery || "[]");
    } catch {
      return [];
    }
  })();
  const allImages = [product.image_url, ...gallery].filter(Boolean);
  const totalKg = materials.reduce((sum, m) => sum + m.amount, 0);
  const Icon = categoryIcons[product.category] || Package;
  const allVariants = parseVariants(product.variants);
  const printVariants = allVariants;
  const activeVariant = printVariants[Math.min(selectedVariant, Math.max(printVariants.length - 1, 0))] ?? null;
  const hasPricing = product.weight_g != null;
  const displayWeight = activeVariant?.weight_g ?? product.weight_g;
  const displayMinutes = activeVariant?.minutes ?? product.print_time_min;

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
      <Header subtitle={t("products.title")} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: springEase }}>
          <Link href="/products" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t("products.kembali")}
          </Link>
        </motion.div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Images */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: springEase }}>
            <div className="flex items-center justify-between mb-3">
              {hasModel && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("image")}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                      viewMode === "image" ? "bg-emerald-500 text-black" : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {t("products.foto")}
                  </button>
                  <button
                    onClick={() => setViewMode("3d")}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                      viewMode === "3d" ? "bg-emerald-500 text-black" : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {t("products.tampilan3d")}
                  </button>
                </div>
              )}
            </div>
            <div className="rounded-[2rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur overflow-hidden aspect-[4/3] relative">
              {viewMode === "3d" && hasModel && viewerReady ? (
                <model-viewer
                  src={`/models/${product.slug}.glb`}
                  alt={product.title}
                  camera-controls
                  auto-rotate
                  rotation-per-second="18deg"
                  shadow-intensity="1"
                  exposure="1.1"
                  camera-orbit="0deg 78deg 105%"
                  interaction-prompt-threshold="2000"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : allImages.length > 0 && allImages[selectedImage] ? (
                <Image
                  src={allImages[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-16 w-16 text-zinc-700" />
                </div>
              )}
            </div>
            {viewMode === "image" && allImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 rounded-xl border overflow-hidden w-20 h-16 relative transition-all ${
                      i === selectedImage ? "border-emerald-500/50 ring-1 ring-emerald-500/30" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: springEase }}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryAccent[product.category] || categoryAccent.craft}`}>
                <Icon className="h-3.5 w-3.5" />
                {t("products." + product.category) || product.category}
              </span>
            </div>

            <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
              {product.title}
            </h1>
            <p className="mt-4 text-[15px] text-zinc-300 leading-relaxed">{product.description}</p>

            {/* Price & Variants */}
            {hasPricing && (
              <div className="mt-6 rounded-[1.5rem] border border-emerald-500/10 bg-emerald-500/[0.03] backdrop-blur p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    ±{displayWeight} g · PLA
                  </span>
                  {displayMinutes != null && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-zinc-300">
                      ±{formatMinutes(displayMinutes)}
                    </span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-500">
                    {t("products.perGram")} {formatRupiah(PRICE_PER_GRAM)}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                      {printVariants.length > 1 ? t("products.hargaMulai") : t("products.harga")}
                    </p>
                    <p className="mt-1 font-serif text-[32px] leading-none text-white">
                      {displayWeight != null ? formatRupiah(variantPrice(displayWeight)) : "—"}
                    </p>
                  </div>
                  {printVariants.length > 1 && (
                    <p className="text-right text-[11px] text-zinc-500 max-w-[180px]">
                      {t("products.pilihVarian")}
                    </p>
                  )}
                </div>

                {printVariants.length > 1 && (
                  <div className="mt-5 flex flex-col gap-2">
                    {printVariants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(i)}
                        className={`flex items-center justify-between gap-3 rounded-[1rem] border px-4 py-3 text-left transition-all ${
                          i === selectedVariant
                            ? "border-emerald-500/40 bg-emerald-500/10"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-white truncate">{v.label}</p>
                          <p className="mt-0.5 text-[11px] text-zinc-500">
                            ±{v.weight_g} g · PLA
                            {v.minutes ? ` · ±${formatMinutes(v.minutes)}` : ""}
                          </p>
                        </div>
                        <span className="shrink-0 text-[13px] font-bold text-emerald-300">
                          {formatRupiah(variantPrice(v.weight_g))}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Story */}
            {product.story && (
              <div className="mt-8 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 mb-3">{t("products.ceritaProduk")}</p>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{product.story}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              {admin && (
                <>
                  <button
                    onClick={openQR}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4"
                  >
                    <QrCode className="h-5 w-5 text-emerald-400" />
                    {t("products.lihatQR")}
                  </button>
                  <Link
                    href={`/products/${slug}/qr-sheets`}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:gap-4"
                  >
                    <Printer className="h-5 w-5 text-emerald-400" />
                    {t("products.cetak50QR")}
                  </Link>
                </>
              )}
              <a
                href={`https://wa.me/6288212835350?text=${encodeURIComponent(
                  t("products.waMessage", {
                    title: product.title,
                    variant: activeVariant?.label ? ` - ${activeVariant.label}` : "",
                    price: displayWeight != null ? formatRupiah(variantPrice(displayWeight)) : "",
                  })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-bold text-black transition-all hover:gap-4"
              >
                <MessageCircle className="h-5 w-5" />
                {displayWeight != null ? `${t("products.pesanWA")} · ${formatRupiah(variantPrice(displayWeight))}` : t("products.pesanWA")}
              </a>
            </div>
          </motion.div>
        </div>

        {/* About the Artists */}
        {product.category !== "3dprint" && artists.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
              <Palette className="h-4 w-4 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.tentangSeniman")}</p>
            </div>

            <div className={`grid gap-4 ${artists.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {artists.map((artist, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 transition-all hover:border-white/[0.12]">
                  {artist.photo_url ? (
                    <Image
                      src={artist.photo_url}
                      alt={artist.name}
                      width={807}
                      height={1448}
                      className="h-auto w-44 shrink-0 self-center sm:self-start sm:w-56"
                    />
                  ) : (
                    <div className="h-20 w-20 shrink-0 self-center sm:self-start rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Palette className="h-8 w-8 text-emerald-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-serif text-[20px] text-white">{artist.name}</h3>
                    {artist.role && (
                      <span className="mt-1 inline-block rounded-full border border-[#f2d479]/20 bg-[#f2d479]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f2d479]">
                        {artist.role}
                      </span>
                    )}
                    {artist.bio && (
                      <p className="mt-3 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{artist.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Material Breakdown */}
        {materials.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
              <Trash2 className="h-4 w-4 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.materialBreakdown")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((material, i) => {
                const pct = totalKg > 0 ? Math.round((material.amount / totalKg) * 100) : 0;
                return (
                  <div key={i} className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 transition-all hover:border-white/[0.12]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{material.name}</p>
                      <span className="text-xs text-emerald-400 font-semibold">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-3 font-serif text-[22px] text-white">
                      {material.amount} <span className="text-sm text-zinc-500 font-sans">{material.unit}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Total Impact Card */}
            <div className="mt-6 rounded-[1.5rem] border border-emerald-500/10 bg-emerald-500/[0.03] backdrop-blur p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.totalBahan")}</p>
                  <p className="font-serif text-[28px] text-white mt-1">{totalKg} <span className="text-sm text-zinc-500 font-sans">{t("products.unitKg")}</span></p>
                </div>
                {product.total_plastic_kg > 0 && (
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f87171]">{t("products.plastikDialihkan")}</p>
                    <p className="font-serif text-[28px] text-[#f87171] mt-1">{product.total_plastic_kg} <span className="text-sm text-zinc-500 font-sans">{t("products.unitKg")}</span></p>
                  </div>
                )}
              </div>

              {product.total_plastic_kg > 0 && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/[0.07] bg-white/[0.02] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("products.setaraBotol")}</p>
                    <p className="mt-1 font-serif text-[24px] text-emerald-400">
                      {Math.round(product.total_plastic_kg / 0.03).toLocaleString()}
                      <span className="text-sm text-zinc-500 font-sans"> {t("products.botol")}</span>
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-white/[0.07] bg-white/[0.02] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("products.hindariCO2")}</p>
                    <p className="mt-1 font-serif text-[24px] text-emerald-400">
                      {(product.total_plastic_kg * 3).toLocaleString()}
                      <span className="text-sm text-zinc-500 font-sans"> kg CO₂</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05] mb-8">
              <Heart className="h-4 w-4 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("products.reviewPelanggan")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5" fill={s <= r.review_rating ? "#fbbf24" : "none"} stroke={s <= r.review_rating ? "#fbbf24" : "#52525b"} />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 mb-3 leading-relaxed">&ldquo;{r.review_text}&rdquo;</p>
                  <p className="text-xs text-zinc-500">{r.buyer_name}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <QRModal open={showQR} onClose={() => setShowQR(false)} url={qrUrl} title={product.title} />
      <Footer />
      </div>
    </main>
  );
}
