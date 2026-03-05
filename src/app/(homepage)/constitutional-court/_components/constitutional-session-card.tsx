"use client";
import { CopyButton } from "@/components/common/copy-button";
import { DownloadButton } from "@/components/common/download-button";
import { ShareButton } from "@/components/common/share-button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

type Props = {
  session: Assembly;
};

const ConstitutionalSessionCard = ({ session }: Props) => {
  const hasBrief = !!session?.items[0]?.body;

  return (
    <AccordionItem
      value={`item-${session.uuid}`}
      className="border-b-0 mt-5"
      disabled={!hasBrief}
    >
      <div className="w-full border-b border-main">
        {hasBrief ? (
          <>
            <AccordionTrigger className="rounded-none pt-0 flex w-full cursor-pointer flex-col items-start gap-5 text-start hover:no-underline data-[state=open]:border-transparent md:flex-row md:items-center">
              <h4 className="text-sm font-medium">{session.title}</h4>
            </AccordionTrigger>

            <AccordionContent>
              {session.items.map((item, index) => {
                const cleanedBodyHtml = cleanHtmlStyles(item.body);

                return (
                  <div key={index} className="space-y-3">
                    <h6 className="mt-5 text-center font-zain text-xl font-bold text-main">
                      {item.title}
                    </h6>
                    <div
                      style={{ direction: "rtl" }}
                      className="!text-justify !font-zain !font-normal !text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: cleanedBodyHtml }}
                    />
                  </div>
                );
              })}
            </AccordionContent>

            <div className="flex justify-end items-center gap-3 mb-2.5 me-11">
              <ShareButton item={session} type="assembly" />
              <CopyButton text={session.items[0].body} />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col items-start gap-5 pb-4 pt-0 text-start md:flex-row md:items-center">
              <h4 className="text-sm font-medium">{session.title}</h4>
            </div>
            <div className="flex justify-end items-center gap-3 mb-2.5 me-11">
              {session.pdf && <DownloadButton url={session.pdf} />}
              <CopyButton text={session.brief} />
              <ShareButton item={session} type="assembly" />
            </div>
          </>
        )}
      </div>
    </AccordionItem>
  );
};

export default ConstitutionalSessionCard;
