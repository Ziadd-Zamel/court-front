import BookCard from "@/components/common/book-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import { getBooksSearch, type BookSearchType } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";

type Props = {
  searchQueries: {
    search?: string;
    search_type?: string;
  };
  pagination: {
    currentPage: number;
    limit: number;
  };
};

const VALID_SEARCH_TYPES: BookSearchType[] = [
  "by_title",
  "by_author",
  "by_index",
  "all",
];

export default async function SearchContent({
  searchQueries,
  pagination,
}: Props) {
  const search = searchQueries.search?.trim() ?? "";
  const searchType = (
    VALID_SEARCH_TYPES.includes(searchQueries.search_type as BookSearchType)
      ? searchQueries.search_type
      : "by_title"
  ) as BookSearchType;

  const [data, error] = await catchError(() =>
    getBooksSearch(
      search,
      searchType,
      pagination.currentPage,
      pagination.limit,
    ),
  );

  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoSearchResults />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }

  const books = data.data;
  const totalResults =
    "meta" in data && typeof data.meta.total === "number"
      ? data.meta.total
      : books.length;
  const isByAuthor = searchType === "by_author";

  // للمؤلفين: تجميع حسب المؤلف ثم عرض اسم المؤلف فوق كتبه
  const byAuthorEntries = isByAuthor
    ? (() => {
        const map = new Map<string, typeof books>();
        for (const book of books) {
          const author = book.author?.trim() || "غير معروف";
          if (!map.has(author)) map.set(author, []);
          map.get(author)!.push(book);
        }
        return Array.from(map.entries());
      })()
    : null;

  const bookGrid = (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6! gap-y-16 lg:mt-10">
        {books.map((book, index) => (
          <BookCard
            type="book"
            key={book.uuid}
            book={book}
            issueNumber={index + 1}
            from="/supreme-court-library"
            openInNewTab
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <p className="mt-12 text-right text-xl font-semibold text-main">
        نتائج البحث: {totalResults}
      </p>
      <div className="flex w-full justify-center lg:justify-start mt-10">
        {isByAuthor && byAuthorEntries ? (
          <div className="w-full space-y-12 mt-10">
            {byAuthorEntries.map(([authorName, authorBooks]) => (
              <div key={authorName} className="space-y-4">
                <h3
                  className="text-lg font-semibold text-foreground border-b border-main pb-2"
                  dir="rtl"
                >
                  {authorName}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6! gap-y-16 lg:mt-10">
                  {authorBooks.map((book, index) => (
                    <BookCard
                      type="book"
                      key={book.uuid}
                      book={book}
                      issueNumber={index + 1}
                      from="/supreme-court-library"
                      openInNewTab
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10">{bookGrid}</div>
        )}
      </div>
      {"meta" in data && data.meta.last_page > 1 && (
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
