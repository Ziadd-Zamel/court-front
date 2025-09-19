import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getAllLaws } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQueries: {
    search?: string;
  };
};

export default async function CourtLawsPage({}: Props) {
  const [data, error] = await catchError(() => getAllLaws());

  if (error) return <ErrorState />;

  if (!data || data?.data.length === 0) {
    return <NoDataState />;
  }

  // Tabs data configuration
  const courtReleaseTabs: TabItem[] =
    data?.data?.map((law: Law) => ({
      label: law.title.trim(),
      value: `law-${law.uuid}`,
      heading: law.title.trim(),
      component: (
        <p className="text-gray-500 leading-relaxed text-lg">{law.body_text}</p>
      ),
    })) || [];

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-60"
    >
      <ReusableTabs
        tabs={courtReleaseTabs}
        defaultValue={`law-${data.data[0].uuid}`}
        className="lg:mt-[130px]"
        tabContentClassName=" mt-32 lg:mt-[100px]"
      />
    </section>
  );
}
