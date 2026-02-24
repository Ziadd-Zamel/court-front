import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import { getNewsCategories } from "@/lib/api/news";
import { Suspense } from "react";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import AllTab from "./all-tab";
import catchError from "@/lib/utils/catch-error";
import NewsByCategory from "./new-by-category";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";

interface NewsPageProps {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQuery?: string;
}

export default async function NewsPage({
  pagination,
  searchQuery,
}: NewsPageProps) {
  const [payload, error] = await catchError(() => getNewsCategories());

  // Error State
  if (error) {
    return <ErrorState />;
  }

  // Empty data State
  if (!payload || payload.data.length === 0) {
    return <NoDataState />;
  }

  // Static "All" tab
  const staticTab: SecondaryTabItem = {
    label: "الكل",
    value: "all",
    component: <AllTab pagination={pagination} searchQuery={searchQuery} />,
  };

  // Dynamic tabs from categories
  const dynamicTabs: SecondaryTabItem[] = payload.data.map((category) => ({
    label: category.name,
    value: category.uuid,
    component: (
      <Suspense fallback={<ArticleListSkeleton />}>
        <NewsByCategory
          id={category.uuid}
          pagination={pagination}
          searchQuery={searchQuery}
        />
      </Suspense>
    ),
  }));

  const newsTabs: SecondaryTabItem[] = [staticTab, ...dynamicTabs];

  return (
    <SecondaryTabs
      tabs={newsTabs}
      defaultValue="all"
      className="w-full flex justify-center items-center py-40"
      tabListClassName="mb-20"
    />
  );
}
