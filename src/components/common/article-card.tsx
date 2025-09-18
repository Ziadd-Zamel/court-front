"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Slash } from "lucide-react";
import Link from "next/link";

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
  console.log(article);
  return (
    <AccordionItem
      key={article.uuid}
      value={`item-${article.uuid}`}
      className="border-b-0"
    >
      <div className="flex flex-col items-start py-2 md:flex-row">
        <div className="flex w-full flex-1 justify-start gap-8">
          <div className="flex flex-col text-start">
            <p className="text-5xl text-main">{day}</p>
            <p className=" text-md md:text-xs mt-3">
              {month}، {year}
            </p>
          </div>
          <Slash
            size={45}
            strokeWidth={1}
            className="-rotate-12 hidden self-center lg:block mr-7"
          />
        </div>

        <div className="w-full md:w-[75%]">
          <AccordionTrigger className=" rounded-none flex w-full cursor-pointer flex-col items-start gap-5 border-b border-main text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-[10px] text-start min-w-[150px]">
              <p className="sm:text-lg md:text-xs">{article.sign}</p>
              <p className="text-gray-500 sm:text-lg md:text-xs">
                {article.sub_category}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <p className="text-xl font-bold md:text-md lg:text-xl">
                {article.sub_category}:{article.number}
              </p>
              <p className="min-h-[30px] text-md md:text-xs lg:text-xl">
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
              className="mt-5 text-justify font-zain text-md text-gray-500"
              dangerouslySetInnerHTML={{ __html: article.rule.body_html }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                {article.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-zain"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex w-full items-end justify-end">
              <Link
                href={`/technical-office/${article.uuid}`}
                className="flex w-fit items-center gap-2 rounded-[2px] bg-main px-2 text-lg text-white hover:bg-main xl:px-3 xl:py-[5px]"
              >
                <span className="">
                  <ChevronLeft />
                </span>
                اقرأ المزيد
              </Link>
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  );
};

export default ArticleCard;
