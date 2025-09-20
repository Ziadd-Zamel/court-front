import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import NoDataState from "@/components/custom/no-data-state";
import ErrorState from "@/components/custom/error-state";
import SecondaryHeading from "@/components/common/seondary-heading";
import { getBookByID } from "@/lib/api/books";

export default async function BookPage({ id }: { id: string }) {
  const [data, error] = await catchError(() => getBookByID(id));

  // Show Error When there is Error
  if (error) return <ErrorState />;

  // Show Empty When no data
  if (!data) return <NoDataState />;

  const Book = data?.data;
  return (
    <>
      <SecondaryHeading title={Book.title} />

      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent Book={Book} />
      </div>
    </>
  );
}
