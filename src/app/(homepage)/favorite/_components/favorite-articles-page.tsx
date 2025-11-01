"use client";

import { useEffect, useState } from "react";
import { getBookmarkedArticles } from "@/lib/utils/localstorage";
import { Accordion } from "@/components/ui/accordion";
import ArticleCard from "@/components/common/article-card";
import { motion } from "framer-motion";
import SecondaryHeading from "@/components/common/seondary-heading";

export default function FavoriteArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticles = () => {
      const bookmarked = getBookmarkedArticles();
      setArticles(bookmarked);
    };

    loadArticles();

    // Listen for changes
    window.addEventListener("bookmarks-changed", loadArticles);
    return () => window.removeEventListener("bookmarks-changed", loadArticles);
  }, []);

  return (
    <>
      <SecondaryHeading title="الأحكام القضائية المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                لا توجد أحكام محفوظة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                قم بإضافة أحكام إلى المفضلة لتظهر هنا
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
                  لديك {articles.length} حكم محفوظ
                </p>
              </motion.div>

              <Accordion type="single" collapsible className="w-full" dir="rtl">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ArticleCard article={article} index={index} />
                  </motion.div>
                ))}
              </Accordion>
            </>
          )}
        </div>
      </div>
    </>
  );
}
