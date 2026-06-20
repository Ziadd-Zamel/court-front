"use client";

import { Suspense, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { cn } from "@/lib/utils";

const searchBarParsers = {
  search: parseAsString,
  page: parseAsString,
  perpage: parseAsString,
  per_page: parseAsString,
  limit: parseAsString,
};

function SearchBarInner({ className }: { className?: string }) {
  const [params, setParams] = useQueryStates(searchBarParsers, {
    history: "push",
    scroll: false,
    shallow: false,
  });

  const [value, setValue] = useState(params.search ?? "");
  const committedSearch = params.search?.trim() ?? "";
  const draftSearch = value.trim();
  const hasPendingChange = draftSearch !== committedSearch;
  const showSearchButton =
    Boolean(draftSearch) && (!committedSearch || hasPendingChange);
  const showClearButton =
    Boolean(committedSearch) && (!hasPendingChange || !draftSearch);
  const showIdleSearch = !committedSearch && !draftSearch;

  useEffect(() => {
    setValue(params.search ?? "");
  }, [params.search]);

  const commitSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setParams({
      search: trimmed,
      page: null,
      perpage: null,
      per_page: null,
      limit: null,
    });
  };

  const handleClear = () => {
    setValue("");
    setParams({
      search: null,
      page: null,
      perpage: null,
      per_page: null,
      limit: null,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitSearch();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-main dark:border-white/10 dark:bg-white/10",
        className,
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ابحث في هذه الصفحة"
        className="w-full bg-transparent text-gray-800 outline-none placeholder:text-sm placeholder:text-gray-400 dark:text-white dark:placeholder-white/50"
      />
      {showClearButton ? (
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleClear}
          aria-label="مسح البحث"
        >
          <X
            size={16}
            className="text-gray-400 hover:text-gray-600 dark:text-white/50 dark:hover:text-white"
          />
        </button>
      ) : null}
      {showSearchButton || showIdleSearch ? (
        <button
          type="button"
          className="cursor-pointer"
          onClick={commitSearch}
          aria-label="بحث"
        >
          <Search size={16} className="text-main hover:text-main/70" />
        </button>
      ) : null}
    </div>
  );
}

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/10",
            className,
          )}
        >
          <div className="h-5 w-full rounded bg-gray-100 dark:bg-white/10" />
        </div>
      }
    >
      <SearchBarInner className={className} />
    </Suspense>
  );
};

export default SearchBar;
