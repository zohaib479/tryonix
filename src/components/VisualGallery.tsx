"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ITEMS = [
  { id: 1, image: "/images/demo1.png", title: "EASTERN COUTURE", cat: "Shalwar Kameez", accent: "#00f3ff", num: "01" },
  { id: 2, image: "/images/demo2.png", title: "MODERN KURTI", cat: "Women's Fashion", accent: "#bc13fe", num: "02" },
  { id: 3, image: "/images/demo3.png", title: "URBAN FIT", cat: "Streetwear", accent: "#00f3ff", num: "03" },
  { id: 4, image: "/images/demo4.png", title: "FORMAL CULTURE", cat: "Men's Fashion", accent: "#bc13fe", num: "04" },
  { id: 5, image: "/images/demo5.png", title: "THREE PIECE", cat: "Wedding", accent: "#d4a017", num: "05" },
];

const DURATION = 3500;

export default function VisualGallery() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const item = ITEMS[idx];

  const next = () => setIdx((p) => (p + 1) % ITEMS.length);
  const prev = () => setIdx((p) => (p - 1 + ITEMS.length) % ITEMS.length);
  const goTo = (n: number) => setIdx(n);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [idx, paused]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ───────── SLIDES ───────── */}
      {ITEMS.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: i === idx ? 2 : 1,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          {/* BLURRED BG */}
          <img
            src={slide.image}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(30px)",
              opacity: 0.2,
              transform: "scale(1.1)",
            }}
          />

          {/* MAIN IMAGE — plain img, no motion */}
          <img
            src={slide.image}
            alt={slide.title}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "45%",
              height: "80%",
              objectFit: "contain",
              zIndex: 10,
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.55))",
            }}
          />
        </div>
      ))}

      {/* ───────── OVERLAY ───────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ───────── CONTENT ───────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%", padding: "0 4rem" }}>

          {/* CATEGORY */}
          <AnimatePresence mode="wait">
            <motion.p
              key={item.cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ color: item.accent, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 16 }}
            >
              {item.cat}
            </motion.p>
          </AnimatePresence>

          {/* TITLE */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={item.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.7 }}
              style={{ color: "white", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", fontSize: "clamp(3rem, 6vw, 6rem)", margin: 0 }}
            >
              {item.title}
            </motion.h1>
          </AnimatePresence>

          {/* NUMBER */}
          <p style={{ color: "rgba(255,255,255,0.07)", fontSize: "5rem", fontWeight: 900, marginTop: 16, fontFamily: "monospace" }}>
            {item.num}
          </p>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button style={{ padding: "14px 28px", background: "white", color: "black", fontWeight: 900, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
              TRY ON
            </button>
            <button style={{ padding: "14px 28px", background: "transparent", color: "white", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}>
              VIEW
            </button>
          </div>

          {/* DOTS */}
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 48 }}>
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  height: 3,
                  width: i === idx ? 60 : 16,
                  background: i === idx ? item.accent : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* ARROWS */}
          <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
            <button
              onClick={prev}
              style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "white", fontSize: 18, cursor: "pointer" }}
            >
              ←
            </button>
            <button
              onClick={next}
              style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "white", fontSize: 18, cursor: "pointer" }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ───────── THUMBNAILS ───────── */}
      <div style={{ position: "absolute", bottom: 32, right: 32, zIndex: 30, display: "flex", gap: 10 }}>
        {ITEMS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              width: i === idx ? 82 : 52,
              height: i === idx ? 58 : 42,
              overflow: "hidden",
              border: "none",
              padding: 0,
              cursor: "pointer",
              outline: i === idx ? "1.5px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.1)",
              outlineOffset: 2,
              transition: "all 0.4s ease",
            }}
          >
            <img
              src={s.image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: i === idx ? "brightness(0.95)" : "brightness(0.45) grayscale(0.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}