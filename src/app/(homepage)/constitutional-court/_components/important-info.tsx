import SecondaryTabs from "@/components/common/secondary-tabs";
import catchError from "@/lib/utils/catch-error";
import { getConstitutionalCategories } from "@/lib/api/constitutional.api";
import { TabItem } from "@/components/common/reusable-tabs";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import ConstitutionalItemsContent from "./constitutional-items-content";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ImportantInfo({ pagination, search }: Props) {
  const [categoriesData, categoriesError] = await catchError(() =>
    getConstitutionalCategories(),
  );
  console.log(categoriesData);
  if (categoriesError) return <ErrorState />;

  if (!categoriesData?.data || !categoriesData.data.length)
    return <NoDataState />;

  const categoryTabs: TabItem[] = categoriesData.data.map((category) => ({
    label: category.title,
    value: category.uuid,
    component: (
      <ConstitutionalItemsContent
        categoryId={category.uuid}
        pagination={pagination}
        search={search}
      />
    ),
  }));

  return (
    <SecondaryTabs
      tabListClassName="pt-20 lg:pt-0 lg:mt-[-45px]"
      tabs={categoryTabs}
      defaultValue={categoriesData.data[0].uuid}
    />
  );
}
