import MainHeading from "@/components/common/main-heading";
import ConstitutionalCourtPage from "./_components/legal-principles-page";
import { Suspense } from "react";
import ReusableTabsSkeleton from "@/components/custom/reusable-tabs-skeleton";

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
        title="المبادئ القانونية"
        bgImage="/assets/legal-principles.png"
        description={`المادة 31 من قانون المحكمة العليا: "تكون المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم وكافة الجهات الأخرى". بهذه القيمة للمبادئ التي ترسيها المحكمة العليا، يرتقي قضاؤها ليشكل قاعدة قانونية يحتج بها على الكافة. تندمج هذه المبادئ مع النصوص التشريعية لتشكل معها الأصل الأول من أصول القانون التي يتعين الاحتكام إليها. وهي، علاوة على ذلك، المصدر الأول لفهم مراد الشارع، وتفسيرُها هو التفسيرُ الصحيحُ الملزم، الذي لا تعقيبَ عليها من أحدٍ فيه، ولا خيارَ لولاة الأمرِ والأفرادِ غيرُ التسليم به وتبنّيه. فهي المحكمةُ التي لا تعلوها محكمة. إليها وحدَها يعودُ هذا الأمر، وقولُها فيه هو الفصل وعنوانُ الحقيقةِ والعدل.`}
      />

      {/** Main page content */}
      <Suspense fallback={<ReusableTabsSkeleton />}>
        <ConstitutionalCourtPage
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
