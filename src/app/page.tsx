import TopBar from "@/components/TopBar";
import TickerTape from "@/components/TickerTape";
import Hero from "@/components/Hero";
import WhyAxisCap from "@/components/WhyAxisCap";
import ModulesGrid from "@/components/ModulesGrid";
import WaitlistForm from "@/components/WaitlistForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <TickerTape />
      <Hero />
      <WhyAxisCap />
      <ModulesGrid />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}
