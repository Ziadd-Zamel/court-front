import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import CivilCassation from "./CivilCassation";
import CriminalCassation from "./CriminalCassation";
import PersonalAdminCassation from "./personal-admin-cassation";
import CassationProsecution from "./cassation-prosecution";
import { yearlyData } from "@/lib/constants";

export default function PerformancePage() {
  const newsTabs: SecondaryTabItem[] = [
    {
      label: "دوائر النقض المدني",
      value: "CivilCassation",
      component: <CivilCassation yearlyData={yearlyData} />,
    },
    {
      label: "دوائر النقض الجنائي",
      value: "CriminalCassation",
      component: <CriminalCassation yearlyData={yearlyData} />,
    },
    {
      label: "دوائر الأحوال الشخصية والإداري",
      value: "PersonalAdminCassation",
      component: <PersonalAdminCassation />,
    },
    {
      label: "نيابة النقض",
      value: "CassationProsecution",
      component: <CassationProsecution />,
    },
  ];

  return (
    <section className="bg-main/10">
      <div className=" flex-col justify-center items-center box-container pt-20 pb-32">
        <SecondaryTabs
          tabs={newsTabs}
          defaultValue="CivilCassation"
          className="justify-center items-center lg:w-full"
          tabListClassName="mb-20 max-w-none"
        />
      </div>
    </section>
  );
}
