import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getPrincipleTypes } from "@/lib/api/principle.api";
import catchError from "@/lib/utils/catch-error";
import PrinciplesContent from "./principles-content";
import ContactSection from "@/components/custom/contact-section";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchParams: {
    search?: string;
    exact_phrase?: string;
    similar_phrase?: string;
    include_terms?: string;
    exclude_terms?: string;
    any_terms?: string;
    appeal_number?: string;
    appeal_year?: string;
    principle_number?: string;
    principle_year?: string;
  };
};

export default async function PrinciplePage({
  pagination,
  searchParams,
}: Props) {
  const [payload, error] = await catchError(() => getPrincipleTypes());

  if (error) {
    return <ErrorState />;
  }

  if (!payload || !payload.data) {
    return <NoDataState />;
  }

  const dynamicTabs: TabItem[] = payload?.data.map((category) => ({
    label: category.name,
    value: category.uuid,
    heading: category.name,

    component: (
      <PrinciplesContent
        uuid={category.uuid}
        pagination={pagination}
        searchParams={searchParams}
        totalItems={payload.meta.total || 0}
      />
    ),
  }));

  return (
    <>
      <section className="relative pt-32 w-full box-container mb-20">
        <ReusableTabs
          tabs={dynamicTabs}
          defaultValue={dynamicTabs[0].value}
          className="lg:mt-0"
          showSearch={false}
          showHeading={false}
          tabContentClassName="lg:mt-0"
        />
      </section>
      <ContactSection title="شارك بملاحظاتك من أجل تطوير منظومة البحث" />
    </>
  );
}
