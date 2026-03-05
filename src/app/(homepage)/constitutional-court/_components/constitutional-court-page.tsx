import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ImportantInfo from "./important-info";
import ConstitutionalCourtSessions from "./constitutional-court-sessions";
import AboutConstitutionalCourt from "./about-constitutional-court";
import ArticlePage from "@/components/custom/article-page";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default function ConstitutionalCourtPage({ pagination, search }: Props) {
  const tabs: TabItem[] = [
    {
      label: "القضاء الدستوري",
      value: "590da7e0-a113-4bcf-a599-a859c89f7ff3",
      heading: "القضاء الدستوري",
      component: (
        <ArticlePage
          pagination={pagination}
          uuid="590da7e0-a113-4bcf-a599-a859c89f7ff3"
          search={search}
        />
      ),
    },
    {
      label: "معلومات مهمة",
      value: "important-info",
      heading: "معلومات مهمة",
      component: <ImportantInfo pagination={pagination} />,
    },
    {
      label: "جلسات الدائرة الدستورية",
      value: "constitutional-court-sessions",
      heading: "جلسات الدائرة الدستورية",
      component: <ConstitutionalCourtSessions pagination={pagination} />,
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
      className="relative pt-32 w-full box-container mb-20"
    >
      <ReusableTabs
        tabs={tabs}
        defaultValue="590da7e0-a113-4bcf-a599-a859c89f7ff3"
        className="lg:-mt-12"
        tabContentClassName="mt-32 lg:mt-[150px]"
      />
    </section>
  );
}
