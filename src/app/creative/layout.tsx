import { Poppins, Caveat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

// Hanya menyediakan variabel font untuk /creative; halaman anak tidak berubah tampilannya.
export default function CreativeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${poppins.variable} ${caveat.variable}`}>{children}</div>;
}
