"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SEARCH_OPTIONS = [
  {
    value: "by_title",
    label: "البحث باسم الكتاب",
    placeholder: "ابحث باسم الكتاب...",
  },
  {
    value: "by_author",
    label: "البحث بالمؤلف",
    placeholder: "ابحث بالمؤلف...",
  },
  {
    value: "by_index",
    label: "في النصوص/الفهارس",
    placeholder: "ابحث في النصوص أو الفهارس",
  },
  {
    value: "all",
    label: "البحث في كل الحقول",
    placeholder: "ابحث في كل الحقول...",
  },
] as const;

const VALID_SEARCH_TYPES = SEARCH_OPTIONS.map((o) => o.value);

const ArabicSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTypeFromUrl = searchParams.get("search_type");
  const searchFromUrl = searchParams.get("search") ?? "";

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("all");

  // Sync from URL on mount / when URL changes (e.g. back button). When user changes type we clear URL so don't overwrite selectedOption then.
  useEffect(() => {
    if (
      searchTypeFromUrl &&
      VALID_SEARCH_TYPES.includes(
        searchTypeFromUrl as (typeof VALID_SEARCH_TYPES)[number],
      )
    ) {
      setSelectedOption(searchTypeFromUrl);
    }
    setLocalSearchQuery(searchFromUrl);
  }, [searchTypeFromUrl, searchFromUrl]);

  const handleSearch = () => {
    if (!localSearchQuery.trim()) return;
    const params = new URLSearchParams();
    params.set("search", localSearchQuery.trim());
    params.set("search_type", selectedOption);
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearchTypeChange = (value: string) => {
    setSelectedOption(value);
    setLocalSearchQuery("");
    router.push(window.location.pathname, { scroll: false });
  };

  const currentOption = SEARCH_OPTIONS.find(
    (option) => option.value === selectedOption,
  );

  return (
    <div className="mx-auto w-full !mt-12 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg shadow-gray-200/50 dark:shadow-black/20 focus-within:ring-2 focus-within:ring-main/30 focus-within:border-main/50 transition-all duration-200">
      {/* Desktop Layout - RTL: dropdown right, input center, search button left */}
      <div className="hidden items-stretch sm:flex flex-row" dir="rtl">
        {/* Dropdown - right (first in RTL) */}
        <div className="border-l border-gray-200 dark:border-white/10">
          <Select value={selectedOption} onValueChange={handleSearchTypeChange}>
            <SelectTrigger
              dir="rtl"
              className="h-full min-w-[200px] cursor-pointer border-0 rounded-none bg-gray-50 dark:bg-transparent text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-white/50 px-4 text-right focus:ring-0 focus:ring-offset-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir="rtl" className="text-right" align="center">
              {SEARCH_OPTIONS.map((option) => (
                <SelectItem
                  className="text-right cursor-pointer"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input - center */}
        <div className="flex-1 min-w-0 px-4 py-3" dir="rtl">
          <Input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentOption?.placeholder}
            className="h-full w-full border-0 bg-transparent dark:bg-transparent text-right text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
          />
        </div>

        {/* Search Button - left */}
        <Button
          onClick={handleSearch}
          className="h-14 w-14 shrink-0 rounded-none bg-main hover:bg-main/90 text-primary-foreground border-l border-main/20 dark:border-white/10"
          size="icon"
        >
          <Search size={22} />
        </Button>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex flex-col gap-2 p-3">
          <Select value={selectedOption} onValueChange={handleSearchTypeChange}>
            <SelectTrigger
              dir="rtl"
              className="w-full h-12 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white text-right"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir="rtl" className="text-right" align="end">
              {SEARCH_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 px-3 py-2 focus-within:ring-2 focus-within:ring-main/30">
            <Input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentOption?.placeholder}
              className="h-10 flex-1 border-0 bg-transparent text-right text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/50 outline-none shadow-none focus-visible:ring-0"
              dir="rtl"
            />
            <Button
              onClick={handleSearch}
              className="shrink-0 h-10 w-10 rounded-lg bg-main hover:bg-main/90"
              size="icon"
            >
              <Search size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabicSearchBar;
