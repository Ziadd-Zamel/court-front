"use client";

import { useEffect, useState } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";
import { getBookmarkedQuestions } from "@/lib/utils/localstorage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";
import { motion } from "framer-motion";

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
      <SecondaryHeading title="الأسئلة المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                لا توجد أسئلة محفوظة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                قم بإضافة أسئلة إلى المفضلة لتظهر هنا
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
                  لديك {questions.length} سؤال محفوظ
                </p>
              </motion.div>

              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                dir="rtl"
              >
                {questions.map((question, index) => (
                  <motion.div
                    key={question.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${question.uuid}`}>
                      <AccordionTrigger className="py-5 pl-4 text-sm font-medium sm:text-xl text-right hover:no-underline hover:text-main transition-all duration-300">
                        <p style={{ direction: "rtl" }}>{question.title}</p>
                      </AccordionTrigger>
                      <AccordionContent className="text-lg text-gray-500">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: cleanHtmlStyles(question.answer),
                          }}
                        ></div>
                      </AccordionContent>
                      <div className="flex justify-end items-center gap-3 mb-5">
                        <BookmarkButton item={question} type="question" />
                        <ShareButton item={question} type="question" />
                      </div>
                    </AccordionItem>
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
