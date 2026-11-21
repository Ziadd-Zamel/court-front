import { getArticlesByCategory } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "./error-state";
import NoDataState from "./no-data-state";
import ArticlesList from "./articlesL-list";
import NoSearchResults from "./no-result";
import SectionHeading from "@/components/common/section-heading";

type ArticlePageProps = {
  uuid: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  /** Path for breadcrumb on article page (e.g. /legal-principles) */
  from?: string;
  /** Section title shown above the list, with total count */
  heading?: string;
  countLabel?: string;
};

export default async function ArticlePage({
  uuid,
  search,
  pagination,
  from,
  heading,
  countLabel,
}: ArticlePageProps) {
  const [articlesData, articlesError] = await catchError(() =>
    getArticlesByCategory(pagination.currentPage, 15, uuid, search),
  );

  const total = articlesData?.meta?.total ?? 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} countLabel={countLabel} />
  ) : null;

  if (articlesError) {
    return (
      <>
        {headingNode}
        <ErrorState />
      </>
    );
  }

  if (!articlesData || articlesData?.data.length === 0) {
    if (search && search.trim() !== "") {
      return (
        <>
          {headingNode}
          <NoSearchResults />
        </>
      );
    }

    return (
      <>
        {headingNode}
        <NoDataState />
      </>
    );
  }

  return (
    <>
      {headingNode}
      <ArticlesList
        articles={articlesData.data}
        title={`المقالات - ${uuid}`}
        pagination={pagination}
        totalPages={articlesData.meta.last_page}
        from={from}
      />
    </>
  );
}
