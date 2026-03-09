"use client";
import { Suspense } from "react";
import CourtPagination from "@/components/custom/court-pagination";
import { Accordion } from "@/components/ui/accordion";
import AssemblyCard from "./assembly-card";

type ArticlesListProps = {
  articles: Assembly[];
  title?: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
};

const AssemblyList = ({
  articles,
  pagination,
  totalPages,
}: ArticlesListProps) => {
  console.log(articles);
  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {articles.map((article, index) => (
          <AssemblyCard key={article.uuid} assembly={article} index={index} />
        ))}
      </Accordion>

      {totalPages > 1 && (
        <Suspense fallback={null}>
          <CourtPagination pagination={pagination} totalPages={totalPages} />
        </Suspense>
      )}
    </section>
  );
};

export default AssemblyList;
