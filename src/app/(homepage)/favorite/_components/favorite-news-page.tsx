"use client";

import { useEffect, useState } from "react";
import { getBookmarkedNews } from "@/lib/utils/localstorage";
import NewsCard from "@/components/common/news-card";
import { motion } from "framer-motion";
import SecondaryHeading from "@/components/common/seondary-heading";

export default function FavoriteNewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const loadNews = () => {
      const bookmarked = getBookmarkedNews();
      setNews(bookmarked);
    };

    loadNews();

    // Listen for changes
    window.addEventListener("bookmarks-changed", loadNews);
    return () => window.removeEventListener("bookmarks-changed", loadNews);
  }, []);

  return (
    <>
      <SecondaryHeading title="الأخبار المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {news.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-main/10 mb-6">
                <svg
                  className="w-12 h-12 text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                لا توجد أخبار محفوظة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                قم بإضافة أخبار إلى المفضلة لتظهر هنا
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  لديك {news.length} خبر محفوظ
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                  <motion.div
                    key={article.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NewsCard article={article} index={index} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
