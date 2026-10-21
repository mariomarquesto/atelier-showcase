import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-graphite text-center text-[10px] text-neutral-600 font-mono uppercase tracking-[0.3em]">
      <div className="max-w-350 mx-auto space-y-4">
        <div className="flex justify-center gap-6 text-neutral-400">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Pinterest
          </a>
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contacto
          </Link>
        </div>
        <p>(c) 2026 ATELIER. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
