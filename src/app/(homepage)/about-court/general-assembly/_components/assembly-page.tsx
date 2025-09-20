import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import NoDataState from "@/components/custom/no-data-state";
import AssemblyList from "./assembly-list";
import { getAssemblyByCategory } from "@/lib/api/assembly.api";

type AssemblyContentProps = {
  uuid: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function AssemblyContent({
  uuid,
  search,
  pagination,
}: AssemblyContentProps) {
  const [articlesData, articlesError] = await catchError(() =>
    getAssemblyByCategory(pagination.currentPage, 5, uuid, search)
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
    <AssemblyList
      articles={articlesData.data}
      title={`المقالات - ${uuid}`}
      pagination={pagination}
      totalPages={articlesData.meta.last_page}
    />
  );
}
