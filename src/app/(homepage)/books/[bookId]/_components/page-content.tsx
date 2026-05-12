"use client";

import Image from "next/image";
import BookFlip from "./book-flip";

const MAGAZINE_COVER_IMAGE = "/assets/mahazine.jpeg";

type PublicationDetailFields = BookData & {
  publication_type?: string | null;
  calendar_year?: string | null;
  cover_image?: string | null;
};

function displayValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  const s = String(value).trim();
  return s || "—";
}

export default function PageContent({
  Book,
  isMagazine,
  flipPdfUrl,
}: {
  Book: BookData;
  isMagazine?: boolean;
  flipPdfUrl?: string | null;
}) {
  const pub = Book as PublicationDetailFields;
  const coverSrc = isMagazine
    ? pub.cover_image || Book.book_image || MAGAZINE_COVER_IMAGE
    : Book.book_image || "/assets/book-1.jpg";

  if (isMagazine) {
    return (
      <section className="box-container h-full w-full py-20" dir="rtl">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[340px_1fr]">
          <Image
            src={coverSrc}
            alt={Book.title || "غلاف المجلة"}
            width={340}
            height={480}
            className="mx-auto h-[480px] w-[340px] rounded-lg object-cover shadow-lg lg:row-span-2 lg:mx-0"
          />

          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="mb-10 text-center text-2xl font-bold text-main sm:text-2xl lg:text-right lg:text-3xl">
              {displayValue(Book.title)}
            </h2>

            <Info
              label="نوع الإصدار"
              value={displayValue(pub.publication_type)}
            />
            <Info
              label="السنة القضائية"
              value={displayValue(Book.judicial_year)}
            />
            <Info label="العدد" value={displayValue(Book.number)} />
            <Info
              label="السنة الميلادية"
              value={displayValue(pub.calendar_year ?? Book.published_year)}
            />
            <Info label="عدد الصفحات" value={displayValue(Book.page_count)} />
          </div>

          {flipPdfUrl && (
            <div className="min-w-0 lg:col-start-2">
              <FlipBookSlot pdfUrl={flipPdfUrl} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="box-container h-full w-full py-20" dir="rtl">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[340px_1fr]">
        <Image
          src={coverSrc}
          alt={Book.title || "غلاف الكتاب"}
          width={340}
          height={480}
          className="mx-auto h-[480px] w-[340px] rounded-lg object-cover shadow-lg lg:row-span-2 lg:mx-0"
        />

        <div className="flex min-w-0 flex-col gap-2">
          <h2 className="mb-10 text-2xl font-bold text-main sm:text-2xl lg:text-3xl">
            {displayValue(Book.title)}
          </h2>

          <Info label="المؤلف" value={displayValue(Book.author)} />
          <Info label="الناشر" value={displayValue(Book.publisher)} />
          <Info label="عام النشر" value={displayValue(Book.published_year)} />
          <Info label="التصنيف" value={displayValue(Book.category)} />
          <Info label="عدد الصفحات" value={displayValue(Book.page_count)} />
        </div>

        {flipPdfUrl && (
          <div className="min-w-0 lg:col-start-2">
            <FlipBookSlot pdfUrl={flipPdfUrl} />
          </div>
        )}
      </div>
    </section>
  );
}

function FlipBookSlot({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="mt-2 w-full overflow-y-hidden rounded-lg bg-main p-6 overflow-hidden">
      <BookFlip pdfUrl={pdfUrl} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </span>
      <span className="text-gray-600 dark:text-gray-300">{value}</span>
    </div>
  );
}
