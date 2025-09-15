"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import ContactCard from "./ContactCard";
import { BusinessCard } from "./BusinessCard";
import PaginationComp from "@/components/common/pagination-comp";
import { getAllLawyers } from "@/lib/api/accepted-awyers.api";
import { useQueryState } from "nuqs";
import SearchResults from "./SearchResults";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";

const ContentSection = () => {
  const [activeTab, setActiveTab] = useQueryState("tab");

  // URL state management for pagination
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = parseInt(value);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
  });

  // Data fetching for lawyers
  const {
    data: lawyersResponse,
    isLoading: lawyersLoading,
    error: lawyersError,
  } = useQuery({
    queryKey: ["lawyers", currentPage],
    queryFn: () =>
      getAllLawyers(
        undefined,
        undefined,
        undefined,
        undefined,
        10,
        currentPage
      ),
  });

  // Handles page change event for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Tabs
      dir="rtl"
      className="w-full"
      defaultValue="content"
      value={activeTab || "content"}
      onValueChange={setActiveTab}
    >
      <TabsList className="bg-transparent gap-5 mt-3 w-full lg:w-fit">
        <TabsTrigger
          className="bg-transparent cursor-pointer pb-7 px-0 sm:px-5 text-xl rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-t-0 border-x-0 border-b-2 data-[state=active]:border-b-4 border-main"
          value="content"
        >
          كل المحامين
        </TabsTrigger>
        <TabsTrigger
          className="bg-transparent cursor-pointer pb-7 px-0 sm:px-5 text-xl rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-t-0 border-x-0 border-b-2 data-[state=active]:border-b-4 border-main"
          value="searchResult"
        >
          نتائج البحث
        </TabsTrigger>
      </TabsList>

      <TabsContent value="searchResult">
        <SearchResults />
      </TabsContent>

      <TabsContent value="content" className="w-full  mt-10">
        {lawyersLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ) : // Error state
        lawyersError ? (
          <ErrorState />
        ) : // Success state with data
        lawyersResponse?.data && lawyersResponse.data.length > 0 ? (
          <>
            <div className="hidden lg:block w-full space-y-4">
              {lawyersResponse.data.map((lawyer) => (
                <ContactCard key={lawyer.uuid} lawyer={lawyer} />
              ))}
            </div>
            <div className="min-[1200px]:hidden space-y-4">
              {lawyersResponse.data.map((lawyer) => (
                <BusinessCard key={lawyer.uuid} lawyer={lawyer} />
              ))}
            </div>

            {/* Pagination - Only show if multiple pages exist */}
            {lawyersResponse.meta?.last_page > 1 && (
              <div className="flex justify-center mt-8">
                <PaginationComp
                  currentPage={lawyersResponse.meta.current_page}
                  totalPages={lawyersResponse.meta.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <NoDataState />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ContentSection;
