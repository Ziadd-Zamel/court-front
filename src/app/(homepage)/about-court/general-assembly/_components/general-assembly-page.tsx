import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import { getAssemblySub } from "@/lib/api/subcategories";
import { Suspense } from "react";
import AssemblyContent from "./assembly-page";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function GeneralAssemblyPage({
  pagination,
  search,
}: Props) {
  const data = await getAssemblySub();
  const categoriesData = data?.data || [];

  // Dynamic tabs from categories
  const dynamicTabs: TabItem[] = categoriesData.map((category) => ({
    label: category.name,
    value: category.uuid,
    heading: category.name,
    component: (
      <Suspense fallback={<ArticleListSkeleton />}>
        <AssemblyContent
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
      className="relative pt-10 w-full box-container mb-80"
    >
      <ReusableTabs
        tabs={dynamicTabs}
        defaultValue={categoriesData[0].uuid}
        className="lg:mt-12"
      />
    </section>
  );
}
