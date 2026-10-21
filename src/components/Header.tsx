"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/gallery", label: "Galeria" },
  { href: "/about", label: "Sobre nosotros" },
  { href: "/contact", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-obsidian/80 backdrop-blur-2xl border-b border-graphite px-6 md:px-8 py-5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-display tracking-[0.3em] text-bone uppercase">
            ATELIER<span className="text-gold">.</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.5em] text-neutral-500 font-mono -mt-1">
            Anillos - Relojes - Correas
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-12 text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
          {NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/gallery"
          className="hidden sm:inline-flex items-center gap-3 border border-gold/40 px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-black transition-all duration-500 font-semibold"
        >
          Ver galeria
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
          className="lg:hidden text-bone"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden pt-6 pb-8 space-y-4 text-center text-xs uppercase tracking-[0.3em] text-neutral-300 border-t border-graphite mt-4">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
