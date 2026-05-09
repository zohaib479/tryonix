"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Glasses, Watch, Sparkles, Scan } from "lucide-react";

/* ───────── DATA ───────── */
const ACCESSORIES = [
  { id: "glasses", label: "Eyewear", color: "#00f3ff", Icon: Glasses },
  { id: "watch", label: "Watch", color: "#bc13fe", Icon: Watch },
  { id: "jewelry", label: "Jewelry", color: "#d4a017", Icon: Sparkles },
] as const;

type Acc = typeof ACCESSORIES[number];

/* ───────── SIMPLE 3D MODEL ───────── */
function Model({ color }: { color: string }) {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ───────── MAIN COMPONENT ───────── */
export default function AccessoryVault() {
  const [active, setActive] = useState<Acc>(ACCESSORIES[0]);
  const [scanning, setScanning] = useState(false);

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="p-8 bg-black text-white space-y-6">

      {/* TOP BUTTONS */}
      <div className="flex gap-3">
        {ACCESSORIES.map((a) => (
          <button
            key={a.id}
            onClick={() => setActive(a)}
            className="px-4 py-2 border rounded"
            style={{
              borderColor: a.color,
              background: active.id === a.id ? a.color : "transparent",
              color: active.id === a.id ? "#000" : "#fff",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* 3D BOX */}
      <div className="h-[350px] border">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <Model color={active.color} />
          <OrbitControls />
        </Canvas>
      </div>

      {/* STATUS */}
      <div className="text-sm text-gray-400">
        {scanning ? "Scanning..." : "Ready"}
      </div>

      {/* SCAN BUTTON */}
      <button
        onClick={triggerScan}
        className="px-6 py-3 bg-white text-black flex items-center gap-2"
      >
        <Scan size={16} />
        Scan
      </button>

    </div>
  );
}