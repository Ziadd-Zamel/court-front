import catchError from "@/lib/utils/catch-error";
import { getConstitutionalItemsByCategory } from "@/lib/api/constitutional.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { Accordion } from "@/components/ui/accordion";
import ConstitutionalItemCard from "./constitutional-item-card";
import CourtPagination from "@/components/custom/court-pagination";
import SectionHeading from "@/components/common/section-heading";

type Props = {
  categoryId: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  heading?: string;
};

export default async function ConstitutionalItemsContent({
  categoryId,
  pagination,
  search,
  heading,
}: Props) {
  const [data, error] = await catchError(() =>
    getConstitutionalItemsByCategory(
      categoryId,
      pagination.currentPage,
      pagination.limit,
      search,
    ),
  );

  const total = data && "meta" in data ? (data.meta?.total ?? 0) : 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} className="mb-4" />
  ) : null;

  if (error) {
    return (
      <>
        {headingNode}
        <ErrorState />
      </>
    );
  }

  if (!data || !("data" in data) || data.data.length === 0) {
    return (
      <>
        {headingNode}
        <NoDataState />
      </>
    );
  }

  return (
    <section>
      {headingNode}
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
