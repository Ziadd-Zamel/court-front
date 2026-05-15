import { useState, useEffect, useMemo } from "react";

const STAGE_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-blue-500",
] as const;

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
      stage: "فحص الطعن",
      progress: clampPercent(caseItem.appeals_review?.[0]?.percentage),
      color: STAGE_COLORS[1],
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

type SidebarProps = {
  showstates: boolean;
  caseData?: CaseDataType[];
};

const Sidebar = ({ showstates, caseData }: SidebarProps) => {
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

  return (
    <div className="flex flex-col h-full text-right border-gray-300 dark:border-white/10 pt-21 bg-[#F1E2CE] dark:bg-[#252525] pl-16 pr-7">
      {!showstates ? (
        <>
          <h3 className="text-base text-gray-800 dark:text-white font-semibold mb-6">
            مراحل الطعن أمام المحكمة العليا
          </h3>
          <ul className="space-y-4">
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
      ) : (
        <>
          <h3 className="text-xl text-gray-800 dark:text-white font-semibold mb-6">
            تقدم إجراءات الطعن
          </h3>
          <div className="space-y-6">
            {progressItems.map((item, index) => (
              <div
                key={item.stage}
                className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between text-sm mb-1 dark:text-white/80">
                  <span>{item.stage}</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-white/20 h-3 rounded overflow-hidden">
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

          <div className="flex justify-center items-center mt-12">
            <div className="relative w-48 h-48 opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.8s_forwards]">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="lightgray"
                  strokeWidth="15"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#A7D52A"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 80 * (1 - circularProgress / 100)
                  }`}
                  className="transition-all duration-1000 ease-out"
                  style={{ transitionDelay: "0.3s" }}
                />
              </svg>
              <div className="absolute top-1/2 -translate-y-1/2 mt-3.5 -ml-2 inset-0 flex justify-center items-center text-3xl font-semibold dark:text-white">
                {Math.round(circularProgress)}%
              </div>
            </div>
          </div>
        </>
      )}

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
    </div>
  );
};

export default Sidebar;
