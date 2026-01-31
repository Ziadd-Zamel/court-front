"use client";

import { Printer } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface PrintButtonProps {
  url: string;
  size?: number;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  variant?: "default" | "light";
}

export function PrintButton({
  url,
  size = 16,
  className = "p-1",
  successMessage = "جاري فتح نافذة الطباعة...",
  errorMessage = "الملف غير متاح للطباعة في الوقت الحالي",
  variant = "default",
}: PrintButtonProps) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!url) {
      toast.error("الملف غير متاح للطباعة في الوقت الحالي");
      return;
    }

    try {
      setPrinting(true);

      // Open PDF in new window and trigger print dialog
      const printWindow = window.open(url, "_blank");

      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
        toast.success(successMessage);
      } else {
        toast.error("تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة");
        setPrinting(false);
        return;
      }

      // Reset icon after 2 seconds
      setTimeout(() => {
        setPrinting(false);
      }, 2000);
    } catch (error) {
      console.error("Print error:", error);
      toast.error(errorMessage);
      setPrinting(false);
    }
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white backdrop-blur-sm hover:bg-white/80  border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white backdrop-blur-sm hover:bg-white/80  border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles = variant === "light" ? "text-main" : "text-gray-700";

  const printingStyles =
    "bg-main hover:bg-main border-main shadow-md hover:shadow-lg scale-105";

  return (
    <button
      onClick={handlePrint}
      disabled={printing}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full w-8 h-8 transition-all duration-200 border ${
        printing ? printingStyles : buttonStyles
      } disabled:cursor-not-allowed disabled:opacity-70`}
      aria-label="Print PDF"
      title={printing ? "جاري الطباعة..." : "طباعة PDF"}
    >
      {printing ? (
        <FaCheck size={size} className="text-white" />
      ) : (
        <Printer size={size} className={`transition-colors ${iconStyles}`} />
      )}
    </button>
  );
}
