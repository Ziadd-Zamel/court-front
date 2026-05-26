"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShareButton } from "./share-button";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const borderTransition = (delay = 0) => ({
  duration: 0.7,
  ease: "easeOut" as const,
  delay,
});

export default function NewsCard({ article }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center";

  const hasVideo = !!article.main_video;

  const imageUrl =
    article.main_image && !article.main_image.includes("default-article")
      ? article.main_image
      : article.images?.[0] || fallbackImage;

  return (
    <motion.div
      className="relative h-full w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(214, 158, 46, 0.25)",
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative h-full w-full bg-white dark:border dark:border-white/10 dark:bg-white/10">
        <div className="relative h-48 w-full overflow-hidden">
          {hasVideo ? (
            <video
              src={article.main_video!}
              className="h-full w-full object-cover"
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

        <div className="relative z-10 p-4">
          <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
            <span className="rounded-full bg-main/10 p-1 text-xs text-main">
              {article.category}
            </span>
            <span className="text-xs text-black dark:text-white/70">
              {article.publish_date}
            </span>
          </div>

          <h3 className="mb-3 mt-5 line-clamp-2 min-h-[80px] text-sm font-medium leading-tight text-gray-800 dark:text-white">
            {article.title}
          </h3>

          <hr className="mb-4 border-gray-200 dark:border-white/10" />

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <ShareButton item={article} type="news" />
            </div>

            <Link
              href={`/about-court/news/${article.uuid}`}
              className="flex items-center gap-1 text-main transition-colors hover:text-main/80"
            >
              <span className="text-sm">المزيد</span>
            </Link>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            className="absolute left-0 top-0 h-[2px] w-full origin-left bg-main"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={borderTransition(0)}
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-main"
            initial={false}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={borderTransition(0.1)}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] w-full origin-right bg-main"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={borderTransition(0.2)}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-full w-[2px] origin-bottom bg-main"
            initial={false}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={borderTransition(0.3)}
          />
        </div>
      </div>
    </motion.div>
  );
}
