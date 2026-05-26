import AppealSidebarContent from "./appeal-sidebar-content";

type SidebarProps = {
  showstates: boolean;
  caseData?: CaseDataType[];
};

const Sidebar = ({ showstates, caseData }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col border-gray-300 bg-[#F1E2CE] pt-21 pr-7 pl-16 text-right dark:border-white/10 dark:bg-[#252525]">
      <AppealSidebarContent showstates={showstates} caseData={caseData} />
    </div>
  );
};

export default Sidebar;
