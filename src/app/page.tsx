"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PointsDashboard from "@/components/PointsDashboard";
import ReviewMarquee from "@/components/ReviewMarquee";
import { RxHero, RxPartners, RxManifesto, RxEcosystem, RxImpact, RxTrail, RxPartnerWith, RxCreativeBridge, RxClosing } from "@/components/redesign/Sections";

/** Beranda Baciraro: layout editorial, putih bersih, oranye + hijau, tipografi skala rasio emas. */
export default function Home() {
  return (
    <main className="bc">
      <Header />
      <RxHero />
      <RxPartners />
      <RxManifesto />
      <RxEcosystem />
      <RxImpact />
      <RxTrail />
      <PointsDashboard />
      <RxPartnerWith />
      <ReviewMarquee />
      <RxCreativeBridge />
      <RxClosing />
      <Footer />
    </main>
  );
}
