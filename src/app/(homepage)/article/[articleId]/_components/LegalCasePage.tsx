import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import { getArticleByID } from "@/lib/api/articles";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";
import SecondaryHeading from "@/components/common/seondary-heading";
import Sidebar from "./Sidebar";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { ShareButton } from "@/components/common/share-button";
import { CopyButton } from "@/components/common/copy-button";
import { DownloadButton } from "@/components/common/download-button";

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
      <SecondaryHeading
        IconSecyion={
          <div className="flex items-center gap-3 w-full h-full">
            <BookmarkButton item={article} type="article" />
            <ShareButton item={article} type="article" />
            <CopyButton text={article.rule.body_text} />
            {article.pdf_file && <DownloadButton url={article.pdf_file} />}
          </div>
        }
        title={article.sub_category}
      />

      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent article={article} />
        <div className="hidden min-h-screen lg:block w-1/4">
          <Sidebar article={article} />
        </div>
      </div>
    </>
  );
}
