import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import CourtPublications from "@/components/custom/court-publications";
import { SearchParamsRecord } from "@/lib/utils/tab-pagination";
import BooksContent from "./books-content";
import SearchBooks from "./search-books";
import VistorServices from "./vistor-services";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchParams: SearchParamsRecord;
  searchQueries: {
    search?: string;
    search_type?: string;
  };
};

export default function SupermeCourtPage({
  pagination,
  searchParams,
  searchQueries,
}: Props) {
  // Tabs data configuration
  const courtReleaseTabs: TabItem[] = [
    {
      label: "الكتب",
      value: "all-books",
      heading: "الكتب",
      component: (
        <BooksContent searchParams={searchParams} search={searchQueries.search} />
      ),
    },
    {
      label: "البحث في الكتب",
      value: "search-books",
      component: (
        <SearchBooks searchQueries={searchQueries} pagination={pagination} />
      ),
    },
    {
      label: "إصدارات المحكمة",
      value: "court-publications",
      heading: "إصدارات المحكمة",
      component: (
        <CourtPublications
          searchParams={searchParams}
          search={searchQueries.search}
        />
      ),
    },

    {
      label: "دليل الاستخدام",
      value: "vistor-services",
      component: <VistorServices />,
    },
  ];
  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative w-full box-container pt-20 pb-20"
    >
      <ReusableTabs tabs={courtReleaseTabs} defaultValue="all-books" />
    </section>
  );
}
