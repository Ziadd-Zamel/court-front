"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { SearchOverlayProps } from "../types/navbar.types";

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001026]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            className="absolute right-8 top-8 focus:outline-none"
            onClick={onClose}
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            aria-label="إغلاق البحث"
          >
            <X className="h-10 w-10 text-white" />
          </motion.button>

          {/* Search Input */}
          <motion.div
            className="relative w-full max-w-2xl px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <input
                dir="rtl"
                type="text"
                placeholder="بحث"
                className="w-full bg-transparent pl-12 pr-4 text-right text-4xl text-white placeholder:text-right placeholder:text-white focus:outline-none"
                autoFocus
              />
              <Search className="absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 text-white" />

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 right-0 h-[1px] bg-[#808893]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
