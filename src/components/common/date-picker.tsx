"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

type FormDatePickerProps = {
  placeholder?: string;
};

export default function DatePicker({ placeholder }: FormDatePickerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sessionDateParam = searchParams.get("session_date");

  const [date, setDate] = React.useState<Date | undefined>(
    sessionDateParam ? new Date(sessionDateParam) : undefined,
  );

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);

    const newParams = new URLSearchParams(searchParams);
    if (selected) {
      newParams.set("session_date", format(selected, "yyyy-MM-dd"));
    } else {
      newParams.delete("session_date");
    }
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          dir="rtl"
          className={cn(
            "flex items-center gap-2 w-full rounded-sm border border-gray-200 bg-white px-3 py-3 shadow-sm",
            "focus-within:ring-1 focus-within:ring-[#e6c599] focus:outline-none",
            "hover:border-[#e6c599] transition-colors duration-200",
            "text-sm",
            !date && "text-gray-400",
          )}
        >
          <div className="flex-1 flex items-center gap-3">
            <CalendarIcon className="h-4 w-4 -mt-1 text-[#e6c599] shrink-0" />
            <span className="truncate">
              {date ? (
                format(date, "yyyy-MM-dd")
              ) : (
                <span className="text-gray-400 text-sm">
                  {placeholder ?? "اختر تاريخًا"}
                </span>
              )}
            </span>
          </div>
          {date && (
            <X
              className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 shrink-0"
              onClick={handleClear}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto p-4 rounded-xl border-2 shadow-lg",
          "border-slate-200 bg-white",
          "dark:border-gray-600 dark:bg-gray-700",
        )}
        align="center"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
