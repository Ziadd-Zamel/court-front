"use client";

import { useQuery } from "@tanstack/react-query";
import ContactCard from "./ContactCard";
import { BusinessCard } from "./BusinessCard";
import PaginationComp from "@/components/common/pagination-comp";
import { getAllLawyers } from "@/lib/api/accepted-awyers.api";
import { useQueryState } from "nuqs";

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
    refetch: refetchSearch,
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
        searchKeyword || "",
        searchCircle || "",
        searchField || "",
        10,
        currentPage
      ),
    enabled: hasSearchParams, // Only fetch when search parameters exist
  });

  // Handles page change event for search pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handles retry action when search fails
  const handleSearchRetry = () => {
    refetchSearch();
  };

  // Show initial state when no search parameters are provided
  if (!hasSearchParams) {
    return (
      <div className="items-start w-full pt-10">
        <div className="text-center py-20">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            ابدأ البحث عن المحامين
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            استخدم نموذج البحث أعلاه للعثور على المحامين المناسبين لاحتياجاتك.
            يمكنك البحث بالاسم، الكلمات المفتاحية، الدائرة، أو مجال التخصص.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="items-start w-full pt-10">
      {/* Loading state for search */}
      {searchLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ) : // Error state for search
      searchError ? (
        <div className="text-center py-10">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-600 mb-2">
            حدث خطأ في البحث
          </h3>
          <p className="text-gray-600 mb-4">
            عذراً، لم نتمكن من تنفيذ البحث. يرجى المحاولة مرة أخرى.
          </p>
          <button
            onClick={handleSearchRetry}
            className="bg-main text-white px-6 py-2 rounded-md hover:bg-main/90 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : // Success state with search results
      searchResponse?.data && searchResponse.data.length > 0 ? (
        <>
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
        </>
      ) : (
        // Empty search results - when search was performed but no results found
        <div className="text-center py-20">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462-.943-6-2.47m12 6.472A7.963 7.963 0 0112 21a7.963 7.963 0 01-6-2.47m12-6.472c-.463 2.273-2.164 4.145-4.302 5.187M6 16.528c2.138-1.042 3.839-2.914 4.302-5.187"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            لا توجد نتائج مطابقة
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            لم يتم العثور على محامين يطابقون معايير البحث الخاصة بك. جرب تعديل
            كلمات البحث أو توسيع نطاق البحث.
          </p>
          <div className="text-sm text-gray-400">
            <p className="mb-2">نصائح للحصول على نتائج أفضل:</p>
            <ul className="text-right inline-block">
              <li>• تأكد من صحة كتابة الكلمات</li>
              <li>• استخدم كلمات مفتاحية أكثر عمومية</li>
              <li>• جرب البحث بمعايير أقل</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
