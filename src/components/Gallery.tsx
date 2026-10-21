"use client";

import { useState } from "react";
import Image from "next/image";
import { EXHIBITION, CATEGORIES } from "@/lib/data";
import type { ArtPiece } from "@/types";
import { cn } from "@/lib/utils";

interface GalleryProps {
  onSelect: (piece: ArtPiece) => void;
}

export default function Gallery({ onSelect }: GalleryProps) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    category === "All"
      ? EXHIBITION
      : EXHIBITION.filter((p) => p.category === category);

  return (
    <section id="gallery" className="py-32 px-6 md:px-8 border-t border-graphite/80 max-w-350 mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-graphite pb-8">
        <div>
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            2026 Fine Art Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-bone mt-2 font-light">
            L&apos;Art de la Peau
          </h2>
        </div>

        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 border",
                category === cat
                  ? "bg-gold text-black border-gold font-semibold"
                  : "border-neutral-800 text-neutral-400 hover:text-bone hover:border-neutral-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map((product, index) => (
          <article
            key={product.id}
            onClick={() => onSelect(product)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(product);
            }}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${product.title}`}
            className="group relative bg-[#0a0a0a] border border-graphite hover:border-gold/50 transition-all duration-700 cursor-pointer overflow-hidden p-4 focus:outline-none focus:border-gold"
          >
            <div className="aspect-4/5 overflow-hidden relative bg-black">
              <Image
                src={product.image}
                alt={`${product.title} - ${product.spec}`}
                width={1200}
                height={1500}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out opacity-85 group-hover:opacity-100"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-gold font-mono border border-neutral-800">
                Piece {product.id}
              </div>
            </div>

            <div className="pt-6 pb-2 space-y-2">
              <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono">
                {product.category}
              </div>
              <h3 className="text-2xl font-display text-bone group-hover:text-gold transition-colors font-light">
                {product.title}
              </h3>
              <p className="text-[11px] text-neutral-400 font-light tracking-wide">
                {product.spec}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-graphite/80">
                <span className="text-xs font-mono text-gold">{product.price}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 group-hover:text-bone transition-colors">
                  View Canvas Details
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
