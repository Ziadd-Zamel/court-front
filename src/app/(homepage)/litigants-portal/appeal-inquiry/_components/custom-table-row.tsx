import { cn } from "@/lib/utils";

export default function CustomRow({
  label = "",
  value = "",
  compact = false,
}: {
  label?: string;
  value?: string;
  compact?: boolean;
}) {
  return (
    <tr>
      <td
        className={cn(
          "border border-gray-300 text-right bg-white dark:border-white/10 dark:bg-[#121212]",
          compact ? "h-7" : "h-10 sm:h-12",
        )}
      />
      <td
        className={cn(
          "border border-gray-300 bg-white dark:border-white/10 dark:bg-[#121212]",
          compact ? "h-7" : "h-10 sm:h-12",
        )}
      >
        <div className="flex h-full w-full items-center">
          <p
            className={cn(
              "flex-center justify-start border-l border-gray-300 font-semibold text-gray-700 dark:border-white/10 dark:text-white/90",
              compact
                ? "h-7 w-[90px] pr-2 text-[10px]"
                : "h-10 w-[120px] pr-2 text-[10px] sm:h-12 sm:w-[150px] sm:pr-3 sm:text-base",
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              "text-gray-500 dark:text-white/70",
              compact ? "pr-2 text-[10px]" : "pr-2 text-xs sm:pr-3 sm:text-sm",
            )}
          >
            {value}
          </p>
        </div>
      </td>
    </tr>
  );
}
