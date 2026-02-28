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
    <div className="mx-auto w-full border border-gray-200 bg-white shadow-sm !mt-12">
      {/* Desktop Layout */}
      <div className="hidden items-center sm:flex flex-row">
        {/* Dropdown */}
        <div className="bg-gray-100 ">
          <Select value={selectedOption} onValueChange={handleSearchTypeChange}>
            <SelectTrigger
              dir="rtl"
              className="h-12 min-w-[200px] cursor-pointer border-transparent justify-between w-full bg-gray-100 px-4 text-right"
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
        {/* Search Input */}
        <div className="flex-1 px-4" dir="rtl">
          <Input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentOption?.placeholder}
            className="h-12 w-full border-none text-right text-gray-700 placeholder-gray-400 outline-none shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-12 w-12 rounded-none bg-gray-600 hover:bg-gray-700"
          size="icon"
        >
          <Search size={20} />
        </Button>
      </div>

      {/* Mobile Layout - same structure with updated handlers */}
      <div className="sm:hidden">
        <div className="border-b border-gray-200 px-3 py-2">
          <Select value={selectedOption} onValueChange={handleSearchTypeChange}>
            <SelectTrigger className="w-full bg-white text-right">
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
        </div>

        <div className="flex items-center flex-row-reverse">
          <div className="flex-1 px-3" dir="rtl">
            <Input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentOption?.placeholder}
              className="h-12 w-full border-none text-right text-sm text-gray-700 placeholder-gray-400 outline-none shadow-none focus-visible:ring-0"
              dir="rtl"
            />
          </div>

          <Button
            onClick={handleSearch}
            className="h-12 w-12 rounded-none bg-gray-600 hover:bg-gray-700"
            size="icon"
          >
            <Search size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArabicSearchBar;
