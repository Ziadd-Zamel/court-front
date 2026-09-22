import Link from "next/link";
import catchError from "@/lib/utils/catch-error";
import { postSiteSearch } from "@/lib/api/search.api";
import ArticlesList from "@/components/custom/articlesL-list";
import BookCard from "@/components/common/book-card";
import CounselorCard from "@/components/common/counselor-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import OtherLawCard from "@/app/(homepage)/about-court/courts-law/_components/other-law-card";
import type { SiteSearchScope } from "@/lib/constants/site-search";

type Pagination = {
  currentPage: number;
  limit: number;
};

type Props = {
  search: string;
  scope: SiteSearchScope;
  pagination: Pagination;
};

function ResultCount({ total }: { total: number }) {
  return (
    <p className="mb-10 text-right text-xl font-semibold text-main">
      نتائج البحث: {total}
    </p>
  );
}

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
            image={
              cardType === "magazine" ? "/assets/mahazine.jpeg" : undefined
            }
            issueNumber={index + 1}
            from={from}
            openInNewTab
          />
        ))}
      </div>
    </div>
  );
}

function publicationToBook(item: SiteSearchPublicationItem): BookData {
  return {
    uuid: item.uuid,
    title: item.publication_type || `العدد ${item.number ?? ""}`,
    category: item.publication_type || "",
    author: "",
    book_number: 0 as unknown as BookData["book_number"],
    publisher: "",
    judicial_year: item.judicial_year || "",
    number: item.number || "",
    published_year: item.calendar_year || "",
    book_image: item.cover_image || "",
    pdf_file: item.pdf_file || "",
    page_count: "",
    pdf_url: item.pdf_file || "",
    index_pdf: "",
    court_release: false,
    court_release_available: Boolean(item.is_available),
    technical_office: false,
    technical_office_type: "other",
    index_content: "",
    index_images: [],
    release_type_value: false,
  };
}

function normalizeCounselor(item: Counselor): Counselor {
  const fields = Array.isArray(item.fields) ? item.fields : [];

  return {
    ...item,
    fields,
    experience_years:
      item.experience_years == null
        ? null
        : Number(item.experience_years) || null,
  };
}

export default async function SiteSearchResults({
  search,
  scope,
  pagination,
}: Props) {
  const [data, error] = await catchError(() =>
    postSiteSearch({
      search,
      scope,
      page: pagination.currentPage,
      perPage: pagination.limit,
    }),
  );

  if (error) return <ErrorState />;

  const section = data?.data.sections?.[0];
  const items = section?.items ?? [];
  const total = section?.pagination?.total ?? data?.data.total ?? 0;
  const totalPages =
    section?.pagination?.last_page ?? data?.meta.last_page ?? 1;
  const sectionType = section?.type;

  if (!section || items.length === 0 || total === 0) {
    return <NoSearchResults />;
  }

  if (sectionType === "ruling") {
    const from = scope === "research" ? "/technical-office" : "/search";

    return (
      <div className="mx-auto max-w-5xl">
        <ResultCount total={total} />
        <ArticlesList
          articles={items as Article[]}
          pagination={pagination}
          totalPages={totalPages}
          from={from}
        />
      </div>
    );
  }

  if (sectionType === "book") {
    return (
      <>
        <ResultCount total={total} />
        <BooksGrid books={items as BookData[]} from="/search" cardType="book" />
        {totalPages > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination pagination={pagination} totalPages={totalPages} />
          </div>
        ) : null}
      </>
    );
  }

  if (sectionType === "publication") {
    const books = (items as SiteSearchPublicationItem[]).map(publicationToBook);

    return (
      <>
        <ResultCount total={total} />
        <BooksGrid books={books} from="/search" cardType="magazine" />
        {totalPages > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination pagination={pagination} totalPages={totalPages} />
          </div>
        ) : null}
      </>
    );
  }

  if (sectionType === "law") {
    return (
      <div className="mx-auto max-w-5xl">
        <ResultCount total={total} />
        <div className="w-full" dir="rtl">
          {(items as Law[]).map((law) => (
            <OtherLawCard key={law.uuid} law={law} />
          ))}
        </div>
        {totalPages > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination pagination={pagination} totalPages={totalPages} />
          </div>
        ) : null}
      </div>
    );
  }

  if (sectionType === "counselor") {
    const counselors = (items as Counselor[]).map(normalizeCounselor);

    return (
      <div className="mx-auto max-w-6xl">
        <ResultCount total={total} />
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          dir="rtl"
        >
          {counselors.map((counselor) => (
            <Link
              key={counselor.uuid}
              href={`/about-court/counselors/${counselor.uuid}`}
              className="block h-full"
            >
              <CounselorCard counselor={counselor} />
            </Link>
          ))}
        </div>
        {totalPages > 1 ? (
          <div className="mt-10 flex justify-center">
            <CourtPagination pagination={pagination} totalPages={totalPages} />
          </div>
        ) : null}
      </div>
    );
  }

  return <NoSearchResults />;
}
