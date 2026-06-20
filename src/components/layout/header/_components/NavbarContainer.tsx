"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarProps, NavbarState, NavbarActions } from "../types/navbar.types";

interface NavbarContainerProps extends NavbarProps {
  state: NavbarState;
  actions: NavbarActions;
  children: React.ReactNode;
}

export default function NavbarContainer({
  opacity = false,
  state,
  children,
}: NavbarContainerProps) {
  const { visible, isScrolled, shouldUseDarkBackground } = state;

  return (
    <motion.nav
      className={cn(
        "fixed right-0 top-0 z-50 w-full transition-colors duration-300",
        isScrolled && visible
          ? "border-b-2 border-[#e6c599] bg-black/70 py-px backdrop-blur-sm"
          : shouldUseDarkBackground
            ? "bg-black/80 py-1"
            : !opacity
              ? "bg-black/0 py-1"
              : "bg-black/70 py-1",
      )}
      initial={{ top: 0 }}
      animate={{
        top: visible ? 0 : "-100%",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="box-container relative flex w-full items-center justify-between max-sm:gap-3 max-sm:py-1">
        {children}

        {isScrolled && visible && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <p className="text-base sm:text-sm font-bold tracking-wide text-[#e6c599] md:text-base">
              نسخة تجريبية
            </p>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
