import SecondaryHeading from "@/components/common/seondary-heading";
import ErrorState from "@/components/custom/error-state";
import ArticlesByTag from "./_components/articles-by-tag";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ tagId?: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    name?: string;
  }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const tagId = resolvedParams.tagId;

  if (!tagId) return <ErrorState />;

  const currentPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const limit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );
  const title = resolvedSearchParams.name?.trim() || "روابط موضوعية";

  return (
    <>
      <SecondaryHeading title={title} breadcrumb breadcrumbPath="/tag" />

      <div className="min-h-screen bg-gray-50 pt-20 pb-40 box-container dark:bg-gray-900">
        <div className="mx-auto max-w-5xl">
          <ArticlesByTag
            tagId={tagId}
            pagination={{
              currentPage,
              limit,
            }}
          />
        </div>
      </div>
    </>
  );
}
