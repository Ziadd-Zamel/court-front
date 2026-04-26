import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";
import SecondaryHeading from "@/components/common/seondary-heading";
import { getBookByID, getPublicationsByID } from "@/lib/api/books";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { DownloadButton } from "@/components/common/download-button";
import { PrintButton } from "@/components/common/print-button";
import BookFlip from "./book-flip";

function resolveBookPdfUrl(pdfUrl: string | null | undefined): string | null {
  const t = typeof pdfUrl === "string" ? pdfUrl.trim() : "";
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  const base = (process.env.API ?? "").replace(/\/$/, "");
  if (!base) return null;
  return `${base}${t.startsWith("/") ? "" : "/"}${t}`;
}

export default async function BookPage({
  id,
  isMagazine,
}: {
  id: string;
  isMagazine?: boolean;
}) {
  const [data, error] = await catchError(() =>
    isMagazine ? getPublicationsByID(id) : getBookByID(id),
  );

  // Show Error When there is Error
  if (error) return <ErrorState />;

  // Show Empty When no data
  if (!data) return <NoDataState />;

  const Book = data?.data;
  const flipPdfUrl = resolveBookPdfUrl(Book.index_pdf);

  return (
    <>
      <SecondaryHeading
        IconSecyion={
          <div className="flex items-center gap-3 w-full h-full">
            <BookmarkButton item={Book} type="book" />
            <ShareButton item={Book} type="book" />
            {Book.pdf_url && <DownloadButton url={Book.pdf_url} />}
            {Book.pdf_url && <PrintButton url={Book.pdf_url} />}
          </div>
        }
        title={"تفاصيل الكتاب"}
      />

      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent Book={Book} isMagazine={isMagazine} />
      </div>
      {flipPdfUrl && (
        <div className="bg-main box-container max-w-4xl p-10 rounded-lg mb-20 px-20">
          <BookFlip pdfUrl={flipPdfUrl} />
        </div>
      )}
    </>
  );
}
