import catchError from "@/lib/utils/catch-error";
import CourtPagination from "./court-pagination";
import PendingBookCard from "@/components/common/pending-book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getPendingPublications } from "@/lib/api/publication.api";
import SectionHeading from "@/components/common/section-heading";

type Props = {
  pageKey: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  heading?: string;
};

export default async function PendingPublicationsContent({
  pageKey,
  pagination,
  search,
  heading,
}: Props) {
  const [data, error] = await catchError(() =>
    getPendingPublications(pagination.currentPage, 40, search),
  );

  const total = data?.meta?.total ?? 0;
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

  if (!data || data.data.length === 0) {
    return (
      <>
        {headingNode}
        <NoDataState />
      </>
    );
  }

  return (
    <>
      {headingNode}
      <div className="flex w-full justify-center lg:justify-start mt-10">
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6! gap-y-16 lg:mt-10">
            {data.data.map((book) => (
              <PendingBookCard key={book.uuid} book={book} />
            ))}
          </div>
        </div>
      </div>

      {data.meta.last_page > 1 && (
        <div className="flex justify-center mt-8">
          <CourtPagination
            pageKey={pageKey}
            pagination={pagination}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </>
  );
}
