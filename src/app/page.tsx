import TopBar from "@/components/TopBar";
import TickerTape from "@/components/TickerTape";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import FeatureWalkthrough from "@/components/FeatureWalkthrough";
import StatsStrip from "@/components/StatsStrip";
import ModulesGrid from "@/components/ModulesGrid";
import WaitlistForm from "@/components/WaitlistForm";
import FAQ from "@/components/FAQ";
import MarketPulse from "@/components/MarketPulse";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <TickerTape />
      <Hero />
      <DashboardPreview />
      <FeatureWalkthrough />
      <StatsStrip />
      <ModulesGrid />
      <WaitlistForm />
      <FAQ />
      <MarketPulse />
      <Footer />
    </main>
  );
}
