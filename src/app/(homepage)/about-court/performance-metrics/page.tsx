import MainHeading from "@/components/common/main-heading";
import PerformancePage from "./_components/performance-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/bg-1.jpg";

export default async function AboutCourtPage() {
  const { data } = await getSiteSettings();
  const backgroundImage =
    data.performance_metrics_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.performance_metrics_text ?? undefined;

  return (
    <>
      <MainHeading
        title="معدلات الأداء بالمحكمة"
        descriptionHtml={descriptionHtml}
        bgImage={backgroundImage}
      />
      <PerformancePage />
    </>
  );
}
