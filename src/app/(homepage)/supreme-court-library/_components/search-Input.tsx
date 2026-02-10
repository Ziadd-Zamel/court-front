// components/search-input.tsx
"use client";

import { HelpDialog } from "./help-dialog";
import { cn } from "@/lib/utils";

export function SearchInput({
  value,
  onChange,
  placeholder,
  help,
  className,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder: string;
  help?: {
    title: string;
    body: string[];
  };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-main",
        className,
      )}
    >
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-gray-800 placeholder-gray-400 outline-none placeholder:text-sm"
      />

      {help && <HelpDialog title={help.title} body={help.body} />}
    </div>
  );
}
