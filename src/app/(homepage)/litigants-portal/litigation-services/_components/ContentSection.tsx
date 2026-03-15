"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import SearchResults from "./SearchResults";
import NoDataState from "@/components/custom/no-data-state";

const ContentSection = () => {
  const [activeTab, setActiveTab] = useQueryState("tab");

  return (
    <Tabs
      dir="rtl"
      className="w-full"
      defaultValue="content"
      value={activeTab || "content"}
      onValueChange={setActiveTab}
    >
      <TabsList className="bg-transparent gap-5 mt-3 w-full lg:w-fit">
        <TabsTrigger
          className="bg-transparent cursor-pointer pb-7 px-0 sm:px-5 text-xl rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-t-0 border-x-0 border-b-2 data-[state=active]:border-b-4 border-main"
          value="content"
        >
          كل المحامين
        </TabsTrigger>
        <TabsTrigger
          className="bg-transparent cursor-pointer pb-7 px-0 sm:px-5 text-xl rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-t-0 border-x-0 border-b-2 data-[state=active]:border-b-4 border-main"
          value="searchResult"
        >
          نتائج البحث
        </TabsTrigger>
      </TabsList>

      <TabsContent value="searchResult">
        <SearchResults />
      </TabsContent>

      <TabsContent value="content" className="w-full mt-10">
        {/* TODO: Restore data display when ready - always show no data for now */}
        <NoDataState
          title="لم تُرفع بيانات هذه الصفحة بعد"
          message="في انتظار إمدادنا بها من النقابة العامة للمحامين"
          showRefreshButton={false}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContentSection;
