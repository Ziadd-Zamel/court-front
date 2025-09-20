"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Slash } from "lucide-react";
import Link from "next/link";

type Assembly = {
  uuid: string;
  category: string;
  title: string;
  date: string;
  brief: string;
  body_html: string;
  body_text: string;
};

type AssemblyCardProps = {
  assembly: Assembly;
  index: number;
};

const AssemblyCard = ({ assembly }: AssemblyCardProps) => {
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

  const { day, month, year } = formatDate(assembly.date);

  return (
    <AccordionItem
      key={assembly.uuid}
      value={`item-${assembly.uuid}`}
      className="border-b-0 mt-5"
    >
      <div className="flex flex-col items-start py-2 md:flex-row">
        <div className="flex w-full flex-1 justify-start gap-8 -mt-2">
          <div className="flex flex-col text-start">
            <p className="text-5xl text-main">{day}</p>
            <p className="text-md md:text-xs mt-3">
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
          <AccordionTrigger className="rounded-none flex w-full cursor-pointer flex-col items-start gap-5 border-b border-main text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
            <h4 className="text-xl font-bold md:text-md lg:text-xl">
              {assembly.title}
            </h4>
          </AccordionTrigger>

          <AccordionContent className="border-b border-main pb-10">
            <p className="text-gray-500 text-lg">{assembly.brief}</p>
            <div className="mt-5 flex w-full items-end justify-end">
              <Link
                href={`/technical-office/${assembly.uuid}`}
                className="flex w-fit items-center gap-2 rounded-[2px] bg-main px-2 text-lg text-white hover:bg-main xl:px-3 xl:py-[5px]"
              >
                اقرأ المزيد
                <ChevronLeft />
              </Link>
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  );
};

export default AssemblyCard;
