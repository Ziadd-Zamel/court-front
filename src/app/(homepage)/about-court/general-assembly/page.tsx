import MainHeading from "@/components/common/main-heading";
import GeneralAssemblyPage from "./_components/general-assembly-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/home-1.jpg";
const FALLBACK_DESCRIPTION =
  "تتألف الجمعية العمومية للمحكمة العليا من رئيسها وجميع مستشاريها ورئيس نيابة النقض، وتصدر القرارات بأغلبية الآراء للأعضاء الحاضرين. تختص الجمعية العمومية دون غيرها بالنظر في المسائل المتعلقة بنظام المحكمة وأمورها الداخلية، وبالشئون المالية والإدارية المتعلقة بمستشاري المحكمة وأعضاء نيابة النقض، وبتوزيع الأعمال على أعضاء المحكمة وبين دوائرها المختلفة.";

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
    data.general_assembly_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.general_assembly_text ?? undefined;

  return (
    <>
      <MainHeading
        title="الجمعية العمومية"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
        overlay
      />

      <GeneralAssemblyPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        search={resolvedSearchParams.search}
      />
    </>
  );
}
