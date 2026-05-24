import SecondaryTabs from "@/components/common/secondary-tabs";
import catchError from "@/lib/utils/catch-error";
import {
  parseTabPagination,
  SearchParamsRecord,
} from "@/lib/utils/tab-pagination";
import ErrorState from "./error-state";
import NoDataState from "./no-data-state";
import { TabItem } from "../common/reusable-tabs";
import PublicationsContent from "./publications-content";
import PendingPublicationsContent from "./pending-publications-content";
import { getPublicationCategories } from "@/lib/api/publication.api";

type Props = {
  searchParams: SearchParamsRecord;
  search?: string;
};

export default async function CourtPublications({ searchParams, search }: Props) {
  const [categoriesData, categoriesError] = await catchError(() =>
    getPublicationCategories(),
  );

  if (categoriesError || !categoriesData) {
    return <ErrorState />;
  }

  if (categoriesData.data.length === 0) {
    return <NoDataState />;
  }

  const categoryTabs: TabItem[] = categoriesData.data
    .reverse()
    .map((category) => ({
      label: category.name,
      value: category.uuid,
      component: (
        <PublicationsContent
          categoryUuid={category.uuid}
          pageKey={category.uuid}
          pagination={parseTabPagination(searchParams, category.uuid, 40)}
          search={search}
        />
      ),
    }));

  const pendingTab: TabItem = {
    label: "إصدارات قيد الطباعة",
    value: "pending-publications",
    component: (
      <PendingPublicationsContent
        pageKey="pending-publications"
        pagination={parseTabPagination(searchParams, "pending-publications", 40)}
        search={search}
      />
    ),
  };

  return (
    <SecondaryTabs
      tabs={[...categoryTabs, pendingTab]}
      defaultValue={categoriesData.data[0].uuid}
    />
  );
}
