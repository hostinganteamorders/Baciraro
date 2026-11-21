import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecapClient from "@/components/creative/recap/RecapClient";
import { getRecap, recapPhotoUrl } from "@/lib/creative-projects/recaps";

const project = getRecap("pensil-2026");

export const metadata: Metadata = project
  ? {
      title: "PENSIL 2026 × Baciraro Creative — Project Recap",
      description: project.metaDescription.id,
      openGraph: {
        title: "PENSIL 2026 × Baciraro Creative",
        description: project.metaDescription.id,
        type: "website",
        images: [recapPhotoUrl(project, project.hero)],
      },
    }
  : {};

export default function Page() {
  if (!project) notFound();
  return <RecapClient project={project} />;
}
