import SecondaryTabs from "@/components/common/secondary-tabs";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "./error-state";
import NoDataState from "./no-data-state";
import { TabItem } from "../common/reusable-tabs";
import PublicationsContent from "./publications-content";
import { getPublicationCategories } from "@/lib/api/publication.api";
type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function CourtPublications({
  pagination,
}: {
  pagination: Props["pagination"];
}) {
  // Fetch categories
  const [categoriesData, categoriesError] = await catchError(() =>
    getPublicationCategories(),
  );

  if (categoriesError || !categoriesData) {
    return <ErrorState />;
  }

  if (categoriesData.data.length === 0) {
    return <NoDataState />;
  }

  // Map categories to tabs
  const categoryTabs: TabItem[] = categoriesData.data
    .reverse()
    .map((category) => ({
      label: category.name,
      value: category.uuid,
      component: (
        <PublicationsContent
          categoryUuid={category.uuid}
          pagination={pagination}
        />
      ),
    }));

  return (
    <SecondaryTabs
      tabListClassName={"pt-20 lg:pt-0 lg:mt-[-45px]"}
      tabs={categoryTabs}
      defaultValue="supreme_court"
    />
  );
}
