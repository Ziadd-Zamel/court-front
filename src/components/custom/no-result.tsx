"use client";
import { SearchX } from "lucide-react";
interface Props {
  message?: string;
  box?: boolean;
}
export default function NoSearchResults({
  message = "لم نتمكن من العثور على أي نتائج تطابق بحثك. جرب استخدام كلمات مختلفة أو تحقق من الإملاء.",
  box = true,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      {/* Search X Icon */}
      <div className="bg-main/10 rounded-full p-6 mb-6">
        <SearchX className="w-16 h-16 text-main/70" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        لم نجد نتائج مطابقة
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center mb-8 max-w-md text-lg">
        {message}
      </p>
      {/* Suggestions */}
      {box && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md w-full">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">
            اقتراحات للبحث:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2 text-right">
            <li>• تأكد من صحة الإملاء</li>
            <li>• جرب كلمات أقل أو أكثر عمومية</li>
            <li>• استخدم مرادفات للكلمات</li>
            <li>• جرب البحث في قسم آخر</li>
          </ul>
        </div>
      )}

      {/* Additional Help Text */}
      {box && (
        <p className="text-sm text-gray-500 mt-8 text-center max-w-sm">
          يمكنك أيضاً تصفح الأقسام المختلفة للعثور على ما تبحث عنه
        </p>
      )}
    </div>
  );
}
