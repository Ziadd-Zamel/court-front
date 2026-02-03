import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";
import SecondaryHeading from "@/components/common/seondary-heading";
import { getBookByID } from "@/lib/api/books";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { DownloadButton } from "@/components/common/download-button";
import { PrintButton } from "@/components/common/print-button";

export default async function BookPage({ id }: { id: string }) {
  const [data, error] = await catchError(() => getBookByID(id));

  // Show Error When there is Error
  if (error) return <ErrorState />;

  // Show Empty When no data
  if (!data) return <NoDataState />;

  const Book = data?.data;
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
        <PageContent Book={Book} />
      </div>
    </>
  );
}
