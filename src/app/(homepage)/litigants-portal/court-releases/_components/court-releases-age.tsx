import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import AvailablePublications from "./available-publications";
import PrintingPublishingService from "@/components/custom/printing-publishing-service";
import CourtPublications from "@/components/custom/court-publications";
import { SearchParamsRecord } from "@/lib/utils/tab-pagination";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchParams: SearchParamsRecord;
};

export default function CourtReleasesPage({ pagination, searchParams }: Props) {
  // Tabs data configuration
  const courtReleaseTabs: TabItem[] = [
    {
      label: "خدمة الطباعة والنشر",
      value: "printing",
      component: <PrintingPublishingService />,
    },
    {
      label: "إصدارات المحكمة",
      value: "court-publications",
      heading: "إصدارات المحكمة",
      component: <CourtPublications searchParams={searchParams} />,
    },
    {
      label: "الإصدارات المتوفرة",
      value: "available-publications",
      heading: "الإصدارات المتوفرة",
      component: <AvailablePublications pagination={pagination} />,
    },
  ];
  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-20 sm:pb-40 pb-20 w-full box-container"
    >
      <ReusableTabs
        tabs={courtReleaseTabs}
        defaultValue="printing"
        tabContentClassName=""
      />
    </section>
  );
}
