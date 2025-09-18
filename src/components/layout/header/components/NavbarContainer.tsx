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
        "fixed right-0 top-0 z-50 flex w-full items-center justify-between px-3 py-3 transition-colors duration-300 sm:px-10 lg:px-20",
        isScrolled && visible
          ? "border-b-2 border-[#e6c599] bg-black/70 py-px"
          : shouldUseDarkBackground
          ? "bg-black/80"
          : !opacity
          ? "bg-black bg-opacity-0"
          : "bg-black bg-opacity-70"
      )}
      initial={{ top: 0 }}
      animate={{
        top: visible ? 0 : "-100%",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.nav>
  );
}
