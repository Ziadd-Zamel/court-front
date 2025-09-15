import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import AvailablePublications from "./available-publications";
import PublicationsInPrint from "./publications-in-print";
import ComingSoon from "@/components/custom/coming-soon";
import PrintingPublishingService from "@/components/custom/printing-publishing-service";
import CourtPublications from "@/components/custom/court-publications";
type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default function CourtReleasesPage({ pagination }: Props) {
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
      component: <CourtPublications pagination={pagination} />,
    },
    {
      label: "البحث في الإصدارات",
      value: "search-publications",
      heading: "البحث في الإصدارات",
      component: <ComingSoon />,
    },
    {
      label: "الإصدارات المتوفرة",
      value: "available-publications",
      heading: "الإصدارات المتوفرة",
      component: <AvailablePublications pagination={pagination} />,
    },
    {
      label: "إصدارات قيد الطباعة",
      value: "publications-in-print",
      heading: "إصدارات قيد الطباعة",
      component: <PublicationsInPrint pagination={pagination} />,
    },
  ];
  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-20"
    >
      <ReusableTabs tabs={courtReleaseTabs} defaultValue="printing" />
    </section>
  );
}
