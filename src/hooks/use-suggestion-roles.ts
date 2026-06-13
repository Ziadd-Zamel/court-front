"use client";

import { useQuery } from "@tanstack/react-query";

export type SuggestionRole = {
  uuid: string;
  title: string;
};

export const suggestionRolesQueryKey = ["suggestion-roles"] as const;

export async function fetchSuggestionRoles(): Promise<SuggestionRole[]> {
  const res = await fetch("/api/suggestion-roles", { cache: "no-store" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err === "object" && err && "error" in err
        ? String((err as { error: string }).error)
        : `HTTP ${res.status}`,
    );
  }

  const payload: APIResponse<SuggestionRole[]> = await res.json();

  if (!("data" in payload)) {
    throw new Error(payload.message ?? "Failed to fetch suggestion roles");
  }

  return payload.data;
}

const STALE_TIME_MS = 30 * 60 * 1000;

export function useSuggestionRoles() {
  return useQuery({
    queryKey: suggestionRolesQueryKey,
    queryFn: fetchSuggestionRoles,
    staleTime: STALE_TIME_MS,
  });
}
