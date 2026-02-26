import CourtLawsPage from "./_components/courts-law-page";
import SecondaryHeading from "@/components/common/seondary-heading";

export default async function Page() {
  return (
    <>
      {/** Heading */}
      <SecondaryHeading title="قوانين المحكمة العليا" breadcrumb />

      {/** Main page content */}
      <CourtLawsPage />
    </>
  );
}
