import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import SearchBar from "@/components/common/search-bar";

export interface TabItem {
  label: string;
  value: string;
  heading?: string;
  component: ReactNode;
}

interface ReusableTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  showSearch?: boolean;
  direction?: "ltr" | "rtl";
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
}

export default function ReusableTabs({
  tabs,
  defaultValue,
  showSearch = true,
  direction = "rtl",
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
}: ReusableTabsProps) {
  const defaultTab = defaultValue || tabs[0]?.value || "";

  return (
    <Tabs
      dir={direction}
      className={`w-full ${className} mt-10`}
      defaultValue={defaultTab}
    >
      <div className="flex flex-col lg:flex-row md:items-start gap-16 w-full">
        {/* Tab list */}
        <TabsList
          className={`flex flex-col relative items-center gap-1 md:px-20 lg:px-0 lg:max-w-[330px] w-full bg-transparent mt-40 ${tabListClassName}`}
        >
          {showSearch && (
            <div className="w-full mb-12">
              <SearchBar />
            </div>
          )}

          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="!main-tab"
              value={tab.value}
            >
              <span>{tab.label}</span>
              <ChevronLeft />
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content */}
        <div className="w-full">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              className={`mt-32 w-full min-h-screen flex flex-col${tabContentClassName}`}
              value={tab.value}
            >
              {tab.heading && (
                <h3 className="text-2xl font-bold text-main sm:mb-8 sm:text-3xl">
                  {tab.heading}
                </h3>
              )}
              <div className="mt-6">{tab.component}</div>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
}
