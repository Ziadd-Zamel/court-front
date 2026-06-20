import { cn } from "@/lib/utils";

export default function SimpleTableRow({
  label = "",
  value = "",
  white = true,
  className = "",
  compact = false,
}: {
  label?: string;
  value?: string;
  white?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <tr>
      <td
        className={cn(
          "border border-gray-300 text-right font-semibold text-gray-700 dark:border-white/10 dark:text-white/90",
          compact
            ? "h-7 px-2 text-[10px] w-1/3"
            : "h-10 px-2 text-[10px] w-1/3 sm:h-12 sm:px-3 sm:text-base",
          white ? "bg-white dark:bg-[#121212]" : "bg-[#FBF3E0] dark:bg-[#181818]",
          className,
        )}
      >
        {label}
      </td>
      <td
        className={cn(
          "border border-gray-300 text-gray-500 dark:border-white/10 dark:text-white/70 w-2/3",
          compact ? "h-7 px-2 text-[10px]" : "h-10 px-2 text-xs sm:h-12 sm:px-3 sm:text-sm",
          white ? "bg-white dark:bg-[#121212]" : "bg-[#FBF3E0] dark:bg-[#181818]",
        )}
      >
        {value}
      </td>
    </tr>
  );
}
