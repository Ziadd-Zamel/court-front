import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface RtlSelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ClassificationDataType[];
  placeholder: string;
}

export default function RtlSelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: RtlSelectFieldProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getDisplayName = () => {
    if (!value) return placeholder;
    const selectedOption = options.find(
      (option) => option.id.toString() === value
    );
    return selectedOption?.classname || placeholder;
  };

  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-5">
      <label className=" w-fit sm:w-1/4 rounded-md bg-[#FBF3E0] px-3 py-2 text-xs font-semibold text-gray-700 sm:py-[14px] sm:text-xl lg:text-lg min-[1200px]:text-xl">
        {label}
      </label>
      <div className="relative sm:w-3/4" ref={dropdownRef}>
        <div
          className="flex cursor-pointer items-center justify-between rounded-md bg-[#FBF3E0] px-3 py-1 sm:py-4"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span
            className={`text-right ${!value ? "text-gray-500" : "text-black"}`}
          >
            {getDisplayName()}
          </span>{" "}
          <MdKeyboardArrowDown className="size-5 text-gray-500" />
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <div
                key={option.id}
                className="cursor-pointer p-3 text-right hover:bg-gray-100"
                onClick={() => {
                  onChange(option.id.toString());
                  setIsDropdownOpen(false);
                }}
              >
                {option.classname}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
