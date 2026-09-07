"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Medal, Crown, Award } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  photo_url: string;
  total_points: number;
}

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const RANK_ICONS = [Crown, Medal, Award];

export default function PointsDashboard() {
  const { t } = useLanguage();
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
    <section className="relative z-10 py-20 lg:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            {t("points.label")}
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("points.title")}{" "}
            <span className="font-serif italic text-amber-300">{t("points.titleItalic")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {t("points.subtitle", { poin: totalPoints.toLocaleString() })}
          </p>
        </motion.div>

        <div className="mt-12 mx-auto max-w-2xl">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-sm">{t("points.loading")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((customer, i) => {
                const rank = i + 1;
                const isPodium = rank <= 3;
                const RankIcon = RANK_ICONS[i] || null;
                const initials = customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-2xl border flex items-center gap-4 px-5 py-4 transition-all ${
                      isPodium
                        ? "border-amber-500/20 bg-amber-500/5"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                      {isPodium ? (
                        <RankIcon
                          className="h-6 w-6"
                          style={{ color: RANK_COLORS[i] }}
                        />
                      ) : (
                        <span className="text-sm font-bold text-zinc-600">{rank}</span>
                      )}
                    </div>

                    {customer.photo_url ? (
                      <img
                        src={customer.photo_url}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-black flex-shrink-0">
                        {initials}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {customer.name}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-amber-400 tabular-nums">
                        {customer.total_points}
                      </p>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider">{t("points.poin")}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
