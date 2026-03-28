"use client";

import AppealsPerformanceStats from "@/app/(homepage)/_components/appeals-performance-stats";
import PerformanceTrackLine from "@/components/custom/performance-track-line";
import {
  mapByClassRowsToStatsRows,
  useBasicInfoByClass,
} from "@/hooks/use-basic-info-by-class";
import { useMonthYearParams } from "@/hooks/use-month-year-params";
import {
  getRollingFiveMonths,
  resolveSlotIndex,
} from "@/lib/performance-metrics/rolling-window";
import { useMemo } from "react";

export default function PerformanceMetricsCategoryContent({
  classId,
}: {
  classId: number;
}) {
  const [params] = useMonthYearParams();
  const window = getRollingFiveMonths(new Date());
  const slotIndex = resolveSlotIndex(window, params.year, params.month);
  const { month, year } = window[slotIndex];

  const { data, isLoading } = useBasicInfoByClass({ month, year, classId });

  const statsRows = useMemo(() => {
    if (data === undefined) return undefined;
    return mapByClassRowsToStatsRows(data);
  }, [data]);

  return (
    <div className="w-full space-y-5 pb-10">
      <AppealsPerformanceStats rows={statsRows} isLoading={isLoading} />
      <PerformanceTrackLine />
    </div>
  );
}
