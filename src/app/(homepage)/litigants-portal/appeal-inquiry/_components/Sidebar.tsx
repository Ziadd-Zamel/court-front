import SearchBar from "@/components/common/search-bar";

const Sidebar = () => {
  return (
    <div className="flex h-full w-full flex-col items-end border-l border-gray-300 bg-[#F1E2CE] pl-16 pr-7">
      <div className="w-full">
        <SearchBar className="!py-.5 px-3" />
      </div>
    </div>
  );
};

export default Sidebar;
