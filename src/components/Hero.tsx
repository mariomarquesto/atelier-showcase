"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onOpenFilm: () => void;
}

export default function Hero({ onOpenFilm }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen pt-40 pb-24 flex items-center justify-center px-6">
      <div className="max-w-300 mx-auto text-center relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-block border-b border-gold/40 pb-2 text-[10px] uppercase tracking-[0.4em] text-gold font-mono"
        >
          Paris - Geneva - New York
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-display text-bone tracking-tight leading-[0.95] font-light text-balance"
        >
          Slowly Made. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-linear-to-r from-gold via-gold-light to-gold">
            Worn Forever.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="max-w-xl mx-auto text-neutral-400 text-xs md:text-sm tracking-wide leading-relaxed font-light uppercase"
        >
          Bespoke fine jewelry, artisanal watchmaking, and hand-painted pigments.
          Where precious metals become a second skin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
        >
          <a
            href="#gallery"
            className="w-full sm:w-auto px-10 py-5 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all duration-500 shadow-2xl shadow-gold/20"
          >
            Enter Exhibition
          </a>
          <button
            onClick={onOpenFilm}
            className="w-full sm:w-auto px-10 py-5 border border-neutral-800 text-neutral-300 text-[10px] uppercase tracking-[0.3em] hover:border-gold hover:text-bone transition-all duration-500"
          >
            Watch Brand Film
          </button>
        </motion.div>
      </div>
    </section>
  );
}
