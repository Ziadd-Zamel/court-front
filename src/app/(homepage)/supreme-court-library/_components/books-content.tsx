import { getBookCategories } from "@/lib/api/books";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { TabItem } from "@/components/common/reusable-tabs";
import catchError from "@/lib/utils/catch-error";
import {
  parseTabPagination,
  SearchParamsRecord,
} from "@/lib/utils/tab-pagination";
import CategoryBooks from "./category-books";
import SecondaryTabs from "@/components/common/secondary-tabs";

type Props = {
  searchParams: SearchParamsRecord;
  search?: string;
};

export default async function BooksContent({ searchParams, search }: Props) {
  const [categoriesData, categoriesError] = await catchError(() =>
    getBookCategories(),
  );

  if (categoriesError || !categoriesData) {
    return <ErrorState />;
  }

  if (categoriesData.data.length === 0) {
    return <NoDataState />;
  }

  const categoryTabs: TabItem[] = categoriesData.data.map((category) => ({
    label: category.name,
    value: category.uuid,
    component: (
      <CategoryBooks
        categoryUuid={category.uuid}
        pageKey={category.uuid}
        pagination={parseTabPagination(searchParams, category.uuid, 40)}
        search={search}
      />
    ),
  }));

  return (
    <section id="BooksCategories" aria-labelledby="Books Categories Page">
      <SecondaryTabs
        tabs={categoryTabs}
        defaultValue={categoriesData.data[0]?.uuid || ""}
        tabContentClassName=""
      />
    </section>
  );
}
