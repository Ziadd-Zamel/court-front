/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { parseAsNormalizedNumericString } from "@/lib/nuqs/parse-as-normalized-numeric-string";
import { normalizeNumericSearchParams } from "@/lib/utils/normalize-numeric-param";

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
  appeal_number: parseAsNormalizedNumericString,
  appeal_year: parseAsNormalizedNumericString,
  principle_number: parseAsNormalizedNumericString,
  principle_year: parseAsNormalizedNumericString,
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
  return (
    Boolean(params.principle_type_uuids) ||
    TEXT_SEARCH_KEYS.some((key) => Boolean(params[key]))
  );
}

const rulingTypeUrlParser = parseAsArrayOf(parseAsString).withDefault([]);

export const principlePaginationParsers = {
  page: parseAsNormalizedNumericString.withDefault("1"),
  limit: parseAsNormalizedNumericString.withDefault("15"),
};

export const principleSearchQueryKey = (params: PrincipleSearchParams) =>
  ["principle-advanced-search", params] as const;

async function fetchPrincipleSearch(
  params: PrincipleSearchParams,
): Promise<PrincipleSearchResponse<Principle[]>> {
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

  return payload as PrincipleSearchResponse<Principle[]>;
}

type UsePrincipleSearchOptions = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  rulingTypeUuids?: string[];
};

/**
 * Reads the current principle search URL params via nuqs, so the query
 * re-runs when the search button commits form fields and categories.
 */
export function usePrincipleSearch({
  rulingTypeUuids: rulingTypeUuidsFallback,
}: UsePrincipleSearchOptions) {
  const [urlValues] = useQueryStates(principleSearchParsers);
  const [{ page: pageParam, limit: limitParam }] = useQueryStates(
    principlePaginationParsers,
  );
  const [{ ruling_type_uuid: rulingTypesFromUrl }] = useQueryStates({
    ruling_type_uuid: rulingTypeUrlParser,
  });

  const page = Math.max(1, Number(pageParam) || 1);
  const perPage = Math.max(1, Math.min(50, Number(limitParam) || 15));

  const rulingTypeKey = (
    rulingTypesFromUrl.length > 0
      ? rulingTypesFromUrl
      : (rulingTypeUuidsFallback ?? [])
  ).join(",");

  const params = useMemo<PrincipleSearchParams>(
    () =>
      normalizeNumericSearchParams({
        page,
        per_page: perPage,
        principle_type_uuids: rulingTypeKey || undefined,
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
    [urlValues, page, perPage, rulingTypeKey],
  );

  const enabled = hasAnyPrincipleSearchInput(params);

  const query = useQuery({
    queryKey: principleSearchQueryKey(params),
    queryFn: () => fetchPrincipleSearch(params),
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
    placeholderData: keepPreviousData,
  });

  return { ...query, params, enabled };
}
