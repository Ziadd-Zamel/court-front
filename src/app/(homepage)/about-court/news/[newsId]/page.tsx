import ErrorState from "@/components/custom/error-state";
import NewsPageDetails from "./_components/news-details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ newsId?: string }>;
}) {
  // Get the page and the limit form serach params
  const resolvedParams = await params;
  const newsId = resolvedParams.newsId;

  if (!newsId) return <ErrorState />;
  return (
    <>
      <NewsPageDetails id={newsId} />
    </>
  );
}
