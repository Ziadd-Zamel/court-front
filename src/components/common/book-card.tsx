"use client";

import Image from "next/image";
import { Bookmark, Download, Share2 } from "lucide-react";
import { useState } from "react";

type BookCardProps = {
  book: BookData;
  hideIcons?: boolean;
};

export default function BookCard({ book, hideIcons }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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
    <div className="cursor-pointer w-[120px] sm:w-[160px]">
      {/* Book Image */}
      <div
        className="relative h-40 sm:h-52 w-full mb-2"
        onClick={handleBookClick}
      >
        <Image
          src={book.book_image}
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
        </div>
      )}
    </div>
  );
}
