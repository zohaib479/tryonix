"use client";

import { motion } from "framer-motion";

const VisualGallery = () => {
  const placeholders = [
    {
      id: 1,
      image: "/images/demo1.png",
      span: "col-span-2 row-span-2",
      title: "EASTERN COUTURE",
      cat: "Shalwar Kameez",
    },
    {
      id: 2,
      image: "/images/demo2.png",
      span: "col-span-1 row-span-1",
      title: "MODERN KURTI",
      cat: "Women's Fashion",
    },
    {
      id: 3,
      image: "/images/demo3.png",
      span: "col-span-1 row-span-2",
      title: "URBAN FIT",
      cat: "Streetwear",
    },
    {
      id: 4,
      image: "/images/demo4.png",
      span: "col-span-1 row-span-1",
      title: "FORMAL CULTURE",
      cat: "Men's Fashion",
    },
    {
      id: 5,
      image: "/images/demo5.png",
      span: "col-span-2 row-span-1",
      title: "Three Piece",
      cat: "wedding",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-10">
  <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
    <span className="text-primary italic ">AESTHETIC 
  
     SHOWCASE
     </span>
  </h2>

  <p className="text-gray-400 max-w-sm text-sm uppercase tracking-[0.2em] font-bold">
    High-fidelity renders of your brand's finest collections.
  </p>
</div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-5">

          {placeholders.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${item.span} relative overflow-hidden rounded-2xl group border border-white/10`}
            >

              {/* IMAGE FIX (IMPORTANT PART) */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  absolute inset-0 w-full h-full
                  object-contain bg-black
                  scale-100 group-hover:scale-110
                  transition-transform duration-700
                "
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 p-6 z-10">
                <p className="text-[10px] tracking-[0.35em] text-primary font-bold mb-2">
                  {item.cat}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-white">
                  {item.title}
                </h3>
              </div>

              {/* BORDER EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 border border-primary/30 rounded-2xl" />
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default VisualGallery;