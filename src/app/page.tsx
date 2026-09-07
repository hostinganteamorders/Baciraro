"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import PartnerMarquee from "@/components/PartnerMarquee";
import EcosystemRadial from "@/components/EcosystemRadial";
import FlowHorizontal from "@/components/FlowHorizontal";
import CreativeShowcase from "@/components/CreativeShowcase";
import ImpactSection from "@/components/ImpactSection";
import PointsDashboard from "@/components/PointsDashboard";
import ServicesSection from "@/components/ServicesSection";
import CEOSection from "@/components/CEOSection";
import ReviewMarquee from "@/components/ReviewMarquee";

export default function Home() {
  return (
    <main className="relative overflow-hidden text-foreground min-h-screen bg-background">
      <div aria-hidden="true" className="page-bg" />

      <div className="relative z-[1]">
        <Header />

        <HeroSection />
        <ActivitiesSection />
        <PartnerMarquee />
        <EcosystemRadial />
        <FlowHorizontal />
        <CreativeShowcase />
        <ImpactSection />
        <PointsDashboard />
        <ReviewMarquee />
        <ServicesSection />
        <CEOSection />

        <Footer />
      </div>
    </main>
  );
}
