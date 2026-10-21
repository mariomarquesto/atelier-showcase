"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Eye, ExternalLink, Play, CheckCircle, ShieldCheck, Clock, Award, X, Menu } from "lucide-react";

// --- DATOS MOCK DE PRODUCTOS ---
const PRODUCTS = [
  {
    id: 1,
    title: "Solitaire Halo Ring",
    category: "Rings",
    spec: "Round Brilliant · 18k Rose Gold",
    price: "$4,800",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/ring-solitaire",
    details: "Meticulously hand-set in our studio using ethically sourced 18k rose gold and conflict-free brilliant diamonds.",
  },
  {
    id: 2,
    title: "Meridian 38 Automatic",
    category: "Watches",
    spec: "Bespoke Movement · Sapphire Glass",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/meridian-38",
    details: "Custom automatic mechanical movement housed in surgical stainless steel with a transparent sapphire case back.",
  },
  {
    id: 3,
    title: "Tuscan Tan Leather Strap",
    category: "Straps",
    spec: "Hand-Stitched Full Grain Calfskin",
    price: "$450",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/tuscan-strap",
    details: "Hand-cut from vegetable-tanned Italian calfskin leather, hand-stitched with waxed linen thread for decades of durability.",
  },
  {
    id: 4,
    title: "Eternity Diamond Band",
    category: "Rings",
    spec: "Pavé-Set Diamonds · Platinum",
    price: "$6,200",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/eternity-band",
    details: "Continuous row of micro-pavé diamonds precision-set into solid platinum for an unyielding radiant sparkle.",
  },
  {
    id: 5,
    title: "Noir Chronograph Monopusher",
    category: "Watches",
    spec: "Custom Monopusher · DLC Coated",
    price: "$16,800",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/noir-chrono",
    details: "Unique monopusher chronograph function with matte diamond-like carbon (DLC) coating and custom guilloché dial.",
  },
  {
    id: 6,
    title: "Twin Stone Sapphire Band",
    category: "Rings",
    spec: "Dual Sapphire · 18k Yellow Gold",
    price: "$5,400",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop",
    buyUrl: "https://example.com/checkout/twin-stone",
    details: "Features two contrasting deep-blue Ceylon sapphires representing harmony and timeless unity on a solid gold band.",
  },
];

