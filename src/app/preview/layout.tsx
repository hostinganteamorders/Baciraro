import type { Metadata } from "next";

// Halaman pratinjau redesign: tidak untuk diindeks mesin pencari.
export const metadata: Metadata = {
  title: "Baciraro — Pratinjau Redesign",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
