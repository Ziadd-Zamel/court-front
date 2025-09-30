/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ArabicSearchBar = () => {
  const router = useRouter();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("book");

  const handleSearch = () => {
    if (!localSearchQuery.trim()) return;

    const params = new URLSearchParams();

    // Set the appropriate parameter based on selection
    if (selectedOption === "book") {
      params.set("book", localSearchQuery);
    } else if (selectedOption === "author") {
      params.set("author", localSearchQuery);
    } else if (selectedOption === "text") {
      params.set("text", localSearchQuery);
    }

    // Navigate to the same page with new search params
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const searchOptions = [
    { value: "book", label: "البحث عن كتاب", placeholder: "ابحث عن كتاب..." },
    { value: "author", label: "البحث عن مؤلف", placeholder: "ابحث عن مؤلف..." },
    {
      value: "text",
      label: "البحث في النصوص",
      placeholder: "ابحث في النصوص...",
    },
  ];

  const currentOption = searchOptions.find(
    (option) => option.value === selectedOption
  );

  return (
    <div className="mx-auto w-full border border-gray-200 bg-white shadow-sm !mt-12">
      {/* Desktop Layout */}
      <div className="hidden items-center sm:flex">
        {/* Dropdown */}
        <div className="bg-gray-100 ">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="h-12 min-w-[200px] border-transparent justify-between w-full bg-gray-100 px-4 text-right">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {searchOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Search Input */}
        <div className="flex-1 px-4">
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
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-full bg-white text-right">
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir="rtl">
              {searchOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <div className="flex-1 px-3">
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
