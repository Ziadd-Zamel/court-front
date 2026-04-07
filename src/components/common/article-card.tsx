"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { BookmarkButton } from "./bookmark-button";
import { ShareButton } from "./share-button";
import { CopyButton } from "./copy-button";
import CustomAudioPlayer from "@/components/custom/custom-audio-player";
import { HighlightedHtml } from "./highlighted-html";
import { HighlightedText } from "./highlighted-text";

type ArticleCardProps = {
  article: Article;
  index: number;
  /** Path to append as ?from= for breadcrumb on article page (e.g. /favorite/research) */
  from?: string;
};

/** Reverse "X-Y" to "Y-X" when it's number-number format, else return as is */
function formatNumberDisplay(value: string | number): string {
  const str = String(value ?? "");
  const match = str.match(/^(\d+)-(\d+)$/);
  if (match) return `${match[2]}-${match[1]}`;
  return str;
}

const ArticleCard = ({ article, from }: ArticleCardProps) => {
  // Route-aware bookmark bucket:
  // technical-office items are saved under "research", others under "article".
  const bookmarkType: "article" | "research" =
    from === "/technical-office" ? "research" : "article";

  // Normalize API fields and hide placeholders like null/undefined/"null"
  // so UI never shows broken metadata separators.
  const normalize = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };

  const formatMaybeNumber = (value: unknown) => {
    const clean = normalize(value);
    return clean ? formatNumberDisplay(clean) : "";
  };

  // Format date defensively; invalid dates return empty string.
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const publishDate = formatDate(article.publish_date);
  const author = normalize(article.author);
  const principleNumber = formatMaybeNumber(article.principle_number);
  const principleYear = normalize(article.principle_year);
  // Fallback: when principle_type is missing, use paper_classification.
  const principleType =
    normalize(article.principle_type) ||
    normalize(
      (article as Article & { paper_classification?: string | null })
        .paper_classification,
    );
  const principleMeta = [principleYear, principleType]
    .filter(Boolean)
    .join(" ");

  const number = formatMaybeNumber(article.number);
  const judicialYear = formatMaybeNumber(article.judicial_year);
  const sign = normalize(article.sign);
  // Build heading metadata only from available parts to avoid dangling "/" or ":".
  const rulingMeta =
    `${[judicialYear, number].filter(Boolean).join("/")}${sign}`.trim();
  const title = normalize(article.title);

  return (
    <AccordionItem
      key={article.uuid}
      value={`item-${article.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start md:flex-row gap-5">
        {/* Left meta block: principle number + year/classification */}
        <div className="flex flex-col text-center shrink-0 px-3 mt-3">
          {principleNumber && (
            <p className="text-[40px] text-main mb-2 font-bold">
              <HighlightedText
                text={
                  principleNumber.includes("-")
                    ? principleNumber.split("-").reverse().join("-")
                    : principleNumber
                }
              />
            </p>
          )}
          {principleMeta && (
            <p className="text-md md:text-xs">
              <HighlightedText text={principleMeta} />
            </p>
          )}
        </div>

        {/* Main content block: publish info, ruling meta, title, and expandable body */}
        <div className="flex-1 border-b border-main">
          <AccordionTrigger className="rounded-none justify-normal flex w-full cursor-pointer flex-col items-start gap-5  text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-2 text-start min-w-[130px]">
              {publishDate && (
                <p className="text-gray-500 dark:text-white/70 sm:text-lg md:text-xs flex items-center gap-1">
                  <Calendar size={14} className="text-main -mt-1" />
                  <span>
                    <HighlightedText text={publishDate} />
                  </span>
                </p>
              )}
              {author && (
                <p className="sm:text-lg md:text-xs">
                  <HighlightedText text={author} />
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-start">
              {rulingMeta && (
                <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1">
                  <HighlightedText text={rulingMeta} />
                </p>
              )}
              {title && (
                <p className="min-h-[30px] text-md md:text-xs lg:text-sm leading-6">
                  <HighlightedText text={title} />
                </p>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10">
            {article.audio_file && (
              <div className="mt-6 flex justify-center">
                <CustomAudioPlayer
                  audioUrl={article.audio_file}
                  className="max-w-xl"
                />
              </div>
            )}
            <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
              <HighlightedText text={article.rule.title} />
            </h6>
            <HighlightedHtml
              html={article.rule.body_html}
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500 dark:text-white/70"
            />
            <div className="mt-5 flex w-full items-end justify-end">
              <Link
                href={
                  from
                    ? `/article/${article.uuid}?from=${encodeURIComponent(from)}`
                    : `/article/${article.uuid}`
                }
              >
                <Button className="text-lg py-1">
                  المزيد
                  <ChevronLeft />
                </Button>
              </Link>
            </div>
          </AccordionContent>

          {/* Action row: bookmark/share/copy */}
          <div className="flex justify-end items-center gap-3 mb-2.5 -mt-2 me-11">
            <BookmarkButton item={article} type={bookmarkType} />
            <ShareButton item={article} type="article" />
            <CopyButton text={article.rule.body_text} />
          </div>
        </div>
      </div>
    </AccordionItem>
  );
};

export default ArticleCard;
