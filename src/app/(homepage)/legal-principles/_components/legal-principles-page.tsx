import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import ArticlePage from "@/components/custom/article-page";
import { getLegalPrinciplesSub } from "@/lib/api/subcategories";
import { Suspense } from "react";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function LegalPrinciplesPage({
  pagination,
  search,
}: Props) {
  const data = await getLegalPrinciplesSub();
  const categoriesData = data?.data || [];

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
        />
      </Suspense>
    ),
  }));

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-20"
    >
      <ReusableTabs
        tabs={dynamicTabs}
        defaultValue={categoriesData[0].uuid}
        tabContentClassName=" mt-32 lg:mt-0 gap-2"
      />
    </section>
  );
}
