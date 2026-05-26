"use client";

import SearchBar from "@/components/common/search-bar";

type Props = {
  article: Article;
  compact?: boolean;
};

export default function ArticleSidebarContent({ article, compact = false }: Props) {
  const tags = article.tags?.length ? [...article.tags].reverse() : [];

  return (
    <div className={`w-full text-right ${compact ? "" : "mt-10"}`}>
      <SearchBar className="!py-.5 px-3" />

      {tags.length > 0 ? (
        <div className={`w-full ${compact ? "mt-8" : "mt-12"}`}>
          <h6
            className={`mb-5 font-medium text-black dark:text-white ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            روابط موضوعية:
          </h6>
          <div className="flex w-full flex-col flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex w-fit cursor-pointer items-center border border-gray-200 bg-white/60 px-1.5 py-1 text-xs font-medium text-gray-800 transition-colors hover:bg-white/80 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
