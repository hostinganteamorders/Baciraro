import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { CustomerAuthProvider } from "@/lib/customer-auth-context";
import { AdminAuthProvider } from "@/lib/admin-auth-context";
import { LanguageProvider } from "@/lib/i18n/context";
import ScanFab from "@/components/ScanFab";
import SiteTheme from "@/components/SiteTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Open Sans variabel (300–800, miring): tipografi seluruh situs kecuali /creative.
const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-opensans",
  display: "swap",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var p=location.pathname,c=p==='/creative'||p.indexOf('/creative/')===0,t=localStorage.getItem('bc-theme');document.documentElement.dataset.site=c?'':'brand';document.documentElement.dataset.theme=c?(t==='light'?'light':'dark'):'light'}catch(e){document.documentElement.dataset.theme='light';document.documentElement.dataset.site='brand'}",
          }}
        />
        <link rel="icon" href="/Baciraro cap.png" />
        <link rel="apple-touch-icon" href="/Baciraro cap.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <div aria-hidden="true" className="page-bg" />
        <AdminAuthProvider>
        <CustomerAuthProvider>
        <LanguageProvider>
          <SiteTheme />
          {children}
          <ScanFab />
        </LanguageProvider>
        </CustomerAuthProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
