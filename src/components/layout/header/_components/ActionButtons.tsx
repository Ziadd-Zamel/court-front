"use client";

import { Button } from "@/components/ui/button";
import { Search, FolderOpen, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "../types/navbar.types";
import { cn } from "@/lib/utils";

export default function ActionButtons({
  onToggleSearch,
  onToggleMenu,
  isSearchOpen,
  isMenuOpen,
}: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center -mr-3 relative !z-[110]">
      {!isSearchOpen && (
        <Button
          onClick={onToggleMenu}
          variant="ghost"
          size="icon"
          className="size-8 sm:size-12 hover:bg-transparent focus:outline-none mt-1 ml-3"
          aria-label="فتح القائمة"
        >
          <div className="flex flex-col relative z-[110]">
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
                isMenuOpen && "-rotate-45 -mt-[79px]"
              )}
            />
          </div>
        </Button>
      )}

      <Button
        onClick={onToggleSearch}
        variant="ghost"
        size="icon"
        className="size-8 sm:size-12 hover:bg-transparent focus:outline-none"
        aria-label="البحث"
      >
        <Search className="size-4 sm:size-6 text-white transition-colors hover:text-main" />
      </Button>

      <Button
        onClick={() => router.push("/favorit")}
        variant="ghost"
        size="icon"
        className="size-8 sm:size-12 hover:bg-transparent focus:outline-none relative"
        aria-label="المفضلة"
      >
        <FolderOpen className="size-4 sm:size-6 text-white transition-colors hover:text-main" />
        <div className="rounded-full bg-red-500 flex-center absolute size-4 text-white top-1 left-1 aspect-square">
          3
        </div>
      </Button>
    </div>
  );
}
