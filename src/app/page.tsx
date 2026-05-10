import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import AccessoryVault from "@/components/AccessoryVault";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import VisualGallery from "@/components/VisualGallery";
import BrandImpact from "@/components/BrandImpact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none z-0" />
      
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <Features />
        <VisualGallery />
        {/* <AccessoryVault /> */}
        <BrandImpact />
        <InteractiveDemo />
        <Footer/>
      </div>

      <ThemeSwitcher />
    </main>
  );
}
