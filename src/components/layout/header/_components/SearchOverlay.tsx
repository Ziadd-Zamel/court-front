"use client";

import { Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SearchOverlayProps } from "../types/navbar.types";
import SiteSearchBar from "@/components/common/site-search-bar";

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

          <motion.div
            className="relative w-full max-w-3xl px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.15 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-5 text-center text-xl font-semibold text-white">
              ابحث في الموقع
            </p>
            <Suspense fallback={null}>
              <SiteSearchBar variant="overlay" onSubmitted={onClose} />
            </Suspense>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
