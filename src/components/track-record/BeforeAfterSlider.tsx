"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel: beforeLabelProp,
  afterLabel: afterLabelProp,
}: BeforeAfterSliderProps) {
  const { t } = useLanguage();
  const beforeLabel = beforeLabelProp ?? t("trackRecord.beforeLabel");
  const afterLabel = afterLabelProp ?? t("trackRecord.afterLabel");
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => {
    dragging.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      style={{ cursor: "ew-resize" }}
    >
      {/* After (right) */}
      <Image src={after} alt={afterLabel} fill className="object-cover" />
      {/* Before (left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <Image
          src={before}
          alt={beforeLabel}
          fill
          className="object-cover"
          style={{ objectPosition: "left center" }}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <button
          onMouseDown={onMouseDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-black text-xs font-bold hover:scale-110 transition-transform"
        >
          ⇔
        </button>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm z-20">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm z-20">
        {afterLabel}
      </span>
    </div>
  );
}
