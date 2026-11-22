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
  const firstPublication = principle.publications?.[0];
  const websiteUrlRaw = principle.website_url;
  const websiteUrl =
    typeof websiteUrlRaw === "string"
      ? websiteUrlRaw.trim()
      : websiteUrlRaw != null
        ? String(websiteUrlRaw).trim()
        : "";
  const websiteUrlClean =
    websiteUrl && websiteUrl.toLowerCase() !== "null" ? websiteUrl : "";
  const pageHref =
    typeof window !== "undefined"
      ? websiteUrlClean || window.location.href
      : websiteUrlClean;
  const pageHrefLabel = (() => {
    if (!pageHref) return "";
    try {
      return decodeURI(pageHref);
    } catch {
      return pageHref;
    }
  })();
  const showFooterLink = Boolean(pageHref);
  const hasPublicationPdf = Boolean(
    typeof firstPublication?.pdf_file === "string" &&
      firstPublication.pdf_file.trim(),
  );

  // Normalize API fields so we never render null/undefined/"null" placeholders.
  const normalize = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };

  // Build display metadata from existing pieces only (no dangling "/" or ":").
  const serialNumber = normalize(principle.serial_number);
  const topMeta = [
    normalize(principle.gregorian_year),
    normalize(principle.principle_type),
  ]
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
  const headingMeta =
    `${[judicialYear, number].filter(Boolean).join("/")}${sign}`.trim();
  const brief = normalize(principle.brief);
  const copyText =
    principle.content
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim() || brief;

  return (
    <AccordionItem
      key={principle.uuid}
      value={`item-${principle.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start gap-3 md:flex-row md:gap-5">
        {/* Left metadata block (serial + year/classification) */}
        <div className="flex w-full shrink-0 flex-col items-center px-3 text-center mt-3 md:mt-3 md:w-auto">
          {serialNumber && (
            <p className="mb-1 text-[32px] font-bold text-main sm:text-[40px] md:mb-2">
              <HighlightedText text={serialNumber} />
            </p>
          )}
          {topMeta && (
            <p className="text-sm text-gray-700 dark:text-white/70 md:text-xs">
              <HighlightedText text={topMeta} />
            </p>
          )}
        </div>

        {/* Main card content: session/ruling meta, heading, brief, and expandable body */}
        <div className="w-full flex-1 border-b border-main">
          <AccordionTrigger className="flex w-full cursor-pointer flex-col items-start gap-3 rounded-none text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center md:gap-5">
            <div className="flex min-w-[130px] flex-col gap-1 text-start md:gap-2">
              {sessionDate && (
                <p className="flex items-center gap-1 text-gray-500 sm:text-lg md:text-xs">
                  <Calendar size={14} className="-mt-0.5 text-main" />
                  <HighlightedText text={sessionDate} />
                </p>
              )}
              {rulingType && (
                <p className="text-sm text-gray-700 dark:text-white/70 sm:text-lg md:text-xs">
                  <HighlightedText text={rulingType} />
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 text-start md:gap-2">
              {headingMeta && (
                <p className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-white md:text-md lg:text-xl">
                  <HighlightedText text={headingMeta} />
                </p>
              )}
              {brief && (
                <p className="min-h-[24px] text-sm leading-6 text-gray-800 dark:text-white md:min-h-[30px] md:text-xs lg:text-sm">
                  <HighlightedText text={brief} />
                </p>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-8 md:pb-10">
            <h6 className="mt-4 text-center text-xl font-bold text-main md:mt-5">
              المبدأ القانوني
            </h6>
            <HighlightedHtml
              html={principle.content || ""}
              style={{ direction: "rtl" }}
              className="mt-6 !text-justify !font-zain !font-normal !text-sm text-gray-500 dark:text-white/70 md:mt-10"
            />

            <div className="mt-4 flex w-full flex-col gap-1 md:mt-5">
              {(() => {
                const parts = [
                  principle.appeal_year
                    ? `السنة ${principle.appeal_year}`
                    : null,
                  principle.issue_number
                    ? `العدد ${principle.issue_number}`
                    : null,
                  principle.page_number ? `ص ${principle.page_number}` : null,
                ].filter(Boolean);

                const hasMagazineCitation = parts.length > 0 || hasPublicationPdf;
                const magazineText =
                  parts.length > 0
                    ? `مجلة المحكمة العليا: ${parts.join(" - ")}`
                    : "مجلة المحكمة العليا";
                const headerLine = hasMagazineCitation
                  ? magazineText
                  : websiteUrlClean || principle.publish_on_website
                    ? "منشور على موقع المحكمة العليا"
                    : magazineText;

                return (
                  <>
                    <span className="text-sm text-main dark:text-white/70">
                      {headerLine}
                    </span>
                    {showFooterLink ? (
                      <Link
                        href={pageHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm text-main hover:underline"
                        dir="ltr"
                      >
                        {pageHrefLabel}
                      </Link>
                    ) : null}
                  </>
                );
              })()}
            </div>

            {principle.overturn && (
              <p className="text-sm text-red-600 font-medium pt-3">
                {principle?.overturn_decision
                  ? principle.overturn_decision
                  : ""}
              </p>
            )}
          </AccordionContent>
          <div className="mb-2.5 flex items-center justify-end gap-3 sm:-mt-2 sm:me-11">
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
