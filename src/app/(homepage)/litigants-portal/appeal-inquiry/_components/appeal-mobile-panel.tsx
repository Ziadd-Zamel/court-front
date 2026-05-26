"use client";

import AppealPrintButton from "./appeal-print-button";
import AppealSidebarContent from "./appeal-sidebar-content";

type Props = {
  showstates: boolean;
  caseData?: CaseDataType[];
};

export default function AppealMobilePanel({ showstates, caseData }: Props) {
  const hasCaseData = Boolean(caseData?.length);

  return (
    <div className="lg:hidden">
      {hasCaseData ? (
        <div className="mx-2 mb-4 flex items-center justify-center gap-3 rounded-sm border border-gray-200/60 bg-white/90 px-4 py-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <AppealPrintButton
            caseData={caseData}
            className="shrink-0 !size-9 p-1.5"
            size={18}
          />
        </div>
      ) : null}

      <div className="mx-2 mb-10 rounded-sm border border-gray-200/60 bg-[#F1E2CE] px-5 py-6 text-right shadow-sm dark:border-white/10 dark:bg-[#252525]">
        <AppealSidebarContent
          showstates={showstates}
          caseData={caseData}
          compact
        />
      </div>
    </div>
  );
}
