import LegalCasePage from "./_components/LegalCasePage";
import ErrorState from "@/components/custom/error-state";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search?: string }>;
  params: Promise<{ articleId?: string }>;
}) {
  // Get the page and the limit form serach params
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const articleId = resolvedParams.articleId;

  if (!articleId) return <ErrorState />;
  return (
    <>
      <LegalCasePage
        search={resolvedSearchParams.search || ""}
        id={articleId}
      />
    </>
  );
}
