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
import {
  SITE_SEARCH_TYPES,
  isSiteSearchType,
  type SiteSearchType,
} from "@/lib/constants/site-search";
import { cn } from "@/lib/utils";

type SiteSearchBarProps = {
  variant?: "page" | "overlay";
  onSubmitted?: () => void;
};

export default function SiteSearchBar({
  variant = "page",
  onSubmitted,
}: SiteSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");
  const searchFromUrl = searchParams.get("search") ?? "";
  const isOverlay = variant === "overlay";

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SiteSearchType | "">("");

  useEffect(() => {
    if (isSiteSearchType(typeFromUrl)) {
      setSelectedType(typeFromUrl);
    } else if (!isOverlay) {
      setSelectedType("");
    }
    if (!isOverlay) {
      setQuery(searchFromUrl);
    }
  }, [typeFromUrl, searchFromUrl, isOverlay]);

  const currentOption = SITE_SEARCH_TYPES.find(
    (option) => option.value === selectedType,
  );

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed || !isSiteSearchType(selectedType)) return;

    const params = new URLSearchParams();
    params.set("search", trimmed);
    params.set("type", selectedType);
    router.push(`/search?${params.toString()}`);
    onSubmitted?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <div
      className={cn(
        "mx-auto w-full overflow-hidden rounded-xl border shadow-lg transition-all duration-200",
        isOverlay
          ? "border-white/20 bg-white/10 shadow-black/30 focus-within:border-main/70 focus-within:ring-2 focus-within:ring-main/40"
          : "border-gray-200 bg-white shadow-gray-200/50 focus-within:border-main/50 focus-within:ring-2 focus-within:ring-main/30 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20",
      )}
    >
      <div className="hidden items-stretch sm:flex" dir="rtl">
        <div
          className={cn(
            "border-l",
            isOverlay ? "border-white/15" : "border-gray-200 dark:border-white/10",
          )}
        >
          <Select
            value={selectedType || undefined}
            onValueChange={(value) => {
              if (isSiteSearchType(value)) setSelectedType(value);
            }}
          >
            <SelectTrigger
              dir="rtl"
              className={cn(
                "h-full min-w-[200px] cursor-pointer rounded-none border-0 px-4 text-right focus:ring-0 focus:ring-offset-2",
                isOverlay
                  ? "bg-white/5 text-white placeholder:text-white/60"
                  : "bg-gray-50 text-gray-700 dark:bg-transparent dark:text-white",
              )}
            >
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent
              dir="rtl"
              className="z-[120] text-right"
              align="center"
            >
              {SITE_SEARCH_TYPES.map((option) => (
                <SelectItem
                  className="cursor-pointer text-right"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 flex-1 px-4 py-3" dir="rtl">
          <Input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentOption?.placeholder ?? "اكتب كلمة البحث..."}
            className={cn(
              "h-full w-full rounded-none border-0 bg-transparent text-right shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              isOverlay
                ? "text-white placeholder:text-white/50"
                : "text-gray-800 placeholder:text-gray-400 dark:text-white dark:placeholder-white/50",
            )}
          />
        </div>

        <Button
          onClick={handleSearch}
          className={cn(
            "h-14 w-14 shrink-0 rounded-none bg-main text-primary-foreground hover:bg-main/90",
            isOverlay ? "border-l border-white/10" : "border-l border-main/20",
          )}
          size="icon"
          aria-label="بحث"
        >
          <Search size={22} />
        </Button>
      </div>

      <div className="sm:hidden">
        <div className="flex flex-col gap-2 p-3">
          <Select
            value={selectedType || undefined}
            onValueChange={(value) => {
              if (isSiteSearchType(value)) setSelectedType(value);
            }}
          >
            <SelectTrigger
              dir="rtl"
              className={cn(
                "h-12 w-full rounded-lg text-right",
                isOverlay
                  ? "border-white/15 bg-white/10 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-white",
              )}
            >
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent dir="rtl" className="z-[120] text-right" align="end">
              {SITE_SEARCH_TYPES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2",
              isOverlay
                ? "border-white/15 bg-white/10"
                : "border-gray-200 bg-white dark:border-white/10 dark:bg-white/10",
            )}
          >
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentOption?.placeholder ?? "اكتب كلمة البحث..."}
              autoFocus={isOverlay}
              className={cn(
                "h-10 flex-1 border-0 bg-transparent text-right text-sm shadow-none outline-none focus-visible:ring-0",
                isOverlay
                  ? "text-white placeholder:text-white/50"
                  : "text-gray-700 placeholder:text-gray-400 dark:text-white dark:placeholder-white/50",
              )}
              dir="rtl"
            />
            <Button
              onClick={handleSearch}
              className="h-10 w-10 shrink-0 rounded-lg bg-main hover:bg-main/90"
              size="icon"
              aria-label="بحث"
            >
              <Search size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
