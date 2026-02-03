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
        </div>
      )}
      {type === "magazine" && (
        <>
          <p className="absolute top-[130px] right-3 text-main text-xs">
            السنة
          </p>
          <p className="absolute top-[150px] right-3 text-white text-base">
            {book.published_year || 0}
          </p>
          <p className="absolute bottom-20 right-3 text-main text-xs">العدد</p>
          <p className="absolute bottom-12 right-3 text-white text-base">
            {book.book_number || 0}
          </p>
        </>
      )}
      {type === "ruling" && (
        <>
          <p className="absolute top-[160px] left-[43%] -translate-1/2 text-white text-[10px]">
            {book.category}
          </p>
          <div className="flex flex-col items-center gap-2 absolute bottom-16 left-[43%] -translate-1/2">
            <p className=" text-main text-[10px]">السنة</p>
            <p className=" text-white text-sm">{book.published_year || 0}</p>
          </div>
          <div className="flex flex-col items-center gap-2 absolute bottom-5 left-[43%] -translate-1/2">
            <p className=" text-main text-[10px]">الجزء</p>
            <p className=" text-white text-sm">
              {book.release_type_value || 0}
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
