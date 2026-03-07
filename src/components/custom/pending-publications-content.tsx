import catchError from "@/lib/utils/catch-error";
import CourtPagination from "./court-pagination";
import PendingBookCard from "@/components/common/pending-book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getPendingPublications } from "@/lib/api/publication.api";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function PendingPublicationsContent({
  pagination,
  search,
}: Props) {
  const [data, error] = await catchError(() =>
    getPendingPublications(pagination.currentPage, 40, search),
  );

  if (error) return <ErrorState />;

  if (!data || data.data.length === 0) return <NoDataState />;

  return (
    <>
      <div className="flex w-full justify-center lg:justify-start mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! gap-y-16 lg:mt-10">
          {data.data.map((book) => (
            <PendingBookCard key={book.uuid} book={book} />
          ))}
        </div>
      </div>

      {data.data.length >= 20 && (
        <div className="flex justify-center mt-8">
          <CourtPagination
            pagination={pagination}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </>
  );
}
