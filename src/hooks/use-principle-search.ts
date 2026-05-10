"use client";

import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryStates, parseAsString } from "nuqs";

/**
 * Shared parsers for every URL key the principle search reads/writes.
 * The form (PrincipleSearch) writes via the same parsers, so reads here are
 * always in sync with whatever the user submitted.
 */
export const principleSearchParsers = {
  exact_phrase: parseAsString,
  similar_phrase: parseAsString,
  include_terms: parseAsString,
  exclude_terms: parseAsString,
  any_terms: parseAsString,
  appeal_number: parseAsString,
  appeal_year: parseAsString,
  principle_number: parseAsString,
  principle_year: parseAsString,
  session_date: parseAsString,
  strict_alef: parseAsString,
  strict_ya: parseAsString,
  strict_ta: parseAsString,
};

export type PrincipleSearchParams = {
  page: number;
  per_page: number;
  principle_type_uuids?: string;
  exact_phrase?: string;
  similar_phrase?: string;
  include_terms?: string;
  exclude_terms?: string;
  any_terms?: string;
  appeal_number?: string;
  appeal_year?: string;
  principle_number?: string;
  principle_year?: string;
  session_date?: string;
  strict_alef?: string;
  strict_ya?: string;
  strict_ta?: string;
};

const TEXT_SEARCH_KEYS = [
  "exact_phrase",
  "similar_phrase",
  "include_terms",
  "exclude_terms",
  "any_terms",
  "appeal_number",
  "appeal_year",
  "principle_number",
  "principle_year",
  "session_date",
] as const;

export function hasAnyPrincipleSearchInput(params: PrincipleSearchParams) {
  return TEXT_SEARCH_KEYS.some((key) => Boolean(params[key]));
}

export const principleSearchQueryKey = (params: PrincipleSearchParams) =>
  ["principle-advanced-search", params] as const;

async function fetchPrincipleSearch(
  params: PrincipleSearchParams,
): Promise<SuccessfulResponse<Principle[]>> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.append(key, String(value));
  });

  const response = await fetch(
    `/api/principles/advanced-search?${query.toString()}`,
  );

  const payload = await response.json();

  if (!response.ok || (payload && payload.success === false)) {
    const message =
      (payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message: unknown }).message)
        : null) ?? `HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload as SuccessfulResponse<Principle[]>;
}

type UsePrincipleSearchOptions = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  rulingTypeUuids: string[];
};

/**
 * Reads the current principle search URL params via nuqs, so the query
 * re-runs reactively whenever PrincipleSearch (or the strict switches /
 * date picker) commits new values to the URL.
 */
export function usePrincipleSearch({
  pagination,
  rulingTypeUuids,
}: UsePrincipleSearchOptions) {
  const [urlValues] = useQueryStates(principleSearchParsers);

  const params = useMemo<PrincipleSearchParams>(
    () => ({
      page: pagination.currentPage,
      per_page: pagination.limit,
      principle_type_uuids:
        rulingTypeUuids.length > 0 ? rulingTypeUuids.join(",") : undefined,
      exact_phrase: urlValues.exact_phrase ?? undefined,
      similar_phrase: urlValues.similar_phrase ?? undefined,
      include_terms: urlValues.include_terms ?? undefined,
      exclude_terms: urlValues.exclude_terms ?? undefined,
      any_terms: urlValues.any_terms ?? undefined,
      appeal_number: urlValues.appeal_number ?? undefined,
      appeal_year: urlValues.appeal_year ?? undefined,
      principle_number: urlValues.principle_number ?? undefined,
      principle_year: urlValues.principle_year ?? undefined,
      session_date: urlValues.session_date ?? undefined,
      strict_alef: urlValues.strict_alef ?? undefined,
      strict_ya: urlValues.strict_ya ?? undefined,
      strict_ta: urlValues.strict_ta ?? undefined,
    }),
    [
      urlValues,
      pagination.currentPage,
      pagination.limit,
      rulingTypeUuids,
    ],
  );

  const enabled = hasAnyPrincipleSearchInput(params);

  const query = useQuery({
    queryKey: principleSearchQueryKey(params),
    queryFn: () => fetchPrincipleSearch(params),
    enabled,
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return { ...query, params, enabled };
}
