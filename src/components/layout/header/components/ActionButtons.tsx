"use client";

import { Button } from "@/components/ui/button";
import { Search, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "../types/navbar.types";

export default function ActionButtons({
  onToggleSearch,
  onToggleMenu,
  isSearchOpen,
}: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      {!isSearchOpen && (
        <Button
          onClick={onToggleMenu}
          variant="ghost"
          size="icon"
          className="h-12 w-12 hover:bg-transparent focus:outline-none"
          aria-label="فتح القائمة"
        >
          <div className="flex flex-col gap-1">
            <div className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-main" />
            <div className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-main" />
            <div className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-main" />
          </div>
        </Button>
      )}

      <Button
        onClick={onToggleSearch}
        variant="ghost"
        size="icon"
        className="h-12 w-12 hover:bg-transparent focus:outline-none"
        aria-label="البحث"
      >
        <Search className="h-6 w-6 text-white transition-colors hover:text-main" />
      </Button>

      <Button
        onClick={() => router.push("/favorit")}
        variant="ghost"
        size="icon"
        className="h-12 w-12 hover:bg-transparent focus:outline-none"
        aria-label="المفضلة"
      >
        <FolderOpen className="h-6 w-6 text-white transition-colors hover:text-main" />
      </Button>
    </div>
  );
}
