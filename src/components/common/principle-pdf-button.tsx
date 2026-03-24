/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";

interface PrinciplePdfButtonProps {
  principle: Principle;
  size?: number;
  className?: string;
  variant?: "default" | "light";
}

export function PrinciplePdfButton({
  principle,
  size = 16,
  className = "p-1",
  variant = "default",
}: PrinciplePdfButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const buttonStyles =
    variant === "light"
      ? "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles =
    variant === "light" ? "text-main" : "text-gray-700 dark:!text-main";

  const downloadingStyles =
    "bg-main hover:bg-main border-main shadow-md hover:shadow-lg scale-105";

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanContent =
      principle.content
        ?.replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim() || "";

    if (!cleanContent) {
      toast.error("لا يوجد محتوى متاح للتنزيل");
      return;
    }

    try {
      setDownloading(true);

      const [pdfMakeModule, pdfFontsModule] = await Promise.all([
        import("@digicole/pdfmake-rtl/build/pdfmake"),
        import("@digicole/pdfmake-rtl/build/vfs_fonts"),
      ]);

      const pdfMake =
        (pdfMakeModule as { default?: any }).default ?? pdfMakeModule;
      const pdfFonts =
        (pdfFontsModule as { default?: any }).default ?? pdfFontsModule;

      if (pdfFonts?.pdfMake?.vfs) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }

      const formatSessionDate = (value?: string | null) => {
        if (!value) return "------";
        return value
          .split(" - ")
          .map((date) => date.split("-").reverse().join("-"))
          .join(" - ");
      };

      const serialNumber = principle.serial_number || "------";
      const topMeta = `${principle.gregorian_year || "------"} ${principle.principle_type || "------"}`;
      const sessionDate = formatSessionDate(principle.session_date);
      const rulingType = principle.ruling_type || "------";
      const numberLine =
        `رقم المبدأ: ${principle.number || "------"} / ${principle.judicial_year || "------"} ${principle.sign || ""}`.trim();
      const brief = principle.brief?.trim() || "------";
      const title = "المبدأ القانوني";
      const magazineLine = `مجلة المحكمة العليا: السنة ${principle.gregorian_year ?? "33"} - العدد ${principle.issue_number ?? "1"} - ص ${principle.page_number ?? 231}`;
      const filename = `principle-${principle.number || "item"}-${principle.judicial_year || "year"}.pdf`;

      const docDefinition = {
        rtl: true,
        content: [
          {
            text: serialNumber,
            bold: true,
            fontSize: 34,
            color: "#e6c599",
            alignment: "center",
            margin: [0, 0, 0, 3],
          },
          {
            text: topMeta,
            fontSize: 12,
            color: "#666666",
            alignment: "center",
            margin: [0, 0, 0, 10],
          },
          {
            text: `تاريخ الجلسة: ${sessionDate}`,
            alignment: "center",
            color: "#666666",
            fontSize: 11,
            margin: [0, 0, 0, 4],
          },
          {
            text: rulingType,
            alignment: "center",
            color: "#444444",
            fontSize: 14,
            margin: [0, 0, 0, 10],
          },
          {
            text: numberLine,
            bold: true,
            fontSize: 15,
            color: "#111111",
            alignment: "center",
            margin: [0, 0, 0, 8],
          },
          {
            text: "الموجز",
            bold: true,
            fontSize: 14,
            color: "#e6c599",
            alignment: "center",
            margin: [0, 0, 0, 8],
          },
          {
            text: brief,
            fontSize: 12,
            color: "#333333",
            alignment: "right",
            lineHeight: 1.5,
            margin: [0, 0, 0, 16],
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 535,
                y2: 0,
                lineWidth: 1,
                lineColor: "#e6c599",
              },
            ],
            margin: [0, 0, 0, 12],
          },
          {
            text: title,
            bold: true,
            fontSize: 16,
            color: "#e6c599",
            alignment: "center",
            margin: [0, 0, 0, 10],
          },
          {
            text: cleanContent,
            fontSize: 12,
            color: "#444444",
            lineHeight: 1.5,
            alignment: "justify",
            margin: [0, 0, 0, 12],
          },
          {
            text: magazineLine,
            fontSize: 11,
            color: "#9b8b6f",
            alignment: "center",
            margin: [0, 6, 0, 0],
          },
        ],
        defaultStyle: {
          font: "Cairo",
          alignment: "right",
        },
        pageMargins: [30, 30, 30, 30],
      };

      pdfMake.createPdf(docDefinition).download(filename);
      toast.success("تم تنزيل ملف PDF");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("حدث خطأ أثناء إنشاء ملف PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={`${className} flex cursor-pointer items-center justify-center rounded-full size-5 md:size-8 transition-all duration-200 border ${
        downloading ? downloadingStyles : buttonStyles
      } disabled:cursor-not-allowed disabled:opacity-70`}
      title={downloading ? "جاري إنشاء الملف..." : "تنزيل PDF"}
      aria-label="Download principle PDF"
    >
      {downloading ? (
        <FaCheck size={size} className="text-white" />
      ) : (
        <Download size={size} className={`transition-colors ${iconStyles}`} />
      )}
    </button>
  );
}
