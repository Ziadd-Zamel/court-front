"use client";
import { SearchX } from "lucide-react";
interface Props {
  message?: string;
}
export default function NoSearchResults({
  message = "لم نتمكن من العثور على أي نتائج تطابق بحثك. جرب استخدام كلمات مختلفة أو تحقق من الإملاء.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      <div className="bg-main/10 rounded-full p-6 mb-6">
        <SearchX className="w-16 h-16 text-main/70" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">
        لم نجد نتائج مطابقة
      </h2>

      <p className="text-gray-600 dark:text-white/70 text-center max-w-md text-lg">
        {message}
      </p>
    </div>
  );
}
