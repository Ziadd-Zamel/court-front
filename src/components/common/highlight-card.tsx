"use client";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cleanHtmlStylesServer } from "@/lib/utils/clean-html-styles-server";

type Props = {
  article: Article;
  gradientFrom?: string;
};

export default function HighlightCard({
  article,
  gradientFrom = "to-white",
}: Props) {
  const cleanedBodyHtml = cleanHtmlStylesServer(article.rule.body_html);

  return (
    <div
      className={cn("grid pb-20 pt-20 bg-transparent")}
      style={{ gridRow: "span 4", gridTemplateRows: "subgrid" }}
    >
      {/* Row 1: pin + category */}
      <div className="flex flex-col items-center justify-center gap-3">
        <Pin className="size-7 text-main" />
        <h3 className="text-center text-lg font-bold my-5 text-main">
          {article.main_category}
        </h3>
      </div>

      {/* Row 2: title */}
      <h4 className="my-3 text-right text-md font-medium text-black lg:text-base">
        <span className="text-base font-bold text-main">
          {article.number}/{article.judicial_year}
          {article.sign}
        </span>{" "}
        : {article.title}
      </h4>

      {/* Row 3: content */}
      <div className="relative mt-5 h-[13.75rem] overflow-hidden">
        <div
          style={{ direction: "rtl" }}
          className="!text-justify !font-zain !font-normal !text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
        />
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-l from-transparent",
            gradientFrom,
          )}
        />
      </div>

      {/* Row 4: link */}
      <div className="flex justify-end w-full">
        <Link
          href={`/article/${article.uuid}`}
          className="mt-5 text-left text-base font-[500] text-main hover:text-main/80 px-3 py-1 h-auto"
        >
          المزيد
        </Link>
      </div>
    </div>
  );
}
