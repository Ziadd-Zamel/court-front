import catchError from "@/lib/utils/catch-error";
import CourtPagination from "./court-pagination";
import BookCard from "@/components/common/book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getPublicationByCategory } from "@/lib/api/publication.api";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function PublicationsContent({
  pagination,
  categoryUuid,
}: {
  categoryUuid: string;
  pagination: Props["pagination"];
}) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getPublicationByCategory(pagination.currentPage, 20, categoryUuid),
  );
  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }
  console.log(data);
  return (
    <>
      {/** Main content */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-10">
        {data?.data.map((book, index) => (
          <BookCard
            type={"magazine"}
            image="/assets/mahazine.png"
            key={book.uuid}
            book={book}
            issueNumber={index + 1}
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
