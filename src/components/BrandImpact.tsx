"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingCart, ArrowDownLeft } from "lucide-react";

const stats = [
  {
    label: "CONVERSION INCREASE",
    value: "+45%",
    desc: "Average lift in sales after implementing virtual try-on.",
    icon: <TrendingUp className="text-primary" />,
    color: "from-primary/20 to-transparent"
  },
  {
    label: "REDUCED RETURNS",
    value: "-62%",
    desc: "Decrease in returns due to sizing and fit uncertainty.",
    icon: <ArrowDownLeft className="text-accent" />,
    color: "from-accent/20 to-transparent"
  },
  {
    label: "USER ENGAGEMENT",
    value: "4.5x",
    desc: "More time spent on product pages compared to static images.",
    icon: <Users className="text-secondary" />,
    color: "from-secondary/20 to-transparent"
  },
  {
    label: "ADD TO CART RATE",
    value: "+38%",
    desc: "Confidence-driven purchasing behavior for all garment types.",
    icon: <ShoppingCart className="text-primary" />,
    color: "from-primary/20 to-transparent"
  }
];

const BrandImpact = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold tracking-[0.4em] text-xs mb-4">FOR THE VISIONARY BRAND</h2>
          <h3 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
            DATA-DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">DOMINANCE</span>
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We don't just provide 3D models; we provide a sales engine. TryOnix is engineered to 
            bridge the gap between digital browsing and physical confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 glass border border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-500`}
            >
              {/* Background Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-6 border border-white/5 group-hover:border-primary/20">
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-2">
                  {stat.label}
                </p>
                <p className="text-5xl font-black mb-4 tracking-tighter group-hover:scale-110 transition-transform origin-left duration-500">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
                 <div className="absolute top-4 right-4 w-1 h-1 bg-primary" />
                 <div className="absolute top-4 right-4 w-4 h-[1px] bg-primary" />
                 <div className="absolute top-4 right-4 w-[1px] h-4 bg-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sales Comparison Chart Placeholder */}
        <div className="mt-20 p-12 glass border border-white/5 rounded-sm relative overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">The Conversion Gap</h4>
                <p className="text-gray-400 font-light mb-8">
                  Traditional e-commerce relies on imagination. TryOnix relies on precision. 
                  See how we transform window shoppers into brand loyalists.
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                      <span>Traditional Commerce</span>
                      <span>2.4% Conv.</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "30%" }}
                        className="h-full bg-gray-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary">
                      <span>TryOnix Engine</span>
                      <span>12.8% Conv.</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-sm flex items-center justify-center p-8">
                   <div className="text-center">
                      <p className="text-[10px] font-mono text-primary uppercase animate-pulse mb-4">Live Simulation: Active</p>
                      <p className="text-3xl font-black uppercase tracking-tighter">Retail Transformation</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default BrandImpact;
