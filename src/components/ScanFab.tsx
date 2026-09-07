"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scan } from "lucide-react";
import ScanModal from "./ScanModal";

export default function ScanFab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative h-14 w-14 rounded-full bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.4)] flex items-center justify-center text-black transition-colors hover:bg-emerald-400"
        >
          <Scan className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#f87171] animate-pulse" />
        </motion.button>
      </div>

      <ScanModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
