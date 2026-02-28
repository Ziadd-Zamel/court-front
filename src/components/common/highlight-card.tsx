"use client";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cleanHtmlStylesServer } from "@/lib/utils/clean-html-styles-server";

export default function HighlightCard({ article }: { article: Article }) {
  const cleanedBodyHtml = cleanHtmlStylesServer(article.rule.body_html);

  return (
    <div className={cn("flex w-full flex-col pb-20 pt-20 bg-transparent")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Pin className="size-7 text-main" />
        <h3 className="text-center text-lg font-bold my-5 text-main">
          {article.main_category}
        </h3>
      </div>

      <h4 className="my-3 text-right text-md font-medium text-black lg:text-base flex items-center gap-1">
        <span className="text-base font-bold flex items-center gap-1 text-main">
          <span>{article.number}</span>
          <span className="-mx-1">/</span>
          <span className="-me-1">{article.judicial_year}</span>
          <span>{article.sign}</span>
        </span>
        : {article.title}
      </h4>

      <div
        style={{ direction: "rtl" }}
        className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
      />

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
