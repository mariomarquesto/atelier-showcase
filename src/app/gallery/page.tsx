"use client";

import { useState } from "react";
import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Lightbox from "@/components/Lightbox";
import type { Product } from "@/types";

export default function GalleryPage() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            Coleccion 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-bone font-light">
            Galeria de piezas
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            Cada pieza se trabaja a mano en nuestro estudio. Selecciona una para ampliarla o compra directamente en nuestra tienda externa.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-8 max-w-350 mx-auto">
        <GalleryGrid onSelect={setActive} />
      </section>

      <Lightbox product={active} onClose={() => setActive(null)} />
    </>
  );
}
