"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Scan, ShoppingBag, RefreshCw } from "lucide-react";

const models = [
  {
    id: 1,
    name: "CYBER-AESTHETIC-01",
    type: "Classic Fit",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    style: "Urban Techwear"
  },
  {
    id: 2,
    name: "CYBER-AESTHETIC-02",
    type: "Slim Silhouette",
    image: "https://images.unsplash.com/photo-1539109132381-31a05b33be6d?q=80&w=1000&auto=format&fit=crop",
    style: "Neo-Classic"
  },
  {
    id: 3,
    name: "CYBER-AESTHETIC-03",
    type: "Athletic Build",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
    style: "Performance Pro"
  }
];

const InteractiveDemo = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("fit");

  const nextModel = () => {
    setIsScanning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % models.length);
      setIsScanning(false);
    }, 1200);
  };

  const prevModel = () => {
    setIsScanning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + models.length) % models.length);
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section id="demo" className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-cyber-cyan font-bold tracking-[0.3em] text-sm mb-4">LIVE INTERACTIVE EXPERIENCE</h2>
          <h3 className="text-5xl md:text-7xl font-black mb-6">SEE IT TO <span className="text-cyber-cyan italic">BELIEVE</span> IT</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Stats/Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="p-6 glass border border-white/10 rounded-sm">
              <h4 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">Model Specs</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-cyber-cyan uppercase font-bold">Designation</p>
                  <p className="text-lg font-bold">{models[currentIdx].name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-cyber-cyan uppercase font-bold">Body Type</p>
                  <p className="text-lg font-bold">{models[currentIdx].type}</p>
                </div>
                <div>
                  <p className="text-[10px] text-cyber-cyan uppercase font-bold">Current Style</p>
                  <p className="text-lg font-bold">{models[currentIdx].style}</p>
                </div>
              </div>
            </div>

            <div className="p-6 glass border border-cyber-cyan/30 rounded-sm flex-1">
              <h4 className="text-xs font-bold text-cyber-cyan tracking-widest uppercase mb-4">Fitting Analysis</h4>
              <div className="space-y-6">
                {[
                  { label: "Shoulder Alignment", val: "98.4%" },
                  { label: "Chest Volume", val: "99.1%" },
                  { label: "Waist Retention", val: "97.8%" },
                  { label: "Fabric Tension", val: "Optimal" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-sm font-mono text-cyber-cyan">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: The Model View */}
          <div className="lg:col-span-6 relative aspect-[3/4] lg:aspect-auto group overflow-hidden border border-white/10 rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {/* Main Image with Aesthetic Overlays */}
                <div className="relative w-full h-full">
                  <img 
                    src={models[currentIdx].image} 
                    alt={models[currentIdx].name}
                    className="w-full h-full object-cover brightness-[0.9] contrast-[1.1] transition-all duration-700"
                  />
                  {/* Subtle Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
                  
                  {/* Subtle Blue Tint Overlay for Cyber Aesthetic */}
                  <div className="absolute inset-0 bg-cyber-cyan/5 mix-blend-overlay pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scanning Overlay */}
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-cyber-cyan shadow-[0_0_20px_#00f3ff] z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* HUD Elements */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between border-8 border-transparent group-hover:border-cyber-cyan/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-[1px] bg-cyber-cyan" />
                  <div className="w-[1px] h-8 bg-cyber-cyan" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-cyber-cyan animate-pulse">SYSTEM STATUS: ACTIVE</p>
                  <p className="text-[10px] font-mono text-gray-500">RES: 3840 X 2160</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] font-mono text-gray-500">
                  <p>LAT: 40.7128° N</p>
                  <p>LONG: 74.0060° W</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <div className="w-[1px] h-8 bg-cyber-cyan" />
                  <div className="w-8 h-[1px] bg-cyber-cyan" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-center z-10">
              <button 
                onClick={prevModel}
                disabled={isScanning}
                className="p-4 bg-black/50 hover:bg-cyber-cyan hover:text-black transition-all rounded-full backdrop-blur-md border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setIsScanning(true)}
                disabled={isScanning}
                className="px-8 py-3 bg-cyber-cyan text-black font-black tracking-widest text-xs flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Scan size={16} /> RE-SCAN
              </button>
              <button 
                onClick={nextModel}
                disabled={isScanning}
                className="p-4 bg-black/50 hover:bg-cyber-cyan hover:text-black transition-all rounded-full backdrop-blur-md border border-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Right Panel: Shopping/Actions */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex bg-white/5 p-1 rounded-sm">
              <button 
                onClick={() => setActiveTab("fit")}
                className={`flex-1 py-2 text-[10px] font-bold tracking-widest transition-all ${activeTab === "fit" ? "bg-cyber-cyan text-black" : "text-gray-400 hover:text-white"}`}
              >
                VIRTUAL FIT
              </button>
              <button 
                onClick={() => setActiveTab("looks")}
                className={`flex-1 py-2 text-[10px] font-bold tracking-widest transition-all ${activeTab === "looks" ? "bg-cyber-cyan text-black" : "text-gray-400 hover:text-white"}`}
              >
                AESTHETIC
              </button>
            </div>

            <div className="flex-1 glass border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-6">Current Selection</h4>
                <div className="bg-white/5 aspect-square rounded-sm mb-4 relative flex items-center justify-center overflow-hidden border border-white/5 group">
                   <ShoppingBag className="w-12 h-12 text-white/20 group-hover:text-primary transition-colors" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <p className="text-sm font-bold uppercase tracking-tighter">Premium Collection</p>
                   </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["PANTS", "SHIRTS", "SHALWAR KAMEEZ", "KURTIES"].map((cat) => (
                    <span key={cat} className="text-[8px] px-2 py-1 border border-white/10 rounded-full text-gray-500 font-black tracking-widest hover:border-primary hover:text-primary transition-all cursor-pointer">
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
                  AI-Optimized draping engine for both Eastern and Western silhouettes. Ensuring precision fit for every stitch.
                </p>
                <div className="flex justify-between items-center text-xl font-black text-cyber-cyan">
                  <span>$299.00</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-white rounded-full border border-cyber-cyan" />
                    <div className="w-4 h-4 bg-cyber-cyan rounded-full" />
                    <div className="w-4 h-4 bg-cyber-purple rounded-full" />
                  </div>
                </div>
              </div>

              <button className="w-full py-4 mt-8 bg-white text-black font-black tracking-widest text-xs hover:bg-cyber-cyan transition-all flex items-center justify-center gap-2">
                ADD TO CART <ChevronRight size={14} />
              </button>
            </div>

            <div className="p-4 bg-cyber-purple/10 border border-cyber-purple/30 rounded-sm">
               <div className="flex items-center gap-3">
                 <RefreshCw className="text-cyber-purple animate-spin-slow" />
                 <div>
                   <p className="text-[10px] font-bold text-cyber-purple uppercase">Style Recommendation</p>
                   <p className="text-[11px] text-white/70">Pair with "Neural Joggers" for 94% match.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
