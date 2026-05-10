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
            <p className="text-start self-start mb-5 text-gray-600 dark:text-white/70 font-medium text-lg">
              اختر مجالاً أو أكثر للبحث:
            </p>
          }
          tablistDownContent={<PrincipleStrictSwitches />}
        >
          <PrinciplesContent
            rulingTypeUuids={rulingTypeUuids}
            pagination={pagination}
          />
        </PrincipleTypeMultiSelect>
      </section>
      <ContactSection
        title="شارك بملاحظاتك"
        description="من أجل تطوير منظومة البحث وتيسير الوصول إلى مبادئ المحكمة العليا، نرجو المشاركة بآرائكم حول الخدمة، سواء بإبداء الملاحظات عن طريقة عملها أو عن محتواها، أو باقتراح تحسينات إضافية."
        subDescription="سنولي كل مشاركة العناية التي تستحق، وسنعمل - بتوفيق الله تعالى - على إدخال كل التحديثات المهمة للارتقاء بالخدمة."
      />
    </>
  );
}
