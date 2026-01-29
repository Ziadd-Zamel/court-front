// components/SiteHighlights.tsx
"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import HighlightCard from "@/components/common/highlight-card";
import type { FC } from "react";

type Area = {
  sectoin: string;
  goldentitle: string;
  title: string;
  Firstdescription: string;
  Secondedescription?: string;
};

const areas: Area[] = [
  {
    sectoin: "القضاء المدني",
    goldentitle: "  71/650ق:",
    title:
      "حق المضرور في اقتضاء التعويض من محدث الضرر - الإلتزام بالتضامن والالتزام باستخدام متغايرين",
    Firstdescription:
      "حق المضرور في اقتضاء التعويض من محدث الضرر نفسه حق أصولي يمليه قواعد العدالة والفطرة السليمة التي تفرض أن الجزاء يكون عادلاً للجميع، وترفض أن يُحمل الشخص الواحد عواقب سوء عمل غيره. وقد وصل في الوضوح والثبات إلى درجة تجعله موضوع اتفاق واسع ضمن المبادئ القانونية والقضائية، ومكنه من احتلال مكانة لا يمكن إنكارها في عالم القانون",
    Secondedescription:
      "سوء عمل غيره. وقد بلغ هذا الحق في الوضوح والاستقرار مدى صار معه محل إجماع فقهي وقضائي، لا يختلف الأمر فيه حتى إذا كان الضرر محالًا لعقد تأمين. فلا ينتقص من حق المضرور في اقتضاء التعويض بأيسر سبيل، كون المخطئ قد أمَّن ضد هذا الضرر؛ ذلك أن الغاية إنما تنحصر في المقام الأول في كفالة حق المضرور.",
  },
  {
    sectoin: " مشروعات الأحكام",
    goldentitle: "  71/650ق:",
    title:
      "حق المضرور في اقتضاء التعويض من محدث الضرر - الإلتزام بالتضامن والالتزام باستخدام متغايرين",
    Firstdescription:
      "حق المضرور في اقتضاء التعويض من محدث الضرر نفسه حق أصولي يمليه قواعد العدالة والفطرة السليمة التي تفرض أن الجزاء يكون عادلاً للجميع، وترفض أن يُحمل الشخص الواحد عواقب سوء عمل غيره. وقد وصل في الوضوح والثبات إلى درجة تجعله موضوع اتفاق واسع ضمن المبادئ القانونية والقضائية، ومكنه من احتلال مكانة لا يمكن إنكارها في عالم القانون",
    Secondedescription:
      "سوء عمل غيره. وقد بلغ هذا الحق في الوضوح والاستقرار مدى صار معه محل إجماع فقهي وقضائي، لا يختلف الأمر فيه حتى إذا كان الضرر محالًا لعقد تأمين. فلا ينتقص من حق المضرور في اقتضاء التعويض بأيسر سبيل، كون المخطئ قد أمَّن ضد هذا الضرر؛ ذلك أن الغاية إنما تنحصر في المقام الأول في كفالة حق المضرور.",
  },
];

const SiteHighlights: FC = () => {
  return (
    <section className="pt-16 bg-white">
      <div className="m-auto">
        <div className=" bg-white">
          <AnimatedSectionHeader title="مختارات من فروع الموقع" />
        </div>
      </div>

      {/* First section - White background */}
      <div className=" bg-white">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20  box-container">
          {areas.map((area, index) => (
            <HighlightCard
              key={`${area.title}-${index}-white`}
              section={area.sectoin}
              goldenTitle={area.goldentitle}
              title={area.title}
              firstDescription={area.Firstdescription}
              secondDescription={area.Secondedescription}
              buttonText="اقرأ المزيد"
              variant="default"
            />
          ))}
        </div>
      </div>

      {/* Second section - Highlighted background */}
      <div className=" bg-main/10">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20  box-container">
          {areas.map((area, index) => (
            <HighlightCard
              key={`${area.title}-${index}-highlighted`}
              section={area.sectoin}
              goldenTitle={area.goldentitle}
              title={area.title}
              firstDescription={area.Firstdescription}
              secondDescription={area.Secondedescription}
              buttonText="واصل القراءة"
              variant="highlighted"
            />
          ))}
        </div>
      </div>

      {/* Third section - White background */}
      <div className=" bg-white">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20  box-container">
          {areas.map((area, index) => (
            <HighlightCard
              key={`${area.title}-${index}-white-2`}
              section={area.sectoin}
              goldenTitle={area.goldentitle}
              title={area.title}
              firstDescription={area.Firstdescription}
              secondDescription={area.Secondedescription}
              buttonText="واصل القراءة"
              variant="default"
            />
          ))}
        </div>
      </div>

      {/* Fourth section - Highlighted background */}
      <div className="  bg-main/10">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20 box-container">
          {areas.map((area, index) => (
            <HighlightCard
              key={`${area.title}-${index}-highlighted-2`}
              section={area.sectoin}
              goldenTitle={area.goldentitle}
              title={area.title}
              firstDescription={area.Firstdescription}
              secondDescription={area.Secondedescription}
              buttonText="واصل القراءة"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteHighlights;
