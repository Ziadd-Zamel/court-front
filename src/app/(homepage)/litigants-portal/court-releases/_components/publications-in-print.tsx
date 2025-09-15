import { getPendingBooks } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import CourtPagination from "@/components/custom/court-pagination";
import PendingBookCard from "@/components/common/pending-book-card";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function PublicationsInPrint({ pagination }: Props) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getPendingBooks(pagination.currentPage, 30)
  );
  // Error State
  if (error) {
    return <ErrorState />;
  }

  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }

  return (
    <>
      {/** Main content */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6 justify-items-center">
        {data?.data.map((book) => (
          <PendingBookCard key={book.title} book={book} />
        ))}
      </div>

      {/**Pagination ( show only if the data is biger than 30) */}
      {data.data.length > 30 && (
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
