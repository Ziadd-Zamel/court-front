"use client";

import { useRef, useState, type CSSProperties } from "react";
import { FaCheck } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import PrinciplePdfUI from "@/app/(homepage)/principle/_components/principle-pdf-ui";
import { BsFileEarmarkPdf } from "react-icons/bs";

interface PrinciplePdfButtonProps {
  principle: Principle;
  size?: number;
  className?: string;
  variant?: "default" | "light";
}

export function PrinciplePdfButton({
  principle,
  size = 21,
  className = "p-1",
  variant = "default",
}: PrinciplePdfButtonProps) {
  const [printing, setPrinting] = useState(false);
  const [printPageHref, setPrintPageHref] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `principle-${principle.serial_number ?? "export"}`,
    pageStyle: `
    @page { size: A4; margin: 0 !important; }
    @media print {
      html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      [data-principle-ribbon] {
        position: fixed !important;
        left: 0 !important;
        right: auto !important;
        top: var(--ribbon-top) !important;
        margin: 0 !important;
        transform: translateX(0) !important;
      }
      [data-principle-ribbon] span {
        writing-mode: vertical-rl !important;
        text-orientation: mixed !important;
        direction: rtl !important;
        transform: none !important;
      }
      [data-principle-page-link] {
        font-size: 8pt !important;
        line-height: 1.25 !important;
      }
    }
  `,
    onBeforePrint: async () => {
      setPrinting(true);
      const href = window.location.href;
      setPrintPageHref(href);

      const raw = principle.website_url;
      const fromApi =
        typeof raw === "string"
          ? raw.trim()
          : raw != null
            ? String(raw).trim()
            : "";
      const apiHref =
        fromApi && fromApi.toLowerCase() !== "null" ? fromApi : "";
      const footerHref = apiHref || href;

      const link = printRef.current?.querySelector(
        "[data-principle-page-link]",
      );
      if (link instanceof HTMLAnchorElement) {
        link.href = footerHref;
        try {
          link.textContent = decodeURI(footerHref);
        } catch {
          link.textContent = footerHref;
        }
        link.hidden = false;
      }

      await document.fonts.ready;
      const host = printRef.current?.querySelector<HTMLElement>(
        "[data-print-ready]",
      );
      if (!host) return;
      const deadline = Date.now() + 4000;
      while (
        host.dataset.printReady === "loading" &&
        Date.now() < deadline
      ) {
        await new Promise((r) => setTimeout(r, 50));
      }
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
    <span className="relative inline-flex shrink-0 items-center">
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <div
          ref={printRef}
          style={
            {
              width: "210mm",
              maxWidth: "210mm",
              margin: 0,
              padding: 0,
              "--platform-print-body-font":
                '"adobe-arabic", "Adobe Arabic", "Noto Naskh Arabic", Arial, sans-serif',
            } as CSSProperties
          }
        >
          <PrinciplePdfUI
            principle={principle}
            index={0}
            pageHref={printPageHref}
          />
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
          <FaCheck
            size={size}
            className="max-md:scale-[1.2] text-white md:scale-100"
          />
        ) : (
          <BsFileEarmarkPdf
            size={size}
            className={`max-md:scale-[1.2] transition-colors md:scale-100 ${iconStyles}`}
          />
        )}
      </button>
    </span>
  );
}
