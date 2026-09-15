"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface StepData {
  number: string;
  label: string;
  headline: string;
  body: string;
  image?: string;
  imageAlt?: string;
  images?: string[];
  imageAlts?: string[];
  tags: string[];
  editorialGraphic?: string;
  visualTransition?: string[];
  assemblyDiagram?: string[];
}

interface ProcessStepProps {
  step: StepData;
  index: number;
}

function SingleImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

function DualImages({
  srcs,
  alts,
}: {
  srcs: string[];
  alts: string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {srcs.map((src, i) => (
        <div key={src} className="relative aspect-square overflow-hidden">
          <Image
            src={src}
            alt={alts[i]}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      ))}
    </div>
  );
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  const hasDual = "images" in step && step.images;
  const isEven = index % 2 === 0;

  return (
    <div className="relative border-t border-white/5 py-16 sm:py-20 lg:py-0 lg:min-h-[80vh]">
      <div
        className={`mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0 ${
          isEven ? "" : "lg:[direction:rtl]"
        }`}
      >
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative lg:[direction:ltr]"
        >
          {hasDual ? (
            <div className="relative">
              <DualImages
                srcs={step.images!}
                alts={"imageAlts" in step ? step.imageAlts! : ["", ""]}
              />
              {step.editorialGraphic && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-[clamp(3rem,8vw,7rem)] font-normal text-white/[0.07] select-none">
                    {step.editorialGraphic}
                  </span>
                </div>
              )}
            </div>
          ) : step.visualTransition ? (
            <div className="relative">
              <SingleImage
                src={step.image!}
                alt={"imageAlt" in step ? step.imageAlt! : ""}
                className="aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 sm:gap-4">
                  {step.visualTransition.map((label, i) => (
                    <div key={label} className="flex items-center gap-3 sm:gap-4">
                      <span className="rounded-full border border-white/10 bg-[#050806]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur">
                        {label}
                      </span>
                      {i < step.visualTransition!.length - 1 && (
                        <span className="text-lg text-[#F87171]">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : "assemblyDiagram" in step && step.assemblyDiagram ? (
            <div className="relative">
              <DualImages
                srcs={step.images!}
                alts={"imageAlts" in step ? step.imageAlts! : ["", ""]}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-[#050806]/80 px-4 py-3 backdrop-blur">
                  {step.assemblyDiagram.map((label, i) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                        {label}
                      </span>
                      {i < step.assemblyDiagram!.length - 1 && (
                        <span className="text-xs text-[#9CA3A0]/50">↓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <SingleImage
              src={step.image!}
              alt={"imageAlt" in step ? step.imageAlt! : ""}
              className="aspect-[4/3]"
            />
          )}
        </motion.div>

        {/* Text side */}
        <div
          className={`flex flex-col justify-center px-6 py-8 lg:px-12 lg:py-16 lg:[direction:ltr] ${
            isEven ? "lg:pl-16" : "lg:pr-16"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: springEase }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F87171]/30 bg-[#F87171]/10 text-[11px] font-bold text-[#F87171]">
                {step.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9CA3A0]/60">
                {step.label}
              </span>
            </div>

            <h3 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
              {step.headline}
            </h3>

            <p className="mt-4 max-w-[50ch] text-sm leading-7 text-[#9CA3A0] sm:text-base">
              {step.body}
            </p>

            {step.tags && step.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F4F1EA]/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
