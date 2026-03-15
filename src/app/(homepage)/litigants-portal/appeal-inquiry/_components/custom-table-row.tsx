export default function CustomRow({ label = "", value = "" }) {
  return (
    <tr>
      <td className="border border-gray-300 dark:border-white/10 h-12 text-right bg-white dark:bg-[#121212]"></td>
      <td className="border border-gray-300 dark:border-white/10 h-12 bg-white dark:bg-[#121212]">
        <div className="w-full flex items-center h-full">
          <p className="w-[150px] border-l border-gray-300 dark:border-white/10 h-12 text-xs font-semibold text-gray-700 dark:text-white/90 sm:text-base flex-center justify-start pr-3">
            {label}
          </p>
          <p className=" text-sm text-gray-500 dark:text-white/70 pr-3">{value}</p>
        </div>
      </td>
    </tr>
  );
}
