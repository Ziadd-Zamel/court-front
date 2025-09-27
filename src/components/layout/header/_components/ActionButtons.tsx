"use client";

import { Button } from "@/components/ui/button";
import { Search, FolderOpen, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "../types/navbar.types";
import { RxHamburgerMenu } from "react-icons/rx";
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
          className="size-8 sm:size-12 hover:bg-transparent focus:outline-none"
          aria-label="فتح القائمة"
        >
          <div className="flex flex-col relative z-[110]">
            <Minus
              strokeWidth={1}
              size={50}
              className={cn("text-white", isMenuOpen && "rotate-45")}
            />
            <Minus
              strokeWidth={1}
              size={50}
              className={cn(
                "text-white -mt-9",
                isMenuOpen && "-rotate-45 -mt-11"
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
        className="size-8 sm:size-12 hover:bg-transparent focus:outline-none"
        aria-label="المفضلة"
      >
        <FolderOpen className="size-4 sm:size-6 text-white transition-colors hover:text-main" />
      </Button>
    </div>
  );
}
