// page.tsx
import MainHeading from "@/components/common/main-heading";
import PrinciplePage from "./_components/principle-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/technical-office.png";
const FALLBACK_DESCRIPTION =
  "تمثل هذه المساحة ركنًا مخصّصًا للبحوث والدراسات القانونيّة، ولعرض ما أنجزه المكتب الفني من أعمال، وما نفّذه من مشاريع تدعم تطوير المنظومة القضائيّة، وتعزز مسيرة المعرفة القانونيّة. ومن خلال هذه المنصّة أيضًا، يستقبل المكتب الفني طلبات الطباعة والنشر في إطارٍ يتيح للباحثين تقديم طلباتهم لطباعة مؤلّفاتهم ونشر نتاجهم العلمي عبر المنصة الرسميّة للمحكمة، إسهاماً في تشكيل رافد لتيسير وصول الدراسات الجادّة إلى أوساط المشتغلين بالقانون والقضاء، وإثراءً للمكتبة القضائيّة الوطنية، وترسيخاً لتبادل المعرفة القانونيّة وثقافة البحث العلمي";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    ruling_type_uuid?: string | string[];
    search?: string;
    exact_phrase?: string;
    similar_phrase?: string;
    include_terms?: string;
    exclude_terms?: string;
    any_terms?: string;
    appeal_number?: string;
    appeal_year?: string;
    principle_number?: string;
    principle_year?: string;
    session_date?: string;
    strict_alef?: string;
    strict_ya?: string;
    strict_ta?: string;
  }>;
}) {
  // Get the page and the limit from search params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from search param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );

  const { data } = await getSiteSettings();
  const backgroundImage = data.principle_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.principle_intro_text ?? undefined;

  return (
    <>
      {/** Heading */}
      <MainHeading
        title="منصة المبادئ القانونية"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
      />

      {/** Main page content */}
      <PrinciplePage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchParams={resolvedSearchParams}
      />
    </>
  );
}
