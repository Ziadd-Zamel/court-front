import MainHeading from "@/components/common/main-heading";
import LitigantsPortalPage from "./_components/portal-page";
export default function Page() {
  return (
    <div className="relative">
      <MainHeading
        title="بوابة المتقاضين والقانونيين"
        description="القانون الليبي هو المرجع في الأعمال، لكن قدراً غير يسير منها يتوافق مع قوانين دول عربية لاسيما المصري، المصدر التاريخي للقانون الليبي ولكثير من القوانين العربية. تيسيراً للزائر في معرفة مدى تعلق العمل باهتمامه،"
        bgImage="/assets/bg-1.jpg"
      />
      <LitigantsPortalPage />
    </div>
  );
}
