"use client";

import { useRouter } from "next/navigation";
import { FaBook, FaNewspaper, FaQuestionCircle, FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";
import SecondaryHeading from "@/components/common/seondary-heading";

export default function FavoritPage() {
  const router = useRouter();

  const favoriteTypes = [
    {
      id: "articles",
      title: "الأحكام القضائية",
      description: "الأحكام والقرارات القضائية المحفوظة",
      icon: FaGavel,
      route: "/favorite/articles",
    },
    {
      id: "books",
      title: "الكتب",
      description: "مكتبتك من الكتب المفضلة",
      icon: FaBook,
      route: "/favorite/books",
    },
    {
      id: "news",
      title: "الأخبار",
      description: "الأخبار والمقالات المحفوظة",
      icon: FaNewspaper,
      route: "/favorite/news",
    },
    {
      id: "questions",
      title: "الأسئلة",
      description: "الأسئلة والاستفسارات المهمة",
      icon: FaQuestionCircle,
      route: "/favorite/questions",
    },
  ];

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <SecondaryHeading title="المفضلة" breadcrumb />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 box-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-xl text-gray-600 dark:text-gray-400">
            اختر نوع المحتوى الذي تريد استعراضه
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {favoriteTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleNavigate(type.route)}
                className="group relative bg-white dark:bg-gray-800 h-fit rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-main/10 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Main Color Background Effect */}
                <div className="absolute inset-0 bg-main opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with main color */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-main mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-main/30 transition-all duration-300">
                    <Icon className="text-3xl text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-main transition-colors duration-300">
                    {type.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base">
                    {type.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center text-main font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="ml-2">عرض الكل</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Decorative Corner with main color */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-main/10 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Bottom decorative line - NOW ROUNDED */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-main scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-20 mb-40"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            جميع العناصر المحفوظة متاحة دائماً للوصول السريع
          </p>
        </motion.div>
      </div>
    </>
  );
}
