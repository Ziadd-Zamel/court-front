"use client";
// Third-party imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Local imports
import PaginationComp from "@/components/common/pagination-comp";
import { getAllQuestion } from "@/lib/api/question.api";
import QuestionSkeleton from "./question-skeleton";
import QuestionError from "./question-error";
import SearchBar from "@/components/common/search-bar";
import QuestionEmptyState from "./question-empty";
import { stripHtmlTags } from "@/lib/stripHtml";

interface ImportantNoticesPageProps {
  TabsData: questionCategory[];
}

export default function ImportantNoticesPage({
  TabsData,
}: ImportantNoticesPageProps) {
  // URL state management for active tab with nuqs
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: TabsData[0]?.uuid || "",
    parse: (value) => {
      // Validate that the tab exists in TabsData, fallback to first tab if not
      const tabExists = TabsData.some((tab) => tab.uuid === value);
      return tabExists ? value : TabsData[0]?.uuid || "";
    },
  });

  // URL state management for pagination with nuqs
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = parseInt(value);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
  });

  const [searchQuery, setSearchQuery] = useQueryState("search");

  // Data fetching for questions based on active tab, current page, AND search query
  const {
    data: questionResponse,
    isLoading: questionsLoading,
    error: questionsError,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ["questions", activeTab, currentPage, searchQuery],
    queryFn: () =>
      getAllQuestion(activeTab, 10, currentPage, searchQuery || ""),
  });

  //Handles tab change event
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    setSearchQuery("");
  };

  //Handles page change event for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handles retry action when question fetching fails
  const handleRetry = () => {
    refetchQuestions();
  };

  //Handles clearing search results
  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Determines if the current state shows no results due to search
  const isEmptySearchResults =
    searchQuery && questionResponse?.data?.length === 0;

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container flex flex-col "
    >
      <p className=" pb-20 text-lg text-gray-500">
        <span className="text-xl"> تنبيه:</span> هذه المعلومات معدة لتيسير
        الإجراءات للمتقاضين والقانونيين، <br /> ولا تمثل بالضرورة حكم القانون في
        مسائلها.{" "}
      </p>
      <Tabs
        dir="rtl"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        {/* Tab list and content container */}
        <div className="flex flex-col lg:flex-row items-start gap-20 w-full mt-40 mb-80">
          {/* Tab list - vertical navigation */}
          <TabsList className="flex flex-col items-center gap-1 md:max-w-[300px] w-full bg-transparent mt-24">
            <div className="w-full mb-12">
              <SearchBar />
            </div>

            {TabsData.map((tab) => (
              <TabsTrigger
                className="bg-white  hover:bg-main hover:text-white data-[state=active]:bg-main data-[state=active]:text-white transition duration-300 rounded-none cursor-pointer text-xl font-normal w-full py-5 border border-gray-300 shadow-none flex items-center justify-between"
                key={tab.uuid}
                value={tab.uuid}
              >
                {tab.title}
                <ChevronLeft />
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content area */}
          <div className="w-full">
            {TabsData.map((tab) => (
              <TabsContent
                className=" mt-20 lg:-mt-16 w-full "
                key={tab.uuid}
                value={tab.uuid}
              >
                <h3 className="text-2xl font-bold text-main sm:mb-8 sm:text-4xl">
                  {tab.title}
                </h3>

                {/* Loading state */}
                {questionsLoading ? (
                  <QuestionSkeleton />
                ) : // Error state
                questionsError ? (
                  <QuestionError onRetry={handleRetry} />
                ) : // Success state with data
                questionResponse?.data && questionResponse.data.length > 0 ? (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-2"
                      dir="rtl"
                    >
                      {questionResponse.data.map((question: Iquestion) => (
                        <AccordionItem
                          key={question.uuid}
                          value={`item-${question.uuid}`}
                        >
                          <AccordionTrigger className="py-5 pl-4 text-sm font-medium sm:text-xl text-right">
                            <p style={{ direction: "rtl" }}>{question.title}</p>
                          </AccordionTrigger>
                          <AccordionContent className="text-lg text-gray-500">
                            {stripHtmlTags(question.answer)}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Pagination - Only show if multiple pages exist */}
                    {questionResponse.meta?.last_page > 1 && (
                      <div className="flex justify-center mt-8">
                        <PaginationComp
                          currentPage={questionResponse.meta.current_page}
                          totalPages={questionResponse.meta.last_page}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                ) : // Empty states
                isEmptySearchResults ? (
                  <QuestionEmptyState
                    type="no-search-results"
                    searchQuery={searchQuery}
                    onClearSearch={handleClearSearch}
                  />
                ) : (
                  <QuestionEmptyState type="no-data" />
                )}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
}
