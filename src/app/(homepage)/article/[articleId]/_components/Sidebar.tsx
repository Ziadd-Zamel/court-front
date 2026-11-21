import ArticleSidebarContent from "./article-sidebar-content";

const Sidebar = ({ article }: { article: Article }) => {
  return (
    <div className="flex h-full w-full flex-col items-end border-l border-gray-300 bg-[#F1E2CE] pl-16 pr-7 dark:border-white/10 dark:bg-[#252525]">
      <ArticleSidebarContent article={article} />
    </div>
  );
};

export default Sidebar;
