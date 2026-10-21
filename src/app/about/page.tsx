import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce nuestro estudio, nuestra historia y el proceso artesanal detras de cada pieza ATELIER.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            Nuestra historia
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-bone font-light">
            El oficio detras de la pieza
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              ATELIER nacio en 2018 en un pequeno taller con una idea simple: que cada pieza que salga de nuestras manos sea irrepetible. No producimos en serie. No tercerizamos. Cada anillo, cada reloj y cada correa se trabaja a mano por un solo artesano de principio a fin.
            </p>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Trabajamos con oro de comercio justo, platino reciclado y pieles curtidas al vegetal. Nuestro compromiso es con la pieza que vas a llevar toda la vida y con la persona que la va a heredar.
            </p>
          </div>
          <div className="aspect-[4/5] relative border border-gold/30 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000&auto=format&fit=crop"
              alt="Taller ATELIER"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-85"
            />
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-24 px-6 md:px-8 border-t border-graphite">
        <div className="max-w-[1100px] mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
              El proceso
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-bone font-light">
              Asi se hace una pieza
            </h2>
          </div>
          <div className="aspect-video bg-black border border-graphite relative">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4?rel=0"
              title="Proceso artesanal ATELIER"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ESTUDIO */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="aspect-square relative overflow-hidden border border-graphite">
              <Image
                src={src}
                alt={`Estudio ATELIER ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-1000"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
