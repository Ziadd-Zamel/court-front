import React, { useEffect, useState } from "react";

export interface Testimonial {
  title: string;
  text: string;
  desc: string;
}

const testimonials: Testimonial[][] = [
  [
    {
      title: "المحكمة العليا",

      text: "إعلان استئناف عمل الدائرة الدستورية بالمحكمة العليا بتاريخ 22-4-2025 بعد توقف دام لعدة أشهر",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
    {
      title: "المكتب الفني",
      text: "عقد اجتماع غير عادي بتاريخ 22-4-2025 لمناقشة عناوين إصدار مجلة المحكمة العليا العدد السبعون",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
    {
      title: "مكتبة المحكمة العليا",
      text: "إضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
  ],
  [
    {
      title: "المحكمة العليا",

      text: "إعلان استئناف عمل الدائرة الدستورية بالمحكمة العليا بتاريخ 22-4-2025 بعد توقف دام لعدة أشهر",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
    {
      title: "المكتب الفني",
      text: "عقد اجتماع غير عادي بتاريخ 22-4-2025 لمناقشة عناوين إصدار مجلة المحكمة العليا العدد السبعون",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
    {
      title: "مكتبة المحكمة العليا",
      text: "إضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري",
      desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
    },
  ],
];

interface CarouselProps {
  onCardClick: (testimonial: Testimonial) => void;
}

const StaggeredNavigationCarousel: React.FC<CarouselProps> = ({
  onCardClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCards, setActiveCards] = useState([0, 1, 2]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (index: number) => {
    if (currentIndex === index || isTransitioning) return;

    setIsTransitioning(true);

    // Clear all cards with staggered effect
    setActiveCards([]);

    setTimeout(() => {
      setCurrentIndex(index);

      // Bring cards back one by one
      setTimeout(() => setActiveCards([0]), 100);
      setTimeout(() => setActiveCards([0, 1]), 250);
      setTimeout(() => {
        setActiveCards([0, 1, 2]);
        setIsTransitioning(false);
      }, 400);
    }, 500);
  };

  // Initialize cards on mount
  useEffect(() => {
    const timeout1 = setTimeout(() => setActiveCards([0]), 100);
    const timeout2 = setTimeout(() => setActiveCards([0, 1]), 250);
    const timeout3 = setTimeout(() => setActiveCards([0, 1, 2]), 400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-end">
      <div className="w-full overflow-hidden">
        <div className="mr-40 flex w-full flex-col items-start space-y-2">
          {testimonials[currentIndex].map((item, cardIndex) => (
            <div
              className={`w-full cursor-pointer transition-all duration-300 ${
                activeCards.includes(cardIndex)
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              style={{
                transitionDelay: `${cardIndex * 150}ms`,
              }}
              onClick={() => onCardClick(item)}
              key={cardIndex}
            >
              <div className="flex w-full items-center gap-5">
                <div className="w-full">
                  <h3 className="font-zain text-md font-bold text-main md:text-[20px] lg:text-xl">
                    {item.title}{" "}
                  </h3>
                  <p className="-mt-1 min-h-[30px] font-zain text-sm text-[#8989A1] md:text-base lg:text-md">
                    ...{item.text.substring(0, 50)}{" "}
                  </p>
                </div>
                <div className="flex h-[45px] w-[50px] flex-col items-center justify-center rounded-[1px] bg-main_orang text-center text-sm text-white">
                  <p className="">21</p>
                  <p className="-mt-2 font-zain text-sm">فبر</p>
                </div>
              </div>
              <div className="my-4 ml-10 h-[.5px] w-full bg-[#d8d8d8]" />
            </div>
          ))}
        </div>
      </div>

      <div className="-mr-2 mt-4 flex w-full items-center justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-colors ${
              currentIndex === index
                ? "h-3 w-3 bg-main_orang"
                : "h-4 w-4 bg-gray-400"
            }`}
            onClick={() => handleNavigation(index)}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default StaggeredNavigationCarousel;
