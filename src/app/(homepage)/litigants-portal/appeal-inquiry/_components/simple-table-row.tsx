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
          "border border-gray-300 h-12 text-xs font-semibold text-gray-700 sm:text-xl md:text-lg lg:text-xl text-right w-1/3 px-3",
          white ? "bg-white" : "bg-[#FBF3E0]",
          className
        )}
      >
        {label}
      </td>
      <td
        className={cn(
          "border border-gray-300 text-gray-500 h-12 w-2/3 px-3 text-sm sm:text-base ",
          white ? "bg-white" : "bg-[#FBF3E0]"
        )}
      >
        {value}
      </td>
    </tr>
  );
}
