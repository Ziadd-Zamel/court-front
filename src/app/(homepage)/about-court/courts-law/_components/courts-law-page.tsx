import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import LawContent from "./law-content";
import OtherLawsContent from "./other-laws-content";

type Props = {
  search?: string;
  defaultTab?: string;
};

export default async function CourtLawsPage({ search, defaultTab }: Props) {
  const tabs: TabItem[] = [
    {
      label: "قوانين المحكمة العليا",
      value: "court-law",
      heading: "قوانين المحكمة العليا",
      component: <LawContent type="court-law" search={search} />,
    },
    {
      label: "اللوائح",
      value: "regulations",
      heading: "اللوائح",
      component: <LawContent type="regulations" search={search} />,
    },
    {
      label: "نصوص الطعن بالنقض",
      value: "appeal-texts",
      heading: "نصوص الطعن بالنقض",
      component: <LawContent type="appeal-texts" search={search} />,
    },
    {
      label: "قوانين أخرى",
      value: "other",
      heading: "قوانين أخرى",
      component: <OtherLawsContent search={search} />,
    },
  ];

  const initialTab =
    defaultTab && tabs.some((t) => t.value === defaultTab)
      ? defaultTab
      : "court-law";

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-20 w-full box-container pb-40"
    >
      <ReusableTabs tabs={tabs} defaultValue={initialTab} />
    </section>
  );
}
