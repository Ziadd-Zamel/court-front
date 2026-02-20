"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Share2 } from "lucide-react";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";
import { CopyButton } from "@/components/common/copy-button";
import { FaRegBookmark } from "react-icons/fa6";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

export default function PrincipleCard({ principle }: ArticleCardProps) {
  // Clean the HTML content before rendering
  const cleanedBodyHtml = cleanHtmlStyles(principle.content || "");

  const pdfUrl = "/court-book.pdf";
  const pageNumber = 3;

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
        {/* Date block */}
        <div className="flex flex-col text-center shrink-0 px-3 mt-3">
          <p className="text-[40px] text-main mb-2 font-bold">
            {principle.serial_number || "------"}
          </p>
          <p className="text-md md:text-xs">
            {principle.gregorian_year || "------"}{" "}
            {principle.principle_type || "------"}
          </p>
        </div>

        {/* Content block */}
        <div className="flex-1 border-b border-main">
          <AccordionTrigger className="rounded-none justify-normal flex w-full cursor-pointer flex-col items-start gap-5  text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <div className="flex flex-col gap-2 text-start min-w-[130px]">
              <p className="text-gray-500 sm:text-lg md:text-xs flex items-center gap-1">
                <Calendar size={14} className="text-main -mt-1" />

                {principle.session_date.split(" - ")}
              </p>
              <p className="sm:text-lg md:text-xs">
                {principle.ruling_type || "------"}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1">
                <span>{principle.number || "------"}</span>
                <span className="-mx-1">/</span>
                <span className="-me-1">
                  {principle.judicial_year || "------"}
                </span>
                <span>{principle.sign || "------"}</span>
              </p>
              <p className="min-h-[30px] text-md md:text-xs lg:text-sm leading-6">
                {principle.brief || "------"}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10">
            <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
              المبدأ القانوني
            </h6>
            <div
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
            />
            <div className="mt-5 flex w-full">
              <button
                onClick={handlePdfClick}
                className="text-main hover:underline text-sm cursor-pointer"
              >
                مجلة المحكمة العليا: السنة 33 - العدد 1 - ص 231
              </button>
            </div>
          </AccordionContent>
          <div className="flex justify-end items-center gap-3 mb-2.5 -mt-2 me-11">
            <button
              className={` flex cursor-pointer items-center justify-center rounded-full size-5 md:size-8 transition-all duration-200 bg-white backdrop-blur-sm hover:bg-white/80 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow`}
              aria-label="Toggle bookmark"
              title={"إضافة للمفضلة"}
            >
              <FaRegBookmark className="text-gray-700" />
            </button>{" "}
            <button
              className={`flex cursor-pointer items-center justify-center rounded-full size-5 md:size-8 transition-all duration-200 border bg-white backdrop-blur-sm hover:bg-white/80  border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow`}
              title="مشاركة"
            >
              <Share2 className={`transition-colors text-gray-700`} size={16} />
            </button>
            <CopyButton text={principle.brief} />
          </div>
        </div>
      </div>
    </AccordionItem>
  );
}
