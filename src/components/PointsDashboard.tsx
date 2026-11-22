"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, QrCode } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface Customer {
  id: number;
  name: string;
  photo_url: string;
  total_points: number;
}

const RANK_COLORS = ["var(--orange)", "var(--green)", "var(--ink)"];

export default function PointsDashboard() {
  const { t, lang } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<Customer[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetch("/api/customer/points-stats")
      .then((r) => r.json())
      .then((d) => {
        setLeaderboard(d.leaderboard || []);
        setTotalPoints(d.totalPointsDistributed || 0);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="poin" className="bc-section scroll-mt-20 border-t border-[color:var(--line)]">
      <div className="bc-wrap bc-split">
        <div className="bc-sticky">
          <span className="bc-label"><b>05</b>{t("points.label")}</span>
          <h2 className="bc-t-title mt-[var(--s2)]" data-a="orange">
            {t("points.title")} <em>{t("points.titleItalic")}</em>
          </h2>
          <p className="bc-t-sub mt-[var(--s2)]">{t("points.subtitle", { poin: totalPoints.toLocaleString() })}</p>
          <Link href="/account#points" className="bc-btn bc-btn--orange mt-[var(--s3)]">
            <QrCode className="h-4 w-4" />
            {lang === "id" ? "Scan & kumpulkan poin" : "Scan & collect points"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          {leaderboard.length === 0 ? (
            <p className="bc-t-desc border-t border-[color:var(--line)] py-[var(--s3)]">{t("points.loading")}</p>
          ) : (
            <ol>
              {leaderboard.map((customer, i) => {
                const rank = i + 1;
                const initials = customer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                return (
                  <motion.li
                    key={customer.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-[var(--s2)] border-t border-[color:var(--line)] py-[var(--s2)] last:border-b"
                  >
                    <span className="bc-t-sub bc-t-num w-12 shrink-0" style={{ color: RANK_COLORS[i] ?? "var(--ink-3)" }}>
                      {String(rank).padStart(2, "0")}
                    </span>
                    {customer.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={customer.photo_url} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--orange-50)] text-sm font-bold text-[color:var(--orange-ink)]">{initials}</span>
                    )}
                    <span className="min-w-0 flex-1 truncate text-[length:var(--f0)] font-bold">{customer.name}</span>
                    <span className="text-right">
                      <span className="bc-t-sub bc-t-num block !text-[color:var(--ink)]">{customer.total_points}</span>
                      <span className="bc-t-cap uppercase tracking-wider">{t("points.poin")}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
