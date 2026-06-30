"use client";

import { useMonthYearParams } from "@/hooks/use-month-year-params";
import {
  formatMonthLabel,
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

function getTrackFillPercent(slotIndex: number, total: number) {
  if (total <= 1) return 100;
  return (slotIndex / (total - 1)) * 100;
}

/** Dot position from the left edge (newest month on the left). */
function getDotLeftPercent(index: number, total: number) {
  if (total <= 1) return 50;
  return ((total - 1 - index) / (total - 1)) * 100;
}

type TrackProps = {
  window: ReturnType<typeof getRollingFiveMonths>;
  slotIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  compact?: boolean;
  numericLabels?: boolean;
};

function PerformanceTrack({
  window,
  slotIndex,
  onSelect,
  onPrev,
  onNext,
  compact = false,
  numericLabels = false,
}: TrackProps) {
  const fillPercent = getTrackFillPercent(slotIndex, window.length);
  const dotSize = compact ? "h-1 w-1 ring-4" : "h-1 w-1 ring-4 sm:h-2 sm:w-2 sm:ring-8";
  const labelClass = numericLabels
    ? cn(
        "absolute left-1/2 w-12 -translate-x-1/2 text-center text-[9px] font-bold tabular-nums leading-none text-black dark:text-white",
        compact ? "bottom-6" : "bottom-5",
      )
    : "absolute bottom-5 left-1/2 w-[50px] -translate-x-1/2 text-[9px] font-bold text-black dark:text-white sm:w-[120px] sm:text-sm";

  return (
    <div
      className={cn(
        "relative",
        compact ? "px-7 pt-10 pb-6" : "px-8 pt-10 pb-2 sm:px-0 sm:pt-0",
      )}
    >
      <button
        type="button"
        className={cn(
          "absolute z-10 flex cursor-pointer justify-center text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white",
          compact ? "left-0 top-1/2 -translate-y-1/2" : "-left-8 top-1/2 -translate-y-1/2",
        )}
        onClick={onNext}
        aria-label="الشهر التالي"
      >
        <ArrowLeft className="size-5 sm:size-6" />
      </button>

      <button
        type="button"
        className={cn(
          "absolute z-10 flex cursor-pointer justify-center text-gray-400 transition-colors hover:text-gray-300 dark:text-white/60 dark:hover:text-white",
          compact ? "right-0 top-1/2 -translate-y-1/2" : "-right-8 top-1/2 -translate-y-1/2",
        )}
        onClick={onPrev}
        aria-label="الشهر السابق"
      >
        <ArrowRight className="size-5 sm:size-6" />
      </button>

      <div className="relative mx-auto w-full">
        <div className="relative h-[2px] w-full bg-[#e4e4e4] dark:bg-white/20 sm:h-[4px]">
          <div
            className="absolute right-0 top-0 h-full bg-main transition-all duration-500"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0 -translate-y-1/2">
          {window.map((item, index) => {
            const left = getDotLeftPercent(index, window.length);
            const isActive = slotIndex === index;

            return (
              <button
                type="button"
                key={`${item.year}-${item.month}-${index}`}
                onClick={() => onSelect(index)}
                className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer before:absolute before:-inset-4 before:content-[''] sm:before:-inset-8"
                style={{ left: `${left}%` }}
              >
                <div
                  className={cn(
                    "relative rounded-full bg-main transition-all duration-300",
                    dotSize,
                    isActive
                      ? "ring-[#3e5481] dark:ring-main"
                      : "ring-[#e4e4e4] hover:ring-[#3e5481] dark:ring-white/30 dark:hover:ring-main",
                  )}
                />
                <span className={labelClass}>
                  {numericLabels
                    ? formatMonthLabelNumeric(item.year, item.month)
                    : formatMonthLabel(item.year, item.month)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
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

  const goPrev = () => {
    if (slotIndex > 0) selectSlot(slotIndex - 1);
  };

  const goNext = () => {
    if (slotIndex < window.length - 1) selectSlot(slotIndex + 1);
  };

  const showMobile = !desktopOnly;
  const showDesktop = !mobileOnly;

  return (
    <>
      {showMobile && (
        <div
          className={cn(
            "relative w-full sm:hidden",
            compact ? "mt-6 pb-8 pt-4" : "mt-16 pb-6 pt-8",
          )}
        >
          <PerformanceTrack
            window={window}
            slotIndex={slotIndex}
            onSelect={selectSlot}
            onPrev={goPrev}
            onNext={goNext}
            compact={compact}
            numericLabels
          />
        </div>
      )}

      {showDesktop && (
        <div className={cn("hidden sm:block", className)}>
          <PerformanceTrack
            window={window}
            slotIndex={slotIndex}
            onSelect={selectSlot}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>
      )}
    </>
  );
}
