import Hero from "@/components/Hero";
import TickerTape from "@/components/TickerTape";
import WhyAxisCap from "@/components/WhyAxisCap";
import ModulesGrid from "@/components/ModulesGrid";
import WaitlistForm from "@/components/WaitlistForm";
import LiveStats from "@/components/LiveStats";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TickerTape />
      <WhyAxisCap />
      <ModulesGrid />
      <WaitlistForm />
      <LiveStats />
      <FAQ />
      <Footer />
    </main>
  );
}
