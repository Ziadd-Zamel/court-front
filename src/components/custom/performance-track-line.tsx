"use client";

import { useMonthYearParams } from "@/hooks/use-month-year-params";
import {
  formatMonthLabel,
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PerformanceTrackLineProps = {
  className?: string;
  /** Render only the compact mobile timeline (< sm) */
  mobileOnly?: boolean;
  /** Render only the desktop timeline (sm+) */
  desktopOnly?: boolean;
  /** Tighter spacing when placed between progress bars and chart */
  compact?: boolean;
};

function formatMonthLabelNumeric(year: number, month: number) {
  return `${year}/${month}`;
}

export default function PerformanceTrackLine({
  className = "relative mt-[130px] px-16",
  mobileOnly = false,
  desktopOnly = false,
  compact = false,
}: PerformanceTrackLineProps) {
  const [params, setParams] = useMonthYearParams();
  const window = getRollingFiveMonths(new Date());
  const slotIndex = resolveSlotIndex(window, params.year, params.month);

  const selectSlot = (index: number) => {
    const slot = window[index];
    if (!slot) return;
    void setParams({ year: slot.year, month: slot.month });
  };

  const showMobile = !desktopOnly;
  const showDesktop = !mobileOnly;
  const mobileWrapperClass = compact
    ? "relative mt-2 w-full pb-2 pt-4 sm:hidden"
    : "relative mt-16 w-full pb-6 pt-8 sm:hidden";

  return (
    <>
      {showMobile && (
      <div className={mobileWrapperClass}>
        <div
          style={{ direction: "rtl" }}
          className="relative flex items-center justify-between px-7"
        >
          <button
            type="button"
            className="absolute left-0 z-10 flex cursor-pointer justify-center text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white"
            onClick={() => {
              if (slotIndex < window.length - 1) selectSlot(slotIndex + 1);
            }}
            aria-label="الشهر التالي"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div
            style={{ direction: "rtl" }}
            className="h-[2px] w-full bg-[#e4e4e4] dark:bg-white/20"
          >
            <div
              className="h-full bg-main transition-all duration-500"
              style={{ width: `${slotIndex * 25}%` }}
            />
          </div>

          <div
            style={{ direction: "rtl" }}
            className="absolute inset-x-7 top-1/2 flex -translate-y-1/2 justify-between"
          >
            {window.map((item, index) => (
              <button
                type="button"
                key={`mobile-${item.year}-${item.month}`}
                onClick={() => selectSlot(index)}
                className="group relative w-fit cursor-pointer before:absolute before:-inset-4 before:content-['']"
              >
                <div
                  className={`relative h-1 w-1 rounded-full transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-main ring-4 ring-[#3e5481] dark:ring-main"
                      : "bg-main ring-4 ring-[#e4e4e4] dark:ring-white/30"
                  } `}
                />
                <span className="absolute bottom-5 left-1/2 w-12 -translate-x-1/2 text-center text-[9px] font-bold tabular-nums leading-none text-black dark:text-white">
                  {formatMonthLabelNumeric(item.year, item.month)}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="absolute right-0 z-10 flex cursor-pointer justify-center text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white"
            onClick={() => {
              if (slotIndex > 0) selectSlot(slotIndex - 1);
            }}
            aria-label="الشهر السابق"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
      )}

      {showDesktop && (
      <div className={`hidden sm:block ${className}`}>
        <div
          style={{ direction: "rtl" }}
          className="relative flex items-center justify-between"
        >
          <button
            type="button"
            className="absolute -left-8 cursor-pointer text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white"
            onClick={() => {
              if (slotIndex < window.length - 1) selectSlot(slotIndex + 1);
            }}
          >
            <ArrowLeft className="size-5 sm:size-6" />
          </button>

          <div
            style={{ direction: "rtl" }}
            className="h-[2px] w-full bg-[#e4e4e4] dark:bg-white/20 sm:h-[4px]"
          >
            <div
              className="h-full bg-main transition-all duration-500"
              style={{ width: `${slotIndex * 25}%` }}
            />
          </div>

          <div
            style={{ direction: "rtl" }}
            className="absolute flex w-full justify-between"
          >
            {window.map((item, index) => (
              <button
                type="button"
                key={`${item.year}-${item.month}`}
                onClick={() => selectSlot(index)}
                className="group relative w-fit cursor-pointer before:absolute before:-inset-4 before:content-[''] sm:before:-inset-8"
              >
                <div
                  className={`relative h-1 w-1 rounded-full transition-all duration-300 sm:h-2 sm:w-2 ${
                    slotIndex === index
                      ? "bg-main ring-4 ring-[#3e5481] dark:ring-main sm:ring-8"
                      : "bg-main ring-4 ring-[#e4e4e4] dark:ring-white/30 hover:ring-4 hover:ring-[#3e5481] dark:hover:ring-main sm:ring-8"
                  } `}
                />
                <span className="absolute bottom-5 left-1/2 w-[50px] -translate-x-1/2 transform text-[9px] font-bold text-black dark:text-white sm:w-[120px] sm:text-sm">
                  {formatMonthLabel(item.year, item.month)}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="absolute -right-8 cursor-pointer text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white"
            onClick={() => {
              if (slotIndex > 0) selectSlot(slotIndex - 1);
            }}
          >
            <ArrowRight className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
      )}
    </>
  );
}
