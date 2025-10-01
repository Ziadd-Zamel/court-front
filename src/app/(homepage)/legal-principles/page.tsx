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
        description="المادة 31 من قانون المحكمة العليا تنص على أن المبادئ القانونية التي تقررها المحكمة العليا في أحكامها ملزمة لجميع المحاكم وكافة الجهات الأخرى. وبهذه القيمة للمبادئ التي ترسيها المحكمة العليا، يرتقي قضاؤها ليشكل قاعدة قانونية يُحتج بها على الكافة. وتندمج هذه المبادئ مع النصوص التشريعية لتكوّن معها الأصل الأول من أصول القانون التي يتعين الاحتكام إليها. وهي، علاوة على ذلك، المصدر الأول لفهم مراد الشارع، وتفسيرها هو التفسير الصحيح الملزم الذي لا تعقيب عليه من أحد، والذي لا خيار للأفراد أو الجهات إلا التسليم به وتبنّيه. فهي المحكمة التي لا تعلوها محكمة، وإليها وحدها يعود هذا الأمر، وقولها هو الفصل وعنوان الحقيقة والعدل"
        bgImage="/assets/legal-principles.jpg"
        overlay
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
