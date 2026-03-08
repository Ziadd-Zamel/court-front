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
  categoryUuid: string;
  search?: string;
};

export default async function PublicationsContent({
  pagination,
  categoryUuid,
  search,
}: Props) {
  const [data, error] = await catchError(() =>
    getPublicationByCategory(pagination.currentPage, 40, categoryUuid, search),
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! gap-y-16 lg:mt-10">
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
