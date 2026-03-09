import LegalCasePage from "./_components/LegalCasePage";
import ErrorState from "@/components/custom/error-state";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search?: string; from?: string }>;
  params: Promise<{ articleId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const articleId = resolvedParams.articleId;

  if (!articleId) return <ErrorState />;
  return (
    <>
      <LegalCasePage
        search={resolvedSearchParams.search || ""}
        id={articleId}
        from={resolvedSearchParams.from}
      />
    </>
  );
}
