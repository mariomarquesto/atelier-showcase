"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface FilmModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FilmModal({ open, onClose }: FilmModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Brand film"
        >
          <div
            className="max-w-5xl w-full aspect-video bg-black relative border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close film"
              className="absolute top-3 right-3 z-10 text-bone bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
            >
              Close
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
              title="Atelier Crafting Film"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
