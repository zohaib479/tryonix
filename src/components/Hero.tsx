"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   PARTICLE CLOUD
───────────────────────────────────────── */
const ParticleField = () => {
  const COUNT = 2500;
  const points = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 28;
      p[i * 3 + 1] = (Math.random() - 0.5) * 28;
      p[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.025;
    ref.current.rotation.x = t * 0.010;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f3ff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

/* ─────────────────────────────────────────
   ORBITAL RINGS
───────────────────────────────────────── */
const OrbitalRings = () => {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring1.current.rotation.x = t * 0.3;
    ring1.current.rotation.z = t * 0.15;
    ring2.current.rotation.y = t * 0.2;
    ring2.current.rotation.z = -t * 0.25;
    ring3.current.rotation.x = -t * 0.15;
    ring3.current.rotation.y = t * 0.35;
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.01, 2, 120]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.3, 0.007, 2, 120]} />
        <meshBasicMaterial color="#bc13fe" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3.8, 0.004, 2, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────
   SATELLITE ORBS
───────────────────────────────────────── */
const SatelliteOrbs = () => {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const angle  = t * 0.22 + (i * Math.PI * 2) / 5;
      const radius = 4;
      child.position.x = Math.cos(angle) * radius;
      child.position.z = Math.sin(angle) * radius;
      child.position.y = Math.sin(t * 0.35 + i) * 0.7;
      (child as THREE.Mesh).rotation.x += 0.008;
      (child as THREE.Mesh).rotation.y += 0.012;
    });
  });

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} scale={0.16 + (i % 3) * 0.05}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
            wireframe
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ─────────────────────────────────────────
   CORE HOLOGRAM
───────────────────────────────────────── */
const CyberHologram = () => {
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);
  const meshRef3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef1.current.rotation.x = t * 0.08;
    meshRef1.current.rotation.y = t * 0.14;
    meshRef2.current.rotation.x = -t * 0.05;
    meshRef2.current.rotation.y = -t * 0.11;
    meshRef3.current.rotation.x = t * 0.03;
    meshRef3.current.rotation.z = t * 0.09;
  });

  return (
    // position y=-0.4 nudges object slightly down → sits centred behind text stack
    <group position={[0, -0.4, 0]}>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh ref={meshRef1}>
          <torusKnotGeometry args={[1.6, 0.42, 320, 80, 2, 3]} />
          <MeshDistortMaterial
            color="#00f3ff"
            speed={2}
            distort={0.25}
            radius={1}
            wireframe
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh ref={meshRef2} scale={1.18}>
          <torusKnotGeometry args={[1.6, 0.42, 160, 40, 2, 3]} />
          <meshBasicMaterial
            color="#bc13fe"
            wireframe
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh ref={meshRef3} scale={0.5}>
          <torusKnotGeometry args={[1.6, 0.42, 80, 20, 2, 3]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      <OrbitalRings />
      <SatelliteOrbs />
    </group>
  );
};

/* ─────────────────────────────────────────
   GLITCH HOOK
───────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";
function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const id = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) =>
          i < iter ? ch : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      if (iter >= text.length) clearInterval(id);
      iter += 0.4;
    }, 35);
    return () => clearInterval(id);
  }, [active, text]);
  return display;
}

/* ─────────────────────────────────────────
   SCANLINES
───────────────────────────────────────── */
const Scanlines = () => (
  <div
    className="pointer-events-none absolute inset-0 z-30 opacity-[0.025]"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,243,255,0.25) 3px,rgba(0,243,255,0.25) 4px)",
    }}
  />
);

/* ─────────────────────────────────────────
   DATA STREAM
───────────────────────────────────────── */
const DATA_LINES = [
  "SYS::NEURAL_MAPPING v4.2.0 — ONLINE",
  "BODY_SCAN: 4096pt mesh — COMPLETE",
  "AI_FIT_ENGINE: CALIBRATED",
  "RENDER_PIPELINE: RTX_ULTRA — ACTIVE",
  "IDENTITY_LAYER: ENCRYPTED",
  "FASHION_DB: 2.4M skus indexed",
];

const DataStream = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % DATA_LINES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4 }}
        className="text-cyber-cyan font-mono text-[10px] tracking-[0.25em]"
      >
        {DATA_LINES[idx]}
      </motion.span>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
