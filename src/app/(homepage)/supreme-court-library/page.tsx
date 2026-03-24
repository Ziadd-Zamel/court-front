import MainHeading from "@/components/common/main-heading";
import SupermeCourtPage from "./_components/supreme-court-page";
import ContactSection from "@/components/custom/contact-section";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/supreme-court-library.png";
const FALLBACK_DESCRIPTION =
  "قسم يضم كلَّ ما تحويه المكتبة من مطبوعات: الكتب، وإصدارات المحكمة العليا، والمواد العلمية الأخرى.  يتيح للزائر البحثَ عن كتاب أو مؤلف أو موضوع، وتصفّحَ قائمة المحتويات بأسلوب يحاكي تجربة الكتاب الواقعية، ليكون الوصول إلى المصادر القانونية سريعاً وسهلاً، وليتاح للجميع الغوص في ثراء المعرفة القانونية بطريقة مرنة وعملية.";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    search_type?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 15),
  );

  const searchQuery = resolvedSearchParams.search;
  const searchType = resolvedSearchParams.search_type;

  const { data } = await getSiteSettings();
  const backgroundImage =
    data.supreme_library_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.supreme_library_intro_text ?? undefined;

  return (
    <>
      <MainHeading
        title=" مكتبة المحكمة العليا"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
      />

      <SupermeCourtPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchQueries={{
          search: searchQuery,
          search_type: searchType,
        }}
      />
      <ContactSection
        title="شارك بملاحظاتك"
        description="هذه المساحة مخصصة لملاحظاتك واستفساراتك بشأن خدمات المكتبة. مشاركتك لها ستسهم –بعون الله- في تطوير الخدمة وتحسين الأداء."
        subDescription="سندرس كل الملاحظات والمقترحات والاستفسارات بعناية، وسنعمل -بإذنه تعالى- على الرد عليها والاستفادة منها بما يحقق خدمة أفضل ومزيداً من الثراء للمعرفة القانونية."
      />
    </>
  );
}
