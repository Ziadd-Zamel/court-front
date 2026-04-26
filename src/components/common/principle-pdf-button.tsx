"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import PrinciplePdfUI from "@/app/(homepage)/principle/_components/principle-pdf-ui";

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
  const [printing, setPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `principle-${principle.serial_number ?? "export"}`,
    pageStyle: `
    @import url("https://use.typekit.net/yts8tvr.css");

    .font-adobe-arabic {
      font-family: "adobe-arabic", sans-serif !important;
    }

    @page { size: A4; margin: 7mm 18mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      * { visibility: visible !important; position: static !important; }
    }
  `,
    onBeforePrint: async () => {
      setPrinting(true);
      await document.fonts.ready;
    },
    onAfterPrint: () => setPrinting(false),
  });
  const buttonStyles =
    "bg-white dark:bg-white/15 dark:hover:bg-white/20 dark:border-main/50 backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow";
  const printingStyles =
    "bg-main hover:bg-main border-main shadow-md scale-105";
  const iconStyles =
    variant === "light" ? "text-main" : "text-gray-700 dark:!text-main";

  return (
    <>
      <div className="overflow-hidden h-0">
        <div ref={printRef}>
          <PrinciplePdfUI principle={principle} index={0} />
        </div>
      </div>

      <button
        type="button"
        disabled={printing}
        onClick={() => handlePrint()}
        className={`${className} flex cursor-pointer items-center justify-center rounded-full size-5 md:size-8 transition-all duration-200 border ${printing ? printingStyles : buttonStyles} disabled:cursor-not-allowed disabled:opacity-70`}
        title={printing ? "جاري الطباعة..." : "طباعة / تنزيل PDF"}
        aria-label="Print principle"
      >
        {printing ? (
          <FaCheck size={size} className="text-white" />
        ) : (
          <Download size={size} className={`transition-colors ${iconStyles}`} />
        )}
      </button>
    </>
  );
}
