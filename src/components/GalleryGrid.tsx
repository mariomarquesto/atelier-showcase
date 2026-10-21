"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/data";
import type { Product, ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  onSelect: (product: Product) => void;
  initialCategory?: ProductCategory | "all";
}

export default function GalleryGrid({ onSelect, initialCategory = "all" }: GalleryGridProps) {
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);

  const filtered =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  const tabs: { key: ProductCategory | "all"; label: string }[] = [
    { key: "all", label: "Todo" },
    ...CATEGORY_ORDER.map((c) => ({ key: c, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <div className="space-y-16">
      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Categorias">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={category === tab.key}
            onClick={() => setCategory(tab.key)}
            className={cn(
              "px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 border",
              category === tab.key
                ? "bg-gold text-black border-gold font-semibold"
                : "border-neutral-800 text-neutral-400 hover:text-bone hover:border-neutral-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filtered.map((product, index) => (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden border border-graphite bg-[#0a0a0a] transition-colors duration-500 hover:border-gold/60"
          >
            {/* IMAGEN + OVERLAY */}
            <button
              onClick={() => onSelect(product)}
              aria-label={`Ampliar ${product.name}`}
              className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-black">
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.spec}`}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  className="h-full w-full object-cover grayscale opacity-85 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />

                {/* Gradiente inferior para legibilidad */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Badge categoría */}
                <span className="absolute left-4 top-4 border border-white/10 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-gold backdrop-blur-md">
                  {CATEGORY_LABELS[product.category]}
                </span>

                {/* Overlay hover con CTA "Ver detalles" */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="border border-gold/60 bg-black/60 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gold backdrop-blur-sm">
                    Ver detalles
                  </span>
                </div>
              </div>
            </button>

            {/* INFO */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="space-y-1.5">
                <h3 className="font-display text-2xl font-light leading-tight text-bone transition-colors duration-300 group-hover:text-gold">
                  {product.name}
                </h3>
                <p className="text-[11px] font-light tracking-wide text-neutral-400">
                  {product.spec}
                </p>
              </div>

              {/* Footer: precio + CTA */}
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-graphite/80 pt-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-neutral-600">
                    Precio
                  </span>
                  <span className="font-mono text-sm text-gold">{product.price}</span>
                </div>

                <a
                  href={product.externalCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-gold/40 px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-black"
                >
                  Comprar ahora
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Estado vacío (por si una categoría no tiene productos) */}
      {filtered.length === 0 && (
        <p className="py-24 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          No hay piezas en esta categoria.
        </p>
      )}
    </div>
  );
}