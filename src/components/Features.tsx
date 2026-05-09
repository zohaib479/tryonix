"use client";

import { motion } from "framer-motion";
import { Cpu, Maximize, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "AI PRECISION MAPPING",
    description: "Our neural networks analyze 10,000+ data points to ensure every garment drapes perfectly on any body type.",
    icon: <Cpu className="w-8 h-8 text-cyber-cyan" />,
    border: "neon-border-cyan"
  },
  {
    title: "REAL-TIME RENDERING",
    description: "Zero latency. Experience instant feedback as you swap outfits, lighting, and environments in pure 4K.",
    icon: <Zap className="w-8 h-8 text-cyber-purple" />,
    border: "neon-border-purple"
  },
  {
    title: "UNIVERSAL SCALING",
    description: "From mobile to desktop, the TryOnix engine adapts to any screen without losing textural detail.",
    icon: <Maximize className="w-8 h-8 text-cyber-pink" />,
    border: "border-cyber-pink/50 shadow-[0_0_10px_rgba(255,0,255,0.3)]"
  },
  {
    title: "SECURE DATA VAULT",
    description: "Your measurements and privacy are protected by enterprise-grade encryption. Shop with total peace of mind.",
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    border: "border-green-400/50 shadow-[0_0_10px_rgba(74,222,128,0.3)]"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-cyber-cyan font-bold tracking-[0.3em] text-sm mb-4">ENGINEERING EXCELLENCE</h2>
        <h3 className="text-4xl md:text-6xl font-black leading-none ml-10">
          THE TECH BEHIND <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">PERFECT FIT</span>
        </h3>
      </div>
      <p className="text-gray-400 max-w-sm text-lg font-light">
        We've combined computer vision with fashion-forward design to create the ultimate digital fitting room.
      </p>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 glass border ${feature.border} group hover:bg-white/5 transition-all duration-500`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-purple/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Features;
