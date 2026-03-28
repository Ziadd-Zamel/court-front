/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildQueryParams } from "../utils/build-query-params";

interface AdvancedSearchParams {
  page?: number;
  perPage?: number;
  rulingTypeUuids?: string[];
  exactPhrase?: string;
  similarPhrase?: string;
  includeTerms?: string;
  excludeTerms?: string;
  anyTerms?: string;
  appealNumber?: string;
  appealYear?: string;
  principleNumber?: string;
  principleYear?: string;
  session_date?: string;
  strict_alef?: string; // 0=تطبيع، 1=مطابق
  strict_ya?: string; // 0=تطبيع، 1=مطابق
  strict_ta?: string; // 0=تطبيع، 1=مطابق
}

export const getPrincipleTypes = async (
  page: number = 1,
  perPage: number = 10,
) => {
  const queryString = buildQueryParams({
    page,
    per_page: perPage,
  });

  const url = `${process.env.API}principle-types?${queryString}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<PrincipleType[]> = await response.json();

  return payload;
};

export const getPrincipleBySearch = async (
  params: AdvancedSearchParams = {},
) => {
  const {
    page = 1,
    perPage = 10,
    rulingTypeUuids,
    exactPhrase,
    similarPhrase,
    includeTerms,
    excludeTerms,
    anyTerms,
    appealNumber,
    appealYear,
    principleNumber,
    principleYear,
    session_date,
    strict_alef,
    strict_ya,
    strict_ta,
  } = params;

  const queryString = buildQueryParams({
    page,
    per_page: perPage,
    principle_type_uuids: rulingTypeUuids?.join(","),
    exact_phrase: exactPhrase,
    similar_phrase: similarPhrase,
    include_terms: includeTerms,
    exclude_terms: excludeTerms,
    any_terms: anyTerms,
    appeal_number: appealNumber,
    judicial_year: appealYear,
    principle_number: principleNumber,
    principle_year: principleYear,
    session_date: session_date,
    strict_alef,
    strict_ya,
    strict_ta,
  });

  const url = `${process.env.API}principles/advanced-search?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  const payload: APIResponse<any[]> = await response.json();

  console.log("responseresponseresponse", payload);
  console.log("responseresponseresponse", response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return payload;
};
