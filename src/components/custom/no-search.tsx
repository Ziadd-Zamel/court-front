// NoSearchQuery.jsx
"use client";
import { Search } from "lucide-react";

export default function NoSearchQuery() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      <div className="bg-main/10 dark:bg-white/10 rounded-full p-6 mb-6">
        <Search className="w-16 h-16 text-main/70 dark:text-main" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">
        ابدأ البحث
      </h2>

      <p className="text-gray-600 dark:text-white/70 text-center max-w-md text-lg">
        استخدم شريط البحث للعثور على كتاب، أو على نص في فهارس الكتب، أو لعرض كتب
        مؤلف معين
      </p>
    </div>
  );
}
