import { cn } from "@/lib/utils";

export default function SimpleTableRow({
  label = "",
  value = "",
  white = true,
  className = "",
}) {
  return (
    <tr>
      <td
        className={cn(
          "border border-gray-300 dark:border-white/10 h-12 text-xs font-semibold text-gray-700 dark:text-white/90 sm:text-base text-right w-1/3 px-3",
          white ? "bg-white dark:bg-[#121212]" : "bg-[#FBF3E0] dark:bg-[#181818]",
          className,
        )}
      >
        {label}
      </td>
      <td
        className={cn(
          "border border-gray-300 dark:border-white/10 text-gray-500 dark:text-white/70 h-12 w-2/3 px-3 text-sm",
          white ? "bg-white dark:bg-[#121212]" : "bg-[#FBF3E0] dark:bg-[#181818]",
        )}
      >
        {value}
      </td>
    </tr>
  );
}
