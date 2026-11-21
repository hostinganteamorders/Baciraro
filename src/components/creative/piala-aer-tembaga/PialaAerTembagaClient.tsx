"use client";

import CaseStudy, { type CaseData } from "@/components/creative/paper/CaseStudy";
import { pialaAerTembagaProject as p, projectImages as img } from "@/lib/creative-projects/piala-aer-tembaga";

const archive: { src: string; alt: string; category: string }[] = [
  { src: img.rawMaterials, alt: "Tutup botol plastik bekas sebagai bahan awal", category: "MATERIAL" },
  { src: img.blueCaps, alt: "Tutup botol plastik biru setelah dipilah", category: "MATERIAL" },
  { src: img.redCaps, alt: "Tutup botol plastik merah setelah dipilah", category: "MATERIAL" },
  { src: img.sortedFlakes, alt: "Serpihan plastik daur ulang setelah pencacahan", category: "MATERIAL" },
  { src: img.blueFlakes, alt: "Serpihan plastik biru di tangan", category: "MATERIAL" },
  { src: img.recycledSheet, alt: "Lembaran material padat dari daur ulang", category: "MAKING" },
  { src: img.shaping, alt: "Proses pemotongan lembar plastik daur ulang", category: "MAKING" },
  { src: img.formDevelopment, alt: "Bentuk piala sebelum finishing", category: "MAKING" },
  { src: img.assembly, alt: "Meja perakitan komponen piala", category: "MAKING" },
  { src: img.weighing, alt: "Dokumentasi proses penimbangan material", category: "MAKING" },
  { src: img.emblemDetail, alt: "Detail emblem Bank Indonesia pada piala", category: "DETAILS" },
  { src: img.trophyInHand, alt: "Piala Aer Tembaga dipegang oleh tangan", category: "DETAILS" },
  { src: img.hero, alt: "Tiga piala Aer Tembaga final dari material plastik daur ulang", category: "FINAL OBJECTS" },
  { src: img.finalGroup, alt: "Komposisi tiga piala final Bank Indonesia", category: "FINAL OBJECTS" },
];

const data: CaseData = {
  eyebrow: p.eyebrow,
  title: p.headline,
  desc: p.introBody.split("\n\n")[1] ?? p.introBody,
  client: p.client,
  year: p.year,
  tags: p.tags,
  hero: { src: img.hero, alt: "Tiga piala Aer Tembaga dari plastik daur ulang untuk Bank Indonesia", caption: p.clientLine },
  stat: {
    value: p.impact.plasticWeight,
    unit: `${p.impact.unit} plastik`,
    note: `${p.impact.label}. Setara ${p.impact.bottleEquiv}, didokumentasikan dalam ${p.documentedFrames} frame proses.`,
  },
  intro: { kicker: "Cerita", heading: p.introHeading, body: p.introBody },
  brief: {
    kicker: "Brief",
    statement: p.briefStatement,
    concepts: p.briefConcepts.map((c) => ({ title: c.title, description: c.description })),
  },
  chapters: p.processSteps.map((s) => ({
    number: s.number,
    kicker: s.label,
    heading: s.headline,
    body: s.body,
    chips: s.tags,
    images: (s.images ?? (s.image ? [s.image] : [])).map((src, i) => ({
      src,
      alt: s.imageAlts?.[i] ?? s.imageAlt ?? s.headline,
    })),
  })),
  notes: { kicker: "Bahasa desain", heading: "Detail yang membuat piala ini terbaca", items: p.designAnnotations },
  palette: {
    kicker: "Material",
    heading: "Warna dari material, bukan cat",
    items: p.materialPaletteItems.map((m) => ({ label: m.label, src: m.image, alt: m.imageAlt })),
  },
  flow: { kicker: "Siklus", heading: "Dari tutup botol hingga simbol pencapaian", steps: p.circularFlowSteps },
  closing: { quote: p.closingQuote, body: `${p.closingBody}\n\n${p.closingFinalBody}`, attribution: p.finalSubheadline },
  archive: { kicker: "Arsip", title: p.archiveTitle, categories: [...p.archiveCategories], items: archive },
  cta: { heading: p.ctaHeading, body: p.ctaBody },
};

export default function PialaAerTembagaClient() {
  return <CaseStudy data={data} />;
}
