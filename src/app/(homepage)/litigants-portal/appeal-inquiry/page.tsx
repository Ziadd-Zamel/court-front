import SecondaryHeading from "@/components/common/seondary-heading";
import AppealInquiryPage from "./_components/appealInquiry-page";

interface PageProps {
  searchParams: Promise<{
    appealNumber?: string;
    judicialYear?: string;
    appealType?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <SecondaryHeading title="الاستعلام عن الطعون " breadcrumb />
      <AppealInquiryPage searchParams={params} />
    </>
  );
}
