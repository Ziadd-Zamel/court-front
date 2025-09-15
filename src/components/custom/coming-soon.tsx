"use client";
import { Clock, Home } from "lucide-react";
import { Button } from "../ui/button";

export default function ComingSoon() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
      {/* Clock Icon */}
      <div className="bg-main/10 rounded-full p-6 mb-6 relative">
        <Clock className="w-16 h-16 text-main/70" />
        {/* Animated pulse effect */}
        <div className="absolute inset-0 bg-main/20 rounded-full animate-pulse"></div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        قريباً جداً!
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center mb-8 max-w-md text-lg">
        نحن نعمل بجد لإعداد محتوى رائع لك. هذا القسم سيكون متاحاً قريباً بإذن
        الله.
      </p>

      {/* Home button */}
      <Button
        onClick={handleGoHome}
        className="flex items-center gap-2 bg-main hover:bg-main/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
      >
        <Home className="w-5 h-5" />
        العودة للصفحة الرئيسية
      </Button>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2">
          متوقع الإطلاق خلال الأسابيع القادمة
        </p>
        <p className="text-xs text-gray-400">شكراً لصبركم وثقتكم بنا</p>
      </div>
    </div>
  );
}
