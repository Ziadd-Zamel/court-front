import React, { useEffect, useRef, useState } from "react";
import type { NewsCarouselItem } from "./RecentNews";

interface CarouselProps {
  testimonials: NewsCarouselItem[][];
  onCardClick: (item: NewsCarouselItem) => void;
}

const StaggeredNavigationCarousel: React.FC<CarouselProps> = ({
  testimonials,
  onCardClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCards, setActiveCards] = useState([0, 1, 2]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (index: number) => {
    if (currentIndex === index || isTransitioning) return;

    setIsTransitioning(true);
    setActiveCards([]);

    setTimeout(() => {
      setCurrentIndex(index);

      setTimeout(() => setActiveCards([0]), 200);
      setTimeout(() => setActiveCards([0, 1]), 450);

      setTimeout(() => {
        setActiveCards([0, 1, 2]);
        setIsTransitioning(false);
      }, 700);
    }, 600);
  };

  useEffect(() => {
    const timeout1 = setTimeout(() => setActiveCards([0]), 200);
    const timeout2 = setTimeout(() => setActiveCards([0, 1]), 450);
    const timeout3 = setTimeout(() => setActiveCards([0, 1, 2]), 700);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  const handleNavRef = useRef(handleNavigation);
  handleNavRef.current = handleNavigation;

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % testimonials.length;
      handleNavRef.current(next);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  return (
    <div
      style={{ direction: "ltr" }}
      className="flex w-full min-w-0 flex-col justify-end"
    >
      <div className="w-full min-w-0 overflow-hidden">
        <div className="flex w-full flex-col space-y-2">
          {testimonials[currentIndex].map((item, cardIndex) => (
            <div
              key={item.uuid}
              onClick={() => onCardClick(item)}
              className={`w-full min-w-0 cursor-pointer transition-all duration-700 ease-out ${
                activeCards.includes(cardIndex)
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              style={{
                transitionDelay: `${cardIndex * 280}ms`,
              }}
            >
              <div className="flex w-full min-w-0 items-center gap-3 sm:gap-5">
                <div className="min-w-0 flex-1 text-right">
                  <h3 className="line-clamp-1 font-zain text-sm font-bold text-main sm:text-lg lg:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 font-zain text-xs leading-relaxed text-[#8989A1] dark:text-muted-foreground sm:text-base">
                    {item.text}
                  </p>
                </div>

                <div className="flex h-10 w-11 shrink-0 flex-col items-center justify-center rounded-[2px] bg-main px-0.5 text-center text-white sm:h-[60px] sm:w-[70px]">
                  <p className="text-xs font-semibold leading-none sm:text-base">
                    {item.day}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-none sm:-mt-1 sm:text-sm">
                    {item.month}
                  </p>
                </div>
              </div>

              <div className="my-4 h-[1px] w-full bg-[#d8d8d8] dark:bg-border" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-start gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(index)}
            disabled={isTransitioning}
            className={`cursor-pointer rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "h-4 w-4 bg-main"
                : "h-3 w-3 bg-gray-400 dark:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StaggeredNavigationCarousel;
