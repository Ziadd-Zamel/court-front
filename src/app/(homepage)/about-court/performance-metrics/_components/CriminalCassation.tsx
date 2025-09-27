/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import StatsSection, { YearlyData } from "./StatsSection";
import TrakeLineSectoin from "./TrakeLineSectoin";

export default function CriminalCassation({
  yearlyData,
}: {
  yearlyData: YearlyData;
}) {
  const [selectedYear, setSelectedYear] = useState(2013);
  const [previousYear, setPreviousYear] = useState(2013);

  useEffect(() => {
    setPreviousYear(selectedYear);
  }, [selectedYear]);

  return (
    <div className=" w-full pb-10">
      <div className="w-full space-y-5">
        <StatsSection yearlyData={yearlyData} selectedYear={selectedYear} />
        <TrakeLineSectoin
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </div>
  );
}
