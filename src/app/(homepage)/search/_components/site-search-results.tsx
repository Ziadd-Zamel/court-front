import catchError from "@/lib/utils/catch-error";
import { getRulingsByQuery } from "@/lib/api/articles";
import { getAvailableLibraryBooks } from "@/lib/api/books";
import { getPublicationsByQuery } from "@/lib/api/publication.api";
import { searchQuestions } from "@/lib/api/question.api";
import ArticlesList from "@/components/custom/articlesL-list";
import BookCard from "@/components/common/book-card";
import QuestionCard from "@/components/common/question-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import { Accordion } from "@/components/ui/accordion";
import type { SiteSearchType } from "@/lib/constants/site-search";

type Pagination = {
  currentPage: number;
  limit: number;
};

type Props = {
  search: string;
  type: SiteSearchType;
  pagination: Pagination;
};

function BooksGrid({
  books,
  from,
  cardType,
}: {
  books: BookData[];
  from: string;
  cardType?: string;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-2 gap-5 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6!">
        {books.map((book, index) => (
          <BookCard
            key={book.uuid}
            book={book}
            type={cardType}
            image={cardType === "magazine" ? "/assets/mahazine.jpeg" : undefined}
            issueNumber={index + 1}
            from={from}
            openInNewTab
          />
        ))}
      </div>
    </div>
  );
}

function ResultCount({ total }: { total: number }) {
  return (
    <p className="mb-10 text-right text-xl font-semibold text-main">
      نتائج البحث: {total}
    </p>
  );
}

export default async function SiteSearchResults({
  search,
  type,
  pagination,
}: Props) {
  if (type === "articles") {
    const [data, error] = await catchError(() =>
      getRulingsByQuery(search, pagination.currentPage, pagination.limit),
    );
    if (error) return <ErrorState />;
    if (!data || data.data.length === 0) return <NoSearchResults />;

    return (
      <div className="mx-auto max-w-5xl">
        <ResultCount total={data.meta.total} />
        <ArticlesList
          articles={data.data}
          pagination={pagination}
          totalPages={data.meta.last_page}
          from="/search"
        />
      </div>
    );
  }

  if (type === "books") {
    const [data, error] = await catchError(() =>
      getAvailableLibraryBooks(
        pagination.currentPage,
        pagination.limit,
        search,
      ),
    );
    if (error) return <ErrorState />;
    if (!data || data.data.length === 0) return <NoSearchResults />;

    return (
      <>
        <ResultCount total={data.meta.total} />
        <BooksGrid books={data.data} from="/search" cardType="book" />
        {data.meta.last_page > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination
              pagination={pagination}
              totalPages={data.meta.last_page}
            />
          </div>
        ) : null}
      </>
    );
  }

  if (type === "information") {
    const [data, error] = await catchError(() =>
      searchQuestions(search, pagination.currentPage, pagination.limit),
    );
    if (error) return <ErrorState />;
    if (!data || data.data.length === 0) return <NoSearchResults />;

    return (
      <div className="mx-auto max-w-5xl">
        <ResultCount total={data.meta.total} />
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2"
          dir="rtl"
        >
          {data.data.map((question) => (
            <QuestionCard key={question.uuid} item={question} />
          ))}
        </Accordion>
        {data.meta.last_page > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination
              pagination={pagination}
              totalPages={data.meta.last_page}
            />
          </div>
        ) : null}
      </div>
    );
  }

  const [data, error] = await catchError(() =>
    getPublicationsByQuery(search, pagination.currentPage, pagination.limit),
  );
  if (error) return <ErrorState />;
  if (!data || data.data.length === 0) return <NoSearchResults />;

  return (
    <>
      <ResultCount total={data.meta.total} />
      <BooksGrid books={data.data} from="/search" cardType="magazine" />
      {data.meta.last_page > 1 ? (
        <div className="mt-10 flex justify-center">
          <CourtPagination
            pagination={pagination}
            totalPages={data.meta.last_page}
          />
        </div>
      ) : null}
    </>
  );
}
