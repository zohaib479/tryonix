import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import AccessoryVault from "@/components/AccessoryVault";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import VisualGallery from "@/components/VisualGallery";
import BrandImpact from "@/components/BrandImpact";

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
        <AccessoryVault />
        <BrandImpact />
        <InteractiveDemo />
        
        <footer className="py-24 px-6 border-t border-white/5 bg-background text-center">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <span className="text-background font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">TRY<span className="text-primary">ONIX</span></span>
            </div>
            <div className="flex justify-center gap-8 mb-12 text-xs font-bold tracking-widest uppercase text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Press</a>
            </div>
            <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">
              © 2026 TRYONIX LABS — ENGINEERED FOR THE GLOBAL FASHION ELITE
            </p>
          </div>
        </footer>
      </div>

      <ThemeSwitcher />
    </main>
  );
}
