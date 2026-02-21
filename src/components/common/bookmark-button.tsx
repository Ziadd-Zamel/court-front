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
  toggleResearchBookmark,
  isResearchBookmarked,
  toggleLawBookmark,
  isLawBookmarked,
  togglePrincipleBookmark,
  isPrincipleBookmarked,
} from "@/lib/utils/localstorage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BookmarkType =
  | "article"
  | "book"
  | "news"
  | "question"
  | "research"
  | "law"
  | "principle";

interface BookmarkButtonProps {
  item: Article | BookData | NewsArticle | Iquestion | Law | Principle;
  type: BookmarkType;
  size?: number;
  className?: string;
  variant?: "default" | "light";
}

export function BookmarkButton({
  item,
  type,
  size = 16,
  className = "p-1",
  variant = "default",
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

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
        case "research":
          setIsSaved(isResearchBookmarked(item.uuid));
          break;
        case "law":
          setIsSaved(isLawBookmarked(item.uuid));
          break;
        case "principle":
          setIsSaved(isPrincipleBookmarked(item.uuid));
          break;
      }
    };

    checkBookmark();
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
      case "research":
        success = toggleResearchBookmark(item as Article);
        break;
      case "law":
        success = toggleLawBookmark(item as Law);
        break;
      case "principle":
        success = togglePrincipleBookmark(item as Principle);
        break;
    }

    if (success) {
      toast.success(
        wasBookmarked
          ? "تم إزالة العلامة المرجعية"
          : "تمت الإضافة إلى العلامات المرجعية",
      );
    }
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  return (
    <button
      onClick={handleToggle}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full size-5 md:size-8 transition-all duration-200 ${buttonStyles}`}
      aria-label="Toggle bookmark"
      title={isSaved ? "إزالة من المفضلة" : "إضافة للمفضلة"}
    >
      {isSaved ? (
        <FaBookmark size={size} className="text-main" />
      ) : (
        <FaRegBookmark size={size} className="text-gray-700" />
      )}
    </button>
  );
}
