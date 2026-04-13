"use client";

import AppealsPerformanceStats from "@/app/(homepage)/_components/appeals-performance-stats";
import NoDataState from "@/components/custom/no-data-state";
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
import { FileX } from "lucide-react";
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
    <div className="w-full space-y-5 pb-10">
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
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
          <AppealsPerformanceStats
            useDecidedForPie
            rows={statsRows}
            isLoading={isLoading}
          />
        )}
      </div>
      <PerformanceTrackLine />
    </div>
  );
}
