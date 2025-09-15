import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface SecondaryTabItem {
  label: string;
  value: string;
  component: ReactNode;
}

interface SecondaryTabsProps {
  tabs: SecondaryTabItem[];
  defaultValue?: string;
  direction?: "ltr" | "rtl";
  className?: string;
  tabListClassName?: string;
  tabTriggerClassName?: string;
  tabContentClassName?: string;
}

export default function SecondaryTabs({
  tabs,
  defaultValue,
  direction = "rtl",
  className = "",
  tabListClassName = "",
  tabTriggerClassName = "",
  tabContentClassName = "",
}: SecondaryTabsProps) {
  const defaultTab = defaultValue || tabs[0]?.value || "";

  return (
    <Tabs
      dir={direction}
      defaultValue={defaultTab}
      className={`w-full ${className}`}
    >
      <TabsList
        className={`bg-transparent  max-w-[400px] justify-between sm:justify-start gap-2 sm:gap-5 w-full pt-20 lg:pt-0 ${tabListClassName}`}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            className={`
              data-[state=active]:bg-transparent 
              cursor-pointer 
              border-b-3 
              data-[state=active]:border-b-main 
              data-[state=active]:shadow-none 
              border-b-transparent 
              rounded-none 
              px-0 sm:px-5 
              pb-3 sm:pb-6 
              text-sm sm:text-2xl 
              transition-all 
              duration-300 
              ease-in-out
              hover:border-b-main/60
              hover:text-main/80
              hover:scale-105
              data-[state=active]:hover:border-b-main
              data-[state=active]:hover:text-current
              data-[state=active]:hover:scale-100
              data-[state=active]:hover:pb-3 sm:data-[state=active]:hover:pb-6
              ${tabTriggerClassName}
            `}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          className={`mt-20 lg:mt-0 w-full ${tabContentClassName}`}
          value={tab.value}
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
