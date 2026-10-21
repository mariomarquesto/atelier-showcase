"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { ArtPiece } from "@/types";

interface ProductModalProps {
  product: ArtPiece | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
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
          aria-labelledby="piece-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-gold/40 max-w-4xl w-full p-6 md:p-12 relative shadow-2xl my-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-bone text-xl z-10"
            >
              X
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="border border-neutral-800 p-2 bg-black">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={1000}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[9px] text-gold uppercase tracking-[0.4em] font-mono">
                    Piece {product.id} - {product.category}
                  </span>
                  <h3 id="piece-title" className="text-2xl md:text-3xl font-display text-bone mt-2 font-light">
                    {product.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-graphite flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono block">
                      Estimated Value
                    </span>
                    <span className="text-xl font-mono text-gold">{product.price}</span>
                  </div>
                  <a
                    href={product.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center px-8 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all"
                  >
                    Acquire Artwork
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
