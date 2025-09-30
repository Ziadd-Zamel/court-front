/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { Bookmark, Download, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";

type BookCardProps = {
  book: BookData;
  hideIcons?: boolean;
  image?: string;
  type?: string;
};

export default function BookCard({
  book,
  hideIcons,
  image,
  type,
}: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate a consistent random number (1-73) for this book
  const issueNumber = useMemo(() => {
    return Math.floor(Math.random() * 73) + 1;
  }, [book.uuid]);

  // Generate a consistent random year (2001-2010) for rulings
  const randomYear = useMemo(() => {
    return Math.floor(Math.random() * 10) + 2001;
  }, [book.uuid]);

  const handleBookClick = () => {
    // Open PDF in new tab/window
    if (book.pdf_url) {
      window.open(book.pdf_url, "_blank");
    }
  };

  const handleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    // Add your favorite logic here
    console.log("Toggle favorite for:", book.uuid);
  };

  const handleDownload = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (book.pdf_url) {
      const link = document.createElement("a");
      link.href = book.pdf_url;
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    console.log("Download:", book.title);
  };

  const handleShare = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out this book: ${book.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${book.title} - ${window.location.href}`);
      alert("رابط الكتاب تم نسخه!");
    }
  };

  return (
    <Link
      href={`/books/${book.uuid}`}
      className="cursor-pointer w-[120px] sm:w-[184px] relative"
    >
      <div
        className="relative h-40 sm:h-60 w-full mb-2"
        onClick={handleBookClick}
      >
        <Image
          src={image ? image : book.book_image}
          alt={book.title}
          fill
          className="object-cover "
        />
      </div>
      {!hideIcons && (
        <div className="flex justify-start gap-1">
          {/* Favorite */}
          <button
            onClick={handleFavorite}
            className="p-1"
            title="إضافة إلى المفضلة"
          >
            <Bookmark
              size={16}
              className={`${
                isFavorite ? "text-main fill-main" : "text-gray-600"
              } hover:text-main`}
            />
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownload}
            className="p-1"
            title="تنزيل بي دي أف"
          >
            <Download size={16} className="text-gray-600 hover:text-blue-500" />
          </button>

          {/* Share */}
          <button onClick={handleShare} className="p-1" title="مشاركة">
            <Share2 size={16} className="text-gray-600 hover:text-green-500" />
          </button>
          {type === "magazine" && (
            <>
              <p className="absolute top-[132px] right-[32px] text-white text-sm">
                العدد
              </p>
              <p className="absolute top-[150px] right-[35px] text-white text-2xl">
                {issueNumber}
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
