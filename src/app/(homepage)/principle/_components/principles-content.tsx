"use client";

import { useEffect, useRef } from "react";
import { SearchX } from "lucide-react";

import ErrorState from "@/components/custom/error-state";
import { usePrincipleSearch } from "@/hooks/use-principle-search";

import PrincipleSearch from "./principle-search";
import PrincipleList from "./principle-list";

type Props = {
  rulingTypeUuids: string[];
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default function PrinciplesContent({
  rulingTypeUuids,
  pagination,
}: Props) {
  const { data, isError, isFetching, enabled, params } = usePrincipleSearch({
    pagination,
    rulingTypeUuids,
  });

  const clientPagination = {
    currentPage: params.page,
    limit: params.per_page,
  };
  const wasFetchingRef = useRef(false);

  useEffect(() => {
    if (isFetching) {
      wasFetchingRef.current = true;
      return;
    }

    if (!enabled || !wasFetchingRef.current) return;

    wasFetchingRef.current = false;
    document.getElementById("principles-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [enabled, isFetching]);

  // No search inputs yet => only render the form.
  if (!enabled) {
    return (
      <>
        <PrincipleSearch />
        <div id="principles-results" />
      </>
    );
  }

  if (isFetching && !data) {
    return (
      <>
        <PrincipleSearch isLoading />
        <div id="principles-results" className="min-h-10" />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <PrincipleSearch isLoading={isFetching} />
        <div id="principles-results">
          <ErrorState />
        </div>
      </>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    const resultCount = data?.meta?.total ?? 0;
    return (
      <>
        <PrincipleSearch isLoading={isFetching} />
        <div id="principles-results">
          <div
            className="flex flex-col items-center justify-center px-4 py-16 text-center"
            role="status"
          >
            <div className="mb-6 rounded-full bg-main/10 p-3 dark:bg-white/10">
              <SearchX
                className="size-16 text-main/70 dark:text-main"
                aria-hidden
              />
            </div>
            <p className="font-zain text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              نتائج البحث: {resultCount}
            </p>
            <p className="mt-3 max-w-lg text-sm text-gray-600 dark:text-white/70 sm:text-base">
              تأكد من سلامة الإدخال، أو حاول البحث بمفاتيح أخرى
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PrincipleSearch isLoading={isFetching} />
      <div id="principles-results" className="min-h-10">
        <PrincipleList
          articles={data.data}
          title="المقالات"
          pagination={clientPagination}
          totalItems={data.meta.total}
          totalPages={data.meta.last_page}
        />
      </div>
    </>
  );
}
