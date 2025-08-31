/* eslint-disable react/no-unescaped-entities */
import { FileQuestion, Search } from "lucide-react";

interface QuestionEmptyStateProps {
  type?: "no-data" | "no-search-results";
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function QuestionEmptyState({
  type = "no-data",
  searchQuery,
  onClearSearch,
}: QuestionEmptyStateProps) {
  if (type === "no-search-results") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        {/* Search Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* No Results Message */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-zain">
            لا توجد نتائج للبحث
          </h3>
          <p className="text-gray-600 font-zain max-w-md">
            لم نتمكن من العثور على أي أسئلة تتطابق مع "{searchQuery}"
          </p>
        </div>

        {/* Suggestions */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 font-zain mb-4">جرب ما يلي:</p>
          <ul className="text-sm text-gray-600 space-y-1 font-zain">
            <li>• تحقق من الأخطاء الإملائية</li>
            <li>• استخدم كلمات مفتاحية أخرى</li>
            <li>• استخدم مصطلحات أقل تحديداً</li>
          </ul>
        </div>

        {/* Clear Search Button */}
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="px-6 py-3 bg-main text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition-all duration-200 font-zain"
          >
            مسح البحث وعرض جميع الأسئلة
          </button>
        )}
      </div>
    );
  }

  // Default empty state (no-data)
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Empty Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Empty Message */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-zain">
          لا توجد أسئلة متاحة
        </h3>
        <p className="text-gray-600 font-zain max-w-md">
          لم يتم إضافة أي أسئلة في هذا القسم بعد. يرجى المراجعة لاحقاً.
        </p>
      </div>

      {/* Optional action button */}
      <div className="text-center">
        <p className="text-sm text-gray-500 font-zain">
          تحقق من الأقسام الأخرى أو عد لاحقاً للحصول على محتوى جديد
        </p>
      </div>
    </div>
  );
}
