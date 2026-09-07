"use client";

import { motion } from "framer-motion";
import { trackRecordData } from "@/lib/track-record-data";
import { useLanguage } from "@/lib/i18n/context";
import { Users, ShieldCheck, Lightbulb, Handshake, Cog, GraduationCap } from "lucide-react";

const roleIcons: Record<string, typeof Users> = {
  "Mitra Pelaksana": Handshake,
  "Mitra": Handshake,
  "Fasilitator": Cog,
  "Fasilitator Teknologi": Cog,
  "Pendamping": Users,
  "Pendamping Komunitas": Users,
  "Pendukung": ShieldCheck,
  "Inisiator": Lightbulb,
  "Developer Teknologi": Cog,
  "Produsen": Cog,
  "Pengelola": ShieldCheck,
  "Eksekutor": Cog,
  "Peserta": GraduationCap,
  "Peserta Studi": GraduationCap,
  "Observer": GraduationCap,
  "Narasumber": Users,
  "Advokasi": ShieldCheck,
  "Tuan Rumah": Handshake,
  "Anggota": Users,
};

interface RoleCount {
  role: string;
  count: number;
}

export function BaciraroRoleSection() {
  const { t } = useLanguage();
  const roleMap = new Map<string, number>();
  trackRecordData.forEach((year) => {
    year.activities.forEach((a) => {
      if (a.role) {
        roleMap.set(a.role, (roleMap.get(a.role) || 0) + 1);
      }
    });
  });

  const roles: RoleCount[] = Array.from(roleMap.entries())
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="relative py-20 px-6 lg:px-8 bg-zinc-950/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.03),_transparent_55%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("trackRecord.peran")}
          </p>
          <h2 className="mt-5 text-3xl font-normal leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("trackRecord.peranTitle")}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg max-w-3xl">
            {t("trackRecord.peranDesc")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ role, count }, i) => {
            const Icon = roleIcons[role] || Users;
            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-4 hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="inline-flex shrink-0 rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t("trackRecord.role." + role.toLowerCase().replace(/ /g, '_'))}</p>
                  <p className="text-xs text-zinc-500">{count} {t("trackRecord.kegiatan")}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
