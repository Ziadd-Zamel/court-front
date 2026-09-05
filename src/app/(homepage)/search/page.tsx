import { Suspense } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";
import SiteSearchBar from "@/components/common/site-search-bar";
import NoSearchQuery from "@/components/custom/no-search";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import SiteSearchResults from "./_components/site-search-results";
import { isSiteSearchType } from "@/lib/constants/site-search";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    type?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search?.trim() ?? "";
  const type = isSiteSearchType(resolvedSearchParams.type)
    ? resolvedSearchParams.type
    : undefined;
  const currentPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const limit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );

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
          {search && type ? (
            <Suspense fallback={<ArticleListSkeleton />}>
              <SiteSearchResults
                search={search}
                type={type}
                pagination={{ currentPage, limit }}
              />
            </Suspense>
          ) : (
            <NoSearchQuery message="اختر النوع ثم اكتب كلمة البحث للعثور على المقالات، أو الكتب، أو المعلومات المهمة، أو الإصدارات" />
          )}
        </div>
      </div>
    </>
  );
}
