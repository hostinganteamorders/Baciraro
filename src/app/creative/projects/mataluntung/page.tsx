import type { Metadata } from "next";
import MataluntungClient from "@/components/creative/mataluntung/MataluntungClient";

export const metadata: Metadata = {
  title: "Mataluntung × Baciraro Creative — Functional Recycled Objects",
  description:
    "Three everyday objects — ganci, coaster, and asbak — made from recycled plastic material. A material design showcase by Baciraro Creative for Mataluntung.",
  openGraph: {
    title: "Mataluntung × Baciraro Creative",
    description:
      "Functional Objects, Recast Through Recycled Material. Ganci, coaster, and asbak made from recycled plastic.",
    type: "website",
  },
};

export default function MataluntungPage() {
  return <MataluntungClient />;
}
