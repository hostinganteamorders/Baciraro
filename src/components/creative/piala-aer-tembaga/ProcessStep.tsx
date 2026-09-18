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
        sizes="(max-width: 1024px) 100vw, 55vw"
      />
    </div>
  );
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  const hasDual = "images" in step && step.images;

  return (
    <div className="relative border-t border-white/5 py-20 sm:py-28 lg:py-0 lg:min-h-[85vh]">
      <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[38%_1fr] lg:gap-0">
        {/* Left: sticky text */}
        <div className="flex flex-col justify-center px-6 py-8 lg:sticky lg:top-0 lg:h-screen lg:px-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: springEase }}
          >
            {/* Oversized number */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: springEase }}
                className="block font-serif text-[clamp(7rem,13vw,13rem)] font-normal leading-none tracking-[-0.04em] text-white/[0.06]"
              >
                {step.number}
              </motion.span>
            </div>

            {/* Step label */}
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#9CA3A0]/70">
              {step.label}
            </p>

            {/* Headline */}
            <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
              {step.headline}
            </h3>

            {/* Body */}
            <p className="mt-4 max-w-[45ch] text-base leading-8 text-[#9CA3A0]">
              {step.body}
            </p>

            {/* Tags */}
            {step.tags && step.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#F87171]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: image composition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: springEase }}
          className="relative flex items-center"
        >
          {hasDual ? (
            <div className="relative w-full">
              {/* Dual images — asymmetric overlap */}
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={step.images![0]}
                    alt={"imageAlts" in step ? step.imageAlts![0] : ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 28vw, 22vw"
                  />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden mt-8 sm:mt-12">
                  <Image
                    src={step.images![1]}
                    alt={"imageAlts" in step ? step.imageAlts![1] : ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 28vw, 22vw"
                  />
                </div>
              </div>
              {step.editorialGraphic && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-serif text-[clamp(4rem,10vw,8rem)] font-normal text-white/[0.06] select-none">
                    {step.editorialGraphic}
                  </span>
                </div>
              )}
              {step.assemblyDiagram && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 bg-[#050806]/70 px-3 py-3 backdrop-blur-sm border border-white/10">
                  {step.assemblyDiagram.map((label, i) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                        {label}
                      </span>
                      {i < step.assemblyDiagram!.length - 1 && (
                        <span className="text-xs text-[#9CA3A0]/50">↓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : step.visualTransition ? (
            <div className="relative w-full">
              <SingleImage
                src={step.image!}
                alt={"imageAlt" in step ? step.imageAlt! : ""}
                className="aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 sm:gap-4 bg-[#050806]/70 px-4 py-2 backdrop-blur-sm border border-white/10">
                  {step.visualTransition.map((label, i) => (
                    <div key={label} className="flex items-center gap-3 sm:gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
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
          ) : (
            <div className="w-full">
              <SingleImage
                src={step.image!}
                alt={"imageAlt" in step ? step.imageAlt! : ""}
                className="aspect-[4/3]"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
