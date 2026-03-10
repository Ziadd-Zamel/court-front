import MainHeading from "@/components/common/main-heading";
import LitigantsPortalPage from "./_components/portal-page";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/litigants-portal.jpg";
const FALLBACK_DESCRIPTION =
  "مساحة خدمية تتيح للمتقاضين والمحامين متابعة قضاياهم عن بُعد، وتُعنَى بتيسير الإجراءات وتوفير المعلومات الإرشادية المتصلة بالتقاضي أمام المحكمة العليا. كما تضع بين أيدي المتقاضين والقانونيين عموماً مادة قانونية ضخمة من قضاء المحكمة العليا منذ تأسيسها عام 1953، مصوغةً في قالب يسهل الوصول إليه. تهدف البوابة إلى دعم مرفق القضاء، وتيسير النفاذ إليه بما يعزّز حقَّ التقاضي ويرفع من كفاءة العمل القضائي.";

export default async function Page() {
  const { data } = await getSiteSettings();
  const backgroundImage = data.litigants_background ?? FALLBACK_BACKGROUND;
  const descriptionHtml = data.litigants_intro_text ?? undefined;

  return (
    <div className="relative">
      {/**Header */}
      <MainHeading
        title="بوابة المتقاضين والقانونيين"
        descriptionHtml={descriptionHtml}
        description={!descriptionHtml ? FALLBACK_DESCRIPTION : undefined}
        bgImage={backgroundImage}
        overlay
      />

      {/**Main content */}
      <LitigantsPortalPage />
    </div>
  );
}
