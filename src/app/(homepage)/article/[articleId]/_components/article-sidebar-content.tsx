"use client";

import SearchBar from "@/components/common/search-bar";
import Link from "next/link";

type Props = {
  article: Article;
  compact?: boolean;
};

function getArticleTags(article: Article) {
  const names = article.tags ?? [];
  const uuids = article.tags_uuid ?? [];

  return names
    .map((name, index) => ({
      name,
      uuid: uuids[index] ?? "",
    }))
    .filter((tag) => tag.name)
    .reverse();
}

export default function ArticleSidebarContent({ article, compact = false }: Props) {
  const tags = getArticleTags(article);

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
            {tags.map((tag) => {
              const className =
                "inline-flex w-fit items-center border border-gray-200 bg-white/60 px-1.5 py-1 text-xs font-medium text-gray-800 transition-colors hover:bg-white/80 hover:text-main dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20 dark:hover:text-white";

              if (!tag.uuid) {
                return (
                  <span key={tag.name} className={className}>
                    {tag.name}
                  </span>
                );
              }

              return (
                <Link
                  key={tag.uuid}
                  href={`/tag/${tag.uuid}?name=${encodeURIComponent(tag.name)}`}
                  className={className}
                >
                  {tag.name}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
