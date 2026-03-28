"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export type BasicInfoByStatsParams = {
  month: number;
  year: number;
  classId?: number;
};

export type BasicInfoByStatsRow = {
  classId: number;
  className: string;
  completion_rate: string;
};

export const basicInfoByStatsQueryKey = (p: BasicInfoByStatsParams) =>
  ["basic-info-by-stats", p.month, p.year, p.classId ?? null] as const;

export async function fetchBasicInfoByStats({
  month,
  year,
  classId,
}: BasicInfoByStatsParams): Promise<BasicInfoByStatsRow[]> {
  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
  });
  if (classId !== undefined) {
    params.set("classId", String(classId));
  }
  const res = await fetch(`/api/basic-info/by-stats?${params.toString()}`);
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
    return raw as BasicInfoByStatsRow[];
  }
  if (raw && typeof raw === "object") {
    return [raw as BasicInfoByStatsRow];
  }
  return [];
}

const STALE_TIME_MS = 10 * 60 * 1000;

export function useBasicInfoByStats(
  params: BasicInfoByStatsParams,
  options?: Pick<UseQueryOptions<BasicInfoByStatsRow[]>, "enabled">,
) {
  return useQuery({
    queryKey: basicInfoByStatsQueryKey(params),
    queryFn: () => fetchBasicInfoByStats(params),
    staleTime: STALE_TIME_MS,
    ...options,
  });
}
