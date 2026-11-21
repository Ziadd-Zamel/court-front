"use client";

import { ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import SearchBar from "@/components/common/search-bar";
import SectionHeading from "@/components/common/section-heading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

function ReusableTabsInner({
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fallbackTab = defaultValue || tabs[0]?.value || "";
  const tabValues = useMemo(() => new Set(tabs.map((t) => t.value)), [tabs]);

  const tabFromUrl = searchParams.get("tab");
  const initialTab =
    tabFromUrl && tabValues.has(tabFromUrl) ? tabFromUrl : fallbackTab;

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const next =
      tabFromUrl && tabValues.has(tabFromUrl) ? tabFromUrl : fallbackTab;
    setActiveTab(next);
  }, [tabFromUrl, fallbackTab, tabValues]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    // Reset list pagination when switching tabs
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Tabs
      dir={direction}
      className={`w-full ${className}`}
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <div className="flex flex-col min-[1150px]:flex-row! md:items-start gap-10 lg:gap-16 w-full">
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

        <div className="w-full" id="main-tab-content">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              className={`w-full min-h-screen flex flex-col md:mt-15 ${tabContentClassName}`}
              value={tab.value}
            >
              {showHeading && tab.heading && (
                <SectionHeading title={tab.heading} />
              )}
              <div className={showHeading && tab.heading ? "" : "mt-6"}>
                {tab.component}
              </div>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
}

export default function ReusableTabs(props: ReusableTabsProps) {
  return (
    <Suspense fallback={null}>
      <ReusableTabsInner {...props} />
    </Suspense>
  );
}
