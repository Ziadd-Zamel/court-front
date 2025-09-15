import MainHeading from "@/components/common/main-heading";
import SupermeCourtPage from "./_components/supreme-court-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    book?: string;
    author?: string;
    text?: string;
  }>;
}) {
  // Get the page and the limit form search params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from search param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 10)
  );

  // Extract search queries
  const bookQuery = resolvedSearchParams.book;
  const authorQuery = resolvedSearchParams.author;
  const textQuery = resolvedSearchParams.text;

  return (
    <>
      {/** Heading */}
      <MainHeading
        title="المكتب الفني"
        description="القانون الليبي هو المرجع في الأعمال، لكن قدراً غير يسير منها يتوافق مع قوانين دول عربية لاسيما المصري، المصدر التاريخي للقانون الليبي ولكثير من القوانين العربية. تيسيراً للزائر في معرفة مدى تعلق العمل باهتمامه،"
        bgImage="/assets/bg-1.jpg"
      />

      {/** Main page content */}
      <SupermeCourtPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchQueries={{
          book: bookQuery,
          author: authorQuery,
          text: textQuery,
        }}
      />
    </>
  );
}
