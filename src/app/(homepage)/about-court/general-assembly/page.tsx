import MainHeading from "@/components/common/main-heading";
import GeneralAssemblyPage from "./_components/general-assembly-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/home-1.jpg";
const FALLBACK_DESCRIPTION =
  "القانون الليبي هو المرجع في الأعمال، لكن قدراً غير يسير منها يتوافق مع قوانين دول عربية لاسيما المصري، المصدر التاريخي للقانون الليبي ولكثير من القوانين العربية. تيسيراً للزائر في معرفة مدى تعلق العمل باهتمامه";

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
        title="الدائرة الدستورية"
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
