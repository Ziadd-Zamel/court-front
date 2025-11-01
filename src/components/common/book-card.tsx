/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { BookmarkButton } from "./bookmark-button";
import { DownloadButton } from "./download-button";
import { PrintButton } from "./print-button";
import { ShareButton } from "./share-button";

type BookCardProps = {
  book: BookData;
  hideIcons?: boolean;
  image?: string;
  type?: string;
  issueNumber?: number;
};

export default function BookCard({
  book,
  hideIcons,
  image,
  type,
}: BookCardProps) {
  // Generate a consistent random number (1-73) for this book
  const issueNumber = useMemo(() => {
    return Math.floor(Math.random() * 73) + 1;
  }, [book.uuid]);

  // Generate a consistent random year (2001-2010) for rulings
  const randomYear = useMemo(() => {
    return Math.floor(Math.random() * 10) + 2001;
  }, [book.uuid]);

  // Generate a consistent random book image number (1-12)
  const randomBookImageNumber = useMemo(() => {
    return Math.floor(Math.random() * 12) + 1;
  }, [book.uuid]);

  const bookImage = useMemo(() => {
    if (image) return image;
    if (type === "book") return `/assets/book-${randomBookImageNumber}.jpg`;
    return book.book_image;
  }, [image, type, randomBookImageNumber, book.book_image]);

  return (
    <Link
      href={`/books/${book.uuid}`}
      className="cursor-pointer w-[120px] sm:w-[184px] relative"
    >
      <div className="relative h-40 sm:h-60 w-full mb-2">
        <Image
          src={bookImage}
          alt={book.title}
          fill
          className="object-cover "
        />
      </div>
      {!hideIcons && (
        <div className="flex justify-start gap-1">
          {/* Favorite */}
          <BookmarkButton item={book} type="book" />

          {/* Download PDF */}
          <DownloadButton url={book.pdf_url} />

          <PrintButton url={book.pdf_url} />
          {/* Share */}
          <ShareButton item={book} type="book" />
          {type === "magazine" && (
            <>
              <p className="absolute top-[132px] right-[32px] text-white text-sm">
                العدد
              </p>
              <p className="absolute top-[150px] right-[35px] text-white text-2xl">
                {book.book_number ? book.book_number : issueNumber}
              </p>
            </>
          )}
          {type === "ruling" && (
            <>
              <p className="absolute top-[170px] left-[42%] -translate-1/2 text-white">
                {book.category}
              </p>
              <p className="absolute bottom-10 left-[42%] -translate-1/2 text-white">
                {randomYear}
              </p>
            </>
          )}
        </div>
      )}
    </Link>
  );
}
