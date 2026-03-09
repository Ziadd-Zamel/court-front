"use client";
import { Accordion } from "@/components/ui/accordion";
import CourtPagination from "./court-pagination";
import ArticleCard from "../common/article-card";

type ArticlesListProps = {
  articles: Article[];
  title?: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
  /** Path for breadcrumb on article page (e.g. /legal-principles) */
  from?: string;
};

const ArticlesList = ({
  articles,
  pagination,
  totalPages,
  from,
}: ArticlesListProps) => {
  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {articles.map((article, index) => (
          <ArticleCard
            key={article.uuid}
            article={article}
            index={index}
            from={from}
          />
        ))}
      </Accordion>

      {totalPages > 1 && (
        <CourtPagination pagination={pagination} totalPages={totalPages} />
      )}
    </section>
  );
};

export default ArticlesList;
