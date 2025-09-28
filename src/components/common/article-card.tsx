"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Slash } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

type ArticleCardProps = {
  article: Article;
  index: number;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(article.publish_date);

  // Clean the HTML content before rendering
  const cleanedBodyHtml = cleanHtmlStyles(article.rule.body_html);

  console.log(article);

  return (
    <AccordionItem
      key={article.uuid}
      value={`item-${article.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start py-2 md:flex-row gap-5">
        {/* Date block */}
        <div className="flex items-center mt-1.5">
          <div className="flex flex-col text-start shrink-0 px-2">
            <p className="text-5xl text-main mb-1.5">{day}</p>
            <p className="text-md md:text-xs">
              {month}، {year}
            </p>
          </div>
          <Slash
            size={38}
            strokeWidth={1}
            className="-rotate-12 hidden self-center lg:block -mx-2 mt-2 "
          />{" "}
        </div>

        {/* Content block */}
        <div className="flex-1">
          <AccordionTrigger className="rounded-none justify-normal flex w-full cursor-pointer flex-col items-start gap-5 border-b border-main text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-[10px] text-start min-w-[130px]">
              <p className="text-gray-500 sm:text-lg md:text-xs">
                {article.sub_category}
              </p>
              <p className="sm:text-lg md:text-xs">{article.author}</p>
            </div>
            <div className="flex flex-col gap-2 text-start lg:-mr-7">
              <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1">
                <span>{article.number}</span>
                <span className="-mx-1">/</span>
                <span>{article.sign}</span>
              </p>
              <p className="min-h-[30px] text-md md:text-xs lg:text-base">
                {article.title}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="border-b border-main pb-10">
            <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
              {`[${article.rule.title}]`}
            </h6>
            <div
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain font-normal text-md text-gray-500"
              dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
            />
            <div className="mt-5 flex w-full items-end justify-end">
              <Link href={`/article/${article.uuid}`}>
                <Button className="text-lg py-1.5">
                  المزيد
                  <ChevronLeft />
                </Button>
              </Link>
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  );
};

export default ArticleCard;
