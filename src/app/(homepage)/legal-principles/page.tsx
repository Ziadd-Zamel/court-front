import MainHeading from "@/components/common/main-heading";
import LegalPrinciplesPage from "./_components/legal-principles-page";
import { Suspense } from "react";
import ReusableTabsSkeleton from "@/components/custom/reusable-tabs-skeleton";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/legal-principles.png";
const FALLBACK_DESCRIPTION =
  'المادة 31 من قانون المحكمة العليا: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم وكافة الجهات الأخرى". بهذه القيمة للمبادئ التي ترسيها المحكمة العليا، يرتقي قضاؤها ليشكل قاعدة قانونية يحتج بها على الكافة. تندمج هذه المبادئ مع النصوص التشريعية لتشكل معها الأصل الأول من أصول القانون التي يتعين الاحتكام إليها. وهي، علاوة على ذلك، المصدر الأول لفهم مراد الشارع، وتفسيرُها هو التفسيرُ الصحيحُ الملزم، الذي لا تعقيبَ عليها من أحدٍ فيه، ولا خيارَ لولاة الأمرِ والأفرادِ غيرُ التسليم به وتبنّيه. فهي المحكمةُ التي لا تعلوها محكمة. إليها وحدَها يعودُ هذا الأمر، وقولُها فيه هو الفصل وعنوانُ الحقيقةِ والعدل.';

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
        title="المبادئ القانونية"
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
