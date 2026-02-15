/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildQueryParams } from "../utils/build-query-params";
interface AdvancedSearchParams {
  page?: number;
  perPage?: number;
  exactPhrase?: string;
  similarPhrase?: string;
  includeTerms?: string;
  excludeTerms?: string;
  anyTerms?: string;
  appealNumber?: string;
  appealYear?: string;
  principleNumber?: string;
  principleYear?: string;
}

export const getPrincipleTypes = async (
  page: number = 1,
  perPage: number = 10,
) => {
  // Queries
  const queryString = buildQueryParams({
    page,
    per_page: perPage,
  });

  // url
  const url = `${process.env.API}principle-types?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
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
    exactPhrase,
    similarPhrase,
    includeTerms,
    excludeTerms,
    anyTerms,
    appealNumber,
    appealYear,
    principleNumber,
    principleYear,
  } = params;

  // Queries
  const queryString = buildQueryParams({
    page,
    per_page: perPage,
    exact_phrase: exactPhrase,
    similar_phrase: similarPhrase,
    include_terms: includeTerms,
    exclude_terms: excludeTerms,
    any_terms: anyTerms,
    appeal_number: appealNumber,
    appeal_year: appealYear,
    principle_number: principleNumber,
    principle_year: principleYear,
  });

  // url
  const url = `${process.env.API}principles/advanced-search?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<any[]> = await response.json();
  return payload;
};
