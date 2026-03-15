"use client";
import React from "react";

interface RtlInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const RtlInputField: React.FC<RtlInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => {
  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-5">
      <label className="w-fit sm:w-1/4 rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-white sm:py-[14px] sm:text-xs lg:text-sm">
        {label}
      </label>
      <div className="sm:w-3/4">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-md bg-[#FBF3E0] dark:bg-white/10 dark:border dark:border-white/10 dark:text-white px-3 py-1 placeholder:text-xs placeholder:text-gray-400 dark:placeholder:text-white/50 sm:py-[12px] sm:placeholder:text-xs sm:text-xs lg:text-sm"
        />
      </div>
    </div>
  );
};

export default RtlInputField;
