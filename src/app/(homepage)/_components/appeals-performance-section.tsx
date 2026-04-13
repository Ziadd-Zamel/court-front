"use client";

import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import PerformanceTrackLine from "@/components/custom/performance-track-line";
import { useBasicInfoByStats } from "@/hooks/use-basic-info-by-stats";
import { useMonthYearParams } from "@/hooks/use-month-year-params";
import { usePrefetchBasicInfoByStatsWindow } from "@/hooks/use-prefetch-basic-info-by-stats-window";
import {
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";
import Link from "next/link";
import AppealsPerformanceStats from "./appeals-performance-stats";
import { FileX } from "lucide-react";

export default function AppealsPerformanceSection() {
  usePrefetchBasicInfoByStatsWindow();

  const [params] = useMonthYearParams();
  const window = getRollingFiveMonths(new Date());
  const slotIndex = resolveSlotIndex(window, params.year, params.month);
  const { month, year } = window[slotIndex];

  const { data, isLoading, isSuccess } = useBasicInfoByStats({ month, year });
  const showStatsEmpty =
    isSuccess &&
    Array.isArray(data) &&
    // empty array
    (data.length === 0 ||
      // message case
      (data.length === 1 && "message" in data[0]) ||
      // ONLY ONE ITEM and it's zero
      (data.length === 1 &&
        !("message" in data[0]) &&
        Number(data[0]?.completion_rate ?? 0) === 0 &&
        Number(data[0]?.decided_percentage ?? 0) === 0));
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white pb-40 pt-16 dark:bg-[#121212]">
      <AnimatedSectionHeader title="مؤشرات الأداء" />
      <div className="box-container w-full space-y-5 ">
        {showStatsEmpty ? (
          <div
            className="flex w-full h-full flex-col items-center justify-center gap-3 px-4 pt-12 pb-4 text-center"
            role="status"
          >
            <div className="bg-main/10 dark:bg-white/10 rounded-full p-5 mb-6">
              <FileX className="w-14 h-14 text-main/70 dark:text-main" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">
              لا تتوفر بيانات
            </h2>
            <p className="text-gray-600 dark:text-white/70 text-center mb-8 max-w-md lg:text-lg">
              بيانات هذا الشهر غير متوفرة{" "}
            </p>
          </div>
        ) : (
          <AppealsPerformanceStats rows={data} isLoading={isLoading} />
        )}
        <PerformanceTrackLine />
      </div>
      <Link
        className="me-18 -mb-16 mt-26 self-end text-lg font-semibold text-main"
        href="/about-court/performance-metrics"
      >
        التفاصيل
      </Link>
    </div>
  );
}
