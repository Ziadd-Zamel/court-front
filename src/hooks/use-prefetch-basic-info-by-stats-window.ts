"use client";

import { getRollingFiveMonths } from "@/lib/performance-metrics/rolling-window";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  basicInfoByStatsQueryKey,
  fetchBasicInfoByStats,
} from "./use-basic-info-by-stats";

/** Prefetches by-stats for all 5 months in the current rolling window once on mount. */
export function usePrefetchBasicInfoByStatsWindow() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const window = getRollingFiveMonths(new Date());
    for (const { month, year } of window) {
      const params = { month, year };
      void queryClient.prefetchQuery({
        queryKey: basicInfoByStatsQueryKey(params),
        queryFn: () => fetchBasicInfoByStats(params),
      });
    }
  }, [queryClient]);
}
