import BookCard from "@/components/common/book-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getBooksByCategory } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};
export default async function CategoryBooks({
  categoryUuid,
  pagination,
}: {
  categoryUuid: string;
  pagination: Props["pagination"];
}) {
  const [data, error] = await catchError(() =>
    getBooksByCategory(pagination.currentPage, 20, categoryUuid),
  );

  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-10">
        {data?.data.map((book) => (
          <BookCard type="book" key={book.uuid} book={book} />
        ))}
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
