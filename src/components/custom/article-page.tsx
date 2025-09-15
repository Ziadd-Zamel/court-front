import { getArticlesByCategory } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "./error-state";
import NoDataState from "./no-data-state";
import ArticlesList from "./articlesL-list";
import NoSearchResults from "./no-result";

type ArticlePageProps = {
  uuid: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ArticlePage({
  uuid,
  search,
  pagination,
}: ArticlePageProps) {
  const [articlesData, articlesError] = await catchError(() =>
    getArticlesByCategory(pagination.currentPage, 5, uuid, search)
  );

  if (articlesError) return <ErrorState />;

  if (!articlesData || articlesData?.data.length === 0) {
    // If there's a search query but no results, show NoSearchResults
    if (search && search.trim() !== "") {
      return <NoSearchResults />;
    }
    // Otherwise, show NoDataState for general no data scenario
    return <NoDataState />;
  }

  return (
    <ArticlesList
      articles={articlesData.data}
      title={`المقالات - ${uuid}`}
      pagination={pagination}
      totalPages={articlesData.meta.last_page}
    />
  );
}
