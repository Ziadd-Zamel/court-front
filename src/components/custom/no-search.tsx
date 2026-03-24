// NoSearchQuery.jsx
"use client";
import { Search, BookOpen, Users, FileText } from "lucide-react";

export default function NoSearchQuery() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      {/* Search Icon */}
      <div className="bg-main/10 dark:bg-white/10 rounded-full p-6 mb-6">
        <Search className="w-16 h-16 text-main/70 dark:text-main" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">
        ابدأ البحث الآن
      </h2>

      {/* Message */}
      <p className="text-gray-600 dark:text-white/70 text-center mb-8 max-w-md text-lg">
        استخدم شريط البحث للعثور على كتاب، أو على نص في فهارس الكتب، أو لعرض كتب
        مؤلف معين
      </p>

      {/* Search Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl w-full">
        <div className="bg-white dark:bg-white/10 dark:border-white/10 border border-gray-200 rounded-lg p-6 text-center hover:shadow-md dark:hover:shadow-lg transition-shadow">
          <div className="bg-main/10 dark:bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="size-5 md:size-8 text-main/70 dark:text-main" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            البحث عن كتاب
          </h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            ابحث في مكتبة الكتب القانونية
          </p>
        </div>

        <div className="bg-white dark:bg-white/10 dark:border-white/10 border border-gray-200 rounded-lg p-6 text-center hover:shadow-md dark:hover:shadow-lg transition-shadow">
          <div className="bg-main/10 dark:bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="size-5 md:size-8 text-main/70 dark:text-main" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            البحث عن مؤلف
          </h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            ابحث عن المؤلفين والكتّاب
          </p>
        </div>

        <div className="bg-white dark:bg-white/10 dark:border-white/10 border border-gray-200 rounded-lg p-6 text-center hover:shadow-md dark:hover:shadow-lg transition-shadow">
          <div className="bg-main/10 dark:bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="size-5 md:size-8 text-main/70 dark:text-main" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            البحث في النصوص
          </h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            ابحث داخل محتوى النصوص
          </p>
        </div>
      </div>
    </div>
  );
}
