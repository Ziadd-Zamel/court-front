"use client";

import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { CopyButton } from "@/components/common/copy-button";
import { DownloadButton } from "@/components/common/download-button";
import ArticleSidebarContent from "./article-sidebar-content";

const MOBILE_ACTION_CLASS = "shrink-0 !size-9 p-1.5";
const MOBILE_ICON_SIZE = 18;

export default function ArticleMobilePanel({ article }: { article: Article }) {
  return (
    <div className="lg:hidden">
      <div className="mx-2 mb-4 flex items-center justify-center gap-3 rounded-sm border border-gray-200/60 bg-white/90 px-4 py-4 shadow-sm dark:border-white/10 dark:bg-white/10">
        <BookmarkButton
          item={article}
          type="article"
          className={MOBILE_ACTION_CLASS}
          size={MOBILE_ICON_SIZE}
        />
        <ShareButton
          item={article}
          type="article"
          className={MOBILE_ACTION_CLASS}
          size={MOBILE_ICON_SIZE}
        />
        <CopyButton
          text={article.rule.body_text}
          className={MOBILE_ACTION_CLASS}
          size={MOBILE_ICON_SIZE}
        />
        {article.pdf_file ? (
          <DownloadButton
            url={article.pdf_file}
            className={MOBILE_ACTION_CLASS}
            size={MOBILE_ICON_SIZE}
          />
        ) : null}
      </div>

      <div className="mx-2 mb-10 rounded-sm border border-gray-200/60 bg-[#F1E2CE] px-5 py-6 dark:border-white/10 dark:bg-[#1a1a1a]">
        <ArticleSidebarContent article={article} compact />
      </div>
    </div>
  );
}
