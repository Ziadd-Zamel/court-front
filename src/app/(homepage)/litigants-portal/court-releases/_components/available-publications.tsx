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

export default async function AvailablePublications({ pagination }: Props) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getBooksByType(pagination.currentPage, 30)
  );

  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }

  return (
    <>
      {/** Main content */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {data?.data.map((book) => (
          <BookCard
            image="/assets/mahazine.png"
            type={"magazine"}
            hideIcons
            key={book.uuid}
            book={book}
          />
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
