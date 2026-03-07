"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const isSearchActive = Boolean(searchParams.get("search"));

  const handleSearch = () => {
    if (value.trim()) {
      router.push(`${pathname}?search=${encodeURIComponent(value.trim())}`, {
        scroll: false,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setValue("");
    router.push(pathname, { scroll: false });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-main",
        className,
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ابحث في هذه الصفحة"
        className="w-full text-gray-800 placeholder-gray-400 outline-none placeholder:text-sm"
      />
      {isSearchActive ? (
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleClear}
          aria-label="مسح البحث"
        >
          <X size={16} className="text-gray-400 hover:text-gray-600" />
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleSearch}
          aria-label="بحث"
        >
          <Search size={16} className="text-main hover:text-main/70" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
