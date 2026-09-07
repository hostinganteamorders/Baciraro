"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

/**
 * scale = optical balance inside a fixed tile.
 * Wide logos (BNI/Danone) need smaller scale; padded/square logos (PLN/KKP) need larger.
 */
const PARTNERS = [
  {
    name: "Pertamina Geothermal Energy",
    detail: "PGE Lahendong",
    logo: "/partners/pertamina.png",
    scale: 1.05,
  },
  {
    name: "Danone Aqua",
    detail: "Likupang & Serawet",
    logo: "/partners/danone.png",
    scale: 0.92,
  },
  {
    name: "KKP",
    detail: "Kementerian Kelautan & Perikanan",
    logo: "/partners/kkp.png",
    scale: 1.35,
  },
  {
    name: "Kemenparekraf",
    detail: "Kementerian Pariwisata & Ekraf",
    logo: "/partners/kemenparekraf.png",
    scale: 1.08,
  },
  {
    name: "PLN",
    detail: "UID Suluttenggo",
    logo: "/partners/pln.png",
    scale: 1.28,
  },
  {
    name: "BNI",
    detail: "BNI 46 Manado",
    logo: "/partners/bni.png",
    scale: 0.88,
  },
  {
    name: "Kemenbud",
    detail: "Kementerian Kebudayaan",
    logo: "/partners/kemenbud.png",
    scale: 1.05,
  },
];

export default function PartnerMarquee() {
  const { t } = useLanguage();
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative z-10 overflow-hidden py-8 md:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-black/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-transparent to-black/25"
      />

      <div className="relative">
        <p className="mb-5 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
          {t("partnerMarquee.headline")}
        </p>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <motion.div
            className="flex w-max items-center gap-8 px-4 md:gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {items.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="group flex shrink-0 items-center gap-3"
              >
                <div className="flex h-14 w-[7.25rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-zinc-100 px-2.5 py-2 transition-transform duration-300 group-hover:scale-[1.03]">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="max-h-9 max-w-full object-contain"
                    style={{ transform: `scale(${partner.scale})` }}
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="whitespace-nowrap text-sm font-semibold text-zinc-100">
                    {partner.name}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-300">
                    {partner.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
