"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import {
  projectImages,
  pialaAerTembagaProject,
} from "@/lib/creative-projects/piala-aer-tembaga";
import ProjectLightbox from "./ProjectLightbox";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ArchiveCategory = "MATERIAL" | "MAKING" | "DETAILS" | "FINAL OBJECTS";

const allImages: { src: string; alt: string; category: ArchiveCategory }[] = [
  { src: projectImages.rawMaterials, alt: "Tutup botol plastik bekas sebagai bahan awal", category: "MATERIAL" },
  { src: projectImages.blueCaps, alt: "Tutup botol plastik biru setelah dipilah", category: "MATERIAL" },
  { src: projectImages.redCaps, alt: "Tutup botol plastik merah setelah dipilah", category: "MATERIAL" },
  { src: projectImages.sortedFlakes, alt: "Serpihan plastik daur ulang setelah pencacahan", category: "MATERIAL" },
  { src: projectImages.blueFlakes, alt: "Serpihan plastik biru di tangan", category: "MATERIAL" },
  { src: projectImages.recycledSheet, alt: "Lembaran material padat dari daur ulang", category: "MAKING" },
  { src: projectImages.shaping, alt: "Proses pemotongan lembar plastik daur ulang", category: "MAKING" },
  { src: projectImages.formDevelopment, alt: "Bentuk piala sebelum finishing", category: "MAKING" },
  { src: projectImages.assembly, alt: "Meja perakitan komponen piala", category: "MAKING" },
  { src: projectImages.weighing, alt: "Dokumentasi proses penimbangan material", category: "MAKING" },
  { src: projectImages.emblemDetail, alt: "Detail emblem Bank Indonesia pada piala", category: "DETAILS" },
  { src: projectImages.trophyInHand, alt: "Piala Aer Tembaga dipegang oleh tangan", category: "DETAILS" },
  { src: projectImages.hero, alt: "Tiga piala Aer Tembaga final dari material plastik daur ulang", category: "FINAL OBJECTS" },
  { src: projectImages.finalGroup, alt: "Komposisi tiga piala final Bank Indonesia", category: "FINAL OBJECTS" },
];

const initialCount = 12;

const masonryClasses = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export default function ProjectArchive() {
  const [activeCategory, setActiveCategory] = useState<ArchiveCategory | "ALL">("ALL");
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    const base =
      activeCategory === "ALL"
        ? allImages
        : allImages.filter((img) => img.category === activeCategory);
    return showAll ? base : base.slice(0, initialCount);
  }, [activeCategory, showAll]);

  const lightboxPhotos = useMemo(
    () =>
      filteredImages.map((img) => ({
        src: img.src,
        alt: img.alt,
      })),
    [filteredImages]
  );

  const totalForCategory =
    activeCategory === "ALL"
      ? allImages.length
      : allImages.filter((img) => img.category === activeCategory).length;

  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mute/70">
            ARCHIVE
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            {pialaAerTembagaProject.archiveTitle}
          </h2>
        </motion.div>

        {/* Category filter — text with underline */}
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/5 pb-4">
          {(["ALL", ...pialaAerTembagaProject.archiveCategories] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat === "ALL" ? "ALL" : cat);
                  setShowAll(false);
                }}
                className={`relative pb-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors ${
                  activeCategory === cat || (cat === "ALL" && activeCategory === "ALL")
                    ? "text-accent"
                    : "text-mute/60 hover:text-foreground/70"
                }`}
              >
                {cat}
                {(activeCategory === cat || (cat === "ALL" && activeCategory === "ALL")) && (
                  <motion.div
                    layoutId="archiveFilter"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            )
          )}
        </div>

        {/* Masonry grid — no rounded corners, tighter gap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 auto-rows-[140px] sm:auto-rows-[180px]">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.button
                key={img.src + activeCategory}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: springEase }}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${masonryClasses[i % masonryClasses.length]}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* View all CTA */}
        {!showAll && totalForCategory > initialCount && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: springEase }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-mute transition-colors hover:text-white"
            >
              Explore All {totalForCategory} Frames
              <span className="text-accent">→</span>
            </button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <ProjectLightbox
              photos={lightboxPhotos}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
