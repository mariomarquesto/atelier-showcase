import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con ATELIER para consultas sobre piezas a medida, pedidos especiales o visitas al estudio.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            Contacto
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-bone font-light">
            Hablemos
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
            Consultas sobre piezas a medida, pedidos especiales o visitas al estudio. Respondemos en 48 horas.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-8">
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>

        <div className="max-w-xl mx-auto mt-12 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">
            Tambien puedes escribirnos
          </p>
          <a href="mailto:hola@atelier.example.com" className="text-sm text-gold hover:text-bone transition-colors font-light">
            hola@atelier.example.com
          </a>
          <div className="flex justify-center gap-6 pt-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
