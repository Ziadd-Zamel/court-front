"use client";
import Image from "next/image";
import Link from "next/link";
import { ShareButton } from "./share-button";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article }: NewsCardProps) {
  // Fallback Image
  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center";

  // Vraiables
  const hasVideo = !!article.main_video;

  // main
  const imageUrl =
    article.main_image && !article.main_image.includes("default-article")
      ? article.main_image
      : article.images?.[0] || fallbackImage;

  return (
    <div className="bg-white dark:bg-white/10 dark:border dark:border-white/10 overflow-hidden">
      {/* Media: Video or Image */}
      <div className="relative h-48 w-full">
        {hasVideo ? (
          <video
            src={article.main_video!}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category and Date */}
        <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
          <span className="bg-main/10 text-main p-1 rounded-full text-xs">
            {article.category}
          </span>
          <span className="text-black text-xs">{article.publish_date}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight mt-5 min-h-[80px]">
          {article.title}
        </h3>

        {/* Horizontal Line */}
        <hr className="border-gray-200 dark:border-white/10 mb-4" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <ShareButton item={article} type="news" />
          </div>

          <Link
            href={`/about-court/news/${article.uuid}`}
            className="flex items-center gap-1 text-main hover:text-main/80 transition-colors"
          >
            <span className="text-sm">المزيد</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
