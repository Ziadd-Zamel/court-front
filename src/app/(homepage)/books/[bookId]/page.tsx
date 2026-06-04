import BookPage from "./_components/book-page";
import ErrorState from "@/components/custom/error-state";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ bookId?: string }>;
  searchParams: Promise<{ type?: string; from?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const bookId = resolvedParams.bookId;
  const isMagazine = resolvedSearchParams.type === "magazine";

  if (!bookId) return <ErrorState />;
  return (
    <BookPage
      id={bookId}
      isMagazine={isMagazine}
      from={resolvedSearchParams.from}
    />
  );
}
