"use client";
import Image from "next/image";
import { Share2, Copy, BookmarkPlus, MoreHorizontal } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  // Truncate content text to 5 lines (approximately 200 characters)
  const displayText =
    article["content-text"].length > 200
      ? article["content-text"].substring(0, 200) + "..."
      : article["content-text"];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center"
          }
          alt={article.title}
          fill
          className="object-cover"
          priority={index < 6} // Prioritize first 6 images
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category and Date */}
        <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
          <span className="bg-main/10 text-main px-2 py-1 rounded-full text-xs">
            {article.category}
          </span>
          <span>{formatDate(article.created_at)}</span>
        </div>

        {/* Title - 2 lines max */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight mt-5">
          {article.title}
        </h3>

        {/* Content Text - 5 lines max */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 mt-4 line-clamp-5">
          {displayText}
        </p>

        {/* Horizontal Line */}
        <hr className="border-gray-200 mb-4" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
              <Share2 size={12} className="text-white" />
            </div>

            <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
              <Copy size={12} className="text-white" />
            </div>

            <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
              <BookmarkPlus size={12} className="text-white" />
            </div>
          </div>

          {/* More Button - Always show as link */}
          <a
            href={`/about-court/news/${article.uuid}`}
            className="flex items-center gap-1 text-main hover:text-main/80 transition-colors"
          >
            <span className="text-sm">المزيد</span>
            <MoreHorizontal size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
