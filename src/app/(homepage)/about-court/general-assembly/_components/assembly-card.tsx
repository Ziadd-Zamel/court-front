"use client";
import { CopyButton } from "@/components/common/copy-button";
import { DownloadButton } from "@/components/common/download-button";
import { ShareButton } from "@/components/common/share-button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slash } from "lucide-react";

type AssemblyCardProps = {
  assembly: Assembly;
  index: number;
};

const AssemblyCard = ({ assembly }: AssemblyCardProps) => {
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
  const hasBrief = !!assembly.brief;

  return (
    <AccordionItem
      key={assembly.uuid}
      value={`item-${assembly.uuid}`}
      className="border-b-0 mt-5"
      disabled={!hasBrief}
    >
      <div className="flex flex-col items-start py-2 md:flex-row">
        <div className="flex w-full flex-1 -mt-3">
          <div className="flex flex-col text-start items-center">
            <p className="text-3xl text-black">{day}</p>
            <p className="text-md md:text-xs text-main mt-2">
              {month}، {year}
            </p>
          </div>
          <Slash
            size={45}
            strokeWidth={1}
            className="-rotate-12 hidden self-center lg:block mr-3"
          />
        </div>

        <div className="w-full md:w-[80%] border-b border-main">
          {hasBrief ? (
            <>
              <AccordionTrigger className="rounded-none pt-0 flex w-full cursor-pointer flex-col items-start gap-5 text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
                <h4 className="text-sm font-medium">{assembly.title}</h4>
              </AccordionTrigger>

              <AccordionContent>
                <p className="text-gray-600 text-sm">{assembly.brief}</p>
              </AccordionContent>

              <div className="flex justify-end items-center gap-3 mb-2.5 me-11">
                <ShareButton item={assembly} type="assembly" />
                <CopyButton text={assembly.brief} />
              </div>
            </>
          ) : (
            // Same visual style as the trigger but non-interactive
            <>
              <div className="flex w-full flex-col items-start gap-5 pb-4 pt-0 text-start md:flex-row md:items-center">
                <h4 className="text-sm font-medium">{assembly.title}</h4>
              </div>
              <div className="flex justify-end items-center gap-3 mb-2.5 me-11">
                {assembly.pdf && <DownloadButton url={assembly.pdf} />}
                <CopyButton text={assembly.brief} />
                <ShareButton item={assembly} type="assembly" />
              </div>
            </>
          )}
        </div>
      </div>
    </AccordionItem>
  );
};

export default AssemblyCard;
