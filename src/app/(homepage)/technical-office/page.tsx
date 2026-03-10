import MainHeading from "@/components/common/main-heading";
import TechnicalOfficePage from "./_components/technical-office-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/technical-office.png";
const FALLBACK_DESCRIPTION =
  "تمثل هذه المساحة ركنًا مخصّصًا للبحوث والدراسات القانونيّة، ولعرض ما أنجزه المكتب الفني من أعمال، وما نفّذه من مشاريع تدعم تطوير المنظومة القضائيّة، وتعزز مسيرة المعرفة القانونيّة. ومن خلال هذه المنصّة أيضًا، يستقبل المكتب الفني طلبات الطباعة والنشر في إطارٍ يتيح للباحثين تقديم طلباتهم لطباعة مؤلّفاتهم ونشر نتاجهم العلمي عبر المنصة الرسميّة للمحكمة، إسهاماً في تشكيل رافد لتيسير وصول الدراسات الجادّة إلى أوساط المشتغلين بالقانون والقضاء، وإثراءً للمكتبة القضائيّة الوطنية، وترسيخاً لتبادل المعرفة القانونيّة وثقافة البحث العلمي";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );

  const { data } = await getSiteSettings();
  const backgroundImage =
    data.technical_office_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.technical_office_intro_text ?? undefined;

  return (
    <>
      <MainHeading
        title="المكتب الفني"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
      />

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
