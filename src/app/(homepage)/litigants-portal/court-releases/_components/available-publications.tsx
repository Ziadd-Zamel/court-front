import { getAvailableBooks } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";
import BookCard from "@/components/common/book-card";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import CourtPagination from "@/components/custom/court-pagination";
import SectionHeading from "@/components/common/section-heading";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  heading?: string;
};

export default async function AvailablePublications({
  pagination,
  heading,
}: Props) {
  const [data, error] = await catchError(() =>
    getAvailableBooks(pagination.currentPage, 20),
  );

  const total = data?.meta?.total ?? 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} />
  ) : null;

  if (!data || data.data.length === 0) {
    return (
      <>
        {headingNode}
        <NoDataState />
      </>
    );
  }

  if (error) {
    return (
      <>
        {headingNode}
        <ErrorState />
      </>
    );
  }

  return (
    <>
      {headingNode}
      <div className="flex w-full justify-center lg:justify-start mt-10">
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6! gap-y-16 lg:mt-10">
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
      </div>

      {data.meta.last_page > 1 && (
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
