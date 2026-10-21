"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function CommissionForm() {
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
      details: formData.get("details")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-8 border-t border-graphite relative z-10">
      <div className="max-w-xl mx-auto text-center space-y-10">
        <div>
          <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-mono">
            Bespoke Concierge
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-bone mt-2 font-light">
            Private Commission
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-left bg-[#0a0a0a] p-10 border border-graphite">
          <div>
            <label htmlFor="name" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              Client Name
            </label>
            <input
              id="name" name="name" type="text" required minLength={2}
              autoComplete="name"
              placeholder="Full Legal Name"
              className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              Private Email Address
            </label>
            <input
              id="email" name="email" type="email" required
              autoComplete="email"
              placeholder="client@domain.com"
              className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light"
            />
          </div>

          <div>
            <label htmlFor="details" className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              Commission Details
            </label>
            <textarea
              id="details" name="details" required minLength={10} rows={4}
              autoComplete="off"
              placeholder="Describe the bespoke jewelry piece, gem preference or art direction..."
              className="w-full bg-black border border-neutral-800 p-4 text-xs text-bone focus:outline-none focus:border-gold mt-2 font-light resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gold text-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-bone transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Request Private Appointment"}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-[11px] text-gold text-center font-mono uppercase tracking-[0.2em]"
              >
                Request received. Our concierge will contact you within 48h.
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
      </div>
    </section>
  );
}