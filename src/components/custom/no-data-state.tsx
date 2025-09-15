"use client";
import { FileX, RefreshCw, Home } from "lucide-react";
import { Button } from "../ui/button";

export default function NoDataState() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      {/* Icon */}
      <div className="bg-main/10 rounded-full p-6 mb-6">
        <FileX className="w-16 h-16 text-main/70" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        لا توجد بيانات متاحة
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center mb-8 max-w-md text-lg">
        لم يتم العثور على أي محتوى للعرض في الوقت الحالي. يرجى المحاولة مرة أخرى
        لاحقاً.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 bg-main hover:bg-main/90 text-white px-8 py-3 rounded-lg font-medium transition-colors min-w-[160px]"
        >
          <RefreshCw className="w-5 h-5" />
          تحديث الصفحة
        </Button>

        <Button
          onClick={handleGoHome}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors min-w-[160px]"
        >
          <Home className="w-5 h-5" />
          الصفحة الرئيسية
        </Button>
      </div>

      {/* Additional Help Text */}
      <p className="text-sm text-gray-500 mt-8 text-center max-w-sm">
        قد يكون المحتوى قيد التحديث أو الصيانة
      </p>
    </div>
  );
}
