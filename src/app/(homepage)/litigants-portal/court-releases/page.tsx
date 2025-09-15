import ContactSection from "@/components/custom/contact-section";
import CourtReleasesPage from "./_components/court-releases-age";
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
      <SecondaryHeading title="إصدارات المحكمة و النشر" breadcrumb />

      {/** Main page content */}
      <CourtReleasesPage
        pagination={{
          currentPage: mainPage,
          limit: mainLimit,
        }}
      />

      {/** Contact section */}
      <ContactSection />
    </>
  );
}
