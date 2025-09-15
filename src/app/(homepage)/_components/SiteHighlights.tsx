// components/SiteHighlights.tsx
"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { Pin } from "lucide-react";
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
      "سوء عمل غيره. وقد بلغ هذا الحق في الوضوح والاستقرار مدى صار معه محل إجماع فقهي وقضائي، لا يختلف الأمر فيه حتى إذا كان الضرر محالًا لعقد تأمين. فلا ينتقص من حق المضرور في اقتضاء التعويض بأيسر سبيل، كون المخطئ قد أمَّن ضد هذا الضرر؛ ذلك أن الغاية إنما تنحصر في المقام الأول في كفالة حق المضرور.",
  },
  {
    sectoin: " مشروعات الأحكام",
    goldentitle: "  71/650ق:",
    title:
      "حق المضرور في اقتضاء التعويض من محدث الضرر - الإلتزام بالتضامن والالتزام باستخدام متغايرين",
    Firstdescription:
      "حق المضرور في اقتضاء التعويض من محدث الضرر نفسه حق أصولي يمليه قواعد العدالة والفطرة السليمة التي تفرض أن الجزاء يكون عادلاً للجميع، وترفض أن يُحمل الشخص الواحد عواقب سوء عمل غيره. وقد وصل في الوضوح والثبات إلى درجة تجعله موضوع اتفاق واسع ضمن المبادئ القانونية والقضائية، ومكنه من احتلال مكانة لا يمكن إنكارها في عالم القانون",
    Secondedescription:
      "سوء عمل غيره. وقد بلغ هذا الحق في الوضوح والاستقرار مدى صار معه محل إجماع فقهي وقضائي، لا يختلف الأمر فيه حتى إذا كان الضرر محالًا لعقد تأمين. فلا ينتقص من حق المضرور في اقتضاء التعويض بأيسر سبيل، كون المخطئ قد أمَّن ضد هذا الضرر؛ ذلك أن الغاية إنما تنحصر في المقام الأول في كفالة حق المضرور.",
  },
];

const SiteHighlights: FC = () => {
  return (
    <section className="relative z-50 bg-white pt-12  box-container">
      <div className="m-auto">
        <div className="relative z-20 bg-white">
          <AnimatedSectionHeader title="مختارات من فروع الموقع  " />
        </div>
      </div>
      <div className="main-padding m-auto bg-white">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20">
          {areas.map((area) => {
            return (
              <div
                style={{ direction: "rtl" }}
                key={area.title}
                className="flex w-full flex-col pb-20 pt-20 md:w-[350px] lg:w-[500px] xl:w-[630px]"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Pin className="size-7 text-main" />
                  <h3 className="text-center font-zain text-xl font-[700] text-main">
                    {area.sectoin}
                  </h3>
                </div>
                <h4
                  className="my-3 text-right font-zain text-md font-[500] text-black lg:text-xl"
                  style={{ direction: "rtl" }}
                >
                  {" "}
                  <span className="font-[600] text-main">
                    {area.goldentitle}
                  </span>{" "}
                  {`${area.title}`}{" "}
                </h4>
                <p
                  style={{ direction: "rtl" }}
                  className="min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Firstdescription}
                </p>
                <p
                  style={{ direction: "rtl" }}
                  className="mt-3 min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Secondedescription}
                </p>
                <button className="mt-5 text-left font-zain text-sm font-[500] text-main">
                  اقرأ المذيد
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-padding m-auto bg-main_orang/10">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20">
          {areas.map((area) => {
            return (
              <div
                style={{ direction: "rtl" }}
                key={area.title}
                className="flex w-full flex-col pb-20 pt-20 md:w-[350px] lg:w-[500px] xl:w-[630px]"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Pin className="size-7 text-main" />
                  <h3 className="text-center font-zain text-xl font-[700] text-main">
                    {area.sectoin}
                  </h3>
                </div>
                <h4
                  className="my-3 text-right font-zain text-md font-[500] text-black lg:text-xl"
                  style={{ direction: "rtl" }}
                >
                  {" "}
                  <span className="font-[600] text-main">
                    {area.goldentitle}
                  </span>{" "}
                  {`${area.title}`}{" "}
                </h4>
                <p
                  style={{ direction: "rtl" }}
                  className="min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Firstdescription}
                </p>
                <p
                  style={{ direction: "rtl" }}
                  className="mt-3 min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Secondedescription}
                </p>
                <button className="mt-5 text-left font-zain text-sm font-[500] text-main">
                  {" "}
                  واصل القراءة{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-padding m-auto bg-white">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20">
          {areas.map((area) => {
            return (
              <div
                style={{ direction: "rtl" }}
                key={area.title}
                className="flex w-full flex-col pb-20 pt-20 md:w-[350px] lg:w-[500px] xl:w-[630px]"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Pin className="size-7 text-main" />
                  <h3 className="text-center font-zain text-xl font-[700] text-main">
                    {area.sectoin}
                  </h3>
                </div>
                <h4
                  className="my-3 text-right font-zain text-md font-[500] text-black lg:text-xl"
                  style={{ direction: "rtl" }}
                >
                  {" "}
                  <span className="font-[600] text-main">
                    {area.goldentitle}
                  </span>{" "}
                  {`${area.title}`}{" "}
                </h4>
                <p
                  style={{ direction: "rtl" }}
                  className="min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Firstdescription}
                </p>
                <p
                  style={{ direction: "rtl" }}
                  className="mt-3 min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Secondedescription}
                </p>
                <button className="mt-5 text-left font-zain text-sm font-[500] text-main">
                  {" "}
                  واصل القراءة{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-padding m-auto bg-main_orang/10">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:gap-20">
          {areas.map((area) => {
            return (
              <div
                style={{ direction: "rtl" }}
                key={area.title}
                className="flex w-full flex-col pb-20 pt-20 md:w-[350px] lg:w-[500px] xl:w-[630px]"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Pin className="size-7 text-main" />
                  <h3 className="text-center font-zain text-xl font-[700] text-main">
                    {area.sectoin}
                  </h3>
                </div>
                <h4
                  className="my-3 text-right font-zain text-md font-[500] text-black lg:text-xl"
                  style={{ direction: "rtl" }}
                >
                  {" "}
                  <span className="font-[600] text-main">
                    {area.goldentitle}
                  </span>{" "}
                  {`${area.title}`}{" "}
                </h4>
                <p
                  style={{ direction: "rtl" }}
                  className="min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Firstdescription}
                </p>
                <p
                  style={{ direction: "rtl" }}
                  className="mt-3 min-h-[100px] text-justify font-zain text-md text-gray-500"
                >
                  {area.Secondedescription}
                </p>
                <button className="mt-5 text-left font-zain text-sm font-[500] text-main">
                  {" "}
                  واصل القراءة{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SiteHighlights;
