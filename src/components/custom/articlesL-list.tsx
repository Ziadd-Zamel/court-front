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
};

const ArticlesList = ({
  articles,
  pagination,
  totalPages,
}: ArticlesListProps) => {
  console.log(articles);
  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {articles.map((article, index) => (
          <ArticleCard key={article.uuid} article={article} index={index} />
        ))}
      </Accordion>

      {totalPages > 1 && (
        <CourtPagination pagination={pagination} totalPages={totalPages} />
      )}
    </section>
  );
};

export default ArticlesList;
