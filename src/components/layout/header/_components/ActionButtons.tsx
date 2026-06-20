"use client";

import { Button } from "@/components/ui/button";
import { Search, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "../types/navbar.types";
import { cn } from "@/lib/utils";
import { TiFolderOpen } from "react-icons/ti";

export default function ActionButtons({
  onToggleSearch,
  onToggleMenu,
  isSearchOpen,
  isMenuOpen,
}: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="relative !z-[110] flex items-center max-sm:mr-0 max-sm:gap-0.5 sm:-mr-3">
      {!isSearchOpen && (
        <Button
          onClick={onToggleMenu}
          variant="ghost"
          size="icon"
          className="size-8 hover:bg-transparent focus:outline-none max-sm:ml-0 max-sm:mt-0 sm:ml-3 sm:mt-1 sm:size-12"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          <span className="relative flex size-5 items-center justify-center sm:hidden">
            <span
              className={cn(
                "absolute block h-[1.5px] w-5 bg-white transition-all duration-300",
                isMenuOpen ? "rotate-45" : "-translate-y-[5px]",
              )}
            />
            <span
              className={cn(
                "absolute block h-[1.5px] w-5 bg-white transition-all duration-300",
                isMenuOpen ? "-rotate-45" : "translate-y-[5px]",
              )}
            />
          </span>

          <div className="relative z-[110] hidden flex-col sm:flex">
            <Minus
              strokeWidth={0.7}
              size={80}
              className={cn("text-white", isMenuOpen && "rotate-45")}
            />
            <Minus
              strokeWidth={0.7}
              size={80}
              className={cn(
                "text-white -mt-[70px]",
                isMenuOpen && "-rotate-45 -mt-[79px]",
              )}
            />
          </div>
        </Button>
      )}

      <Button
        onClick={onToggleSearch}
        variant="ghost"
        size="icon"
        className="size-8 hover:bg-transparent focus:outline-none sm:size-12"
        aria-label="البحث"
      >
        <Search className="size-4 text-white transition-colors hover:text-main sm:size-6" />
      </Button>

      <Button
        onClick={() => router.push("/favorite")}
        variant="ghost"
        size="icon"
        className="relative size-8 hover:bg-transparent focus:outline-none sm:size-12"
        aria-label="المفضلة"
      >
        <TiFolderOpen className="size-4 text-white transition-colors hover:text-main sm:size-6" />
        <div className="absolute left-2.5 top-2.5 hidden aspect-square size-2.5 rounded-full bg-red-500 text-white sm:flex sm:flex-center" />
      </Button>
    </div>
  );
}
