"use client";

import { Printer } from "lucide-react";
import { toast } from "sonner";

interface PrintButtonProps {
  url: string;
  title?: string;
  size?: number;
  className?: string;
}

export function PrintButton({
  url,
  title = "طباعة",
  size = 16,
  className = "p-1",
}: PrintButtonProps) {
  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!url) {
      toast.error("الملف غير متاح للطباعة في الوقت الحالي");
      return;
    }

    try {
      // Open PDF in new window and trigger print dialog
      const printWindow = window.open(url, "_blank");

      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
        toast.success("جاري فتح نافذة الطباعة...");
      } else {
        toast.error("تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة");
      }
    } catch (error) {
      console.error("Print error:", error);
      toast.error("الملف غير متاح للطباعة في الوقت الحالي");
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={`${className} group flex cursor-pointer items-center justify-center rounded-full w-6 h-6 transition-all duration-200 bg-gray-100 hover:bg-main border border-gray-300 hover:border-main`}
      title={title}
    >
      <Printer
        size={size}
        className="text-gray-600 group-hover:text-white transition-colors"
      />
    </button>
  );
}
