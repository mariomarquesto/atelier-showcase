"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Product } from "@/types";

interface LightboxProps {
  product: Product | null;
  onClose: () => void;
}

export default function Lightbox({ product, onClose }: LightboxProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-gold/40 max-w-5xl w-full p-4 md:p-8 relative my-8"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-10 text-neutral-400 hover:text-bone text-xl bg-black/60 w-10 h-10"
            >
              X
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-black">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={1500}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[9px] text-gold uppercase tracking-[0.4em] font-mono">
                    {product.spec}
                  </span>
                  <h3 id="lightbox-title" className="text-2xl md:text-3xl font-display text-bone mt-2 font-light">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-graphite flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xl font-mono text-gold">{product.price}</span>
                  <a
                    href={product.externalCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center px-8 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all"
                  >
                    Comprar ahora
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
