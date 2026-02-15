"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "lucide-react";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

type ArticleCardProps = {
  principle: Principle;
  index: number;
};

export default function PrincipleCard({ principle }: ArticleCardProps) {
  // Format the date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return { day: "------", month: "------", year: "------" };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(principle.session_date);

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
            {principle.number || "------"}
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
                <span>
                  {day} - {month} - {year}
                </span>
              </p>
              <p className="sm:text-lg md:text-xs">
                {principle.ruling_type || "------"}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <p className="text-xl font-bold md:text-md lg:text-xl flex items-center gap-1">
                <span>{principle.serial_number || "------"}</span>
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
              {principle.brief || "------"}
            </h6>
            <div
              style={{ direction: "rtl" }}
              className="mt-5 !text-justify !font-zain !font-normal !text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
            />
            <div className="mt-5 flex w-full items-end justify-end">
              <button
                onClick={handlePdfClick}
                className="text-main hover:underline text-sm"
              >
                مجلة المحكمة العليا: السنة 33 - العدد 1 - ص 231
              </button>
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  );
}
