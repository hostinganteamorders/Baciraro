import type { Metadata } from "next";
import PialaAerTembagaClient from "@/components/creative/piala-aer-tembaga/PialaAerTembagaClient";

export const metadata: Metadata = {
  title: "Piala Aer Tembaga — Bank Indonesia × Baciraro Creative",
  description:
    "Case study Baciraro Creative dalam mengembangkan Piala Aer Tembaga untuk Bank Indonesia menggunakan material plastik daur ulang.",
  openGraph: {
    title: "Piala Aer Tembaga — Bank Indonesia × Baciraro Creative",
    description:
      "Case study Baciraro Creative dalam mengembangkan Piala Aer Tembaga untuk Bank Indonesia menggunakan material plastik daur ulang.",
    images: [
      {
        url: "/Piala_Aer_Tembaga_Selected_Web_Photos/01_Hero_Final_Trophies.png",
        width: 1200,
        height: 630,
        alt: "Piala Aer Tembaga dari material plastik daur ulang untuk Bank Indonesia",
      },
    ],
  },
};

export default function PialaAerTembagaPage() {
  return <PialaAerTembagaClient />;
}
