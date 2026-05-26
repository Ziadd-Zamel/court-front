"use client";

import { useState } from "react";
import SecondaryHeading from "@/components/common/seondary-heading";
import ContactSection from "@/components/custom/contact-section";
import AppealMobilePanel from "./appeal-mobile-panel";
import AppealPrintButton from "./appeal-print-button";
import PageContent from "./page-content";
import Sidebar from "./Sidebar";

export default function AppealInquiryLayout() {
  const [showstates, setShowstates] = useState(false);
  const [caseData, setCaseData] = useState<CaseDataType[] | undefined>();

  return (
    <>
      <SecondaryHeading
        title="الاستعلام عن طعن"
        breadcrumb
        IconSecyion={
          <div className="flex h-full w-full items-center justify-start gap-3">
            <AppealPrintButton caseData={caseData} />
          </div>
        }
      />
      <div className="min-h-screen lg:flex lg:flex-row dark:bg-[#121212]">
        <div className="min-w-0 flex-1">
          <PageContent
            showstates={showstates}
            setShowstates={setShowstates}
            onCaseData={setCaseData}
          />
          <AppealMobilePanel showstates={showstates} caseData={caseData} />
        </div>
        <div className="hidden min-h-screen w-1/4 lg:block">
          <Sidebar showstates={showstates} caseData={caseData} />
        </div>
      </div>
      <ContactSection
        title="ملاحظاتك عن الخدمة"
        description="هذه المساحة مخصصة لملاحظاتك واقتراحاتك بشأن خدمة الاستعلام عن الطعون. مشاركتك لها ستسهم –بعون الله– في تطوير الخدمة وتحسين الأداء."
        subDescription="سندرس كل الملاحظات والمقترحات بعناية، وسنعمل –بإذنه تعالى– على الاستفادة منها بما يحقق خدمة أفضل وأكثر استجابة لحاجات المتقاضين."
      />
    </>
  );
}
