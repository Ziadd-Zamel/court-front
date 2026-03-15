import MainHeading from "@/components/common/main-heading";
import LegalPrinciplesPage from "./_components/legal-principles-page";
import { Suspense } from "react";
import ReusableTabsSkeleton from "@/components/custom/reusable-tabs-skeleton";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/legal-principles.png";
const FALLBACK_DESCRIPTION =
  "تمارس المحكمة العليا وظيفتها في التقعيد القانوني بإرساء المبادئ القانونية الملزمة للجهات كافة في مناسبتين: عند تفسيرها لنص القانون لتكشف عن مدلوله، وعند سدّها للفراغ التشريعي بقاعدة تستحدثها. وفي الحالتين، فإن القوة اللزامية لمبادئها كفيلة بأن ترتفع بقيمتها القانونية إلى مصاف القواعد التشريعية ذاتها، لتظهر بمظهرها وتكتسب قوتها. فلكليهما السلطان ذاته على الجهات كافة، بما فيها السلطة التنفيذية والقضائية، وعلى مخالفتهما تترتب الآثار نفسها.";

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
  const backgroundImage = data.legal_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.legal_intro_text ?? undefined;

  return (
    <>
      <MainHeading
        title="قضاء النقض"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
      />

      <Suspense fallback={<ReusableTabsSkeleton />}>
        <LegalPrinciplesPage
          pagination={{
            currentPage: mainPage,
            limit: mainLimit,
          }}
          search={resolvedSearchParams.search}
        />
      </Suspense>
    </>
  );
}
