"use client";

import { useCountAnimation } from "@/hooks/useCountAnimation";
import { Pie, PieChart, Cell } from "recharts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export type YearlyData = Record<
  number,
  {
    percentage: number; // Main percentage to display
    title: string; // Title for the section
  }
>;

const AnimatedValue = ({ value }: { value: number }) => {
  const animatedValue = useCountAnimation(value);
  return <span>{Math.round(animatedValue)}</span>;
};

const TrakeLineSectoin = ({
  setSelectedYear,
  selectedYear,
}: {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const years = [
    { year: 2012, label: "ديسمبر، ٢٠٢٤" },
    { year: 2013, label: "يناير، ٢٠٢٥" },
    { year: 2014, label: "فبراير، ٢٠٢٥" },
    { year: 2015, label: "مارس، ٢٠٢٥" },
    { year: 2016, label: "أبريل، ٢٠٢٥" },
  ];

  return (
    <div className="relative mt-12 px-7">
      <div className="relative flex items-center justify-between">
        <button
          className="absolute -left-8 text-gray-400 transition-colors hover:text-gray-300 cursor-pointer"
          onClick={() => {
            const currentIndex = years.findIndex(
              (item) => item.year === selectedYear
            );
            if (currentIndex < years.length - 1) {
              setSelectedYear(years[currentIndex + 1].year);
            }
          }}
        >
          <ArrowLeft className="size-5 sm:size-6" />
        </button>

        <div className="h-[2px] w-full bg-[#e4e4e4] sm:h-[4px]">
          <div
            className="h-full bg-main transition-all duration-500"
            style={{
              width: `${
                years.findIndex((item) => item.year === selectedYear) * 25
              }%`,
            }}
          />
        </div>

        <div className="absolute flex w-full justify-between">
          {years.map((item) => (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className="group relative w-fit cursor-pointer"
            >
              <div
                className={`h-1 w-1 rounded-full transition-all duration-300 sm:h-2 sm:w-2 ${
                  selectedYear === item.year
                    ? "bg-white ring-4 ring-[#3e5481] sm:ring-8"
                    : "bg-white ring-4 ring-[#e4e4e4] hover:ring-4 hover:ring-[#3e5481] sm:ring-8"
                } `}
              />
              <span className="absolute bottom-5 left-1/2 w-[50px] -translate-x-1/2 transform text-[10px] font-bold text-black sm:w-[120px] sm:text-lg">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <button
          className="absolute -right-8 text-gray-400 transition-colors hover:text-gray-300 cursor-pointer"
          onClick={() => {
            const currentIndex = years.findIndex(
              (item) => item.year === selectedYear
            );
            if (currentIndex > 0) {
              setSelectedYear(years[currentIndex - 1].year);
            }
          }}
        >
          <ArrowRight className="size-5 sm:size-6" />
        </button>
      </div>
    </div>
  );
};

const SimplifiedStatsSection = ({
  selectedYear,
  yearlyData,
}: {
  selectedYear: number;
  yearlyData: YearlyData;
}) => {
  const currentData = yearlyData[selectedYear];

  // Create pie chart data - main percentage and remainder
  const chartData = [
    {
      name: "main",
      value: currentData.percentage,
      fill: "#22C55E", // Green color
    },
    {
      name: "remainder",
      value: 100 - currentData.percentage,
      fill: "#374151", // Dark gray color
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto mb-40">
      <div className=" flex items-center justify-between w-full ">
        <div className="flex items-center justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={0}
              startAngle={90}
              endAngle={450}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Right side - Percentage and Title */}
        <div className="text-black text-8xl font-bold mr-40">
          <AnimatedValue value={currentData.percentage} />
          <span className="text-5xl">%</span>
        </div>
      </div>
    </section>
  );
};

export default function CassationProsecution() {
  const [selectedYear, setSelectedYear] = useState(2013);
  const sampleData: YearlyData = {
    2012: { percentage: 90, title: "نيابة النقض" },
    2013: { percentage: 88, title: "نيابة النقض" },
    2014: { percentage: 77, title: "نيابة النقض" },
    2015: { percentage: 66, title: "نيابة النقض" },
    2016: { percentage: 33, title: "نيابة النقض" },
  };

  return (
    <div className="w-full pb-10">
      <div className="w-full space-y-8">
        <SimplifiedStatsSection
          yearlyData={sampleData}
          selectedYear={selectedYear}
        />
        <TrakeLineSectoin
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </div>
  );
}
