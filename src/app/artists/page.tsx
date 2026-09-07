"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Product = {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  artists: string;
};

type Artist = {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  location?: string;
};

function parseArtists(raw: string): Artist[] {
  if (Array.isArray(raw)) return raw as Artist[];
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

export default function ArtistsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  const artists = useMemo(() => {
    const map = new Map<string, { artist: Artist; products: { slug: string; title: string; image_url: string }[] }>();
    products.forEach((p) => {
      parseArtists(p.artists).forEach((a) => {
        const key = a.name || "Anonim";
        const entry = map.get(key) || { artist: a, products: [] };
        entry.products.push({ slug: p.slug, title: p.title, image_url: p.image_url });
        map.set(key, entry);
      });
    });
    return Array.from(map.entries())
      .map(([name, { artist, products }]) => ({ name, artist, products }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("artists.title")} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: springEase }}>
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-emerald-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("artists.label")}</p>
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
              {t("artists.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">{t("artists.desc")}</p>
          </motion.div>

          <div className="mt-14">
            {loading ? (
              <div className="py-20 text-center text-sm text-zinc-500">{t("products.memuat")}</div>
            ) : artists.length === 0 ? (
              <div className="py-20 text-center text-zinc-500">{t("artists.kosong")}</div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {artists.map(({ name, artist, products: artProducts }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 hover:border-white/[0.14] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {artist.photo_url ? (
                        <Image
                          src={artist.photo_url}
                          alt={name}
                          width={807}
                          height={1448}
                          className="h-24 w-20 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Palette className="h-8 w-8 text-emerald-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-serif text-[19px] leading-snug text-white">{name}</h3>
                        {artist.role && (
                          <span className="mt-1.5 inline-block rounded-full border border-[#f2d479]/20 bg-[#f2d479]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f2d479]">
                            {artist.role}
                          </span>
                        )}
                        {artist.location && (
                          <span className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-500">
                            <MapPin className="h-3 w-3" />
                            {artist.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {artist.bio && (
                      <p className="mt-4 text-sm text-zinc-400 leading-relaxed line-clamp-3">{artist.bio}</p>
                    )}

                    {artProducts.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-white/[0.05]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
                          {t("artists.karyaTerkait")} · {artProducts.length}
                        </p>
                        <div className="space-y-2">
                          {artProducts.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/products/${p.slug}`}
                              className="flex items-center gap-3 group"
                            >
                              {p.image_url ? (
                                <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden border border-white/5">
                                  <Image src={p.image_url} alt="" fill className="object-cover" />
                                </div>
                              ) : (
                                <div className="h-9 w-9 shrink-0 rounded-lg bg-zinc-900" />
                              )}
                              <span className="truncate text-sm text-zinc-300 group-hover:text-emerald-400 transition-colors">
                                {p.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-16">
            <Link href="/products" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> {t("products.kembali")}
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
