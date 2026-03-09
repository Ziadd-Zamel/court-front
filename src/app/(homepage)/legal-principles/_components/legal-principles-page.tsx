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
          from="/legal-principles"
        />
      </Suspense>
    ),
  }));

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative w-full box-container pt-20 pb-40"
    >
      <ReusableTabs tabs={dynamicTabs} defaultValue={categoriesData[0].uuid} />
    </section>
  );
}
