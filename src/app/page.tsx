import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Anillos, relojes a medida y correas de cuero artesanales. Descubre la coleccion ATELIER.",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop"
            alt="Anillo de oro forjado a mano"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <span className="inline-block border-b border-gold/40 pb-2 text-[10px] uppercase tracking-[0.4em] text-gold font-mono">
            Hecho a mano - Piezas unicas
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-bone leading-[0.95] font-light text-balance">
            Piezas que <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
              duran generaciones.
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-neutral-300 text-xs md:text-sm tracking-wide leading-relaxed font-light uppercase">
            Anillos, relojes a medida y correas de cuero. Forjados a mano en nuestro estudio, uno a uno.
          </p>
          <div className="pt-4">
            <Link
              href="/gallery"
              className="inline-block px-10 py-5 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all duration-500"
            >
              Ver la galeria
            </Link>
          </div>
        </div>
      </section>

      {/* TRES LINEAS */}
      <section className="py-24 px-6 md:px-8 border-t border-graphite">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
              Nuestras lineas
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-bone font-light">
              Tres oficios. Una obsesion.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Anillos", slug: "rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", desc: "Oro, platino y diamantes engastados a mano." },
              { title: "Relojes a medida", slug: "watches", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop", desc: "Movimientos suizos en cajas forjadas a mano." },
              { title: "Correas de cuero", slug: "straps", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop", desc: "Piel curtida al vegetal, cosida a mano." },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/gallery#${cat.slug}`}
                className="group relative aspect-[4/5] overflow-hidden border border-graphite hover:border-gold/50 transition-all"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                  <h3 className="text-2xl font-display text-bone group-hover:text-gold transition-colors font-light">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-light">{cat.desc}</p>
                  <span className="inline-block pt-2 text-[10px] uppercase tracking-[0.3em] text-gold">
                    Ver coleccion
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
