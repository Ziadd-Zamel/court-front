"use client";

import { Progress } from "@/components/ui/progress";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { Pie, PieChart, Cell } from "recharts";
import { ChartTooltip } from "@/components/ui/chart";

export type CaseTypes = Record<string, number>;

export type YearlyData = Record<
  number,
  {
    amount: number;
    cases: CaseTypes;
  }
>;

const AnimatedValue = ({ value }: { value: number }) => {
  const animatedValue = useCountAnimation(value);
  return <span>{Math.round(animatedValue)}</span>;
};

const COLORS = {
  "دوائر نقض الأحوال الشخصية": "#3B82F6",
  "دوائر النقض الإداري": "#EF4444",
  "دوائر النقض المدني": "#F97316",
  "دوائر النقض الجنائي": "#22C55E",
};

const LeftSection = ({
  selectedYear,
  yearlyData,
}: {
  selectedYear: number;
  yearlyData: YearlyData;
}) => {
  const chartData = Object.entries(yearlyData[selectedYear].cases).map(
    ([name, percentage]) => ({
      name,
      value: percentage,
      fill: COLORS[name as keyof typeof COLORS],
    })
  );

  return (
    <div className="w-full max-w-lg flex-col flex justify-center items-start -mt-7">
      <PieChart width={300} height={300} className="mr-10">
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-white p-3 shadow-lg">
                  <p className="text-right font-medium text-gray-900">
                    {payload[0].name}
                  </p>
                  <p className="text-right text-sm text-gray-600">
                    {payload[0].value}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={0}
          stroke="0"
          strokeWidth={0}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 gap-x-20 text-sm">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-right text-black text-xs">{item.name}</span>
            </div>
            <span className="font-medium text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RightSection = ({
  selectedYear,
  yearlyData,
}: {
  selectedYear: number;
  yearlyData: YearlyData;
}) => {
  return (
    <div className="w-full space-y-8 lg:w-1/2">
      <div className="">
        <h2 className="text-right font-zain text-2xl font-bold text-black sm:text-4xl lg:text-3xl">
          المعدل الفردي{" "}
        </h2>
      </div>
      <div className="space-y-5">
        {Object.entries(yearlyData[selectedYear].cases).map(
          ([caseName, percentage]) => (
            <div key={caseName} className="space-y-3">
              <div className="flex flex-row-reverse items-center justify-between text-black">
                <span className="text-[14px] font-bold text-main">
                  <AnimatedValue value={Math.round(percentage)} />%
                </span>
                <span className="text-sm font-medium">{caseName}</span>
              </div>
              <Progress
                value={Math.round(percentage)}
                className="!important [&>div]:!border-b-none border-b-transparent h-2 rotate-180 border-t-2 bg-transparent [&>div]:!bg-main"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const StatsSection = ({
  selectedYear,
  yearlyData,
}: {
  selectedYear: number;
  yearlyData: YearlyData;
}) => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-10 pt-12 lg:flex-row-reverse">
        <RightSection selectedYear={selectedYear} yearlyData={yearlyData} />
        <LeftSection selectedYear={selectedYear} yearlyData={yearlyData} />
      </div>
    </>
  );
};

export default StatsSection;
