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
        bgImage="/assets/technical-office.png"
        description="تمثل هذه المساحة ركنًا مخصّصًا للبحوث والدراسات القانونيّة، ولعرض ما أنجزه المكتب الفني من أعمال، وما نفّذه من مشاريع تدعم تطوير المنظومة القضائيّة، وتعزز مسيرة المعرفة القانونيّة. ومن خلال هذه المنصّة أيضًا، يستقبل المكتب الفني طلبات الطباعة والنشر في إطارٍ يتيح للباحثين تقديم طلباتهم لطباعة مؤلّفاتهم ونشر نتاجهم العلمي عبر المنصة الرسميّة للمحكمة، إسهاماً في تشكيل رافد لتيسير وصول الدراسات الجادّة إلى أوساط المشتغلين بالقانون والقضاء، وإثراءً للمكتبة القضائيّة الوطنية، وترسيخاً لتبادل المعرفة القانونيّة وثقافة البحث العلمي"
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
