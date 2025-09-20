"use client";

import { Button } from "@/components/ui/button";
import { Search, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "../types/navbar.types";
import { RxHamburgerMenu } from "react-icons/rx";

export default function ActionButtons({
  onToggleSearch,
  onToggleMenu,
  isSearchOpen,
}: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center -mr-3">
      {!isSearchOpen && (
        <Button
          onClick={onToggleMenu}
          variant="ghost"
          size="icon"
          className="size-8 sm:size-12 hover:bg-transparent focus:outline-none"
          aria-label="فتح القائمة"
        >
          <RxHamburgerMenu className="size-4 sm:size-6 text-white transition-colors hover:text-main" />
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
