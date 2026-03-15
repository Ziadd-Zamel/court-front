import MainHeading from "@/components/common/main-heading";
import ConstitutionalCourtPage from "./_components/constitutional-court-page";
import { YEARS_SINCE_FOUNDING } from "@/lib/constants/app-years";
import { getSiteSettings } from "@/lib/api/site-settings.api";
import ContactSection from "@/components/custom/contact-section";

const FALLBACK_BACKGROUND = "/assets/constitutional-court.jpg";
const FALLBACK_DESCRIPTION = `أول قضاء دستوري في العالم العربي. نشأت عام 1953 لتختص بالرقابة القضائية على دستورية أعمال السلطة التشريعية، وهي وظيفة ما انفكت تؤديها بأيدي نخبة من أهل العلم والخبرة في المجال. فمنذ ${YEARS_SINCE_FOUNDING} عاماً، تقف الدائرة ذائداً عن حوزة القانون الدستوري ضد تطاول السلطات، كابحةً جماحها، كاشفةً عما انحرف من أعمالها، رادَّةً لها إلى حظيرة المشروعية، عاصمةً بذلك الحقوق والحريات من أن تُصادر أو أن يُنتقص منها، منقِّيةً النصوص التشريعية من الخطايا الدستورية، فحافظت بموقفها طوال عهدها، الذي عاصر أنظمةً سياسيةً متخالفة، على أن تبقى الشرعية الدستورية في مدارجها العليا.`;

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
  const backgroundImage = data.constitutional_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.constitutional_intro_text ?? undefined;

  return (
    <>
      <MainHeading
        title="الدائرة الدستورية"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
      />

      <ConstitutionalCourtPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        search={resolvedSearchParams.search}
      />
      <ContactSection />
    </>
  );
}
