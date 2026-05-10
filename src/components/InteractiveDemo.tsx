"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ── Slides ─────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop",
    collection: "SS 2025",
    title: "PURE SILHOUETTE",
    sub: "Deconstructed minimal tailoring",
    tag: "NEW ARRIVAL",
    index: "01",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop",
    collection: "NOIR EDIT",
    title: "DARK LUXURY",
    sub: "Evening wear redefined in shadow",
    tag: "EXCLUSIVE",
    index: "02",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2400&auto=format&fit=crop",
    collection: "MASC SERIES",
    title: "URBAN EDGE",
    sub: "Streetwear precision with couture DNA",
    tag: "BESTSELLER",
    index: "03",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2400&auto=format&fit=crop",
    collection: "RESORT 2025",
    title: "LIGHT TOUCH",
    sub: "Ethereal layers for the avant-garde",
    tag: "LIMITED",
    index: "04",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2400&auto=format&fit=crop",
    collection: "ARCHIVES",
    title: "TIMELESS CUT",
    sub: "Heritage craft meets modern geometry",
    tag: "ARCHIVE",
    index: "05",
  },
];

const TOTAL = SLIDES.length;

/* ── Progress bar ────────────────────────────────────────────────── */
const ProgressBar = ({
  active,
  duration,
}: {
  active: boolean;
  duration: number;
}) => {
  return (
    <div className="relative h-[2px] bg-white/10 overflow-hidden flex-1">
      {active && (
        <motion.div
          className="absolute inset-y-0 left-0 bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
      {!active && <div className="absolute inset-y-0 left-0 bg-white/0" />}
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────── */
const PremiumCollection = () => {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const DURATION = 4500;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (n: number) => {
    setPrev(idx);
    setIdx(n);
  };

  const next = () => goTo((idx + 1) % TOTAL);
  const back = () => goTo((idx - 1 + TOTAL) % TOTAL);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, DURATION);
    return () => clearInterval(timerRef.current!);
  }, [idx, paused]);

  const slide = SLIDES[idx];

  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none"
      style={{ height: "88vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── IMAGE LAYERS — stacked, crossfade, zero gap ── */}
      {SLIDES.map((s, i) => (
        <motion.div
          key={s.id}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ zIndex: i === idx ? 1 : 0 }}
        >
          {/* slight zoom-in on active */}
          <motion.img
            src={s.url}
            alt=""
            className="w-full h-full object-cover"
            animate={{ scale: i === idx ? 1.05 : 1.0 }}
            transition={{ duration: DURATION / 1000 + 1.1, ease: "linear" }}
            style={{ filter: "grayscale(0.15) brightness(0.72)" }}
          />
        </motion.div>
      ))}

      {/* ── VIGNETTE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.45) 100%), linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
          zIndex: 2,
        }}
      />

      {/* ── NOISE GRAIN ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          zIndex: 3,
        }}
      />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 flex flex-col justify-between px-10 md:px-16 py-12" style={{ zIndex: 4 }}>

        {/* TOP BAR */}
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mb-1">
              Premium Collection
            </p>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white leading-none">
              TRYONIX
              <span className="not-italic text-white/25">_SHOWCASE</span>
            </h2>
          </motion.div>

          {/* Slide counter */}
          <div className="text-right hidden md:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-black text-white/10 tracking-tighter leading-none font-mono"
              >
                {slide.index}
              </motion.p>
            </AnimatePresence>
            <p className="text-[9px] font-mono tracking-widest text-white/25 uppercase mt-1">
              / {String(TOTAL).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* CENTRE TAG */}
        <div className="flex-1 flex items-end pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              {/* Tag pill */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="text-[9px] font-bold tracking-[0.35em] text-white uppercase font-mono">
                  {slide.tag}
                </span>
              </div>

              {/* Collection name */}
              <p className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase mb-2">
                {slide.collection}
              </p>

              {/* Hero title */}
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white mb-4">
                {slide.title}
              </h3>

              {/* Sub */}
              <p className="text-sm text-white/50 font-light tracking-wider leading-relaxed max-w-sm">
                {slide.sub}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-5 mt-8">
                <button className="group relative px-8 py-3.5 bg-white text-black font-black uppercase tracking-[0.15em] text-xs overflow-hidden transition-all duration-200 hover:scale-[1.03] active:scale-95">
                  <span className="relative z-10">Try On Now</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12" />
                </button>
                <button className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase hover:text-white transition-colors duration-200 underline underline-offset-4">
                  View Collection
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex items-end justify-between gap-6">

          {/* Progress bars */}
          <div className="flex-1 space-y-2 max-w-xs hidden md:block">
            <div className="flex gap-1.5">
              {SLIDES.map((s, i) => (
                <ProgressBar key={s.id} active={i === idx && !paused} duration={DURATION} />
              ))}
            </div>
            <p className="text-[8px] font-mono tracking-widest text-white/25 uppercase">
              {paused ? "PAUSED" : "AUTO ADVANCING"}
            </p>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2.5 items-end">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="relative overflow-hidden flex-shrink-0 transition-all duration-400"
                style={{
                  width: i === idx ? 72 : 44,
                  height: i === idx ? 52 : 38,
                  outline: i === idx ? "1.5px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  outlineOffset: 2,
                }}
              >
                <img
                  src={s.url}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    filter: i === idx ? "brightness(0.9)" : "brightness(0.45) grayscale(0.4)",
                    transition: "filter 0.4s ease",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            {[
              { label: "←", fn: back },
              { label: "→", fn: next },
            ].map(({ label, fn }) => (
              <button
                key={label}
                onClick={fn}
                className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/60 font-bold text-base hover:border-white/50 hover:text-white transition-all duration-200 active:scale-90 hover:bg-white/5 backdrop-blur-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT EDGE — vertical slide title */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/20" />
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[8px] font-bold tracking-[0.35em] text-white/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            {slide.collection}
          </motion.span>
        </AnimatePresence>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
};

export default PremiumCollection;