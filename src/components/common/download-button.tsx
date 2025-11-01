"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

interface DownloadButtonProps {
  url: string;
  filename?: string;
  title?: string;
  size?: number;
  className?: string;
}

export function DownloadButton({
  url,
  filename,
  title = "تنزيل",
  size = 16,
  className = "p-1",
}: DownloadButtonProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!url) {
      toast.error("الملف غير متاح للتنزيل في الوقت الحالي");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = url;

      if (filename) {
        link.download = filename;
      } else {
        link.download = "";
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("جاري تنزيل الملف...");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("الملف غير متاح للتنزيل في الوقت الحالي");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`${className} group flex cursor-pointer items-center justify-center rounded-full w-6 h-6 transition-all duration-200 bg-gray-100 hover:bg-main border border-gray-300 hover:border-main`}
      title={title}
    >
      <Download
        size={size}
        className="text-gray-600 group-hover:text-white transition-colors"
      />
    </button>
  );
}
