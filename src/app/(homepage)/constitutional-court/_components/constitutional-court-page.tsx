import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ImportantInfo from "./important-info";
import ConstitutionalCourtSessions from "./constitutional-court-sessions";
import AboutConstitutionalCourt from "./about-constitutional-court";
import ArticlePage from "@/components/custom/article-page";
import { getRulingCategory } from "@/lib/api/subcategories";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ConstitutionalCourtPage({
  pagination,
  search,
}: Props) {
  const categories = await getRulingCategory();
  console.log(categories);
  const tabs: TabItem[] = [
    {
      label: "القضاء الدستوري",
      value: "dfd472f3-aa70-40f4-bdfa-245a2940eb52",
      heading: "القضاء الدستوري",
      component: (
        <ArticlePage
          pagination={pagination}
          uuid="dfd472f3-aa70-40f4-bdfa-245a2940eb52"
          search={search}
          from="/constitutional-court"
        />
      ),
    },
    {
      label: "معلومات مهمة",
      value: "important-info",
      heading: "معلومات مهمة",
      component: <ImportantInfo pagination={pagination} search={search} />,
    },
    {
      label: "جلسات الدائرة الدستورية",
      value: "constitutional-court-sessions",
      heading: "جلسات الدائرة الدستورية",
      component: (
        <ConstitutionalCourtSessions pagination={pagination} search={search} />
      ),
    },
    {
      label: "عن الدائرة الدستورية",
      value: "about-constitutional-court",
      heading: "عن الدائرة الدستورية",
      component: <AboutConstitutionalCourt />,
    },
  ];

  return (
    <section
      id="ConstitutionalCourt"
      aria-labelledby="Constitutional Court Page"
      className="relative box-container py-20 pb-40"
    >
      <ReusableTabs
        tabs={tabs}
        defaultValue="590da7e0-a113-4bcf-a599-a859c89f7ff3"
      />
    </section>
  );
}
