"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export type BasicInfoByClassParams = {
  month: number;
  year: number;
  classId?: number;
};

async function fetchBasicInfoByClass({
  month,
  year,
  classId,
}: BasicInfoByClassParams): Promise<unknown> {
  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
  });
  if (classId !== undefined) {
    params.set("classId", String(classId));
  }
  const res = await fetch(`/api/basic-info/by-class?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err === "object" && err && "error" in err
        ? String((err as { error: string }).error)
        : `HTTP ${res.status}`,
    );
  }
  return res.json();
}

export function useBasicInfoByClass(
  params: BasicInfoByClassParams,
  options?: Pick<UseQueryOptions<unknown>, "enabled">,
) {
  return useQuery({
    queryKey: [
      "basic-info-by-class",
      params.month,
      params.year,
      params.classId ?? null,
    ],
    queryFn: () => fetchBasicInfoByClass(params),
    ...options,
  });
}
