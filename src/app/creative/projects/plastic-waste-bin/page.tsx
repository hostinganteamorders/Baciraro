import type { Metadata } from "next";
import PlasticWasteBinClient from "@/components/creative/plastic-waste-bin/PlasticWasteBinClient";

export const metadata: Metadata = {
  title: "Plastic Waste Bin × Baciraro Creative — Project Recap",
  description:
    "BACIRARO Creative menghadirkan tempat sampah khusus plastik daur ulang dengan rangka kawat besi dan struktur terbuka, dirancang untuk membangun kebiasaan memilah sampah sejak dari sumbernya.",
  openGraph: {
    title: "Plastic Waste Bin × Baciraro Creative",
    description:
      "Tempat sampah khusus plastik daur ulang dengan rangka kawat besi dan struktur terbuka. Memilah sampah dimulai dari langkah sederhana.",
    type: "website",
    images: ["/creative/plastic-waste-bin/01-prototype.jpeg"],
  },
};

export default function PlasticWasteBinPage() {
  return <PlasticWasteBinClient />;
}
