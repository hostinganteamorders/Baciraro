import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomerAuthProvider } from "@/lib/customer-auth-context";
import { AdminAuthProvider } from "@/lib/admin-auth-context";
import { LanguageProvider } from "@/lib/i18n/context";
import ScanFab from "@/components/ScanFab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baciraro | Solusi Circular Economy & CSR Lingkungan Terintegrasi",
  description:
    "Baciraro membangun ekosistem pengelolaan sampah terintegrasi melalui edukasi, daur ulang, pemberdayaan masyarakat, program kreatif, dan digital tracking dampak lingkungan.",
  icons: {
    icon: "/Baciraro cap.png",
    apple: "/Baciraro cap.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/Baciraro cap.png" />
        <link rel="apple-touch-icon" href="/Baciraro cap.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <AdminAuthProvider>
        <CustomerAuthProvider>
        <LanguageProvider>
          {children}
          <ScanFab />
        </LanguageProvider>
        </CustomerAuthProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
