"use client";

import AppealsPerformanceStats from "@/app/(homepage)/_components/appeals-performance-stats";
import PerformanceTrackLine from "@/components/custom/performance-track-line";
import { useBasicInfoByStats } from "@/hooks/use-basic-info-by-stats";
import { useMonthYearParams } from "@/hooks/use-month-year-params";
import {
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";

export default function PerformanceMetricsCategoryContent({
  classId,
}: {
  classId: number;
}) {
  const [params] = useMonthYearParams();
  const window = getRollingFiveMonths(new Date());
  const slotIndex = resolveSlotIndex(window, params.year, params.month);
  const { month, year } = window[slotIndex];

  const { data, isLoading } = useBasicInfoByStats({ month, year, classId });
  console.log(data);
  return (
    <div className="w-full space-y-5 pb-10">
      <AppealsPerformanceStats rows={data} isLoading={isLoading} />
      <PerformanceTrackLine />
    </div>
  );
}