// --- COMPONENTE TARJETA CON EFECTO 3D TILT ---
function LuxuryCard3D({ product, onQuickView }: { product: typeof PRODUCTS[0]; onQuickView: (p: typeof PRODUCTS[0]) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative glass-panel rounded-lg overflow-hidden transition-all duration-500 cursor-pointer glass-panel-hover"
    >
      <div className="aspect-[4/5] overflow-hidden relative" style={{ transform: "translateZ(20px)" }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 right-4 bg-[#080808]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-amber-400 border border-amber-500/20">
          {product.category}
        </div>

        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs text-xs uppercase tracking-widest text-white gap-2"
        >
          <Eye size={16} /> Quick View
        </button>
      </div>

      <div className="p-6 relative z-10 border-t border-neutral-800/80" style={{ transform: "translateZ(30px)" }}>
        <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">{product.spec}</span>
        <h3 className="text-xl font-serif text-white mt-1 group-hover:text-amber-300 transition-colors">{product.title}</h3>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-900">
          <span className="text-sm font-semibold text-neutral-300">{product.price}</span>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
          >
            Buy Now <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function LuxuryAtelierShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-200 selection:bg-amber-500 selection:text-black">
      {/* 🏛️ NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#080808]/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="text-2xl font-serif tracking-widest text-white uppercase font-bold">
            ATELIER<span className="text-amber-500">.</span>
          </a>

          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest text-neutral-400">
            <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">Heritage</a>
            <a href="#process" className="hover:text-amber-400 transition-colors">Process</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>

          <a
            href="#gallery"
            className="hidden md:inline-flex items-center gap-2 border border-amber-500/40 text-amber-400 px-5 py-2 text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all rounded-xs"
          >
            Explore Collection
          </a>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-neutral-300">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 text-center text-sm uppercase tracking-widest text-neutral-300 border-t border-neutral-900 mt-4">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1">Home</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1">Gallery</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1">Heritage</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block py-1">Process</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">Contact</a>
          </div>
        )}
      </nav>

      {/* ✦ HERO SECTION */}
      <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-amber-500/20 rounded-full bg-neutral-900/50 text-amber-400 text-xs tracking-widest uppercase backdrop-blur-md"
          >
            <Sparkles size={14} /> Custom Rings · Bespoke Watches · Leather Straps
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-tight"
          >
            Slowly Made. <br />
            <span className="text-amber-400/90 font-light italic">Worn Forever.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed font-light"
          >
            Handcrafted rings, bespoke timepieces, and hand-stitched leather straps—crafted one by one for the few who appreciate fine details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#gallery"
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black text-xs font-semibold uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              Enter The Gallery <ArrowRight size={16} />
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 border border-neutral-800 text-neutral-300 text-xs uppercase tracking-widest hover:bg-neutral-900 transition-all flex items-center justify-center gap-2"
            >
              <Play size={14} className="text-amber-400 fill-amber-400" /> Watch Atelier Film
            </button>
          </motion.div>
        </div>
      </section>

      {/* 🖼️ GALLERY SHOWCASE */}
      <section id="gallery" className="py-24 px-6 border-t border-neutral-900 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">The Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2">Three Crafts. One Bench.</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Rings", "Watches", "Straps"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black border-amber-500 font-semibold"
                    : "border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <LuxuryCard3D key={product.id} product={product} onQuickView={setActiveProduct} />
          ))}
        </div>
      </section>

      {/* 📜 HERITAGE SECTION */}
      <section id="about" className="py-24 px-6 bg-neutral-950/60 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Designed Once. <br /> Made by Hand. <br /> Worn for Decades.
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Traditional artisanal techniques meet modern precision design, ensuring every ring, watch, and strap carries a personal touch and ages beautifully over time.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-900">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-white">Lifetime Guarantee</h4>
                  <p className="text-xs text-neutral-500 mt-1">Free maintenance and polishing on all pieces.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-white">100% Bespoke</h4>
                  <p className="text-xs text-neutral-500 mt-1">Customized dimensions and materials.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
                alt="Atelier Craftsman"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✉️ CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">Bespoke Inquiry</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2">Ready to Find Yours?</h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left glass-panel p-8 rounded-lg">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-400">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-neutral-900/80 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-amber-500 mt-1 rounded-xs"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-400">Your Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-neutral-900/80 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-amber-500 mt-1 rounded-xs"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-400">Inquiry Details</label>
              <textarea
                rows={4}
                placeholder="Tell us about the piece you wish to craft..."
                className="w-full bg-neutral-900/80 border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-amber-500 mt-1 rounded-xs"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 text-black py-4 text-xs font-semibold uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              Submit Bespoke Order
            </button>
          </form>
        </div>
      </section>

      {/* 💡 LIGHTBOX / QUICK VIEW MODAL */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-3xl w-full p-8 rounded-lg relative border border-amber-500/30"
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img src={activeProduct.image} alt={activeProduct.title} className="w-full h-80 object-cover rounded-sm" />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">{activeProduct.spec}</span>
                    <h3 className="text-3xl font-serif text-white mt-1">{activeProduct.title}</h3>
                    <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">{activeProduct.details}</p>
                  </div>
                  <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-2xl font-serif text-white">{activeProduct.price}</span>
                    <a
                      href={activeProduct.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-amber-500 text-black text-xs font-semibold uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2"
                    >
                      Buy Now <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📹 ATELIER FILM MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setIsVideoOpen(false)}
          >
            <div className="max-w-4xl w-full aspect-video bg-black relative border border-neutral-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full"
              >
                <X size={20} />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Atelier Crafting Film"
                allow="autoplay"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-neutral-900 text-center text-xs text-neutral-600">
        <p>© 2026 ATELIER. All rights reserved. Custom Rings, Bespoke Timepieces & Hand-Stitched Leather Straps.</p>
      </footer>
    </div>
  );
}