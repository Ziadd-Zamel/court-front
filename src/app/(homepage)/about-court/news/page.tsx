import NewsPage from "./_components/news-page";
import MainHeading from "@/components/common/main-heading";

export default async function NewsPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  // Get the page and the limit from search params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from search param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15)
  );

  return (
    <>
      {/* Main Heading */}
      <MainHeading
        title="الأخبار"
        bgImage="/assets/bg-2.jpg"
        description="أحدث الأخبار والتحديثات من المحكمة العليا"
      />

      {/* Main page content */}
      <NewsPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchQuery={resolvedSearchParams.search}
      />
    </>
  );
}
