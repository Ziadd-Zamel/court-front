"use client";

import { useQueryState } from "nuqs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const SWITCHES = [
  {
    key: "strict_ya" as const,
    label: "تقييد بنقطتي الياء النهائية",
  },
  {
    key: "strict_alef" as const,
    label: "تقييد بهمزة الألف الابتدائية",
  },
  {
    key: "strict_ta" as const,
    label: "تقييد بالتاء المربوطة",
  },
] as const;

export default function PrincipleStrictSwitches({
  className,
}: {
  className?: string;
}) {
  const [strictYa, setStrictYa] = useQueryState("strict_ya", {
    defaultValue: "0",
    clearOnDefault: false,
    scroll: false,
  });
  const [strictAlef, setStrictAlef] = useQueryState("strict_alef", {
    defaultValue: "0",
    clearOnDefault: false,
    scroll: false,
  });
  const [strictTa, setStrictTa] = useQueryState("strict_ta", {
    defaultValue: "0",
    clearOnDefault: false,
    scroll: false,
  });

  const setters = {
    strict_ya: setStrictYa,
    strict_alef: setStrictAlef,
    strict_ta: setStrictTa,
  };

  const values = {
    strict_ya: strictYa,
    strict_alef: strictAlef,
    strict_ta: strictTa,
  };

  return (
    <div className={cn("flex flex-col gap-8 w-full pt-10", className)}>
      {SWITCHES.map(({ key, label }) => (
        <div
          key={key}
          className="flex items-center justify-between gap-4 text-start"
        >
          <span className="text-gray-600 text-xs md:text-sm">{label}</span>
          <Switch
            id={key}
            checked={values[key] === "1"}
            onCheckedChange={(checked) => setters[key](checked ? "1" : "0")}
          />
        </div>
      ))}
    </div>
  );
}
