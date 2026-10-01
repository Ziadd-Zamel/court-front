"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";
import {
  isSiteSearchScope,
  type SiteSearchScope,
} from "@/lib/constants/site-search";
import { parseAsNormalizedNumericString } from "@/lib/nuqs/parse-as-normalized-numeric-string";

export const siteSearchUrlParsers = {
  search: parseAsString.withDefault(""),
  scope: parseAsString.withDefault(""),
  page: parseAsNormalizedNumericString.withDefault("1"),
  limit: parseAsNormalizedNumericString.withDefault("15"),
};

export type SiteSearchQueryParams = {
  search: string;
  scope: SiteSearchScope;
  page: number;
  per_page: number;
};

export const siteSearchQueryKey = (params: SiteSearchQueryParams) =>
  ["site-search", params] as const;

export const siteSearchOptionsQueryKey = ["site-search-options"] as const;

type SiteSearchClientResponse = {
  success: boolean;
  message?: string;
  data: SiteSearchResultData;
};

async function fetchSiteSearch(
  params: SiteSearchQueryParams,
): Promise<SiteSearchClientResponse> {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      search: params.search,
      scope: params.scope,
      page: params.page,
      per_page: params.per_page,
    }),
  });

  const payload = await response.json();

  if (!response.ok || payload?.success === false) {
    throw new Error(
      (payload && typeof payload.message === "string"
        ? payload.message
        : null) ?? `HTTP ${response.status}`,
    );
  }

  return payload as SiteSearchClientResponse;
}

async function fetchSiteSearchOptions(): Promise<SiteSearchOption[]> {
  const response = await fetch("/api/search/options", {
    headers: { Accept: "application/json" },
  });
  const payload = await response.json();

  if (
    !response.ok ||
    payload?.success === false ||
    !Array.isArray(payload?.data)
  ) {
    throw new Error(
      (payload && typeof payload.message === "string"
        ? payload.message
        : null) ?? `HTTP ${response.status}`,
    );
  }

  return payload.data as SiteSearchOption[];
}

export function useSiteSearchUrlState() {
  return useQueryStates(siteSearchUrlParsers, {
    history: "replace",
    shallow: true,
    scroll: false,
  });
}

export function useSiteSearch() {
  const [url] = useSiteSearchUrlState();

  const search = url.search.trim();
  const scope = isSiteSearchScope(url.scope) ? url.scope : null;
  const page = Math.max(1, Number(url.page) || 1);
  const perPage = Math.max(1, Math.min(50, Number(url.limit) || 15));

  const enabled = Boolean(search && scope);

  const params: SiteSearchQueryParams | null =
    enabled && scope
      ? { search, scope, page, per_page: perPage }
      : null;

  const query = useQuery({
    queryKey: params ? siteSearchQueryKey(params) : ["site-search", "idle"],
    queryFn: () => fetchSiteSearch(params!),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    params,
    enabled,
    search,
    scope,
    page,
    perPage,
  };
}

export function useSiteSearchOptions() {
  return useQuery({
    queryKey: siteSearchOptionsQueryKey,
    queryFn: fetchSiteSearchOptions,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
