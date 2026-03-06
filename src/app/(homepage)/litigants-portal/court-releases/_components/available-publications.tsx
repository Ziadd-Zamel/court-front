import { getAvailableBooks } from "@/lib/api/books";
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
    getAvailableBooks(pagination.currentPage, 20),
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
      <div className="flex w-full justify-center lg:justify-start mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-2 min-[1230]:grid-cols-3! min-[1300]:grid-cols-5! gap-y-16 mt-10">
          {data?.data.map((book, index) => (
            <BookCard
              type={"magazine"}
              image="/assets/mahazine.jpeg"
              key={book.uuid}
              book={book}
              issueNumber={index + 1}
            />
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
