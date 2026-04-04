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

  const { data, isLoading, isSuccess } = useBasicInfoByClass({
    month,
    year,
    classId,
  });

  const statsRows = useMemo(() => {
    if (data === undefined) return undefined;
    return mapByClassRowsToStatsRows(data);
  }, [data]);

  const showStatsEmpty =
    isSuccess && Array.isArray(data) && data.length === 0;

  return (
    <div className="w-full space-y-5 pb-10">
      {showStatsEmpty ? (
        <div
          className="flex w-full flex-col items-center justify-center gap-3 px-4 pt-12 pb-4 text-center"
          role="status"
        >
          <p className="font-zain text-lg font-medium text-gray-800 dark:text-white">
            لا تتوفر بيانات
          </p>
          <p className="max-w-md text-sm text-gray-600 dark:text-white/70">
            لا توجد مؤشرات أداء لعرضها لهذا التصنيف في الشهر المحدد.
          </p>
        </div>
      ) : (
        <AppealsPerformanceStats rows={statsRows} isLoading={isLoading} />
      )}
      <PerformanceTrackLine />
    </div>
  );
}
