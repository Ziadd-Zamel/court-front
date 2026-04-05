"use client";

import { useEffect, useState } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";
import { getBookmarkedQuestions } from "@/lib/utils/localstorage";
import { Accordion } from "@/components/ui/accordion";

import { motion } from "framer-motion";
import QuestionCard from "@/components/common/question-card";

export default function FavoriteQuestionsPage() {
  const [questions, setQuestions] = useState<Iquestion[]>([]);

  useEffect(() => {
    const loadQuestions = () => {
      const bookmarked = getBookmarkedQuestions();
      setQuestions(bookmarked);
    };

    loadQuestions();

    // Listen for changes
    window.addEventListener("bookmarks-changed", loadQuestions);
    return () => window.removeEventListener("bookmarks-changed", loadQuestions);
  }, []);

  return (
    <>
      <SecondaryHeading title="المعلومات المهمة المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {questions.length === 0 ? (
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                لم تضف أي موضوع لهذا التصنيف بعد{" "}
              </h3>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {"المعلومات المهمة المفضلة"} {questions.length} من
                </p>
              </motion.div>

              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                dir="rtl"
              >
                {questions.map((question) => (
                  <QuestionCard key={question.uuid} item={question} />
                ))}
              </Accordion>
            </>
          )}
        </div>
      </div>
    </>
  );
}
