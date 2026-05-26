"use client";

import { useRef, useState } from "react";
import { Printer } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import AppealPrintPdfUI from "./appeal-print-pdf-ui";

type Props = {
  caseData: CaseDataType[] | undefined;
  size?: number;
  className?: string;
  variant?: "default" | "light";
};

export default function AppealPrintButton({
  caseData,
  size = 16,
  className = "p-1",
  variant = "default",
}: Props) {
  const [printing, setPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const canPrint = Boolean(caseData?.length);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `appeal-inquiry-${caseData?.[0]?.rippId ?? "export"}`,
    pageStyle: `
    @import url("https://use.typekit.net/yts8tvr.css");
    @page { size: A4; margin: 7mm 18mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      * { visibility: visible !important; }
      table { border-collapse: collapse !important; width: 100% !important; }
      td, th { border: 1px solid #d1d5db !important; }
    }
  `,
    onBeforePrint: async () => {
      setPrinting(true);
      await document.fonts.ready;
    },
    onAfterPrint: () => setPrinting(false),
  });

  const buttonStyles =
    variant === "light"
      ? "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow"
      : "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 dark:hover:border-main/60 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";

  const iconStyles =
    variant === "light" ? "text-main" : "text-gray-700 dark:!text-main";

  const printingStyles =
    "bg-main hover:bg-main border-main shadow-md hover:shadow-lg scale-105";

  return (
    <div className="inline-flex shrink-0 items-center">
      {canPrint ? (
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <div ref={printRef}>
            <AppealPrintPdfUI caseData={caseData!} />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canPrint || printing}
        onClick={() => handlePrint()}
        className={`${className} flex shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 size-5 md:size-8 ${
          printing ? printingStyles : buttonStyles
        } disabled:cursor-not-allowed disabled:opacity-70`}
        title={printing ? "جاري الطباعة..." : "طباعة / تنزيل PDF"}
        aria-label="Print appeal inquiry"
      >
        {printing ? (
          <FaCheck size={size} className="text-white" />
        ) : (
          <Printer
            size={size}
            strokeWidth={2}
            className={`shrink-0 transition-colors ${iconStyles}`}
          />
        )}
      </button>
    </div>
  );
}
