import Image from "next/image";

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-32 px-6 md:px-8 bg-[#080808] border-t border-graphite relative z-10">
      <div className="max-w-275 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-8">
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            Atelier Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-bone leading-[1.1] font-light">
            Designed Once. <br />
            Made by Hand. <br />
            Worn for Decades.
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed tracking-wide">
            Anatomical precision meets rare mineral pigments. Every creation
            begins as an exploration of light and form over human skin before
            turning into gold and diamonds.
          </p>
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed tracking-wide">
            No mass production. No shortcuts. Pure artistic intention crafted
            for discerning connoisseurs of fine art and haute horlogerie.
          </p>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-3/4 border border-gold/30 p-3 bg-black">
            <Image
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop"
              alt="Fine Art Canvas"
              width={1000}
              height={1333}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full h-full object-cover opacity-85"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
