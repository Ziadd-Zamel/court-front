"use client";

import { useQueryStates } from "nuqs";
import { parseAsString } from "nuqs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const strictParser = parseAsString.withDefault("0");

const RESTRICTION_LABELS = [
  "بِنقطتي الياء النهائية؛",
  "بهمزة الألف الابتدائية؛",
  "بالتاء المربوطة.",
] as const;

export default function PrincipleStrictSwitches({
  className,
}: {
  className?: string;
}) {
  const [strict, setStrict] = useQueryStates(
    {
      strict_ya: strictParser,
      strict_alef: strictParser,
      strict_ta: strictParser,
    },
    {
      shallow: false,
      clearOnDefault: false,
      scroll: false,
    },
  );

  const isAllOn =
    strict.strict_ya === "1" &&
    strict.strict_alef === "1" &&
    strict.strict_ta === "1";

  const handleAllChange = (checked: boolean) => {
    const value = checked ? "1" : "0";
    setStrict({
      strict_ya: value,
      strict_alef: value,
      strict_ta: value,
    });
  };

  return (
    <div
      className={cn(
        "w-full border border-gray-300 dark:border-white/10 rounded-none p-4 mt-4 bg-white dark:bg-white/10",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3" dir="rtl">
        <h3 className="text-base font-semibold text-black dark:text-white">
          تقيَّد:
        </h3>
        <Switch
          id="strict-all"
          checked={isAllOn}
          onCheckedChange={handleAllChange}
        />
      </div>
      <ul className="space-y-2" dir="rtl">
        {RESTRICTION_LABELS.map((label) => (
          <li key={label} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-main shrink-0" />
            <span className="text-black dark:text-white/70 text-sm">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
