import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getPrincipleTypes } from "@/lib/api/principle.api";
import catchError from "@/lib/utils/catch-error";
import PrinciplesContent from "./principles-content";
import ContactSection from "@/components/custom/contact-section";
import PrincipleStrictSwitches from "./principle-strict-switches";
import PrincipleTypeMultiSelect from "./principle-type-multi-select";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchParams: {
    ruling_type_uuid?: string | string[];
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
    session_date?: string;
    strict_alef?: string;
    strict_ya?: string;
    strict_ta?: string;
  };
};

function normalizeRulingTypeUuids(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",").filter(Boolean);
}

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

  const options = payload.data.map((c) => ({ label: c.name, value: c.uuid }));
  const rulingTypeUuids = normalizeRulingTypeUuids(
    searchParams.ruling_type_uuid,
  );

  return (
    <>
      <section className="relative w-full box-container pt-20 pb-20">
        <PrincipleTypeMultiSelect
          options={options}
          className="lg:mt-0"
          tabContentClassName="lg:mt-0"
          tablistUpContent={
            <p className="text-start self-start mb-5  text-gray-600 font-medium text-lg">
              اختر مجالا او اكثر للبحث
            </p>
          }
          tablistDownContent={<PrincipleStrictSwitches />}
        >
          <PrinciplesContent
            rulingTypeUuids={rulingTypeUuids}
            pagination={pagination}
            searchParams={searchParams}
            totalItems={payload.meta.total || 0}
          />
        </PrincipleTypeMultiSelect>
      </section>
      <ContactSection title="شارك بملاحظاتك من أجل تطوير منظومة البحث" />
    </>
  );
}
