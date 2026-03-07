import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import LawContent from "./law-content";
import OtherLawsContent from "./other-laws-content";

const COURT_LAW_TABS: TabItem[] = [
  {
    label: "قوانين المحكمة العليا",
    value: "court-law",
    heading: "قوانين المحكمة العليا",
    component: <LawContent type="court-law" />,
  },
  {
    label: "اللوائح",
    value: "regulations",
    heading: "اللوائح",
    component: <LawContent type="regulations" />,
  },
  {
    label: "نصوص الطعن بالنقض",
    value: "appeal-texts",
    heading: "نصوص الطعن بالنقض",
    component: <LawContent type="appeal-texts" />,
  },
  {
    label: "قوانين أخرى",
    value: "other",
    heading: "قوانين أخرى",
    component: <OtherLawsContent />,
  },
];

export default async function CourtLawsPage() {
  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-20 w-full box-container pb-40"
    >
      <ReusableTabs tabs={COURT_LAW_TABS} defaultValue="court-law" />
    </section>
  );
}
