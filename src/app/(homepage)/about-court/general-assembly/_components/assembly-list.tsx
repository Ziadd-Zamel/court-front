"use client";
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
  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {articles.map((article, index) => (
          <AssemblyCard key={article.uuid} assembly={article} index={index} />
        ))}
      </Accordion>

      {totalPages > 1 && (
        <CourtPagination pagination={pagination} totalPages={totalPages} />
      )}
    </section>
  );
};

export default AssemblyList;
