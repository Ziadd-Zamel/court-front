"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export default function DateRangePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const dateFromParam = searchParams.get("date_from");
  const dateToParam = searchParams.get("date_to");

  const [date, setDate] = React.useState<DateRange | undefined>(() => ({
    from: dateFromParam ? new Date(dateFromParam) : undefined,
    to: dateToParam ? new Date(dateToParam) : undefined,
  }));

  const [open, setOpen] = React.useState(false);

  // Sync URL whenever date changes
  React.useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (date?.from) {
      newParams.set("date_from", format(date.from, "yyyy-MM-dd"));
    } else {
      newParams.delete("date_from");
    }

    if (date?.to && date.from?.getTime() !== date.to.getTime()) {
      newParams.set("date_to", format(date.to, "yyyy-MM-dd"));
    } else {
      newParams.delete("date_to");
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [date]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
  };

  const hasDate = date?.from;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          dir="rtl"
          className={cn(
            "flex items-center gap-2 w-full rounded-sm borde cursor-pointerr border-gray-200 bg-white px-3 py-3 shadow-sm",
            "focus-within:ring-1 focus-within:ring-[#e6c599] focus:outline-none",
            "hover:border-[#e6c599] transition-colors duration-200",
            "text-sm",
            !hasDate && "text-gray-400",
          )}
        >
          <div className="flex-1 flex gap-2">
            <CalendarIcon className="h-4 w-4 text-[#e6c599] shrink-0" />

            {/* Date text — grows to fill, truncates gracefully */}
            <span className="truncate">
              {date?.from ? (
                date.to && date.from.getTime() !== date.to.getTime() ? (
                  <>
                    {format(date.from, "yyyy-MM-dd")} —{" "}
                    {format(date.to, "yyyy-MM-dd")}
                  </>
                ) : (
                  format(date.from, "yyyy-MM-dd")
                )
              ) : (
                <span className="text-gray-400 text-sm">
                  اختر تاريخًا أو نطاقًا
                </span>
              )}
            </span>
          </div>

          {/* X clear — lands on the far LEFT in RTL (logical end), never overlaps icon */}
          {hasDate && (
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
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="text-slate-700 dark:text-gray-200"
        />
      </PopoverContent>
    </Popover>
  );
}
