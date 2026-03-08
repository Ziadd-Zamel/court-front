import { getOtherLawCategories, OtherLawCategory } from "@/lib/api/law.api";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import OtherLawsByCategory from "./other-laws-by-category";

export default async function OtherLawsContent() {
  const [data, error] = await catchError(() => getOtherLawCategories());

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || !data.data?.length) {
    return <NoDataState />;
  }

  const tabs: SecondaryTabItem[] = data.data.map(
    (category: OtherLawCategory) => ({
      label: category.name,
      value: category.uuid,
      component: <OtherLawsByCategory categoryUuid={category.uuid} />,
    }),
  );

  return <SecondaryTabs tabs={tabs} direction="rtl" />;
}
