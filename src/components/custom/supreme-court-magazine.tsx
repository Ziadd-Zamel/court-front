import { getBooksByType } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";
import CourtPagination from "./court-pagination";
import BookCard from "@/components/common/book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function SupremeCourtMagazine({ pagination }: Props) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getBooksByType(pagination.currentPage, 20, "supreme_court")
  );

  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }
  console.log(data.data);

  return (
    <>
      {/** Main content */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-10">
        {data?.data.map((book) => (
          <BookCard
            type={"magazine"}
            image="/assets/mahazine.png"
            key={book.uuid}
            book={book}
          />
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
