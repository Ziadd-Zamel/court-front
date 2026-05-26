"use client";

import { useState, useEffect, useMemo } from "react";

const STAGE_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-blue-500",
] as const;

const appealStages = [
  "التقرير بالطعن",
  "إيداع المذكرات",
  "الشق المستعجل",
  "رأي نيابة النقض",
  "فحص الطعن",
  "إعلان موعد الجلسة",
  "نظر الموضوع",
  "الفصل في الطعن",
  "إعادة القضية",
];

function clampPercent(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function avgPercent(...values: unknown[]): number {
  if (!values.length) return 0;
  const nums = values.map(clampPercent);
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

function buildProgressFromCase(caseItem: CaseDataType | undefined) {
  if (!caseItem) return [];

  return [
    {
      stage: "الشق المستعجل",
      progress: clampPercent(caseItem.appeals_urgent?.[0]?.percentage),
      color: STAGE_COLORS[0],
    },
    {
      stage: "رأي نيابة النقض",
      progress: avgPercent(
        caseItem.niaba?.date_of_move_percentage,
        caseItem.niaba?.date_of_filing_percentage,
      ),
      color: STAGE_COLORS[2],
    },
    {
      stage: "فحص الطعن",
      progress: clampPercent(caseItem.appeals_review?.[0]?.percentage),
      color: STAGE_COLORS[1],
    },
    {
      stage: "نظر الطعن",
      progress: clampPercent(caseItem.appeals_sessions?.[0]?.percentage),
      color: STAGE_COLORS[3],
    },
    {
      stage: "الفصل في الطعن",
      progress: avgPercent(
        caseItem.final_judgment?.draft_judgment_percentage,
        caseItem.final_judgment?.final_judgment_percentage,
      ),
      color: STAGE_COLORS[4],
    },
  ];
}

type Props = {
  showstates: boolean;
  caseData?: CaseDataType[];
  compact?: boolean;
};

export default function AppealSidebarContent({
  showstates,
  caseData,
  compact = false,
}: Props) {
  const [animatedProgress, setAnimatedProgress] = useState<
    Record<string, number>
  >({});
  const [circularProgress, setCircularProgress] = useState(0);

  const caseItem = caseData?.[0];
  const progressItems = useMemo(
    () => buildProgressFromCase(caseItem),
    [caseItem],
  );

  const overallPercent = useMemo(() => {
    if (!progressItems.length) return 0;
    return Math.round(
      progressItems.reduce((sum, item) => sum + item.progress, 0) /
        progressItems.length,
    );
  }, [progressItems]);

  useEffect(() => {
    if (!showstates) {
      setAnimatedProgress({});
      setCircularProgress(0);
      return;
    }

    setAnimatedProgress({});
    setCircularProgress(0);

    progressItems.forEach((item, index) => {
      setTimeout(() => {
        setAnimatedProgress((prev) => ({
          ...prev,
          [item.stage]: item.progress,
        }));
      }, index * 200);
    });

    const target = overallPercent;
    setTimeout(
      () => {
        let current = 0;
        const increment = target > 0 ? target / 30 : 0;

        const animateCircle = () => {
          current += increment;
          if (current <= target) {
            setCircularProgress(Math.min(current, target));
            requestAnimationFrame(animateCircle);
          } else {
            setCircularProgress(target);
          }
        };

        if (target > 0) animateCircle();
      },
      progressItems.length * 200 + 300,
    );
  }, [showstates, progressItems, overallPercent]);

  const circleSize = compact ? 128 : 192;
  const circleRadius = compact ? 52 : 80;
  const circumference = 2 * Math.PI * circleRadius;

  if (!showstates) {
    return (
      <>
        <h3
          className={`font-semibold text-gray-800 dark:text-white ${
            compact ? "mb-4 text-base" : "mb-6 text-base"
          }`}
        >
          مراحل الطعن أمام المحكمة العليا
        </h3>
        <ul className={compact ? "space-y-3" : "space-y-4"}>
          {appealStages.map((stage, index) => (
            <li
              key={index}
              className="flex items-center justify-start text-gray-700 dark:text-white/80"
            >
              <span className="text-sm dark:text-main">•</span>
              <span className="mr-4 -mt-1 text-sm">{stage}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <h3
        className={`font-semibold text-gray-800 dark:text-white ${
          compact ? "mb-4 text-lg" : "mb-6 text-xl"
        }`}
      >
        تقدم إجراءات الطعن
      </h3>
      <div className={compact ? "space-y-4" : "space-y-6"}>
        {progressItems.map((item, index) => (
          <div
            key={item.stage}
            className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-1 flex justify-between text-sm dark:text-white/80">
              <span>{item.stage}</span>
              <span>{item.progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded bg-gray-200 dark:bg-white/20">
              <div
                className={`${item.color} h-3 rounded transition-all duration-1000 ease-out`}
                style={{
                  width: `${animatedProgress[item.stage] ?? 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className={`flex items-center justify-center ${
          compact ? "mt-8" : "mt-12"
        }`}
      >
        <div
          className="relative opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.8s_forwards]"
          style={{ width: circleSize, height: circleSize }}
        >
          <svg
            className="-rotate-90 transform"
            width={circleSize}
            height={circleSize}
          >
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={circleRadius}
              stroke="lightgray"
              strokeWidth={compact ? 12 : 15}
              fill="none"
            />
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={circleRadius}
              stroke="#A7D52A"
              strokeWidth={compact ? 12 : 15}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - circularProgress / 100)}
              className="transition-all duration-1000 ease-out"
              style={{ transitionDelay: "0.3s" }}
            />
          </svg>
          <div
            className={`absolute inset-0 flex items-center justify-center font-semibold dark:text-white ${
              compact ? "text-2xl" : "text-3xl"
            }`}
          >
            {Math.round(circularProgress)}%
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
