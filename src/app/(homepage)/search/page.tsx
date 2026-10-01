import { Suspense } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";
import SiteSearchBar from "@/components/common/site-search-bar";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import SiteSearchResults from "./_components/site-search-results";

export default function Page() {
  return (
    <>
      <SecondaryHeading title="نتائج البحث" breadcrumb />

      <div className="min-h-screen bg-gray-50 pt-16 pb-40 box-container dark:bg-gray-900">
        <div className="mx-auto max-w-4xl">
          <Suspense fallback={null}>
            <SiteSearchBar />
          </Suspense>
        </div>

        <div className="mt-16">
          <Suspense fallback={<ArticleListSkeleton />}>
            <SiteSearchResults />
          </Suspense>
        </div>
      </div>
    </>
  );
}
