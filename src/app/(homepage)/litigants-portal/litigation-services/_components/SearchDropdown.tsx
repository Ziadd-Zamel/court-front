// components/CustomInputs/SearchDropdown.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  uuid: string;
  name: string;
}

interface SearchDropdownProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: Option[];
}

const SearchDropdown = ({
  value,
  onChange,
  placeholder,
  options,
}: SearchDropdownProps) => (
  <div className="w-full">
    <Select dir="rtl" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.uuid} value={option.uuid}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SearchDropdown;
