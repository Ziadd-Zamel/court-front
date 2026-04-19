"use client";

import { useEffect, useState } from "react";
import { getBookmarkedArticles } from "@/lib/utils/localstorage";
import SecondaryHeading from "@/components/common/seondary-heading";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import ArticleCard from "@/components/common/article-card";

const isConstitutionalArticle = (article: Article) => {
  const haystack = `${article.sub_category ?? ""} ${article.main_category ?? ""} ${article.principle_type ?? ""}`;
  return haystack.includes("الدستوري");
};

export default function FavoriteConstitutionalPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticles = () => {
      const bookmarked = getBookmarkedArticles();
      setArticles(bookmarked.filter(isConstitutionalArticle));
    };

    loadArticles();
    window.addEventListener("bookmarks-changed", loadArticles);
    return () => window.removeEventListener("bookmarks-changed", loadArticles);
  }, []);

  return (
    <>
      <SecondaryHeading title="القضاء الدستوري المفضل" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-40 box-container">
        <div className="max-w-5xl mx-auto">
          {articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                لم تضف أي موضوع لهذا التصنيف بعد{" "}
              </h3>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20"
              >
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {"عدد المفضلات: "} {articles.length}
                </p>
              </motion.div>
              <Accordion type="single" collapsible className="w-full" dir="rtl">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <ArticleCard
                      article={article}
                      index={index}
                      from="/favorite/constitutional"
                    />
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
