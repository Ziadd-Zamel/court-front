import NoSearchQuery from "@/components/custom/no-search";
import ArabicSearchBar from "./arabic-search-bar";
import SearchContent from "./search-content";
import { Suspense } from "react";
import { BookCardSkeletonGrid } from "@/components/common/book-card-skeleton";

type Props = {
  searchQueries: {
    book?: string;
    author?: string;
    text?: string;
  };
};

export default function SearchBooks({ searchQueries }: Props) {
  // Check if any search query exists
  const hasSearchQuery =
    searchQueries.book || searchQueries.author || searchQueries.text;

  return (
    <div>
      <ArabicSearchBar />
      {hasSearchQuery ? (
        <Suspense fallback={<BookCardSkeletonGrid />}>
          <SearchContent searchQueries={searchQueries} />
        </Suspense>
      ) : (
        <NoSearchQuery />
      )}
    </div>
  );
}
