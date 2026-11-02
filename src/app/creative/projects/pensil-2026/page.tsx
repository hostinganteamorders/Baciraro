import type { Metadata } from "next";
import PensilRecapClient from "@/components/creative/pensil-2026/PensilRecapClient";

export const metadata: Metadata = {
  title: "PENSIL 2026 × Baciraro Creative — Project Recap",
  description:
    "BACIRARO Creative memproduksi piala penghargaan berbahan plastik daur ulang untuk PENSIL 2026 bersama ROHIS SMA Negeri 1 Manado. 2.904 gram sampah plastik menjadi simbol apresiasi.",
  openGraph: {
    title: "PENSIL 2026 × Baciraro Creative",
    description:
      "Dari sampah plastik menjadi simbol apresiasi. 2.904 gram plastik daur ulang menjadi piala penghargaan PENSIL 2026.",
    type: "website",
    images: ["/creative/pensil-2026/09-penyerahan-piala.jpeg"],
  },
};

export default function Pensil2026Page() {
  return <PensilRecapClient />;
}
