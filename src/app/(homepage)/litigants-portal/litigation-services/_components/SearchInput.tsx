// components/CustomInputs/SearchInput.tsx
"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => (
  <div className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-main">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
    />
    <Search size={20} className="text-main" />
  </div>
);

export default SearchInput;
