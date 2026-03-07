/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { BookmarkButton } from "./bookmark-button";
import { PrintButton } from "./print-button";
import { ShareButton } from "./share-button";

type BookCardProps = {
  book: BookData;
  hideIcons?: boolean;
  image?: string;
  type?: string;
  issueNumber?: number;
  openInNewTab?: boolean;
};

export default function BookCard({
  book,
  hideIcons,
  image,
  type,
  openInNewTab,
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

  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <Link
      href={`/books/${book.uuid}`}
      className="cursor-pointer w-[140px] sm:w-[160px] relative block "
      {...linkProps}
    >
      <div className="relative h-45 sm:h-50 w-full mb-2 transition-shadow duration-300 hover:shadow-[0_0_6px_4px_rgba(0,0,0,0.85)]  hover:border-black border-transparent border-1">
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
          <p className="absolute top-[145px] right-3 text-white text-base">
            {book.judicial_year || 0}
          </p>
          <p className="absolute bottom-17 right-3 text-main text-xs">العدد</p>
          <p className="absolute bottom-12 right-3 text-white text-base">
            {book.number || 0}
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
            <p className=" text-white text-xs">{book.published_year || 0}</p>
          </div>
          <div className="flex flex-col items-center gap-2 absolute bottom-5 left-[43%] -translate-1/2">
            <p className=" text-main text-[10px]">الجزء</p>
            <p className=" text-white text-xs">
              {book.release_type_value || 0}
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
