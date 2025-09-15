import { getBooksByType } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";
import BookCard from "@/components/common/book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import CourtPagination from "@/components/custom/court-pagination";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function BooksContent({ pagination }: Props) {
  const [data, error] = await catchError(() =>
    getBooksByType(pagination.currentPage, 10)
  );
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }
  if (error) {
    return <ErrorState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6 justify-items-center">
        {data?.data.map((book) => (
          <BookCard key={book.uuid} book={book} />
        ))}
      </div>
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
