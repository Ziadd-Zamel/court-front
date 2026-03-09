"use client";

import { ReactNode } from "react";
import { useQueryStates } from "nuqs";
import { parseAsArrayOf, parseAsString } from "nuqs";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type PrincipleTypeOption = {
  label: string;
  value: string;
};

const rulingTypeParser = parseAsArrayOf(parseAsString);

interface PrincipleTypeMultiSelectProps {
  options: PrincipleTypeOption[];
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
  tablistUpContent?: ReactNode;
  tablistDownContent?: ReactNode;
  children?: ReactNode;
}

export default function PrincipleTypeMultiSelect({
  options,
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
  tablistUpContent,
  tablistDownContent,
  children,
}: PrincipleTypeMultiSelectProps) {
  const [selectedIds, setSelectedIds] = useQueryStates(
    { ruling_type_uuid: rulingTypeParser.withDefault([]) },
    { shallow: false },
  );

  function toggleType(id: string) {
    const next = selectedIds.ruling_type_uuid.includes(id)
      ? selectedIds.ruling_type_uuid.filter((x) => x !== id)
      : [...selectedIds.ruling_type_uuid, id];
    setSelectedIds({ ruling_type_uuid: next.length ? next : null });
  }

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
            const isSelected = selectedIds.ruling_type_uuid.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "main-tab py-2.5 ps-2.5 pe-2 gap-2 text-black",
                  "data-[state=inactive]:hover:bg-main/50 data-[state=inactive]:hover:text-white",
                )}
                onClick={() => toggleType(opt.value)}
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
