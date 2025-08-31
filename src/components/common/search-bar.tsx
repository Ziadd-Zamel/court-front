"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const executeSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue.trim());
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchQuery(null);
  };

  const handleSearchClick = () => {
    executeSearch();
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="flex w-full items-center justify-between gap-1 rounded-2xl border border-gray-200 bg-white  py-1 shadow-sm focus-within:ring-1 focus-within:ring-main"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ابحث في هذه الصفحة"
          className="w-full py-2 pl-8 pr-4 text-gray-800 placeholder-gray-400 outline-none"
        />

        {searchQuery ? (
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
