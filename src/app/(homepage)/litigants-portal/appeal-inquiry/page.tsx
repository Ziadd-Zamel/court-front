import SecondaryHeading from "@/components/common/seondary-heading";
import AppealInquiryPage from "./_components/appealInquiry-page";

// interface PageProps {
//   searchParams: Promise<{
//     appealNumber?: string;
//     judicialYear?: string;
//     appealType?: string;
//   }>;
// }

export default async function Page() {
  return (
    <>
      <SecondaryHeading title="الاستعلام عن الطعون " breadcrumb />
      <AppealInquiryPage />
    </>
  );
}
