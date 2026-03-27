"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { CopyButton } from "@/components/common/copy-button";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { PrinciplePdfButton } from "@/components/common/principle-pdf-button";
import { HighlightedHtml } from "@/components/common/highlighted-html";
import { HighlightedText } from "@/components/common/highlighted-text";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

export default function PrincipleCard({ principle }: ArticleCardProps) {
  const pdfUrl = "/court-book.pdf";
  const pageNumber = principle.page_number ?? 3;
  const hasWebsiteUrl = Boolean(principle.website_url?.trim());

  // Normalize API fields so we never render null/undefined/"null" placeholders.
  const normalize = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };

  // Build display metadata from existing pieces only (no dangling "/" or ":").
  const serialNumber = normalize(principle.serial_number);
  const topMeta = [normalize(principle.gregorian_year), normalize(principle.principle_type)]
    .filter(Boolean)
    .join(" ");

  const sessionDate = normalize(principle.session_date)
    ? normalize(principle.session_date)
        .split(" - ")
        .map((date) => date.split("-").reverse().join("-"))
        .join(" - ")
    : "";

  const rulingType = normalize(principle.ruling_type);
  const number = normalize(principle.number);
  const judicialYear = normalize(principle.judicial_year);
  const sign = normalize(principle.sign);
  const headingMeta = `${[number, judicialYear].filter(Boolean).join("/")}${sign}`.trim();
  const brief = normalize(principle.brief);

  const copyText =
    principle.content
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim() || brief;

  const handlePdfClick = () => {
    window.open(`${pdfUrl}#page=${pageNumber}`, "_blank");
  };

  return (
    <AccordionItem
      key={principle.uuid}
      value={`item-${principle.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start md:flex-row gap-5">
        {/* Left metadata block (serial + year/classification) */}
        <div className="flex flex-col text-center shrink-0 px-3 mt-3">
          {serialNumber && (
            <p className="text-[40px] text-main mb-2 font-bold">
              <HighlightedText text={serialNumber} />
            </p>
          )}
          {topMeta && (
            <p className="text-md md:text-xs text-gray-700 dark:text-white/70">
              <HighlightedText text={topMeta} />
            </p>
          )}
        </div>

        {/* Main card content: session/ruling meta, heading, brief, and expandable body */}
        <div className="flex-1 border-b border-main">
          <AccordionTrigger className="rounded-none justify-normal flex w-full cursor-pointer flex-col items-start gap-5  text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-2 text-start min-w-[130px]">
              {sessionDate && (
                <p className="text-gray-500 sm:text-lg md:text-xs flex items-center gap-1">
                  <Calendar size={14} className="text-main -mt-1" />
                  <HighlightedText text={sessionDate} />
                </p>
              )}
              {rulingType && (
                <p className="sm:text-lg md:text-xs text-gray-700 dark:text-white/70">
                  <HighlightedText text={rulingType} />
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-start">
              {headingMeta && (
                <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1 text-gray-900 dark:text-white">
                  <HighlightedText text={headingMeta} />
                </p>
              )}
              {brief && (
                <p className="min-h-[30px] text-md md:text-xs lg:text-sm leading-6 text-gray-800 dark:text-white">
                  <HighlightedText text={brief} />
                </p>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10">
            <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
              المبدأ القانوني
            </h6>
            <HighlightedHtml
              html={principle.content || ""}
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500 dark:text-white/70"
            />
            <div className="mt-5 flex w-full">
              {hasWebsiteUrl ? (
                <Link
                  href={principle.website_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main hover:underline text-sm cursor-pointer"
                >
                  مجلة المحكمة العليا: السنة {principle.gregorian_year ?? "33"} - العدد {principle.issue_number ?? "1"} - ص {principle.page_number ?? 231}
                </Link>
              ) : (
                <button
                  onClick={handlePdfClick}
                  className="text-main hover:underline text-sm cursor-pointer"
                >
                  مجلة المحكمة العليا: السنة {principle.gregorian_year ?? "33"} - العدد {principle.issue_number ?? "1"} - ص {principle.page_number ?? 231}
                </button>
              )}
            </div>
          </AccordionContent>
          <div className="flex justify-end items-center gap-3 mb-2.5 -mt-2 me-11">
            <BookmarkButton item={principle} type="principle" />
            <ShareButton item={principle} type="principle" />
            <CopyButton text={copyText} />
            <PrinciplePdfButton principle={principle} />
          </div>
        </div>
      </div>
    </AccordionItem>
  );
}
