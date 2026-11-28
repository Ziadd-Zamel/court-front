import CourtLawsPage from "./_components/courts-law-page";
import SecondaryHeading from "@/components/common/seondary-heading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tab?: string }>;
}) {
  const { search, tab } = await searchParams;

  return (
    <>
      <SecondaryHeading title="القوانين" breadcrumb />
      <CourtLawsPage search={search} defaultTab={tab} />
    </>
  );
}
