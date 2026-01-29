/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import TrakeLineSectoin from "./TrakeLineSectoin";
import { yearlyData } from "@/lib/constants";
import StatsSection from "../about-court/performance-metrics/_components/StatsSection";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import Link from "next/link";

const CombinedComponent = () => {
  const [selectedYear, setSelectedYear] = useState(2013);
  const [previousYear, setPreviousYear] = useState(2013);

  useEffect(() => {
    setPreviousYear(selectedYear);
  }, [selectedYear]);

  return (
    <div className=" w-full pb-40 pt-16 bg-white flex flex-col justify-center items-center">
      <AnimatedSectionHeader title="الفصل في الطعون" />
      <div className="w-full space-y-5 box-container ">
        <StatsSection yearlyData={yearlyData} selectedYear={selectedYear} />
        <TrakeLineSectoin
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
      <Link
        className="self-end me-18 text-lg text-main font-semibold mt-26 -mb-16"
        href={"/about-court/performance-metrics"}
      >
        التفاصيل
      </Link>
    </div>
  );
};

export default CombinedComponent;
