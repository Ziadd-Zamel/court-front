"use client";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

export default function ServiceContent({ body_html }: { body_html: string }) {
  return (
    <div
      className="text-gray-500 font-medium text-xl"
      dangerouslySetInnerHTML={{
        __html: cleanHtmlStyles(body_html),
      }}
    ></div>
  );
}
