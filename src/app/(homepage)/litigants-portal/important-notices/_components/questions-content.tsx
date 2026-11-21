import catchError from "@/lib/utils/catch-error";
import { getQuestionsByCategory } from "@/lib/api/question.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { Accordion } from "@/components/ui/accordion";
import QuestionCard from "@/components/common/question-card";
import CourtPagination from "@/components/custom/court-pagination";
import SectionHeading from "@/components/common/section-heading";

type Props = {
  categoryId: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  heading?: string;
};

export default async function QuestionsContent({
  categoryId,
  pagination,
  search,
  heading,
}: Props) {
  const [data, error] = await catchError(() =>
    getQuestionsByCategory(
      categoryId,
      pagination.currentPage,
      pagination.limit,
      search,
    ),
  );

  const total = data?.meta?.total ?? 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} />
  ) : null;

  if (error) {
    return (
      <>
        {headingNode}
        <ErrorState />
      </>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <>
        {headingNode}
        {search && search.trim() !== "" ? <NoSearchResults /> : <NoDataState />}
      </>
    );
  }

  return (
    <section>
      {headingNode}
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
        dir="rtl"
      >
        {data.data.map((question) => (
          <QuestionCard key={question.uuid} item={question} />
        ))}
      </Accordion>

      {data.meta.last_page > 1 && (
        <div className="flex justify-center mt-8">
          <CourtPagination
            pagination={pagination}
            totalPages={data.meta.last_page}
          />
        </div>
      )}
    </section>
  );
}
