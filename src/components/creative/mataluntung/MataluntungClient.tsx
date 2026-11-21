"use client";

import CaseStudy, { type CaseData } from "@/components/creative/paper/CaseStudy";
import { mataluntungProject as p, projectImages as img } from "@/lib/creative-projects/mataluntung";

const data: CaseData = {
  eyebrow: p.eyebrow,
  title: p.headline,
  desc: p.subStatement,
  client: p.client,
  year: p.year,
  tags: p.products,
  hero: { src: img.hero, alt: "Koleksi Mataluntung dari plastik daur ulang", caption: p.clientLine },
  intro: { kicker: "Cerita", heading: p.introHeading, body: p.introBody },
  brief: {
    kicker: "Brief",
    statement: p.briefStatement,
    concepts: p.briefConcepts.map((c) => ({ title: c.title, description: c.description })),
  },
  chapters: [
    {
      number: "01",
      kicker: "Ganci",
      heading: p.ganci.heading,
      body: p.ganci.body,
      chips: p.ganci.microCaptions,
      images: [
        { src: p.ganci.mainImage, alt: p.ganci.mainAlt },
        { src: p.ganci.secondaryImage, alt: p.ganci.secondaryAlt },
      ],
    },
    {
      number: "02",
      kicker: "Coaster",
      heading: p.coaster.heading,
      body: p.coaster.body,
      chips: p.coaster.sequence,
      images: [
        { src: p.coaster.materialImage, alt: p.coaster.materialAlt },
        { src: p.coaster.warmImage, alt: p.coaster.warmAlt },
        { src: p.coaster.useImage, alt: p.coaster.useAlt },
      ],
    },
    {
      number: "03",
      kicker: "Asbak",
      heading: p.asbak.heading,
      body: p.asbak.body,
      chips: p.asbak.microLabels,
      images: [
        { src: p.asbak.collectionImage, alt: p.asbak.collectionAlt },
        { src: p.asbak.squareImage, alt: p.asbak.squareAlt },
      ],
    },
    {
      kicker: "Material",
      heading: p.materialPattern.headline,
      body: p.materialPattern.body,
      images: p.materialPattern.crops.map((c) => ({ src: c.src, alt: c.alt })),
    },
    {
      kicker: "Konteks",
      heading: p.realContext.heading,
      body: p.realContext.body,
      images: [{ src: p.realContext.heroImage, alt: p.realContext.heroAlt }, ...p.realContext.images],
    },
    {
      kicker: "Serah terima",
      heading: p.documentation.heading,
      body: p.documentation.body,
      images: [{ src: p.documentation.image, alt: p.documentation.imageAlt }],
    },
  ],
  palette: {
    kicker: p.materialPalette.heading,
    heading: p.formThickness.heading,
    items: p.materialPalette.groups.map((g) => ({ label: g.label, src: g.image, alt: g.alt })),
  },
  flow: {
    kicker: "Tiga objek",
    heading: p.threeObjects.statement,
    steps: p.threeObjects.flow.map((f) => `${f.object} · ${f.action}`),
  },
  closing: { quote: p.closingHeadline, body: p.threeObjects.statement.replace("\n", " "), attribution: p.closingAttribution },
  archive: {
    kicker: "Arsip",
    title: p.galleryTitle,
    categories: p.galleryCategories.filter((c) => c !== "ALL"),
    items: p.galleryImages.map((g) => ({ src: g.src, alt: g.alt, caption: g.alt, category: g.category })),
  },
  cta: { heading: p.ctaHeading, body: p.ctaBody },
};

export default function MataluntungClient() {
  return <CaseStudy data={data} />;
}
