"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { BasicInfoByStatsRow } from "@/hooks/use-basic-info-by-stats";

/** Raw `api/basic-info/by-class` row (per court department). */
export type BasicInfoByClassRow = {
  category: string;
  court_department: string;
  completion_rate: string;
  decided_percentage?: string;
  color: string;
};

export type BasicInfoByClassParams = {
  month: number;
  year: number;
  classId: number;
};

export const basicInfoByClassQueryKey = (p: BasicInfoByClassParams) =>
  ["basic-info-by-class", p.month, p.year, p.classId] as const;

export async function fetchBasicInfoByClass(
  params: BasicInfoByClassParams,
): Promise<BasicInfoByClassRow[]> {
  const search = new URLSearchParams({
    month: String(params.month),
    year: String(params.year),
    classId: String(params.classId),
  });
  const res = await fetch(`/api/basic-info/by-class?${search.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err === "object" && err && "error" in err
        ? String((err as { error: string }).error)
        : `HTTP ${res.status}`,
    );
  }
  const raw: unknown = await res.json();
  if (Array.isArray(raw)) {
    return raw as BasicInfoByClassRow[];
  }
  if (raw && typeof raw === "object") {
    return [raw as BasicInfoByClassRow];
  }
  return [];
}

/** Maps by-class API rows into the shape used by `AppealsPerformanceStats` (labels = court department). */
export function mapByClassRowsToStatsRows(
  rows: BasicInfoByClassRow[],
): BasicInfoByStatsRow[] {
  return rows.map((row, index) => ({
    classId: index,
    className: row.court_department,
    completion_rate: row.completion_rate,
    decided_percentage: row.decided_percentage,
    color: row.color ?? "#D93030",
  }));
}

const STALE_TIME_MS = 10 * 60 * 1000;

export function useBasicInfoByClass(
  params: BasicInfoByClassParams,
  options?: Pick<UseQueryOptions<BasicInfoByClassRow[]>, "enabled">,
) {
  return useQuery({
    queryKey: basicInfoByClassQueryKey(params),
    queryFn: () => fetchBasicInfoByClass(params),
    staleTime: STALE_TIME_MS,
    ...options,
  });
}
