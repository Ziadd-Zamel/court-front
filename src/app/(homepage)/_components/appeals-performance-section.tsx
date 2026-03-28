"use client";

import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import PerformanceTrackLine from "@/components/custom/performance-track-line";
import PerformanceTrackLineSkeleton from "@/components/custom/performance-track-line-skeleton";
import { useBasicInfoByStats } from "@/hooks/use-basic-info-by-stats";
import { useMonthYearParams } from "@/hooks/use-month-year-params";
import { usePrefetchBasicInfoByStatsWindow } from "@/hooks/use-prefetch-basic-info-by-stats-window";
import {
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";
import Link from "next/link";
import AppealsPerformanceStats from "./appeals-performance-stats";

export default function AppealsPerformanceSection() {
  usePrefetchBasicInfoByStatsWindow();

  const [params] = useMonthYearParams();
  const window = getRollingFiveMonths(new Date());
  const slotIndex = resolveSlotIndex(window, params.year, params.month);
  const { month, year } = window[slotIndex];

  const { data, isLoading } = useBasicInfoByStats({ month, year });

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white pb-40 pt-16 dark:bg-[#121212]">
      <AnimatedSectionHeader title="مؤشرات الأداء" />
      <div className="box-container w-full space-y-5">
        <AppealsPerformanceStats
          text="المعدل الفردي"
          rows={data}
          isLoading={isLoading}
        />
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
