"use client";

import Link from "next/link";
import ArticlesList from "@/components/custom/articlesL-list";
import BookCard from "@/components/common/book-card";
import CounselorCard from "@/components/common/counselor-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import NoSearchQuery from "@/components/custom/no-search";
import OtherLawCard from "@/app/(homepage)/about-court/courts-law/_components/other-law-card";
import { useSiteSearch } from "@/hooks/use-site-search";
import { cn } from "@/lib/utils";
import type { SiteSearchScope } from "@/lib/constants/site-search";
import SiteSearchSkeleton from "./site-search-skeleton";

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

function hasSectionResults(section?: SiteSearchSection) {
  if (!section) return false;
  const total = section.pagination?.total ?? section.total ?? 0;
  return (section.items?.length ?? 0) > 0 && total > 0;
}

function SearchResultsBody({
  scope,
  section,
  pagination,
  totalPages,
}: {
  scope: SiteSearchScope;
  section: SiteSearchSection;
  pagination: { currentPage: number; limit: number };
  totalPages: number;
}) {
  const items = section.items ?? [];
  const total = section.pagination?.total ?? section.total ?? 0;
  const sectionType = section.type;

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
          shallowUpdate
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
            <CourtPagination
              pagination={pagination}
              totalPages={totalPages}
              shallowUpdate
            />
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
            <CourtPagination
              pagination={pagination}
              totalPages={totalPages}
              shallowUpdate
            />
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
            <CourtPagination
              pagination={pagination}
              totalPages={totalPages}
              shallowUpdate
            />
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
            <CourtPagination
              pagination={pagination}
              totalPages={totalPages}
              shallowUpdate
            />
          </div>
        ) : null}
      </div>
    );
  }

  return <NoSearchResults />;
}

export default function SiteSearchResults() {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isPlaceholderData,
    enabled,
    scope,
    page,
    perPage,
  } = useSiteSearch();

  const section = data?.data.sections?.[0];
  const hasResults = hasSectionResults(section);
  const showingStale =
    isPlaceholderData &&
    Boolean(section) &&
    section?.key !== scope &&
    hasResults;

  if (!enabled) {
    return (
      <NoSearchQuery message="اختر النطاق ثم اكتب كلمة البحث للعثور على النتائج" />
    );
  }

  // Initial load, or fetching with no usable results — never flash empty state.
  if (isLoading || (isFetching && (!hasResults || showingStale))) {
    return <SiteSearchSkeleton scope={scope} />;
  }

  if (error && !hasResults) {
    return <ErrorState />;
  }

  if (!section || !scope || !hasResults) {
    return <NoSearchResults />;
  }

  const totalPages = section.pagination?.last_page ?? 1;

  return (
    <div
      className={cn(
        "relative transition-opacity duration-200",
        isFetching && isPlaceholderData ? "opacity-55" : "opacity-100",
      )}
    >
      <SearchResultsBody
        scope={scope}
        section={section}
        pagination={{ currentPage: page, limit: perPage }}
        totalPages={totalPages}
      />
    </div>
  );
}
