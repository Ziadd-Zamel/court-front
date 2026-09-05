import { getArticlesByTag } from "@/lib/api/articles";
import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import ArticlesList from "@/components/custom/articlesL-list";

type ArticlesByTagProps = {
  tagId: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function ArticlesByTag({
  tagId,
  pagination,
}: ArticlesByTagProps) {
  const [articlesData, articlesError] = await catchError(() =>
    getArticlesByTag(tagId, pagination.currentPage, pagination.limit),
  );

  if (articlesError) return <ErrorState />;

  if (!articlesData || articlesData.data.length === 0) {
    return <NoDataState />;
  }

  return (
    <div id="main-tab-content">
      <ArticlesList
        articles={articlesData.data}
        pagination={pagination}
        totalPages={articlesData.meta.last_page}
        from={`/tag/${tagId}`}
      />
    </div>
  );
}
