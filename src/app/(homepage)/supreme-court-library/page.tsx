import MainHeading from "@/components/common/main-heading";
import SupermeCourtPage from "./_components/supreme-court-page";
import ContactSection from "@/components/custom/contact-section";

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
        title=" مكتبة المحكمة العليا"
        bgImage="/assets/bg-1.jpg"
        description="قسم يضم كل ما تحويه المكتبة من مطبوعات: الكتب، وإصدارات المحكمة العليا، والمواد العلمية الأخرى. يتيح هذا القسم للزائر البحث عن كتاب أو مؤلف أو موضوع، والوصول إلى المصادر القانونية سريعًا وبسهولة، بأسلوب يحاكي تجربة الكتاب الواقعية، ليكون متاحًا للجميع الغوص في ثراء المعرفة القانونية بطريقة مرنة وعملية"
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
      <ContactSection />
    </>
  );
}
