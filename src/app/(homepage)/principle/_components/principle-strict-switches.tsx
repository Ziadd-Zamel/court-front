"use client";

import { useQueryStates } from "nuqs";
import { parseAsString } from "nuqs";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const strictParser = parseAsString.withDefault("0");

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

  const handleChange = (checked: boolean) => {
    const value = checked ? "1" : "0";
    setStrict({
      strict_ya: value,
      strict_alef: value,
      strict_ta: value,
    });
  };

  return (
    <button
      type="button"
      onClick={() => handleChange(!isAllOn)}
      className={cn(
        "main-tab py-2.5 ps-2.5 pe-2 gap-2 text-black",
        "data-[state=inactive]:hover:bg-main/50 data-[state=inactive]:hover:text-white",
        className
      )}
      data-state={isAllOn ? "active" : "inactive"}
    >
      <span>تقييدات الحروف العربية</span>
      <ChevronLeft
        size={18}
        className={isAllOn ? "text-white" : "text-inherit"}
      />
      <Switch
        id="strict-letters"
        checked={isAllOn}
        onCheckedChange={handleChange}
        className="sr-only"
      />
    </button>
  );
}
