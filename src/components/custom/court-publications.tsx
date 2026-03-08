import SecondaryTabs from "@/components/common/secondary-tabs";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "./error-state";
import NoDataState from "./no-data-state";
import { TabItem } from "../common/reusable-tabs";
import PublicationsContent from "./publications-content";
import PendingPublicationsContent from "./pending-publications-content";
import { getPublicationCategories } from "@/lib/api/publication.api";
type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function CourtPublications({ pagination, search }: Props) {
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
          search={search}
        />
      ),
    }));

  const pendingTab: TabItem = {
    label: "إصدارات قيد الطباعة",
    value: "pending-publications",
    component: (
      <PendingPublicationsContent pagination={pagination} search={search} />
    ),
  };

  const allTabs = [...categoryTabs, pendingTab];

  return (
    <SecondaryTabs tabs={allTabs} defaultValue={categoriesData.data[0].uuid} />
  );
}
