"use client";

import { CopyButton } from "@/components/common/copy-button";
import { DownloadButton } from "@/components/common/download-button";
import { ShareButton } from "@/components/common/share-button";

type OtherLawCardProps = {
  law: Law;
};

export default function OtherLawCard({ law }: OtherLawCardProps) {
  const title = law.title || "قانون";

  return (
    <div className="w-full border-b border-main mt-5">
      <div className="flex w-full flex-col items-start gap-5 pb-4 pt-0 text-start md:flex-row md:items-center">
        <h4 className="text-sm font-medium flex-1">{title}</h4>
        {law.pdf_url && (
          <DownloadButton
            url={law.pdf_url}
            filename={title.replace(/\s+/g, "-") + ".pdf"}
          />
        )}
      </div>
      <div className="flex justify-end items-center gap-3 mb-2.5 me-11">
        <CopyButton text={title} />
        <ShareButton item={{ uuid: law.uuid, title: law.title }} type="law" />
      </div>
    </div>
  );
}
