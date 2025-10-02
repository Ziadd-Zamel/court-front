import MainHeading from "@/components/common/main-heading";
import ConstitutionalCourtPage from "./_components/constitutional-court-page";

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
        title="الدائرة الدستورية"
        bgImage="/assets/constitutional-court.jpg"
        description="أول قضاء دستوري في العالم العربي. نشأت عام 1953 لتختص بالرقابة القضائية على دستورية أعمال السلطة التشريعية، وهي وظيفةٌ ما انفكت تؤديها بأيدي نخبةٍ من أهل العلم والخبرة في المجال. فمنذ 73 عاماً، تقف الدائرة ذائداً عن حوزة القانون الدستوري ضد تطاول السلطات، كابحةً جماحَها، كاشفةً عما انحرف من أعمالها، رادَّةً لها إلى حظيرة المشروعية، عاصمةً بذلك الحقوقَ والحرياتِ من أنْ تُصادَر أو أنْ يُنتقَص منها، منقِّيةً النصوصَ التشريعية من الخطايا الدستورية، فحافظت بموقفها طَوالَ عهدها، الذي عاصر أنظمةً سياسيةً متخالفة، على أن تبقى الشرعية الدستورية في مدارجها العليا."
      />

      {/** Main page content */}
      <ConstitutionalCourtPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        search={resolvedSearchParams.search}
      />
    </>
  );
}
