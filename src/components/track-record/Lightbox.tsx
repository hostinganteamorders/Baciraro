"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxPhoto = { src: string; alt: string };

export default function Lightbox({
  photos,
  index,
  onClose,
  caption,
  rotateDeg = 0,
}: {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  caption?: string;
  rotateDeg?: number;
}) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, photos.length]);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      {photos.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm" aria-label="Previous">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm" aria-label="Next">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative h-full w-full max-h-[90vh] max-w-[90vw]"
        style={{ transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={photos[current].src} alt={photos[current].alt} fill className="object-contain" quality={100} />
      </motion.div>
      <div className="absolute bottom-6 flex items-center gap-3">
        <span className="text-sm text-zinc-400 font-medium">{current + 1} / {photos.length}</span>
        {caption && <span className="hidden sm:inline text-sm text-zinc-500">{caption}</span>}
      </div>
    </motion.div>
  );
}
