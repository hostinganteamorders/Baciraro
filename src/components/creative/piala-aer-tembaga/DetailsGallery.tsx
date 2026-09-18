"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projectImages } from "@/lib/creative-projects/piala-aer-tembaga";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const galleryItems = [
  {
    src: projectImages.emblemDetail,
    alt: "Detail emblem Bank Indonesia pada piala",
    caption: "BANK INDONESIA IDENTITY",
    className: "col-span-2 row-span-2 aspect-[4/5]",
  },
  {
    src: projectImages.formDevelopment,
    alt: "Permukaan daur ulang piala sebelum finishing",
    caption: "RECYCLED SPECKLED SURFACE",
    className: "col-span-1 aspect-square",
  },
  {
    src: projectImages.assembly,
    alt: "Proses perakitan piala di meja kerja",
    caption: "HAND-FINISHED FORM",
    className: "col-span-1 aspect-square",
  },
  {
    src: projectImages.finalGroup,
    alt: "Tiga piala final dari material daur ulang",
    caption: "AWARD BASE",
    className: "col-span-1 aspect-[4/3]",
  },
];

export default function DetailsGallery() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: springEase }}
          className="mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/70">
            GALLERY
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white">
            Object Details
          </h2>
        </motion.div>

        {/* Asymmetric editorial gallery — no rounded-2xl */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: springEase }}
              className={`group relative overflow-hidden ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/80">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
