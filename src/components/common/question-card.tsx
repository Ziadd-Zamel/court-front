"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

type Props = {
  item: Iquestion;
};

export default function QuestionCard({ item }: Props) {
  console.log(item);
  return (
    <AccordionItem value={`item-${item.uuid}`}>
      <AccordionTrigger className="py-1 text-sm font-medium sm:text-base text-right hover:no-underline hover:text-main transition-all duration-300">
        <p style={{ direction: "rtl" }}>
          <span className="font-bold">{item.order}.</span> {item.title}
        </p>
      </AccordionTrigger>
      <AccordionContent className="text-sm mt-5 text-gray-500">
        <div
          dangerouslySetInnerHTML={{
            __html: cleanHtmlStyles(item.answer),
          }}
        />
      </AccordionContent>
      <div className="flex justify-end items-center gap-3 mb-5 me-10">
        <BookmarkButton item={item} type="question" />
        <ShareButton item={item} type="question" />
      </div>
    </AccordionItem>
  );
}
