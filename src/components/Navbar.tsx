"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-cyber-cyan rounded-lg flex items-center justify-center animate-glow-pulse">
          <span className="text-black font-bold text-xl">T</span>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">TRY<span className="text-cyber-cyan">ONIX</span></span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
        <Link href="#problem" className="hover:text-cyber-cyan transition-colors">Technology</Link>
        <Link href="#features" className="hover:text-cyber-cyan transition-colors">Features</Link>
        <Link href="#demo" className="hover:text-cyber-cyan transition-colors">Demo</Link>
      </div>

      <button className="px-6 py-2 bg-transparent border border-cyber-cyan text-cyber-cyan rounded-full text-sm font-bold hover:bg-cyber-cyan hover:text-black transition-all duration-300 neon-border-cyan">
        GET STARTED
      </button>
    </motion.nav>
  );
};

export default Navbar;