const stats = [
  { val: "99.8%", label: "Fit Accuracy" },
  { val: "4K",    label: "Render Fidelity" },
  { val: "<2s",   label: "Processing Time" },
];

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
const Hero = () => {
  const [hovered, setHovered] = useState(false);
  const glitchedTitle = useGlitch("TRYONIX", hovered);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(((clientX - left) / width  - 0.5) * 18);
    mouseY.set(((clientY - top)  / height - 0.5) * 12);
  };

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* GRAIN */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <Scanlines />

      {/* GLOWS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_55%,rgba(0,243,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_72%_28%,rgba(188,19,254,0.05)_0%,transparent_65%)]" />
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,243,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,243,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 55%, black 30%, transparent 100%)",
        }}
      />

      {/* 3D — camera.y=0.5 lifts the view slightly so object aligns with screen centre */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0.5, 9.5], fov: 52 }} dpr={[1, 2]}>
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000", 14, 32]} />

          <ambientLight intensity={0.12} />
          <pointLight position={[8,  8,  8]}  color="#00f3ff" intensity={2.5} />
          <pointLight position={[-8,-8,-8]}   color="#bc13fe" intensity={1.8} />
          <pointLight position={[0,  10, 0]}  color="#ffffff" intensity={0.8} />
          <spotLight position={[0, 6, 10]} angle={0.2} penumbra={1} intensity={3.5} color="#00f3ff" />

          <ParticleField />
          <CyberHologram />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI * 0.62}
            minPolarAngle={Math.PI * 0.38}
          />
        </Canvas>
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl w-full"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* STATUS PILL */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-cyber-cyan/20 bg-cyber-cyan/[0.04] backdrop-blur-sm rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan" />
            </span>
            <DataStream />
          </motion.div>

          {/* TITLE */}
          <div className="relative mb-6">
            <h1
              aria-hidden
              className="absolute inset-0 text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.85] select-none pointer-events-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,243,255,0.12)",
                transform: "translate(3px, 3px)",
                filter: "blur(1.5px)",
              }}
            >
              TRY<span className="italic">ONIX</span>
            </h1>
            <h1
              className="relative text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.85] cursor-default select-none"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="text-white" style={{ filter: "drop-shadow(0 0 35px rgba(0,243,255,0.2))" }}>
                TRY
              </span>
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #00f3ff 0%, #bc13fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 28px rgba(0,243,255,0.4))",
                }}
              >
                {glitchedTitle.slice(3)}
              </span>
            </h1>
          </div>

          {/* DIVIDER */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="h-[1.5px] w-32 mx-auto mb-8"
            style={{ background: "linear-gradient(90deg, transparent, #00f3ff, #bc13fe, transparent)" }}
          />

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Precision AI mapping meets high-end fashion.{" "}
            <br />
            <span className="text-white font-medium tracking-tight">
              Virtual try-ons that actually look real.
            </span>
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1 }}
            className="flex flex-col md:flex-row gap-5 justify-center items-center mb-16"
          >
            <button className="group relative px-12 py-4 bg-cyber-cyan text-black font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95">
              <span className="relative z-10">Launch Experience</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black/40" />
            </button>

            <button className="group relative px-12 py-4 border border-white/12 text-white font-bold uppercase tracking-[0.2em] text-sm backdrop-blur-sm transition-all duration-300 hover:border-cyber-purple/60 hover:text-cyber-purple hover:scale-[1.03] active:scale-95">
              View Technology
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at center, rgba(188,19,254,0.05) 0%, transparent 70%)" }}
              />
            </button>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1 }}
            className="flex justify-center gap-px"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-8 py-4 border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm flex flex-col items-center gap-1 min-w-[110px]"
              >
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{
                    background: "linear-gradient(135deg,#00f3ff,#bc13fe)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.val}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* HUD CORNERS */}
      {[
        "top-6 left-6",
        "top-6 right-6 rotate-90",
        "bottom-6 left-6 -rotate-90",
        "bottom-6 right-6 rotate-180",
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + i * 0.08, duration: 0.8 }}
          className={`absolute ${pos} z-20 pointer-events-none`}
        >
          <div className="w-8 h-[1.5px] bg-cyber-cyan/30" />
          <div className="w-[1.5px] h-8 bg-cyber-cyan/30 -mt-[1.5px]" />
        </motion.div>
      ))}

      {/* SIDE LABELS */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-cyber-cyan/30" />
        <span className="text-[9px] font-bold tracking-[0.35em] text-cyber-cyan/40 uppercase [writing-mode:vertical-rl] rotate-180">
          Neural Engine
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-cyber-cyan/30 to-transparent" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-3">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-cyber-purple/30" />
        <span className="text-[9px] font-bold tracking-[0.35em] text-cyber-purple/40 uppercase [writing-mode:vertical-rl]">
          AI Mapping
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-cyber-purple/30 to-transparent" />
      </div>

      {/* SCROLL */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[9px] tracking-[0.35em] text-gray-600 uppercase font-bold">Scroll</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-cyber-cyan/50 via-cyber-purple/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;