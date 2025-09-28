import SearchBar from "@/components/common/search-bar";

const Sidebar = ({ article }: { article: Article }) => {
  return (
    <div className="flex h-full w-full flex-col items-end border-l border-gray-300 bg-[#F1E2CE] pl-16 pr-7">
      <div className="w-full mt-10">
        <SearchBar className="!py-.5 px-3" />

        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="w-full mt-12">
            <div className="flex flex-wrap gap-2 w-full">
              {article.tags.reverse().map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-1 text-xs font-medium bg-white/60 text-gray-800 border border-gray-200 hover:bg-white/80 transition-colors cursor-pointer"
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
