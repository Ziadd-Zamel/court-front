import catchError from "@/lib/utils/catch-error";
import PageContent from "./page-content";
import Sidebar from "./Sidebar";
import { getCaseData } from "@/lib/api/case.api";

interface AppealInquiryPageProps {
  searchParams: {
    appealNumber?: string;
    judicialYear?: string;
    appealType?: string;
  };
}

export default async function AppealInquiryPage({
  searchParams,
}: AppealInquiryPageProps) {
  const [data, error] = await catchError(() =>
    getCaseData(
      searchParams.appealNumber,
      searchParams.judicialYear,
      searchParams.appealType
    )
  );

  return (
    <>
      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent caseData={data?.data} error={error} />
        <div className="hidden min-h-screen w-[300px] lg:block min-[1250px]:w-[400px]">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
