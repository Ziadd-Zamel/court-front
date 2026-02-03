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

export default async function RulingsSet({ pagination }: Props) {
  const [data, error] = await catchError(() =>
    getPublicationByCategory(
      pagination.currentPage,
      20,
      "cd487385-e034-4a38-8a5d-ee88094897d1",
    ),
  );
  if (!data || data.data.length === 0) {
    return <NoDataState />;
  }
  if (error) {
    return <ErrorState />;
  }
  console.log(data);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-10">
        {data?.data.map((book) => (
          <BookCard
            image="/assets/ruling-image.png"
            type="ruling"
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
