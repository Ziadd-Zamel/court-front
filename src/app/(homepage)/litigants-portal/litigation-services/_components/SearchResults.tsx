"use client";

import { useQuery } from "@tanstack/react-query";
import ContactCard from "./ContactCard";
import { BusinessCard } from "./BusinessCard";
import PaginationComp from "@/components/common/pagination-comp";
import { getAllLawyers } from "@/lib/api/accepted-awyers.api";
import { useQueryState } from "nuqs";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import NoSearchQuery from "@/components/custom/no-search";

const SearchResults = () => {
  // URL state for search parameters
  const [searchName] = useQueryState("name");
  const [searchKeyword] = useQueryState("keyword");
  const [searchCircle] = useQueryState("circle");
  const [searchField] = useQueryState("field");

  // URL state management for search pagination
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = parseInt(value);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
  });

  // Check if any search parameters exist
  const hasSearchParams = Boolean(
    searchName || searchKeyword || searchCircle || searchField
  );

  // Data fetching for search results - only fetch when search params exist
  const {
    data: searchResponse,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: [
      "searchLawyers",
      searchName,
      searchKeyword,
      searchCircle,
      searchField,
      currentPage,
    ],
    queryFn: () =>
      getAllLawyers(
        searchName || "",
        searchField || "",
        searchKeyword || "",
        searchCircle || "",
        10,
        currentPage
      ),
    enabled: hasSearchParams,
  });

  // Handles page change event for search pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!hasSearchParams) return <NoSearchQuery />;

  if (searchError) return <ErrorState />;

  if (!searchResponse?.data || searchResponse.data.length === 0)
    return <NoSearchResults />;

  if (searchLoading) {
    return (
      <div className="items-start w-full pt-10">
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="items-start w-full pt-10">
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          تم العثور على{" "}
          {searchResponse.meta?.total || searchResponse.data.length} محامي
          {searchResponse.meta?.total && searchResponse.meta.total > 1
            ? "ن"
            : ""}
        </p>
      </div>

      <div className="hidden lg:block w-full space-y-4">
        {searchResponse.data.map((lawyer) => (
          <ContactCard key={lawyer.uuid} lawyer={lawyer} />
        ))}
      </div>
      <div className="min-[1200px]:hidden space-y-4">
        {searchResponse.data.map((lawyer) => (
          <BusinessCard key={lawyer.uuid} lawyer={lawyer} />
        ))}
      </div>

      {/* Pagination for search results */}
      {searchResponse.meta?.last_page > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationComp
            currentPage={searchResponse.meta.current_page}
            totalPages={searchResponse.meta.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
