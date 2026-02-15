/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPrincipleBySearch } from "@/lib/api/principle.api";
import catchError from "@/lib/utils/catch-error";
import PrincipleSearch from "./principle-search";
import PrincipleList from "./principle-list";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchQuery from "@/components/custom/no-search";

type Props = {
  uuid: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchParams: {
    search?: string;
    exact_phrase?: string;
    similar_phrase?: string;
    include_terms?: string;
    exclude_terms?: string;
    any_terms?: string;
    appeal_number?: string;
    appeal_year?: string;
    principle_number?: string;
    principle_year?: string;
  };
};
export default async function PrinciplesContent({
  uuid,
  pagination,
  searchParams,
}: Props) {
  const hasSearchParams = Boolean(
    searchParams.exact_phrase ||
    searchParams.similar_phrase ||
    searchParams.include_terms ||
    searchParams.exclude_terms ||
    searchParams.any_terms ||
    searchParams.appeal_number ||
    searchParams.appeal_year ||
    searchParams.principle_number ||
    searchParams.principle_year,
  );

  const [payload, error] = await catchError(() =>
    getPrincipleBySearch({
      page: pagination.currentPage,
      perPage: pagination.limit,
      exactPhrase: searchParams.exact_phrase,
      similarPhrase: searchParams.similar_phrase,
      includeTerms: searchParams.include_terms,
      excludeTerms: searchParams.exclude_terms,
      anyTerms: searchParams.any_terms,
      appealNumber: searchParams.appeal_number,
      appealYear: searchParams.appeal_year,
      principleNumber: searchParams.principle_number,
      principleYear: searchParams.principle_year,
    }),
  );

  if (error) {
    return (
      <>
        <PrincipleSearch />
        <ErrorState />
      </>
    );
  }

  // Has search params but no results
  if (!payload || !payload.data || payload.data.length === 0) {
    return (
      <>
        <PrincipleSearch />
        <NoDataState />
      </>
    );
  }
  console.log(payload);
  // Has search params and has results
  return (
    <>
      <PrincipleSearch />
      <PrincipleList
        articles={payload.data}
        title={`المقالات - ${uuid}`}
        pagination={pagination}
        totalPages={payload.meta.last_page}
      />{" "}
    </>
  );
}
