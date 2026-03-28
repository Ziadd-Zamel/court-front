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
  maxwidth?: string;
}

export default function SecondaryTabs({
  tabs,
  defaultValue,
  direction = "rtl",
  className = "",
  tabListClassName = "",
  tabTriggerClassName = "",
  tabContentClassName = "",
  maxwidth,
}: SecondaryTabsProps) {
  const defaultTab = defaultValue || tabs[0]?.value || "";

  return (
    <Tabs
      dir={direction}
      defaultValue={defaultTab}
      className={`w-full ${className} pt-4`}
    >
      <div
        className={`flex items-center justify-start w-full ${tabListClassName}`}
      >
        <div
          className={`max-w-[880px] w-full overflow-x-auto scrollbar-tabs pb-1 ${maxwidth}`}
        >
          <TabsList
            className={`bg-transparent justify-between sm:justify-start gap-2 sm:gap-5 w-full`}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className={`
              data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent 
            cursor-pointer 
            border-b-2 
                        data-[state=active]:border-b-2 

            border-b-main  dark:border-b-main
            rounded-none 
            px-0 sm:px-3
            pb-3 sm:pb-6 
            text-sm sm:text-base
            transition-all 
            duration-300 
            ease-in-out
            hover:border-b-main/60
            hover:text-main/80
            data-[state=active]:border-b-[8px] 
            data-[state=active]:border-b-main 
            data-[state=active]:shadow-none 
            data-[state=active]:hover:border-b-main
            dark:text-foreground dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:border-b-main
            ${tabTriggerClassName}
            `}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          className={`mt-10 lg:mt-0 w-full ${tabContentClassName}`}
          value={tab.value}
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
