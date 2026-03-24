import SearchBar from "@/components/common/search-bar";

const Sidebar = ({ article }: { article: Article }) => {
  return (
    <div className="flex h-full w-full flex-col items-end border-l border-gray-300 bg-[#F1E2CE] pl-16 pr-7 dark:border-white/10 dark:bg-[#1a1a1a]">
      <div className="w-full mt-10">
        <SearchBar className="!py-.5 px-3" />

        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="w-full mt-12">
            <h6 className="text-black font-medium text-lg mb-5 dark:text-white">
              روابط موضوعية:
            </h6>
            <div className="flex flex-wrap flex-col gap-2 w-full">
              {article.tags.reverse().map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center w-fit px-1.5 py-1 text-xs font-medium bg-white/60 text-gray-800 border border-gray-200 hover:bg-white/80 transition-colors cursor-pointer dark:bg-white/10 dark:text-white/80 dark:border-white/20 dark:hover:bg-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
