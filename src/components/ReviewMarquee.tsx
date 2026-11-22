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
    <section className="relative overflow-hidden border-t border-[color:var(--line)] py-[var(--s5)]">
      <div className="bc-wrap mb-[var(--s4)]">
        <span className="bc-label">{t("reviews.label")}</span>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          ref={containerRef}
          animate={width ? { x: [0, -width] } : undefined}
          transition={{ repeat: Infinity, duration: width ? width / 40 : 40, ease: "linear" }}
          className="flex shrink-0 gap-[var(--s3)]"
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="flex w-[340px] shrink-0 flex-col border-t-[3px] pt-[var(--s2)]" style={{ borderColor: i % 2 ? "var(--green)" : "var(--orange)" }}>
              <div className="mb-3 flex items-center gap-3">
                {r.product_image ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[color:var(--surface2)]">
                    <Image src={r.product_image} alt={r.product_title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-14 w-14 shrink-0 bg-[color:var(--surface2)]" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[length:var(--f0)] font-bold">{r.buyer_name}</p>
                  {r.product_title && <p className="bc-t-cap truncate">{r.product_title}</p>}
                </div>
              </div>
              <div className="mb-3 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4" fill={s <= r.review_rating ? "var(--orange)" : "none"} stroke={s <= r.review_rating ? "var(--orange)" : "#c9c9c9"} />
                ))}
              </div>
              <p className="bc-t-sub !text-[color:var(--ink)]">&ldquo;{r.review_text}&rdquo;</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
