import MainHeading from "@/components/common/main-heading";
import TechnicalOfficePage from "./_components/technical-office-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  // Get the page and the limit form serach params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from serach param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 10)
  );
  return (
    <>
      {/** Heading */}
      <MainHeading
        title="المكتب الفني"
        description="القانون الليبي هو المرجع في الأعمال، لكن قدراً غير يسير منها يتوافق مع قوانين دول عربية لاسيما المصري، المصدر التاريخي للقانون الليبي ولكثير من القوانين العربية. تيسيراً للزائر في معرفة مدى تعلق العمل باهتمامه،"
        bgImage="/assets/bg-1.jpg"
      />

      {/** Main page content */}
      <TechnicalOfficePage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        search={resolvedSearchParams.search}
      />
    </>
  );
}
