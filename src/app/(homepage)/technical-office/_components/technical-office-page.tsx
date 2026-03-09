import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import ArticlePage from "@/components/custom/article-page";
import CourtPublications from "@/components/custom/court-publications";
import PrintingPublishingService from "@/components/custom/printing-publishing-service";
import { getTechnicalOfficeSub } from "@/lib/api/subcategories";
import { Suspense } from "react";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function TechnicalOfficePage({
  pagination,
  search,
}: Props) {
  const data = await getTechnicalOfficeSub();
  const categoriesData = data?.data || [];

  // Static tabs configuration
  const staticTabs: TabItem[] = [
    {
      label: "إصدارات المحكمة",
      value: "court-publications",
      heading: "إصدارات المحكمة",
      component: <CourtPublications pagination={pagination} search={search} />,
    },
    {
      label: "خدمة الطباعة والنشر",
      value: "printing",
      component: <PrintingPublishingService />,
    },
  ];

  // Dynamic tabs from categories (empty array if no data)
  const dynamicTabs: TabItem[] = categoriesData.map((category) => ({
    label: category.name,
    value: category.uuid,
    heading: category.name,

    component: (
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticlePage
          search={search}
          uuid={category.uuid}
          pagination={pagination}
          from="/technical-office"
        />
      </Suspense>
    ),
  }));

  // Combine static and dynamic tabs
  const allTabs: TabItem[] = [...staticTabs, ...dynamicTabs];

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative w-full box-container pt-20 pb-20"
    >
      <ReusableTabs tabs={allTabs} defaultValue="court-publications" />
    </section>
  );
}
