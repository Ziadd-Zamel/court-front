/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";

/** PNG/JPEG for pdfmake. Divider asset = full line + scales emblem (see `divider-emblem.png`). */
const PRINCIPLE_PDF_HEADER_SRC = {
  qr: "/assets/principle-print/qr-placeholder.svg",
  courtLogo: "/assets/principle-print/court-logo-placeholder.svg",
  basmala: "/assets/principle-print/basmala-placeholder.svg",
  dividerEmblem: "/assets/principle-print/divider-emblem.png",
} as const;

const GOLD = "#a38a3d";
const GOLD_LIGHT = "#e6c599";

async function fetchImageAsDataUrl(path: string): Promise<string | null> {
  try {
    const url =
      path.startsWith("http") ? path : `${window.location.origin}${path}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(blob);
    });
    // pdfmake embeds PNG/JPEG; SVG often fails — skip so PDF still generates
    if (!/^data:image\/(png|jpe?g|gif|webp)/i.test(dataUrl)) {
      return null;
    }
    return dataUrl;
  } catch {
    return null;
  }
}

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

      const [pdfMakeModule, pdfFontsModule, qrData, logoData, basmalaData, emblemData] =
        await Promise.all([
          import("@digicole/pdfmake-rtl/build/pdfmake"),
          import("@digicole/pdfmake-rtl/build/vfs_fonts"),
          fetchImageAsDataUrl(PRINCIPLE_PDF_HEADER_SRC.qr),
          fetchImageAsDataUrl(PRINCIPLE_PDF_HEADER_SRC.courtLogo),
          fetchImageAsDataUrl(PRINCIPLE_PDF_HEADER_SRC.basmala),
          fetchImageAsDataUrl(PRINCIPLE_PDF_HEADER_SRC.dividerEmblem),
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

      const normalize = (value: unknown) => {
        if (value === null || value === undefined) return "";
        const text = String(value).trim();
        if (!text || text.toLowerCase() === "null") return "";
        return text;
      };

      const judicialYear = normalize(principle.judicial_year);
      const number = normalize(principle.number);
      const sign = normalize(principle.sign);
      const headingMeta =
        `${[judicialYear, number].filter(Boolean).join("/")}${sign}`.trim();
      const principleType = normalize(principle.principle_type);
      const printRefLine = [headingMeta, principleType]
        .filter(Boolean)
        .join(" ");
      const rulingType = normalize(principle.ruling_type);
      const appealHeadline =
        rulingType && headingMeta
          ? `${rulingType}: ${headingMeta}`
          : headingMeta || rulingType || "";
      const sessionDate = formatSessionDate(principle.session_date);
      const brief = principle.brief?.trim() || "------";
      const title = "المبدأ القانوني";
      const mainTitle = "المبادئ القانونية";
      const magazineLine = `مجلة المحكمة العليا: السنة ${principle.gregorian_year ?? "33"} - العدد ${principle.issue_number ?? "1"} - ص ${principle.page_number ?? 231}`;
      const filename = `principle-${principle.number || "item"}-${principle.judicial_year || "year"}.pdf`;

      const noBorder = [false, false, false, false] as const;
      const cell = (content: any) => ({
        ...content,
        border: noBorder,
      });

      // RTL table: first column is visual right → logo; last column visual left → QR
      const headerRow: any[] = [
        cell(
          logoData
            ? { image: logoData, width: 110, alignment: "center" }
            : { text: "", margin: [0, 20, 0, 0] },
        ),
        cell({ text: "" }),
        cell(
          qrData
            ? { image: qrData, width: 64, height: 64, alignment: "center" }
            : { text: "", margin: [0, 20, 0, 0] },
        ),
      ];

      const printHeaderStack: any[] = [
        {
          table: {
            widths: [140, "*", 90],
            body: [headerRow],
          },
          layout: "noBorders",
          margin: [0, 0, 0, 16],
        },
      ];

      if (basmalaData) {
        printHeaderStack.push({
          image: basmalaData,
          width: 280,
          alignment: "center",
          margin: [0, 0, 0, 12],
        });
      } else {
        printHeaderStack.push({
          text: "بسم الله الرحمن الرحيم",
          alignment: "center",
          fontSize: 13,
          color: "#111111",
          margin: [0, 0, 0, 12],
        });
      }

      printHeaderStack.push(
        {
          text: mainTitle,
          bold: true,
          fontSize: 20,
          color: "#111111",
          alignment: "center",
          margin: [0, 0, 0, 8],
        },
        ...(printRefLine
          ? [
              {
                text: printRefLine,
                bold: true,
                fontSize: 15,
                color: GOLD,
                alignment: "center",
                margin: [0, 0, 0, 12],
              },
            ]
          : []),
      );

      // Full-width heading rule (lines + scales wreath) — single PNG from print template
      if (emblemData) {
        printHeaderStack.push({
          image: emblemData,
          width: 500,
          alignment: "center",
          margin: [0, 0, 0, 14],
        });
      } else {
        printHeaderStack.push({
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 535,
              y2: 0,
              lineWidth: 0.75,
              lineColor: "#d4c4a8",
            },
          ],
          margin: [0, 6, 0, 14],
        });
      }

      if (appealHeadline) {
        printHeaderStack.push({
          text: appealHeadline,
          fontSize: 11,
          color: "#333333",
          alignment: "center",
          margin: [0, 0, 0, 6],
        });
      }

      printHeaderStack.push({
        text: [
          { text: "جلسة: ", color: "#333333" },
          { text: sessionDate, bold: true, color: GOLD },
        ],
        alignment: "center",
        fontSize: 11,
        margin: [0, 0, 0, 10],
      });

      printHeaderStack.push({
        text: brief,
        fontSize: 10,
        color: "#444444",
        alignment: "justify",
        lineHeight: 1.45,
        margin: [0, 0, 0, 18],
      });

      const docDefinition = {
        rtl: true,
        content: [
          ...printHeaderStack,
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 535,
                y2: 0,
                lineWidth: 1,
                lineColor: GOLD_LIGHT,
              },
            ],
            margin: [0, 0, 0, 12],
          },
          {
            text: title,
            bold: true,
            fontSize: 15,
            color: GOLD_LIGHT,
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
