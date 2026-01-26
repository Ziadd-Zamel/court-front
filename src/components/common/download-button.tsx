"use client";

import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { FileText } from "lucide-react";

interface DownloadButtonProps {
  url: string;
  filename?: string;
  size?: number;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  variant?: "default" | "light";
}

export function DownloadButton({
  url,
  filename = "document.pdf",
  size = 16,
  className = "p-1",
  successMessage = "جاري التحميل...",
  errorMessage = "فشل التحميل",
  variant = "default",
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!url) {
      toast.error("رابط الملف غير متوفر");
      return;
    }

    try {
      setDownloading(true);
      toast.success(successMessage);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset icon after 2 seconds
      setTimeout(() => {
        setDownloading(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to download:", error);
      toast.error(errorMessage);
      setDownloading(false);
    }
  };

  const buttonStyles =
    variant === "light"
      ? "bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles = variant === "light" ? "text-main" : "text-gray-700";

  const downloadingStyles =
    "bg-main hover:bg-main border-main shadow-md hover:shadow-lg scale-105";

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full w-8 h-8 transition-all duration-200 border ${
        downloading ? downloadingStyles : buttonStyles
      } disabled:cursor-not-allowed disabled:opacity-70`}
      aria-label="Download PDF"
      title={downloading ? "جاري التحميل..." : "تحميل PDF"}
    >
      {downloading ? (
        <FaCheck size={size} className="text-white" />
      ) : (
        <FileText size={size} className={`transition-colors ${iconStyles}`} />
      )}
    </button>
  );
}
