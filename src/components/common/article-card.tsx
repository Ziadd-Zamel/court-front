"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";
import { BookmarkButton } from "./bookmark-button";
import { ShareButton } from "./share-button";
import { CopyButton } from "./copy-button";

type ArticleCardProps = {
  article: Article;
  index: number;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(article.publish_date);

  // Clean the HTML content before rendering
  const cleanedBodyHtml = cleanHtmlStyles(article.rule.body_html);

  return (
    <AccordionItem
      key={article.uuid}
      value={`item-${article.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start md:flex-row gap-5">
        {/* Date block */}
        <div className="flex flex-col text-center shrink-0 px-3">
          <p className="text-5xl text-main mb-2">{article.principle_number}</p>
          <p className="text-md md:text-xs">
            {article.principle_year} {article.principle_type}
          </p>
        </div>

        {/* Content block */}
        <div className="flex-1 border-b border-main">
          <AccordionTrigger className="rounded-none justify-normal flex w-full cursor-pointer flex-col items-start gap-5  text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-5 text-start min-w-[130px]">
              <p className="text-gray-500 sm:text-lg md:text-xs flex items-center gap-1">
                <Calendar size={14} className="text-main -mt-1" />
                <span>
                  {day} - {month} - {year}
                </span>
              </p>
              <p className="sm:text-lg md:text-xs">{article.author}</p>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1">
                <span>{article.number}</span>
                <span className="-mx-1">/</span>
                <span>{article.sign}</span>
              </p>
              <p className="min-h-[30px] text-md md:text-xs lg:text-sm leading-6">
                {article.title}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10">
            <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
              {article.rule.title}
            </h6>
            <div
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
            />
            <div className="mt-5 flex w-full items-end justify-end">
              <Link href={`/article/${article.uuid}`}>
                <Button className="text-lg py-1">
                  المزيد
                  <ChevronLeft />
                </Button>
              </Link>
            </div>
          </AccordionContent>

          <div className="flex justify-end items-center gap-3 mb-5 -mt-2  data-[state=open]:me-11">
            <BookmarkButton item={article} type="article" />
            <ShareButton item={article} type="article" />
            <CopyButton text={article.rule.body_text} />
          </div>
        </div>
      </div>
    </AccordionItem>
  );
};

export default ArticleCard;
