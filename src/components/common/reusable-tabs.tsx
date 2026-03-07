"use client";

import { ReactNode, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import SearchBar from "@/components/common/search-bar";
import { usePathname, useRouter } from "next/navigation";

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
  showHeading?: boolean;
  direction?: "ltr" | "rtl";
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
  tablistUpContent?: ReactNode;
  tablistDownContent?: ReactNode;
}

export default function ReusableTabs({
  tabs,
  defaultValue,
  showSearch = true,
  showHeading = true,
  direction = "rtl",
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
  tablistUpContent,
  tablistDownContent,
}: ReusableTabsProps) {
  const defaultTab = defaultValue || tabs[0]?.value || "";
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <Tabs
      dir={direction}
      className={`w-full ${className}`}
      defaultValue={defaultTab}
      onValueChange={handleTabChange}
    >
      <div className="flex flex-col min-[1150px]:flex-row! md:items-start gap-10 lg:gap-16 w-full">
        {/* Tab list */}
        <TabsList
          className={`flex flex-col relative items-center gap-1 md:px-20 lg:px-0  min-[1150px]:max-w-[330px]! w-full bg-transparent${tabListClassName}`}
        >
          {tablistUpContent && tablistUpContent}

          {showSearch && (
            <div className="w-full mb-12">
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
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

          {tablistDownContent && (
            <div className="w-full">{tablistDownContent}</div>
          )}
        </TabsList>

        {/* Tab content */}
        <div className="w-full">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              className={`w-full min-h-screen flex flex-col md:mt-15 ${tabContentClassName}`}
              value={tab.value}
            >
              {showHeading &&
                tab.heading && (
                  <div className="mb-10 text-right">
                    <h3 className="text-2xl font-bold text-main">
                      {tab.heading}
                    </h3>
                    <div className="mt-2 h-[2px] w-56 bg-main" />
                  </div>
                )}
              <div className="mt-6">{tab.component}</div>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
}
