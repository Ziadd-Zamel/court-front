import { AlertCircle, RefreshCw } from "lucide-react";

export default function QuestionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="size-5 md:size-8 text-red-600" />
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-zain">
          خطأ في تحميل الأسئلة
        </h3>
        <p className="text-gray-600 font-zain max-w-md">
          عذراً، حدث خطأ أثناء تحميل الأسئلة. يرجى المحاولة مرة أخرى أو تحديث
          الصفحة.
        </p>
      </div>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-zain"
      >
        <RefreshCw className="w-4 h-4" />
        إعادة المحاولة
      </button>

      {/* Additional help text */}
      <p className="text-sm text-gray-500 mt-4 font-zain">
        إذا استمر الخطأ، يرجى الاتصال بالدعم الفني
      </p>
    </div>
  );
}
