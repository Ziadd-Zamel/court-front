"use client";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  toggleArticleBookmark,
  isArticleBookmarked,
  toggleBookBookmark,
  isBookBookmarked,
  toggleNewsBookmark,
  isNewsBookmarked,
  toggleQuestionBookmark,
  isQuestionBookmarked,
} from "@/lib/utils/localstorage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BookmarkType = "article" | "book" | "news" | "question";

interface BookmarkButtonProps {
  item: Article | BookData | NewsArticle | Iquestion;
  type: BookmarkType;
  size?: number;
  className?: string;
}

export function BookmarkButton({
  item,
  type,
  size = 16,
  className = "p-1",
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Check if bookmarked
  useEffect(() => {
    const checkBookmark = () => {
      switch (type) {
        case "article":
          setIsSaved(isArticleBookmarked(item.uuid));
          break;
        case "book":
          setIsSaved(isBookBookmarked(item.uuid));
          break;
        case "news":
          setIsSaved(isNewsBookmarked(item.uuid));
          break;
        case "question":
          setIsSaved(isQuestionBookmarked(item.uuid));
          break;
      }
    };

    checkBookmark();

    // Listen for changes
    window.addEventListener("bookmarks-changed", checkBookmark);
    return () => window.removeEventListener("bookmarks-changed", checkBookmark);
  }, [item.uuid, type]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    let success = false;
    const wasBookmarked = isSaved;

    switch (type) {
      case "article":
        success = toggleArticleBookmark(item as Article);
        break;
      case "book":
        success = toggleBookBookmark(item as BookData);
        break;
      case "news":
        success = toggleNewsBookmark(item as NewsArticle);
        break;
      case "question":
        success = toggleQuestionBookmark(item as Iquestion);
        break;
    }

    if (success) {
      if (wasBookmarked) {
        toast.success("تم إزالة العلامة المرجعية");
      } else {
        toast.success("تمت الإضافة إلى العلامات المرجعية");
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full w-6 h-6 transition-all duration-200 ${
        isSaved
          ? "bg-main hover:bg-main/90 shadow-md"
          : "bg-gray-100 hover:bg-main/10 border border-gray-300 hover:border-main"
      }`}
      aria-label="Toggle bookmark"
      title={isSaved ? "إزالة من المفضلة" : "إضافة للمفضلة"}
    >
      {isSaved ? (
        <FaBookmark size={size} className="text-white text-sm" />
      ) : (
        <FaRegBookmark size={size} className="text-gray-600 text-sm" />
      )}
    </button>
  );
}
