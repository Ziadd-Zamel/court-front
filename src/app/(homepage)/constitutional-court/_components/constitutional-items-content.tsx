import catchError from "@/lib/utils/catch-error";
import { getConstitutionalItemsByCategory } from "@/lib/api/constitutional.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { Accordion } from "@/components/ui/accordion";
import ConstitutionalItemCard from "./constitutional-item-card";
import CourtPagination from "@/components/custom/court-pagination";

type Props = {
  categoryId: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ConstitutionalItemsContent({ categoryId, pagination, search }: Props) {
  const [data, error] = await catchError(() =>
    getConstitutionalItemsByCategory(
      categoryId,
      pagination.currentPage,
      pagination.limit,
      search,
    ),
  );

  if (error) return <ErrorState />;

  if (!data || !("data" in data) || data.data.length === 0)
    return <NoDataState />;

  return (
    <section>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2 mt-10"
        dir="rtl"
      >
        {data.data.map((item) => (
          <ConstitutionalItemCard key={item.uuid} item={item} />
        ))}
      </Accordion>

      {data.meta.last_page > 1 && (
        <div className="flex justify-center mt-8">
          <CourtPagination
            pagination={pagination}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </section>
  );
}
