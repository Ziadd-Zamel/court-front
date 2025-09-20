"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
    scroll: false, // Disable scroll on query change
  });

  // Use searchQuery as input value directly
  const [inputValue, setInputValue] = useState(searchQuery || "");

  const executeSearch = () => {
    if (inputValue.trim()) {
      const params = new URLSearchParams();
      params.set("search", inputValue.trim());

      // Push to new pathname with search params
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const clearSearch = () => {
    setInputValue("");
    // Push to pathname without search params
    router.push(pathname, { scroll: false });
  };

  const handleSearchClick = () => {
    executeSearch();
  };

  // Show X button if there's a search query in URL, otherwise show search icon
  const showClearButton = Boolean(searchQuery);

  return (
    <div className={cn("w-full")}>
      <form
        onSubmit={handleSearch}
        className="flex w-full items-center justify-between gap-1 rounded-2xl border border-gray-200 bg-white py-1 shadow-sm focus-within:ring-1 focus-within:ring-main"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ابحث في هذه الصفحة"
          className={
            (cn(
              "w-full py-2 pl-8 pr-4 text-gray-800 placeholder-gray-400 outline-none"
            ),
            className)
          }
        />

        {showClearButton ? (
          <Button
            type="button"
            onClick={clearSearch}
            className="flex-center h-7 w-5 rounded-full hover:bg-transparent"
            aria-label="مسح البحث"
            variant={"ghost"}
          >
            <X size={16} />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSearchClick}
            className="flex-center h-9 w-9 hover:bg-transparent text-main"
            variant={"ghost"}
            aria-label="بحث"
          >
            <Search size={20} />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
