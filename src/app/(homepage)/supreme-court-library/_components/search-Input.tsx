// components/search-input.tsx
"use client";

import { X } from "lucide-react";
import { HelpDialog } from "./help-dialog";
import { cn } from "@/lib/utils";

export function SearchInput({
  value,
  onChange,
  placeholder,
  help,
  className,
  disabled,
}: {
  value?: string;
  onChange: (v: string | null) => void;
  placeholder: string;
  help?: {
    title: string;
    body: string[];
  };
  className?: string;
  disabled?: boolean;
}) {
  const hasValue = Boolean(value?.trim());

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-white/10 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-main",
        disabled && "opacity-40 cursor-not-allowed bg-gray-50 dark:bg-white/5",
        className,
      )}
    >
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 outline-none placeholder:text-sm disabled:cursor-not-allowed"
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="shrink-0 cursor-pointer p-0.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white transition-colors"
          aria-label="مسح"
        >
          <X className="size-6" />
        </button>
      )}

      {help && !hasValue && <HelpDialog title={help.title} body={help.body} />}
    </div>
  );
}
