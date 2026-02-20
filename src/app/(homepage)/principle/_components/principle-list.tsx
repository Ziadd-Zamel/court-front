"use client";
import CourtPagination from "@/components/custom/court-pagination";
import { Accordion } from "@/components/ui/accordion";
import PrincipleCard from "./principle-card";

type ArticlesListProps = {
  articles: Principle[];
  title?: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
  totalItems: number;
};

export default function PrincipleList({
  articles,
  pagination,
  totalItems,
  totalPages,
}: ArticlesListProps) {
  console.log(articles);
  return (
    <section>
      <div className="mb-12 mt-20 text-right">
        <h2 className="text-2xl font-bold text-main">
          نتائج البحث: {totalItems}
        </h2>
        <div className="mt-2 h-[2px] w-56 bg-main" />
      </div>

      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {articles.map((article, index) => (
          <PrincipleCard key={article.uuid} principle={article} index={index} />
        ))}
      </Accordion>

      {totalPages > 1 && (
        <CourtPagination pagination={pagination} totalPages={totalPages} />
      )}
    </section>
  );
}
