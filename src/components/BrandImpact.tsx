"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  BrainCircuit,
  Activity,
  ScanFace,
} from "lucide-react";

const stats = [
  {
    title: "AI MATCHING",
    value: "98.7%",
    icon: BrainCircuit,
  },
  {
    title: "LIVE SCAN",
    value: "4.2M",
    icon: ScanFace,
  },
  {
    title: "DATA FLOW",
    value: "12TB",
    icon: Activity,
  },
  {
    title: "ENGINE SPEED",
    value: "0.02s",
    icon: Cpu,
  },
];

export default function BrandImpact() {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-black text-white">

      {/* GRID BG */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">
            Neural Commerce Engine
          </p>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            AI POWERED
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 text-transparent bg-clip-text italic">
              RETAIL SYSTEM
            </span>
          </h2>
        </div>

        {/* MAIN AI PANEL */}
        <div className="relative rounded-[40px] border border-cyan-500/20 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">

          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">

            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.1, x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[1px] w-[250px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                style={{
                  top: `${i * 8}%`,
                }}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 p-6 md:p-10 lg:p-14">

            {/* LEFT */}
            <div className="flex flex-col justify-center">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
                  <BrainCircuit className="w-7 h-7 text-cyan-400" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400">
                    ACTIVE SYSTEM
                  </p>
                  <h3 className="text-2xl md:text-4xl font-black">
                    Neural AI Core
                  </h3>
                </div>
              </div>

              <p className="text-white/50 leading-relaxed max-w-xl mb-10">
                Advanced real-time AI rendering engine designed for futuristic
                fashion commerce experiences with biometric visualization and
                smart fitting simulation.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">

                {stats.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent" />

                      <div className="relative z-10">
                        <Icon className="w-5 h-5 text-cyan-400 mb-4" />

                        <h4 className="text-3xl md:text-4xl font-black mb-2">
                          {item.value}
                        </h4>

                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                          {item.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </div>

            {/* RIGHT AI VISUAL */}
            <div className="relative min-h-[500px] flex items-center justify-center">

              {/* OUTER RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/20"
              />

              {/* MIDDLE RING */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[260px] h-[260px] rounded-full border border-fuchsia-500/20"
              />

              {/* INNER CORE */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-[0_0_120px_rgba(0,255,255,0.25)]"
              >
                <BrainCircuit className="w-20 h-20 text-black" />
              </motion.div>

              {/* FLOATING NODES */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                  }}
                  className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_cyan]"
                  style={{
                    top: `${10 + i * 7}%`,
                    left: `${15 + i * 6}%`,
                  }}
                />
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}