"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error al enviar el mensaje.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left bg-[#0a0a0a] p-8 md:p-10 border border-graphite">
      <div>
        <label htmlFor="name" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Nombre
        </label>
        <input
          id="name" name="name" type="text" required minLength={2}
          autoComplete="name"
          placeholder="Tu nombre completo"
          className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Email
        </label>
        <input
          id="email" name="email" type="email" required
          autoComplete="email"
          placeholder="tu@email.com"
          className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Mensaje
        </label>
        <textarea
          id="message" name="message" required minLength={10} rows={5}
          autoComplete="off"
          placeholder="Cuentanos que pieza te interesa o que tienes en mente..."
          className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold text-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[11px] text-gold text-center font-mono uppercase tracking-[0.2em]"
          >
            Mensaje enviado. Te contactamos en 48h.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[11px] text-wine text-center font-mono uppercase tracking-[0.2em]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
