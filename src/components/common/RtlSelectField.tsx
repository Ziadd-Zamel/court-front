import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface RtlSelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
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

  return (
    <div className="flex flex-row-reverse items-center gap-5">
      <label
        className="w-1/4 rounded-md bg-[#FBF3E0] px-3 py-2 text-right font-zain text-[10px] font-semibold text-gray-700 sm:py-[14px] sm:text-xl lg:text-lg min-[1200px]:text-xl"
        style={{ direction: "rtl" }}
      >
        {label}
      </label>
      <div className="relative w-3/4" ref={dropdownRef}>
        <div
          className="flex cursor-pointer items-center justify-between rounded-md bg-[#FBF3E0] px-3 py-1 sm:py-4"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <MdKeyboardArrowDown className="size-5 text-gray-500" />
          <span
            className="text-right text-gray-500"
            style={{ direction: "rtl" }}
          >
            {value || placeholder}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <div
                key={option}
                className="cursor-pointer p-3 text-right hover:bg-gray-100"
                onClick={() => {
                  onChange(option);
                  setIsDropdownOpen(false);
                }}
                style={{ direction: "rtl" }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
