import CourtLawsPage from "./_components/courts-law-page";
import SecondaryHeading from "@/components/common/seondary-heading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}) {
  // Get the page and the limit form search params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from search param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 10)
  );

  // Extract search queries
  const search = resolvedSearchParams.search;

  return (
    <>
      {/** Heading */}
      <SecondaryHeading title="قوانين المحكمة العليا" breadcrumb />

      {/** Main page content */}
      <CourtLawsPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        searchQueries={{
          search: search,
        }}
      />
    </>
  );
}
