import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import { getArticleByID } from "@/lib/api/articles";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";
import SecondaryHeading from "@/components/common/seondary-heading";
import Sidebar from "./Sidebar";

export default async function LegalCasePage({
  id,
}: {
  id: string;
  search: string;
}) {
  const [data, error] = await catchError(() => getArticleByID(id));

  // Show Error When there is Error
  if (error) return <ErrorState />;

  // Show Empty When no data
  if (!data) return <NoDataState />;

  const article = data?.data;
  return (
    <>
      <SecondaryHeading title={article.title} />

      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent article={article} />
        <div className="hidden min-h-screen w-[300px] lg:block min-[1250px]:w-[400px]">
          <Sidebar article={article} />
        </div>
      </div>
    </>
  );
}
