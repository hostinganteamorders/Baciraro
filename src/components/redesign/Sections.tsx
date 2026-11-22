"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, QrCode } from "lucide-react";
import { audiences, cases, entities, flow, metrics, partners, trail, WA } from "@/components/redesign/content";
import { CountUp, Flake, SectionHead, useTx } from "@/components/redesign/ui";
import { getRecap, recapPhotoUrl } from "@/lib/creative-projects/recaps";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
function useRise() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.7, delay, ease } };
}

/* ───────────── 1. HERO — judul raksasa tipis + kata kunci tebal berwarna (Thryve, Bumiterra) ───────────── */
export function RxHero() {
  const { pick } = useTx();
  const rise = useRise();
  const stats = [
    { v: 1200, s: "+", l: pick("ton sampah terkelola", "tons of waste managed"), c: "var(--orange)" },
    { v: 80, s: "+", l: pick("komunitas aktif", "active communities"), c: "var(--green)" },
    { v: 25, s: "+", l: pick("proyek digital", "digital projects"), c: "var(--ink)" },
  ];
  return (
    <section id="top" className="relative overflow-hidden">
      <Flake c="var(--orange)" w="9rem" h="3rem" x="74%" y="3rem" r={-28} className="hidden lg:block" />
      <Flake c="var(--green)" w="6.5rem" h="2.2rem" x="86%" y="8.5rem" r={36} className="hidden lg:block" />
      <Flake c="var(--gold)" w="4rem" h="1.4rem" x="80%" y="12rem" r={-12} className="hidden lg:block" />
      <div className="bc-wrap relative pb-[var(--s5)] pt-[var(--s4)] lg:pt-[var(--s5)]">
        <motion.span {...rise()} className="bc-label">
          <b>●</b>
          {pick("Ekosistem Circular Economy · Sulawesi Utara", "Circular Economy Ecosystem · North Sulawesi")}
        </motion.span>
        <motion.h1 {...rise(0.08)} className="bc-t-hero mt-[var(--s3)] max-w-[14ch]">
          {pick("Dari sampah,", "From waste,")}
          <br />
          {pick("jadi", "to")} <em>{pick("dampak.", "impact.")}</em>
        </motion.h1>

        <div className="bc-split bc-split--rev mt-[var(--s4)] items-start lg:!grid-cols-[1fr_1fr]">
          <motion.p {...rise(0.16)} className="bc-t-sub max-w-[30ch]">
            {pick("Satu ekosistem dari pemilahan sampai pelacakan dampak.", "One ecosystem from sorting to impact tracking.")}
          </motion.p>
          <motion.div {...rise(0.22)}>
            <p className="bc-t-desc">
              {pick(
                "Baciraro menghubungkan edukasi, daur ulang, pemberdayaan masyarakat, karya kreatif, dan pelacakan digital, supaya setiap kilogram sampah punya jejak dampak yang bisa diukur.",
                "Baciraro connects education, recycling, community empowerment, creative work and digital tracking, so every kilogram of waste leaves a measurable trace of impact."
              )}
            </p>
            <div className="mt-[var(--s3)] flex flex-wrap gap-3">
              <Link href="/contact" className="bc-btn bc-btn--orange">
                {pick("Ajak kerja sama", "Work with us")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/account#points" className="bc-btn bc-btn--line">
                <QrCode className="h-4 w-4" />
                {pick("Scan & kumpulkan poin", "Scan & collect points")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* foto 1 : 1,618 + kolom angka 38,2 % */}
        <div className="bc-split bc-split--rev mt-[var(--s5)] items-stretch">
          <motion.figure {...rise(0.1)}>
            <div className="bc-photo aspect-[1.618/1]">
              <Image src="/2022/20221013_100454.jpg" alt={pick("Pelatihan bank sampah bersama komunitas", "Waste bank training with a community")} fill priority unoptimized sizes="(max-width: 1023px) 92vw, 60vw" style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="bc-t-cap mt-3">
              <b className="text-[color:var(--ink)]">2022</b> · {pick("Program Bank Sampah Setor Jo & Eco-Enzyme", "Setor Jo waste bank & eco-enzyme programme")}
            </figcaption>
          </motion.figure>
          <dl className="grid grid-cols-3 gap-[var(--s2)] lg:grid-cols-1 lg:content-between">
            {stats.map((s) => (
              <div key={s.l} className="bc-stat">
                <dd className="bc-t-num bc-stat-n" style={{ color: s.c }}><CountUp to={s.v} suffix={s.s} /></dd>
                <dt className="bc-t-cap mt-2">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. MITRA ───────────── */
export function RxPartners() {
  const { pick } = useTx();
  return (
    <section aria-label={pick("Mitra", "Partners")} className="border-y border-[color:var(--line)]">
      <div className="bc-wrap flex flex-col items-center gap-[var(--s3)] py-[var(--s3)] lg:flex-row lg:gap-[var(--s4)]">
        <p className="bc-label shrink-0">{pick("Dipercaya oleh", "Trusted by")}</p>
        <ul className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-7">
          {partners.map((p) => (
            <li key={p.name} className="bc-partner relative mx-auto h-12 w-full max-w-[8.5rem]" title={p.name}>
              <Image src={p.logo} alt={p.name} fill unoptimized sizes="128px" style={{ objectFit: "contain", transform: `scale(${p.scale})` }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── 3. MANIFESTO — pernyataan besar (surat pendiri Bumiterra) ───────────── */
export function RxManifesto() {
  const { pick } = useTx();
  const rise = useRise();
  return (
    <section className="bc-section">
      <div className="bc-wrap bc-split">
        <div className="bc-sticky">
          <span className="bc-label"><b>01</b>{pick("Tentang kami", "About us")}</span>
        </div>
        <motion.div {...rise()}>
          <p className="bc-t-title bc-t-title--light">
            {pick("Satu kilogram sampah bisa berakhir di ", "A kilogram of waste can end up in ")}
            <em>{pick("TPA", "landfill")}</em>
            {pick(", atau menjadi ", ", or become ")}
            <em data-c="green">{pick("bahan baku, karya, dan data dampak", "raw material, craft and impact data")}</em>
            {pick(". Baciraro memastikan ia menempuh jalur kedua.", ". Baciraro makes sure it takes the second path.")}
          </p>
          <p className="bc-t-desc mt-[var(--s3)]">
            {pick(
              "Sejak 2010 kami bekerja bersama komunitas, pemerintah, dan perusahaan, dari reboisasi dan bank sampah sampai produk daur ulang dan platform digital.",
              "Since 2010 we have worked with communities, governments and companies, from reforestation and waste banks to recycled products and a digital platform."
            )}
          </p>
          <Link href="/about" className="bc-btn bc-btn--line mt-[var(--s3)]">
            {pick("Baca perjalanan Baciraro", "Read the Baciraro story")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── 4. EKOSISTEM — kolom kiri menempel, daftar editorial di kanan (Wonderfruit) ───────────── */
export function RxEcosystem() {
  const { tx, pick } = useTx();
  const rise = useRise();
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="ekosistem" className="bc-section scroll-mt-20 border-t border-[color:var(--line)]">
      <div className="bc-wrap bc-split">
        <div className="bc-sticky">
          <span className="bc-label"><b>02</b>{pick("Ekosistem sirkular", "Circular ecosystem")}</span>
          <h2 className="bc-t-title mt-[var(--s2)]" data-a="green">
            {pick("Satu jalur,", "One path,")} <em>{pick("enam entitas.", "six entities.")}</em>
          </h2>
          <p className="bc-t-sub mt-[var(--s2)]">{pick("Pilih satu langkah untuk melihat siapa yang mengerjakannya.", "Pick a step to see who handles it.")}</p>
          <ol className="mt-[var(--s3)]">
            {flow.map((f, i) => (
              <li key={i}>
                <button type="button" className="bc-step" aria-pressed={active === i} onClick={() => setActive(active === i ? null : i)}>
                  <i>0{i + 1}</i>
                  <span>
                    {tx(f.title)}
                    <span className="bc-t-cap block font-normal">{tx(f.desc)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div>
          {entities.map((e, i) => (
            <motion.div key={e.id} {...rise(i * 0.04)}>
              <Link href={e.href} className="bc-entity group" data-dim={active !== null && !e.steps.includes(active)}>
                <span className="bc-logo">
                  {e.mask ? (
                    <span aria-hidden="true" className="block h-8 w-11" style={{ background: "var(--orange)", WebkitMask: `url("${e.logo}") center / contain no-repeat`, mask: `url("${e.logo}") center / contain no-repeat` }} />
                  ) : (
                    <Image src={e.logo} alt="" width={64} height={64} unoptimized style={{ objectFit: "contain", maxHeight: "2.6rem", width: "auto" }} />
                  )}
                </span>
                <span>
                  <span className="bc-label !tracking-[.12em]" style={{ color: e.color === "var(--gold)" ? "#8a6a0c" : e.color === "var(--ink)" ? "var(--ink)" : e.color === "var(--orange)" ? "var(--orange-ink)" : e.color }}>
                    {tx(e.role)}
                  </span>
                  <span className="bc-t-sub bc-t-sub--bold mt-1 block">{e.name}</span>
                  <span className="bc-t-desc mt-1 block">{tx(e.desc)}</span>
                </span>
                <ArrowUpRight className="bc-arrow h-6 w-6 shrink-0 text-[color:var(--ink-3)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--orange)]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 5. DAMPAK — angka raksasa (Bumiterra) ───────────── */
export function RxImpact() {
  const { tx, pick } = useTx();
  const rise = useRise();
  return (
    <section id="dampak" className="bc-section scroll-mt-20 border-t border-[color:var(--line)]">
      <div className="bc-wrap">
        <SectionHead
          no="03"
          label={pick("Dampak terukur", "Measured impact")}
          title={<>{pick("Data yang", "Numbers that")} <em>{pick("bicara.", "speak.")}</em></>}
          sub={pick("Setiap angka adalah kerja nyata di lapangan, dari hulu ke hilir.", "Every number is real fieldwork, from upstream to downstream.")}
          right={<Link href="/track-record" className="bc-btn bc-btn--line bc-btn--sm self-start md:self-auto">{pick("Lihat rekam jejak", "See the track record")}<ArrowRight className="h-4 w-4" /></Link>}
        />
        <dl className="grid grid-cols-2 gap-x-[var(--s3)] gap-y-[var(--s4)] lg:grid-cols-3">
          {metrics.map((m, i) => (
            <div key={m.value + m.suffix} className="bc-stat">
              <dd className="bc-t-num bc-stat-n" style={{ color: i % 2 ? "var(--green)" : "var(--orange)" }}><CountUp to={m.value} suffix={m.suffix} /></dd>
              <dt className="mt-[var(--s1)] text-[length:var(--f0)] font-bold">{tx(m.label)}</dt>
              <p className="bc-t-cap uppercase tracking-wider">{tx(m.unit)}</p>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--s5)] grid gap-[var(--s4)] md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article key={c.partner} {...rise(i * 0.07)} className="border-t-[3px] pt-[var(--s2)]" style={{ borderColor: i === 1 ? "var(--green)" : "var(--orange)" }}>
              <div className="flex items-center justify-between gap-3">
                <span className="relative block h-9 min-w-24">
                  {c.logo ? <Image src={c.logo} alt={c.partner} fill unoptimized sizes="96px" style={{ objectFit: "contain", objectPosition: "left" }} /> : <span className="block pt-2 text-sm font-bold leading-tight">{c.partner}</span>}
                </span>
                <span className="bc-label !tracking-[.12em] after:hidden" style={{ color: i === 1 ? "var(--green-ink)" : "var(--orange-ink)" }}>{tx(c.badge)}</span>
              </div>
              <p className="bc-t-sub mt-[var(--s3)] !text-[color:var(--ink)]">{tx(c.result)}</p>
              <p className="bc-t-cap mt-[var(--s1)] font-bold uppercase tracking-wider">{c.partner}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 6. JEJAK 2010–2026 — arsip foto bergulir ───────────── */
export function RxTrail() {
  const { tx, pick } = useTx();
  return (
    <section id="jejak" className="bc-section scroll-mt-20 border-t border-[color:var(--line)]">
      <div className="bc-wrap">
        <SectionHead
          no="04"
          label={pick("Jejak lapangan", "Fieldwork trail")}
          accent="green"
          title={<>{pick("Lebih dari satu dekade,", "More than a decade,")} <em>{pick("dari hutan sampai desa pesisir.", "from forests to coastal villages.")}</em></>}
        />
      </div>
      <div className="bc-scroll mx-auto max-w-[1440px]" tabIndex={0} aria-label={pick("Linimasa kegiatan, geser ke samping", "Activity timeline, scroll sideways")}>
        {trail.map((t) => (
          <figure key={t.year} className="w-[17rem] shrink-0 sm:w-[20rem]">
            <div className="bc-photo aspect-[4/5]">
              <Image src={t.src} alt={tx(t.title)} fill unoptimized loading="lazy" sizes="320px" style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="mt-[var(--s1)]">
              <span className="bc-t-sub bc-t-num block !text-[color:var(--orange)]">{t.year}</span>
              <span className="bc-t-desc block !text-[color:var(--ink)]">{tx(t.title)}</span>
            </figcaption>
          </figure>
        ))}
        <Link href="/track-record" className="flex w-[14rem] shrink-0 flex-col justify-end border-t-[3px] border-[color:var(--green)] pb-2 pt-4">
          <span className="bc-t-title !text-[color:var(--ink)]">2010 – 2026</span>
          <span className="bc-btn bc-btn--line bc-btn--sm mt-[var(--s2)] self-start">{pick("Semua kegiatan", "All activities")}<ArrowRight className="h-4 w-4" /></span>
        </Link>
      </div>
    </section>
  );
}

/* ───────────── 7. KERJA SAMA — tiga pintu masuk ───────────── */
export function RxPartnerWith() {
  const { tx, pick } = useTx();
  const [i, setI] = useState(0);
  const a = audiences[i];
  const c = cases[a.case];
  const tint = ["orange", "green", "orange"] as const;
  return (
    <section id="kerja-sama" className="bc-section scroll-mt-20 border-t border-[color:var(--line)]">
      <div className="bc-wrap">
        <SectionHead
          no="06"
          label={pick("Layanan & kerja sama", "Services & partnership")}
          title={<>{pick("Dirancang untuk", "Designed for")} <em>{pick("kolaborasi.", "collaboration.")}</em></>}
          sub={pick("Dari program CSR sampai bank sampah desa, kami sesuaikan dengan kebutuhan Anda.", "From CSR programmes to village waste banks, we adapt to what you need.")}
        />
        <div role="tablist" className="grid gap-[var(--s2)] md:grid-cols-3">
          {audiences.map((x, k) => (
            <button key={x.key} role="tab" aria-selected={i === k} data-c={tint[k]} onClick={() => setI(k)} className="bc-tile">
              <b className="bc-tile-no">0{k + 1}</b>
              <span className="bc-t-sub bc-t-sub--bold mt-2 block !text-current">{tx(x.tab)}</span>
            </button>
          ))}
        </div>

        <div className="bc-split bc-split--rev mt-[var(--s4)]">
          <div>
            <h3 className="bc-t-title bc-t-title--light" style={{ fontWeight: 600 }}>{tx(a.title)}</h3>
            <ul className="mt-[var(--s3)]">
              {a.points.map((p) => (
                <li key={p.id} className="flex items-start gap-3 border-t border-[color:var(--line)] py-[var(--s1)] text-[length:var(--f0)]">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--green)] text-[#ffffff]"><Check className="h-3 w-3" /></span>
                  {tx(p)}
                </li>
              ))}
            </ul>
            <div className="mt-[var(--s3)] flex flex-wrap gap-3">
              <Link href="/contact" className="bc-btn bc-btn--orange">{pick("Diskusikan kebutuhan Anda", "Discuss your needs")}<ArrowRight className="h-4 w-4" /></Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="bc-btn bc-btn--line"><MessageCircle className="h-4 w-4" />WhatsApp</a>
            </div>
          </div>
          <aside className="flex flex-col justify-between border-t-[3px] pt-[var(--s2)]" style={{ borderColor: tint[i] === "green" ? "var(--green)" : "var(--orange)" }}>
            <div>
              <p className="bc-label">{pick("Studi kasus", "Case study")}</p>
              <p className="bc-t-sub mt-[var(--s2)] !text-[color:var(--ink)]">{tx(c.result)}</p>
            </div>
            <p className="mt-[var(--s3)] text-[length:var(--f0)] font-bold">
              {c.partner}
              <span className="bc-t-cap ml-2 font-normal">· {tx(c.badge)}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 8. JEMBATAN KE /creative — blok oranye penuh (Ubud) ───────────── */
export function RxCreativeBridge() {
  const { tx, pick } = useTx();
  const slugs = ["annual-games-2026", "atribut-kawasaran", "tjf-less-waste-event", "piala-idx-kspm-mengajar"];
  const items = slugs.flatMap((s) => {
    const p = getRecap(s);
    return p ? [{ p, src: recapPhotoUrl(p, p.hero, true) }] : [];
  });
  return (
    <section className="bc-on-orange relative overflow-hidden">
      <Flake c="#fff" w="8rem" h="2.6rem" x="2%" y="1.2rem" r={-18} className="hidden opacity-60 lg:block" />
      <Flake c="var(--green)" w="5rem" h="1.8rem" x="92%" y="1.6rem" r={28} className="hidden lg:block" />
      <div className="bc-wrap bc-section relative">
        <div className="bc-split items-center">
          <div>
            <span className="bc-label"><b>07</b>Baciraro Creative</span>
            <h2 className="bc-t-title mt-[var(--s2)]">
              {pick("Plastik bekas,", "Used plastic,")} <em>{pick("jadi piala dan karya.", "made into trophies and crafts.")}</em>
            </h2>
            <p className="bc-t-sub mt-[var(--s2)]">{pick("Lini kreatif Baciraro.", "Baciraro's creative arm.")}</p>
            <p className="bc-t-desc mt-[var(--s2)]">{pick("Piala, atribut budaya, dan produk dari plastik daur ulang, dibuat bersama komunitas dan mitra.", "Trophies, cultural attire and products from recycled plastic, made with communities and partners.")}</p>
            <Link href="/creative" className="bc-btn mt-[var(--s3)]">{pick("Jelajahi Baciraro Creative", "Explore Baciraro Creative")}<ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-[var(--s2)] sm:grid-cols-4">
            {items.map(({ p, src }, k) => (
              <Link key={p.slug} href={`/creative/projects/${p.slug}`} className={`group block ${k % 2 ? "sm:translate-y-[var(--s3)]" : ""}`}>
                <div className="relative aspect-[3/4] overflow-hidden border-[3px] border-[#ffffff] bg-[#ffffff]">
                  <Image src={src} alt={tx(p.title)} fill unoptimized loading="lazy" sizes="(max-width: 640px) 45vw, 18vw" style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="bc-t-cap mt-2 !text-[color:var(--ink)] font-bold">{tx(p.card.tag)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 9. KEPEMIMPINAN + PENUTUP ───────────── */
export function RxClosing() {
  const { pick } = useTx();
  return (
    <>
      <section className="bc-section">
        <div className="bc-wrap bc-split items-center">
          <div className="bc-photo mx-auto aspect-[4/5] w-full max-w-[24rem]">
            <Image src="/Marlon.png" alt="Marlon Kamagi" fill unoptimized sizes="384px" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div>
            <span className="bc-label"><b>08</b>{pick("Kepemimpinan & visi", "Leadership & vision")}</span>
            <blockquote className="bc-t-title bc-t-title--light mt-[var(--s2)]">
              “{pick("Sinergi antar entitas adalah kunci untuk menciptakan ", "Synergy between entities is the key to ")}
              <em data-c="green">{pick("sirkularitas sampah yang nyata dan berkelanjutan", "real, lasting waste circularity")}</em>
              {pick(" dari hulu ke hilir.", " from upstream to downstream.")}”
            </blockquote>
            <p className="bc-t-sub mt-[var(--s3)] !text-[color:var(--ink)]"><b>Marlon Kamagi</b></p>
            <p className="bc-t-cap">CEO Baciraro Sustainability</p>
            <div className="mt-[var(--s3)] flex flex-wrap gap-3">
              <Link href="/about" className="bc-btn bc-btn--line bc-btn--sm">{pick("Baca perjalanan Baciraro", "Read the Baciraro story")}</Link>
              <Link href="/leadership" className="bc-btn bc-btn--line bc-btn--sm">{pick("Seluruh leadership", "Full leadership")}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-on-green relative overflow-hidden">
        <Flake c="var(--orange)" w="10rem" h="3.2rem" x="-2rem" y="2rem" r={-24} />
        <Flake c="var(--gold)" w="5rem" h="1.7rem" x="6%" y="9rem" r={30} className="hidden sm:block" />
        <Flake c="var(--orange)" w="7rem" h="2.4rem" x="82%" y="70%" r={-30} />
        <div className="bc-wrap bc-section relative text-center">
          <h2 className="bc-t-hero mx-auto max-w-[16ch]" style={{ fontSize: "var(--f3)" }}>
            {pick("Mari mulai dari", "Let's start with")} <em style={{ color: "#fff" }}>{pick("satu langkah.", "one step.")}</em>
          </h2>
          <p className="bc-t-sub mx-auto mt-[var(--s3)] max-w-[34ch]">{pick("Ceritakan kebutuhan Anda. Kami rancang programnya.", "Tell us what you need. We design the programme.")}</p>
          <p className="bc-t-desc mx-auto mt-[var(--s2)] text-center">{pick("Program yang terukur, dari pemilahan sampai laporan dampak.", "A measurable programme, from sorting to impact reporting.")}</p>
          <div className="mt-[var(--s4)] flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bc-btn bc-btn--orange">{pick("Hubungi tim kami", "Contact our team")}<ArrowRight className="h-4 w-4" /></Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="bc-btn bc-btn--white"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
