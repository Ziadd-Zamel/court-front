"use client";
import { useState } from "react";
import PageContent from "./page-content";
import Sidebar from "./Sidebar";
import ContactSection from "@/components/custom/contact-section";

export default function AppealInquiryPage() {
  const [showstates, setShowstates] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen lg:flex lg:flex-row dark:bg-[#121212]">
        <PageContent showstates={showstates} setShowstates={setShowstates} />
        <div className="hidden min-h-screen  lg:block w-1/4">
          <Sidebar showstates={showstates} />
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
