/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const Sidebar = ({ showstates }: { showstates: boolean }) => {
  const [animatedProgress, setAnimatedProgress] = useState<{
    [key: string]: number;
  }>({});
  const [circularProgress, setCircularProgress] = useState(0);

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

  // بيانات وهمية تحاكي ما بالصورة
  const fakeProgress = [
    { stage: "الشق المستعجل", progress: 100, color: "bg-blue-500" },
    { stage: "فحص الطعن", progress: 100, color: "bg-green-500" },
    { stage: "رأي نيابة النقض", progress: 100, color: "bg-orange-500" },
    { stage: "نظر الطعن", progress: 100, color: "bg-yellow-500" },
    { stage: "الفصل في الطعن", progress: 25, color: "bg-blue-500" },
  ];

  // Animation effect for progress bars
  useEffect(() => {
    if (showstates) {
      // Reset progress
      setAnimatedProgress({});
      setCircularProgress(0);

      // Animate each progress bar with staggered timing
      fakeProgress.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedProgress((prev) => ({
            ...prev,
            [item.stage]: item.progress,
          }));
        }, index * 200); // 200ms delay between each bar
      });

      // Animate circular progress after all bars are done
      setTimeout(() => {
        let current = 0;
        const target = 85;
        const increment = target / 30; // 30 steps for smooth animation

        const animateCircle = () => {
          current += increment;
          if (current <= target) {
            setCircularProgress(Math.min(current, target));
            requestAnimationFrame(animateCircle);
          } else {
            setCircularProgress(target);
          }
        };

        animateCircle();
      }, fakeProgress.length * 200 + 300); // Start after progress bars + 300ms delay
    }
  }, [showstates]);

  return (
    <div className="flex flex-col h-full text-right border-gray-300 pt-10 bg-[#F1E2CE] pl-16 pr-7">
      {!showstates ? (
        <>
          <h3 className="text-xl text-gray-800 font-semibold mb-6">
            مراحل الطعن أمام المحكمة العليا
          </h3>
          <ul className="space-y-4">
            {appealStages.map((stage, index) => (
              <li
                key={index}
                className="flex items-center justify-start text-gray-700"
              >
                <span className="text-xl">•</span>
                <span className="mr-4 -mt-1">{stage}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3 className="text-xl text-gray-800 font-semibold mb-6">
            تقدم إجراءات الطعن
          </h3>
          <div className="space-y-6">
            {fakeProgress.map((item, index) => (
              <div
                key={index}
                className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.stage}</span>
                  <span>{Math.round(animatedProgress[item.stage] || 0)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                  <div
                    className={`${item.color} h-3 rounded transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedProgress[item.stage] || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* الدائرة للنسبة الكلية */}
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
              <div className="absolute top-1/2 -translate-y-1/2 mt-3.5 -ml-2 inset-0 flex justify-center items-center text-3xl font-semibold">
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
