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
};

export default function PrincipleList({
  articles,
  pagination,
  totalPages,
}: ArticlesListProps) {
  return (
    <section>
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
