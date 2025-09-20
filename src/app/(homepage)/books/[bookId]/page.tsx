import BookPage from "./_components/book-page";
import ErrorState from "@/components/custom/error-state";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId?: string }>;
}) {
  // Get the page and the limit form serach params
  const resolvedParams = await params;
  const bookId = resolvedParams.bookId;

  if (!bookId) return <ErrorState />;
  return (
    <>
      <BookPage id={bookId} />
    </>
  );
}
