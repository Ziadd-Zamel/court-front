import PageContent from "./page-content";
import Sidebar from "./Sidebar";

interface AppealInquiryPageProps {
  searchParams: {
    appealNumber?: string;
    judicialYear?: string;
    appealType?: string;
  };
}

export default async function AppealInquiryPage({}: AppealInquiryPageProps) {
  return (
    <>
      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent />
        <div className="hidden min-h-screen w-[300px] lg:block min-[1250px]:w-[400px]">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
