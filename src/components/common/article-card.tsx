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
      <div className="flex flex-col items-start gap-3 md:flex-row md:gap-5">
        {/* Left meta block: principle number + year/classification */}
        <div className="mt-3 flex w-full shrink-0 flex-col items-center px-3 text-center md:w-auto">
          {principleNumber && (
            <p className="mb-1 text-[32px] font-bold text-main sm:text-[40px] md:mb-2">
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
            <p className="text-sm text-gray-700 dark:text-white/70 md:text-xs">
              <HighlightedText text={principleMeta} />
            </p>
          )}
        </div>

        {/* Main content block: publish info, ruling meta, title, and expandable body */}
        <div className="w-full flex-1 border-b border-main">
          <AccordionTrigger className="flex w-full cursor-pointer flex-col items-start gap-3 rounded-none text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center md:gap-5">
            <div className="flex min-w-[130px] flex-col gap-1 text-start md:gap-2">
              {publishDate && (
                <p className="flex items-center gap-1 text-gray-500 dark:text-white/70 sm:text-lg md:text-xs">
                  <Calendar size={14} className="-mt-0.5 text-main" />
                  <span>
                    <HighlightedText text={publishDate} />
                  </span>
                </p>
              )}
              {author && (
                <p className="text-sm text-gray-700 dark:text-white/70 sm:text-lg md:text-xs">
                  <HighlightedText text={author} />
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 text-start md:gap-2">
              {rulingMeta && (
                <p className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-white md:text-md lg:text-xl">
                  <HighlightedText text={rulingMeta} />
                </p>
              )}
              {title && (
                <p className="min-h-[24px] text-sm leading-6 text-gray-800 dark:text-white md:min-h-[30px] md:text-xs lg:text-sm">
                  <HighlightedText text={title} />
                </p>
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-8 md:pb-10">
            {article.audio_file && (
              <div className="mt-4 flex justify-center md:mt-6">
                <CustomAudioPlayer
                  audioUrl={article.audio_file}
                  className="max-w-xl"
                />
              </div>
            )}
            <h6 className="mt-4 text-center font-zain text-xl font-bold text-main md:mt-5">
              <HighlightedText text={article.rule.title} />
            </h6>
            <HighlightedHtml
              html={article.rule.body_html}
              style={{ direction: "rtl" }}
              className="mt-6 !text-justify !font-zain !font-normal !text-sm text-gray-500 dark:text-white/70 md:mt-10"
            />
            <div className="mt-4 flex w-full items-end justify-end md:mt-5">
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
          <div className="mb-2.5 flex items-center justify-end gap-3 sm:-mt-2 sm:me-11">
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
