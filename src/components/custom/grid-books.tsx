"use client";
import BookCard from "../common/book-card";

export default function GridBooks({ data }: { data: BookData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 p-6">
      {data.map((book) => (
        <BookCard hideIcons key={book.uuid} book={book} />
      ))}
    </div>
  );
}
