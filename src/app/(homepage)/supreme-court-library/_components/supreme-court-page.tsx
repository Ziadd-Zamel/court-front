import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ComingSoon from "@/components/custom/coming-soon";
import CourtPublications from "@/components/custom/court-publications";
import BooksContent from "./books-content";
import SearchBooks from "./search-books";
import VistorServices from "./vistor-services";
import PersonalStatus from "./personal-status";
type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQueries: {
    book?: string;
    author?: string;
    text?: string;
  };
};

export default function SupermeCourtPage({ pagination, searchQueries }: Props) {
  // Tabs data configuration
  const courtReleaseTabs: TabItem[] = [
    {
      label: "الكتب",
      value: "all-books",
      heading: "الكتب",
      component: <BooksContent pagination={pagination} />,
    },
    {
      label: "البحث في الكتب",
      value: "search-books",
      component: <SearchBooks searchQueries={searchQueries} />,
    },
    {
      label: "إصدارات المحكمة",
      value: "court-publications",
      component: <CourtPublications pagination={pagination} />,
    },
    {
      label: "البحث في الإصدارات",
      value: "search-publications",
      heading: "البحث في الإصدارات",
      component: <ComingSoon />,
    },
    {
      label: "خدمات الرواد",
      value: "vistor-services",
      component: <VistorServices />,
    },
    {
      label: "احوال شعصية",
      value: "personal-status",
      component: <PersonalStatus />,
    },
  ];
  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-20"
    >
      <ReusableTabs
        tabs={courtReleaseTabs}
        defaultValue="all-books"
        tabContentClassName="lg:mt-14!"
      />
    </section>
  );
}
