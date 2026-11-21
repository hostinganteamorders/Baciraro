import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecapClient from "@/components/creative/recap/RecapClient";
import { getRecap, recapPhotoUrl, recapProjects } from "@/lib/creative-projects/recaps";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return recapProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getRecap(slug);
  if (!p) return {};
  return {
    title: `${p.title.id} — Baciraro Creative`,
    description: p.metaDescription.id,
    openGraph: {
      title: p.title.id,
      description: p.metaDescription.id,
      type: "website",
      images: [recapPhotoUrl(p, p.hero, true)],
    },
  };
}

export default async function RecapPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getRecap(slug);
  if (!p) notFound();
  return <RecapClient project={p} />;
}
