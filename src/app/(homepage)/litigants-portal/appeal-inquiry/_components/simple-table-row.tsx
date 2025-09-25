import { cn } from "@/lib/utils";

export default function SimpleTableRow({
  label = "",
  value = "",
  white = true,
}) {
  return (
    <tr>
      <td
        className={cn(
          "border border-black h-12 font-medium text-sm sm:text-xl text-right w-1/3 px-3",
          white ? "bg-white" : "bg-secndary"
        )}
      >
        {label}
      </td>
      <td
        className={cn(
          "border border-black h-12 w-2/3 px-3  text-sm sm:text-xl ",
          white ? "bg-white" : "bg-secndary"
        )}
      >
        {value}
      </td>
    </tr>
  );
}
