import NoSearchQuery from "@/components/custom/no-search";
import ArabicSearchBar from "./arabic-search-bar";
import SearchContent from "./search-content";
import { Suspense } from "react";
import { BookCardSkeletonGrid } from "@/components/common/book-card-skeleton";

type Props = {
  searchQueries: {
    search?: string;
    search_type?: string;
  };
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default function SearchBooks({ searchQueries, pagination }: Props) {
  const hasSearchQuery = Boolean(searchQueries.search?.trim());

  return (
    <div className="-mt-8">
      <Suspense
        fallback={
          <div className="h-12 w-full bg-gray-100 animate-pulse rounded" />
        }
      >
        <ArabicSearchBar />
      </Suspense>
      {hasSearchQuery ? (
        <Suspense fallback={<BookCardSkeletonGrid />}>
          <SearchContent
            searchQueries={searchQueries}
            pagination={pagination}
          />
        </Suspense>
      ) : (
        <NoSearchQuery />
      )}
    </div>
  );
}
