"use client";

import { useEffect, useState } from "react";
import { getBookmarkedBooks } from "@/lib/utils/localstorage";
import BookCard from "@/components/common/book-card";
import { motion } from "framer-motion";
import SecondaryHeading from "@/components/common/seondary-heading";

export default function FavoriteBooksPage() {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    const loadBooks = () => {
      const bookmarked = getBookmarkedBooks();
      setBooks(bookmarked);
    };

    loadBooks();

    // Listen for changes
    window.addEventListener("bookmarks-changed", loadBooks);
    return () => window.removeEventListener("bookmarks-changed", loadBooks);
  }, []);

  return (
    <>
      <SecondaryHeading title="الكتب المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {books.length === 0 ? (
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                لا توجد كتب محفوظة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                قم بإضافة كتب إلى المفضلة لتظهر هنا
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
                  لديك {books.length} كتاب محفوظ
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {books.map((book, index) => (
                  <motion.div
                    key={book.uuid}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookCard type="book" book={book} />
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
