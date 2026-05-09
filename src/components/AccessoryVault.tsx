"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses, Watch, Sparkles, Upload, Scan, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────
   FACE LANDMARK POINTS
───────────────────────────────────── */
const LANDMARKS = [
  // left eye
  { x: 34, y: 39 }, { x: 39, y: 37 }, { x: 44, y: 39 }, { x: 44, y: 43 }, { x: 39, y: 44 }, { x: 34, y: 43 },
  // right eye
  { x: 56, y: 39 }, { x: 61, y: 37 }, { x: 66, y: 39 }, { x: 66, y: 43 }, { x: 61, y: 44 }, { x: 56, y: 43 },
  // nose
  { x: 50, y: 46 }, { x: 50, y: 52 }, { x: 50, y: 58 },
  { x: 44, y: 61 }, { x: 50, y: 63 }, { x: 56, y: 61 },
  // mouth
  { x: 40, y: 71 }, { x: 46, y: 69 }, { x: 50, y: 70 }, { x: 54, y: 69 }, { x: 60, y: 71 }, { x: 50, y: 76 },
  // jawline
  { x: 24, y: 54 }, { x: 22, y: 64 }, { x: 26, y: 76 }, { x: 35, y: 86 },
  { x: 50, y: 90 }, { x: 65, y: 86 }, { x: 74, y: 76 }, { x: 78, y: 64 }, { x: 76, y: 54 },
  // forehead
  { x: 34, y: 28 }, { x: 42, y: 24 }, { x: 50, y: 22 }, { x: 58, y: 24 }, { x: 66, y: 28 },
  { x: 26, y: 40 }, { x: 74, y: 40 },
];

/* ─────────────────────────────────────
   FACE SVG OVERLAY
───────────────────────────────────── */
const FaceScan = ({ scanning, acc }: { scanning: boolean; acc: typeof ACCESSORIES[0] }) => (
  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }}>
    {/* Oval face */}
    <ellipse cx="50" cy="56" rx="28" ry="36" fill="none" stroke={`${acc.color}20`} strokeWidth="0.35" />
    {/* Forehead arc */}
    <path d="M 24 42 Q 50 12 76 42" fill="none" stroke={`${acc.color}18`} strokeWidth="0.3" />

    {/* Eye sockets */}
    <ellipse cx="39" cy="40" rx="9" ry="5.5" fill="none" stroke={`${acc.color}30`} strokeWidth="0.25" />
    <ellipse cx="61" cy="40" rx="9" ry="5.5" fill="none" stroke={`${acc.color}30`} strokeWidth="0.25" />

    {/* GLASSES guide */}
    {acc.id === "glasses" && (
      <g>
        <rect x="26" y="35.5" width="23" height="13" rx="6" fill="none" stroke={`${acc.color}90`} strokeWidth="0.6" strokeDasharray="1 0.4" />
        <rect x="51" y="35.5" width="23" height="13" rx="6" fill="none" stroke={`${acc.color}90`} strokeWidth="0.6" strokeDasharray="1 0.4" />
        <line x1="49" y1="42" x2="51" y2="42" stroke={`${acc.color}80`} strokeWidth="0.5" />
        <line x1="18" y1="42" x2="26" y2="42" stroke={`${acc.color}50`} strokeWidth="0.4" />
        <line x1="74" y1="42" x2="82" y2="42" stroke={`${acc.color}50`} strokeWidth="0.4" />
      </g>
    )}

    {/* WATCH wrist guide */}
    {acc.id === "watch" && (
      <g>
        <rect x="32" y="84" width="36" height="11" rx="2" fill="none" stroke={`${acc.color}70`} strokeWidth="0.6" strokeDasharray="1 0.4" />
        <rect x="25" y="86" width="9" height="7" rx="1" fill="none" stroke={`${acc.color}50`} strokeWidth="0.4" />
        <rect x="66" y="86" width="9" height="7" rx="1" fill="none" stroke={`${acc.color}50`} strokeWidth="0.4" />
        <circle cx="50" cy="89" r="3.5" fill="none" stroke={`${acc.color}60`} strokeWidth="0.4" />
      </g>
    )}

    {/* JEWELRY ring guide */}
    {acc.id === "jewelry" && (
      <g>
        <line x1="57" y1="83" x2="63" y2="93" stroke={`${acc.color}60`} strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="60" cy="88" rx="3" ry="1.8" transform="rotate(15,60,88)" fill="none" stroke={`${acc.color}90`} strokeWidth="0.7" strokeDasharray="0.8 0.3" />
        <circle cx="60" cy="86.5" r="1" fill={`${acc.color}60`} />
      </g>
    )}

    {/* Mesh triangle lines */}
    <g stroke={`${acc.color}10`} strokeWidth="0.2" fill="none">
      <polygon points="34,39 44,39 50,46" />
      <polygon points="56,39 66,39 50,46" />
      <polygon points="50,46 44,61 56,61" />
      <polygon points="40,71 50,63 60,71" />
      <polygon points="24,54 34,39 22,64" />
      <polygon points="76,54 66,39 78,64" />
      <polygon points="34,28 42,24 50,22" />
      <polygon points="66,28 58,24 50,22" />
    </g>

    {/* Landmark dots */}
    {LANDMARKS.map((pt, i) => (
      <motion.circle
        key={i}
        cx={pt.x}
        cy={pt.y}
        r="0.4"
        fill={acc.color}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: scanning ? [0.2, 1, 0.2] : 0.4 }}
        transition={{ duration: 1.4, delay: i * 0.025, repeat: scanning ? Infinity : 0 }}
      />
    ))}

    {/* Corner brackets */}
    <g stroke={`${acc.color}60`} strokeWidth="0.7" fill="none">
      <path d="M 4 4 L 4 14 M 4 4 L 14 4" />
      <path d="M 96 4 L 96 14 M 96 4 L 86 4" />
      <path d="M 4 96 L 4 86 M 4 96 L 14 96" />
      <path d="M 96 96 L 96 86 M 96 96 L 86 96" />
    </g>

    {/* Centre reticle */}
    <g stroke={`${acc.color}35`} strokeWidth="0.3">
      <line x1="50" y1="47" x2="50" y2="51" />
      <line x1="48" y1="49" x2="52" y2="49" />
      <circle cx="50" cy="49" r="2.5" fill="none" strokeDasharray="0.6 0.6" />
    </g>
  </svg>
);

