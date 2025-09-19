import MainHeading from "@/components/common/main-heading";
import ReusableTabsSkeleton from "@/components/custom/reusable-tabs-skeleton";
import CounselorsPage from "./_components/counselors-page";
import { Suspense } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  // Get the page and the limit form serach params
  const resolvedSearchParams = await searchParams;

  // destructure page and limit from serach param
  const mainPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const mainLimit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 10)
  );
  return (
    <>
      {/** Heading */}
      <SecondaryHeading title="مستشارو المحكمة العليا" />

      {/** Main page content */}
      <CounselorsPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
        search={resolvedSearchParams.search}
      />
    </>
  );
}
