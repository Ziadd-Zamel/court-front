"use client";

import { motion } from "framer-motion";
import SecondaryHeading from "@/components/common/seondary-heading";

export default function FavoriteLawPage() {
  return (
    <>
      <SecondaryHeading title=" القوانين المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 box-container ">
        <div className="max-w-5xl mx-auto">
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
              لا توجد قوانين محفوظة
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              قم بإضافة قوانين إلى المفضلة لتظهر هنا
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