/* ─────────────────────────────────────
   3-D ACCESSORY MODELS
───────────────────────────────────── */
const AccessoryModel = ({ type }: { type: string }) => {
  const g = useRef<THREE.Group>(null!);
  const gem = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (g.current) {
      g.current.rotation.y = t * 0.45;
      g.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
    if (gem.current) gem.current.rotation.y = -t * 0.6;
  });

  const mat = (color: string) => (
    <MeshDistortMaterial color={color} speed={2} distort={0.12} roughness={0.05} metalness={0.95} />
  );

  if (type === "glasses") return (
    <group ref={g}>
      <mesh position={[-0.72, 0, 0]}>
        <torusGeometry args={[0.58, 0.075, 16, 60]} />
        {mat("#00f3ff")}
      </mesh>
      <mesh position={[0.72, 0, 0]}>
        <torusGeometry args={[0.58, 0.075, 16, 60]} />
        {mat("#00f3ff")}
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.055, 0.055]} />
        <meshStandardMaterial color="#00f3ff" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* arms */}
      <mesh position={[-1.5, 0, -0.4]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.04]} />
        <meshStandardMaterial color="#00c8d4" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[1.5, 0, -0.4]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.04]} />
        <meshStandardMaterial color="#00c8d4" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );

  if (type === "watch") return (
    <group ref={g}>
      <mesh>
        <cylinderGeometry args={[0.82, 0.82, 0.28, 64]} />
        {mat("#bc13fe")}
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.02, 64]} />
        <meshStandardMaterial color="#050508" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* dial marks */}
      {[...Array(12)].map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.52, 0.16, Math.cos(a) * 0.52]}>
            <boxGeometry args={[0.025, 0.01, i % 3 === 0 ? 0.1 : 0.05]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#bc13fe" : "#555"} />
          </mesh>
        );
      })}
      {/* crown */}
      <mesh position={[0.9, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#bc13fe" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* strap */}
      <mesh position={[0, 0, 1.0]}>
        <boxGeometry args={[1.1, 0.18, 0.8]} />
        <meshStandardMaterial color="#2a0a3e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -1.0]}>
        <boxGeometry args={[1.1, 0.18, 0.8]} />
        <meshStandardMaterial color="#2a0a3e" roughness={0.8} />
      </mesh>
    </group>
  );

  // jewelry
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[0.88, 0.19, 32, 80]} />
        <MeshDistortMaterial color="#d4a017" speed={2.5} distort={0.1} roughness={0.02} metalness={1.0} />
      </mesh>
      <mesh ref={gem} position={[0, 0.88, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#00f3ff"
          roughness={0}
          metalness={0.1}
          transmission={0.85}
          thickness={0.6}
          transparent
        />
      </mesh>
      {/* pavé band details */}
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.88, Math.cos(a) * 0.88 * 0.05, Math.cos(a) * 0.88 * 0.3]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#fff" roughness={0} metalness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ─────────────────────────────────────
   ACCESSORY DATA
───────────────────────────────────── */
const ACCESSORIES = [
  {
    id: "glasses",
    Icon: Glasses,
    label: "EYEWEAR",
    tag: "UV MAPPED",
    desc: "Digital lens mapping with real-time UV simulation and AR depth calibration.",
    color: "#00f3ff",
    specs: [{ k: "LENS_W", v: "52mm" }, { k: "BRIDGE", v: "18mm" }, { k: "MESH", v: "8K" }],
  },
  {
    id: "watch",
    Icon: Watch,
    label: "TIMEPIECES",
    tag: "WRIST SCALED",
    desc: "Precision wrist scaling with circumference AI detection for luxury brand accuracy.",
    color: "#bc13fe",
    specs: [{ k: "CASE_Ø", v: "41mm" }, { k: "LUG_W", v: "20mm" }, { k: "BEZEL", v: "CERAMIC" }],
  },
  {
    id: "jewelry",
    Icon: Sparkles,
    label: "FINE JEWELRY",
    tag: "MICRO DETAIL",
    desc: "Sub-millimetre rendering for rings & chains with gemstone ray-tracing.",
    color: "#d4a017",
    specs: [{ k: "RING_SZ", v: "US 7" }, { k: "CARATS", v: "2.4ct" }, { k: "TEX", v: "PBR_4K" }],
  },
] as const;

type Acc = typeof ACCESSORIES[number];

/* ─────────────────────────────────────
   SCAN SEQUENCE
───────────────────────────────────── */
const STEPS = [
  "INITIALIZING SPATIAL MAP…",
  "DETECTING FACE GEOMETRY…",
  "CALIBRATING LANDMARK NODES…",
  "FITTING ACCESSORY MESH…",
  "RENDERING FINAL OUTPUT…",
  "COMPLETE — CONFIDENCE 99.2%",
];

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────── */
export default function AccessoryVault() {
  const [active, setActive] = useState<Acc>(ACCESSORIES[0]);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(-1);
  const [done, setDone] = useState(false);

  const triggerScan = () => {
    setScanning(true);
    setDone(false);
    setScanStep(0);
    let s = 0;
    const id = setInterval(() => {
      s++;
      setScanStep(s);
      if (s >= STEPS.length - 1) {
        clearInterval(id);
        setScanning(false);
        setDone(true);
      }
    }, 400);
  };

  const switchAcc = (a: Acc) => {
    if (a.id === active.id) return;
    setActive(a);
    setDone(false);
    setScanStep(-1);
    setTimeout(triggerScan, 200);
  };

  return (
    <section id="accessories" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,243,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,243,255,1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 65% 55% at 65% 50%, ${active.color}05, transparent 70%)`, transition: "background 0.6s ease" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] mb-3 uppercase" style={{ color: active.color }}>
              // ACCESSORY_VAULT.exe
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
              EVERY DETAIL{" "}
              <motion.span
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${active.color}, #bc13fe)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                DEFINED
              </motion.span>
            </h2>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
              AI Engine — Ready
            </span>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 items-start">

          {/* ── LEFT PANEL ── */}
          <div className="flex flex-col gap-5">

            {/* Category tabs */}
            <div className="space-y-2.5">
              {ACCESSORIES.map((a) => {
                const isAct = active.id === a.id;
                return (
                  <motion.button
                    key={a.id}
                    onClick={() => switchAcc(a)}
                    whileTap={{ scale: 0.985 }}
                    className="w-full flex items-center gap-5 p-5 text-left relative overflow-hidden border transition-all duration-300 group"
                    style={{
                      borderColor: isAct ? a.color : "rgba(255,255,255,0.05)",
                      background: isAct ? `${a.color}0d` : "rgba(255,255,255,0.015)",
                    }}
                  >
                    {/* active left bar */}
                    {isAct && (
                      <motion.div
                        layoutId="bar"
                        className="absolute left-0 top-0 bottom-0 w-[2px]"
                        style={{ background: a.color }}
                      />
                    )}
                    {/* hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at left, ${a.color}0a, transparent 55%)` }}
                    />

                    <div
                      className="relative z-10 p-3 flex-shrink-0 transition-all duration-300"
                      style={{ background: isAct ? a.color : "rgba(255,255,255,0.06)", color: isAct ? "#000" : "#fff" }}
                    >
                      <a.Icon className="w-5 h-5" />
                    </div>

                    <div className="relative z-10 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black tracking-[0.15em] text-sm">{a.label}</span>
                        <span
                          className="text-[8px] px-1.5 py-0.5 font-mono font-bold tracking-wider border"
                          style={{ color: a.color, borderColor: `${a.color}40` }}
                        >
                          {a.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                    </div>

                    <ChevronRight
                      className="relative z-10 w-4 h-4 flex-shrink-0 transition-all duration-300"
                      style={{ color: isAct ? a.color : "#374151", transform: isAct ? "rotate(90deg)" : "none" }}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* 3D Preview Box */}
            <div
              className="relative border bg-black overflow-hidden flex flex-col"
              style={{ borderColor: `${active.color}22`, height: 280 }}
            >
              {/* Corner ticks */}
              {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 left-0 -rotate-90", "bottom-0 right-0 rotate-180"].map((p, i) => (
                <div key={i} className={`absolute ${p} z-10 pointer-events-none`}>
                  <div className="w-5 h-[1.5px]" style={{ background: active.color, opacity: 0.45 }} />
                  <div className="w-[1.5px] h-5 -mt-[1.5px]" style={{ background: active.color, opacity: 0.45 }} />
                </div>
              ))}

              <div className="absolute top-3 left-4 z-10 font-mono text-[9px] tracking-widest uppercase" style={{ color: active.color }}>
                3D_PREVIEW — {active.label}
              </div>

              {/* Canvas */}
              <div className="flex-1">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 48 }} dpr={[1, 2]}>
                  <color attach="background" args={["#000"]} />
                  <ambientLight intensity={0.25} />
                  <pointLight position={[5, 5, 5]} intensity={2.5} color={active.color} />
                  <pointLight position={[-5, -3, 3]} intensity={1.5} color="#bc13fe" />
                  <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
                    <AccessoryModel type={active.id} />
                  </Float>
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
                </Canvas>
              </div>

              {/* Spec strip */}
              <div className="flex border-t" style={{ borderColor: `${active.color}18` }}>
                {active.specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex-1 py-2.5 text-center border-r last:border-r-0"
                    style={{ borderColor: `${active.color}12` }}
                  >
                    <p className="text-[7px] font-mono tracking-widest text-gray-600 uppercase">{s.k}</p>
                    <p className="text-[12px] font-black tracking-tight" style={{ color: active.color }}>{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT — TRY-ON BOOTH ── */}
          <div
            className="relative border bg-black flex flex-col overflow-hidden"
            style={{ borderColor: `${active.color}20`, minHeight: 620 }}
          >
            {/* Top status bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
              style={{ borderColor: `${active.color}15` }}
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{ opacity: scanning ? [1, 0.3, 1] : 1 }}
                  transition={{ duration: 0.8, repeat: scanning ? Infinity : 0 }}
                  style={{ background: scanning ? "#f59e0b" : done ? "#22c55e" : active.color }}
                />
                <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
                  {scanning ? "SCANNING…" : done ? "RENDER COMPLETE" : "AWAITING INPUT"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-mono text-gray-700 tracking-widest hidden sm:block">FPS: 60</span>
                <span className="text-[9px] font-mono text-gray-700 tracking-widest">TRY-ON v2.4</span>
              </div>
            </div>

            {/* Viewport */}
            <div className="relative flex-1 overflow-hidden" style={{ minHeight: 400 }}>

              {/* Sweep scan line */}
              {scanning && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${active.color} 50%, transparent 100%)`,
                    boxShadow: `0 0 16px ${active.color}`,
                  }}
                  animate={{ top: ["8%", "92%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* Done glow wash */}
              <AnimatePresence>
                {done && (
                  <motion.div
                    key="glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{ background: `radial-gradient(ellipse 55% 70% at 50% 38%, ${active.color}08, transparent 70%)` }}
                  />
                )}
              </AnimatePresence>

              {/* Person silhouette */}
              <svg
                viewBox="0 0 200 320"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[82%] opacity-[0.14]"
                fill="white"
              >
                <ellipse cx="100" cy="55" rx="37" ry="47" />
                <rect x="88" y="97" width="24" height="20" />
                <path d="M32 118 Q66 108 88 118 L88 238 H112 L112 118 Q134 108 168 118 L174 258 H26 Z" />
                <path d="M32 118 L12 218 L26 222 L42 130 Z" />
                <path d="M168 118 L188 218 L174 222 L158 130 Z" />
              </svg>

              {/* Face scan SVG overlay */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[52%]" style={{ top: "12%", aspectRatio: "1" }}>
                <FaceScan scanning={scanning} acc={active} />
              </div>

              {/* Accessory placement highlight */}
              <AnimatePresence>
                {done && (
                  <motion.div
                    key={`hl-${active.id}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      top: active.id === "glasses" ? "21.5%" : "64%",
                      width: active.id === "watch" ? "84px" : active.id === "jewelry" ? "44px" : "130px",
                      height: active.id === "glasses" ? "22px" : active.id === "watch" ? "28px" : "44px",
                      border: `1px solid ${active.color}90`,
                      boxShadow: `0 0 24px ${active.color}50, inset 0 0 18px ${active.color}12`,
                      borderRadius: active.id === "glasses" ? "12px" : "4px",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* HUD data labels */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none space-y-0.5">
                <p className="text-[8px] font-mono tracking-widest uppercase" style={{ color: active.color }}>
                  FACE_MAP: ACTIVE
                </p>
                <p className="text-[8px] font-mono text-gray-700">NODES: {LANDMARKS.length}</p>
                <p className="text-[8px] font-mono text-gray-700">DEPTH: 3.2mm</p>
              </div>
              <div className="absolute top-4 right-4 z-10 pointer-events-none text-right space-y-0.5">
                <p className="text-[8px] font-mono text-gray-700">CONFIDENCE</p>
                <p className="text-[10px] font-black font-mono" style={{ color: active.color }}>
                  {done ? "99.2%" : "—"}
                </p>
              </div>

              {/* Upload prompt — idle state */}
              {!scanning && !done && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-16 h-16 border-2 flex items-center justify-center"
                      style={{ borderColor: `${active.color}50` }}
                    >
                      <Upload className="w-6 h-6" style={{ color: active.color }} />
                    </div>
                    <p className="text-xs font-bold tracking-[0.2em] text-white uppercase">Upload Your Photo</p>
                    <p className="text-[10px] text-gray-600 font-mono">JPG / PNG — Max 10MB</p>
                  </motion.div>
                  <p className="text-[9px] font-mono tracking-widest text-gray-700">OR HIT DEMO SCAN BELOW</p>
                </div>
              )}
            </div>

            {/* Scan progress log */}
            <AnimatePresence>
              {(scanning || done) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 py-3 border-t overflow-hidden flex-shrink-0"
                  style={{ borderColor: `${active.color}18` }}
                >
                  {STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 py-[2px]">
                      <span className="text-[8px] font-mono w-3" style={{ color: i <= scanStep ? active.color : "#374151" }}>
                        {i < scanStep ? "✓" : i === scanStep ? "›" : "·"}
                      </span>
                      <span
                        className="text-[9px] font-mono tracking-widest"
                        style={{ color: i <= scanStep ? (i === STEPS.length - 1 ? "#22c55e" : active.color) : "#1f2937" }}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Done confidence bar */}
            <AnimatePresence>
              {done && !scanning && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-5 py-2 border-t flex items-center justify-between flex-shrink-0"
                  style={{ borderColor: `${active.color}15` }}
                >
                  <span className="text-[9px] font-mono text-green-400 tracking-widest">
                    ✓ FIT MAPPED — {active.label}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[100, 80, 100, 90, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="w-3 origin-bottom"
                        style={{ height: `${h * 0.08}px`, background: active.color, opacity: 0.75 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div
              className="px-5 py-4 border-t flex gap-3 flex-shrink-0"
              style={{ borderColor: `${active.color}12` }}
            >
              <button
                onClick={triggerScan}
                className="flex-1 py-3.5 font-black uppercase tracking-[0.15em] text-xs text-black flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
                style={{ background: active.color }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Your Photo
                </span>
                {/* shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </button>

              <button
                onClick={triggerScan}
                className="px-5 py-3.5 border font-bold uppercase tracking-[0.15em] text-xs flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{ borderColor: `${active.color}40`, color: active.color }}
              >
                <Scan className="w-3.5 h-3.5" />
                Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}