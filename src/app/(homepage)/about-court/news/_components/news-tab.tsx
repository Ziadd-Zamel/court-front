import { getNewsArticles } from "@/lib/api/news";
import catchError from "@/lib/utils/catch-error";
import NewsCard from "@/components/common/news-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";

interface NewsTabProps {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQuery?: string;
}

export default async function NewsTab({
  pagination,
  searchQuery,
}: NewsTabProps) {
  // Get all the data
  const [data, error] = await catchError(() =>
    getNewsArticles(pagination.currentPage, pagination.limit, searchQuery)
  );

  // Empty data State
  if (!data || data.data.length === 0) {
    return searchQuery ? <NoSearchResults /> : <NoDataState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="box-container">
      {/** Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-y-28">
        {data?.data.map((article, index) => (
          <NewsCard key={article.uuid} article={article} index={index} />
        ))}
      </div>

      {/**Pagination ( show only if the data is bigger than limit) */}
      {data.data.length >= pagination.limit && (
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
