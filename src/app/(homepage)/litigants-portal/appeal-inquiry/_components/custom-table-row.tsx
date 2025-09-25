export default function CustomRow({ label = "", value = "" }) {
  return (
    <tr>
      <td className="border border-gray-300 h-12 text-right"></td>
      <td className="border border-gray-300  h-12">
        <div className="w-full flex items-center h-full">
          <p className="w-[150px] border-l border-gray-300 h-12 text-xs font-semibold text-gray-700 sm:text-lg flex-center justify-start pr-3">
            {label}
          </p>
          <p className=" text-sm sm:text-base text-gray-500 pr-3">{value}</p>
        </div>
      </td>
    </tr>
  );
}
