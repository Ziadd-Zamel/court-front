import catchError from "@/lib/utils/catch-error";
import ErrorState from "@/components/custom/error-state";
import NoSearchResults from "@/components/custom/no-result";
import NoDataState from "@/components/custom/no-data-state";
import AssemblyList from "./assembly-list";
import { getAssemblyByCategory } from "@/lib/api/assembly.api";
import SectionHeading from "@/components/common/section-heading";

type AssemblyContentProps = {
  uuid: string;
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  heading?: string;
};

export default async function AssemblyContent({
  uuid,
  search,
  pagination,
  heading,
}: AssemblyContentProps) {
  const [articlesData, articlesError] = await catchError(() =>
    getAssemblyByCategory(pagination.currentPage, 5, uuid, search),
  );

  const total = articlesData?.meta?.total ?? 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} />
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
      <AssemblyList
        articles={articlesData.data}
        title={`المقالات - ${uuid}`}
        pagination={pagination}
        totalPages={articlesData.meta.last_page}
      />
    </>
  );
}
