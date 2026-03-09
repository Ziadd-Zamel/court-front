import { YEARS_SINCE_FOUNDING } from "@/lib/constants/app-years";

export default function Arabic71Component() {
  return (
    <div className="w-full">
      <div className="flex  items-center gap-1">
        <p className="font-merriweather font-extrabold text-main text-right text-5xl sm:text-7xl lg:text-[140px]">
          {YEARS_SINCE_FOUNDING}
        </p>
        <p className="-mb-[60px] text-right text-[11px] font-semibold leading-tight text-main sm:mt-6 sm:text-lg lg:text-2xl">
          عاماً
        </p>
      </div>
    </div>
  );
}
