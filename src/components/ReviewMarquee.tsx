"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  buyer_name: string;
  review_text: string;
  review_rating: number;
  product_slug: string;
  product_title: string;
  product_image: string;
}

export default function ReviewMarquee() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.ok && res.json())
      .then((data) => data?.reviews && setReviews(data.reviews))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.scrollWidth / 2);
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-12">
      <div className="mb-8 px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
          {t("reviews.label")}
        </p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          ref={containerRef}
          animate={width ? { x: [0, -width] } : undefined}
          transition={{ repeat: Infinity, duration: width ? width / 40 : 40, ease: "linear" }}
          className="flex shrink-0 gap-6"
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="w-[340px] shrink-0 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-5 flex flex-col items-center text-center"
            >
              {r.product_image ? (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 mb-4 shrink-0">
                  <Image src={r.product_image} alt={r.product_title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-zinc-800 mb-4 shrink-0" />
              )}
              <p className="text-sm text-zinc-200 font-medium mb-0.5">{r.buyer_name}</p>
              {r.product_title && (
                <p className="text-[10px] text-zinc-600 mb-3 truncate max-w-full">{r.product_title}</p>
              )}
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5" fill={s <= r.review_rating ? "#fbbf24" : "none"} stroke={s <= r.review_rating ? "#fbbf24" : "#52525b"} />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">&ldquo;{r.review_text}&rdquo;</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
