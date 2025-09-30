import BookCard from "@/components/common/book-card";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import { getBooksSeach } from "@/lib/api/books";
import catchError from "@/lib/utils/catch-error";

type Props = {
  searchQueries: {
    book?: string;
    author?: string;
    text?: string;
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SearchContent({ searchQueries }: Props) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getBooksSeach(searchQueries.book, searchQueries.author, searchQueries.text)
  );

  await delay(2000);

  // Empty data State
  if (!data || data.data.length === 0) {
    return <NoSearchResults />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
      {data?.data.map((book) => (
        <BookCard hideIcons key={book.uuid} book={book} />
      ))}
    </div>
  );
}
