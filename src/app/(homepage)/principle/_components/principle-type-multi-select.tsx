"use client";

import { ReactNode } from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PrincipleCategoryProvider,
  usePrincipleCategory,
} from "./principle-category-context";

export type PrincipleTypeOption = {
  label: string;
  value: string;
};

interface PrincipleTypeMultiSelectProps {
  options: PrincipleTypeOption[];
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
  tablistUpContent?: ReactNode;
  tablistDownContent?: ReactNode;
  children?: ReactNode;
}

function PrincipleTypeMultiSelectInner({
  options,
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
  tablistUpContent,
  tablistDownContent,
  children,
}: PrincipleTypeMultiSelectProps) {
  const { pendingCategories, toggleCategory } = usePrincipleCategory();

  return (
    <Tabs
      dir="rtl"
      className={`w-full ${className}`}
      value=""
      onValueChange={() => {}}
    >
      <div className="flex flex-col lg:flex-row md:items-start gap-16 w-full">
        {/* Tab list */}
        <TabsList
          className={`flex flex-col relative items-center gap-1 md:px-20 lg:px-0 lg:max-w-[330px] w-full bg-transparent ${tabListClassName}`}
        >
          {tablistUpContent && tablistUpContent}

          {options.map((opt) => {
            const isSelected = pendingCategories.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "main-tab py-2.5 ps-2.5 pe-2 gap-2",
                  "data-[state=inactive]:hover:bg-main/50 data-[state=inactive]:hover:text-white",
                )}
                onClick={() => toggleCategory(opt.value)}
                data-state={isSelected ? "active" : "inactive"}
              >
                <span>{opt.label}</span>
                <ChevronLeft
                  size={18}
                  className={isSelected ? "text-white" : "text-inherit"}
                />
              </button>
            );
          })}

          {tablistDownContent && (
            <div className="w-full">{tablistDownContent}</div>
          )}
        </TabsList>

        {/* Content */}
        <div className="w-full">
          <div
            className={`w-full min-h-screen flex flex-col ${tabContentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </Tabs>
  );
}

export default function PrincipleTypeMultiSelect(
  props: PrincipleTypeMultiSelectProps,
) {
  return (
    <PrincipleCategoryProvider>
      <PrincipleTypeMultiSelectInner {...props} />
    </PrincipleCategoryProvider>
  );
}
