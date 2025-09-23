export default function CustomRow({ label = "", value = "" }) {
  return (
    <tr>
      <td className="border border-black h-12 text-right"></td>
      <td className="border border-black h-12">
        <div className="w-full flex items-center h-full">
          <p className="w-[150px] border-l border-black h-12 flex-center justify-start pr-3">
            {label}
          </p>
          <p>{value}</p>
        </div>
      </td>
    </tr>
  );
}
