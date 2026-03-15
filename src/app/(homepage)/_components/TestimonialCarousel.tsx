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

    // Clear all cards with staggered effect
    setActiveCards([]);

    setTimeout(() => {
      setCurrentIndex(index);

      // Bring cards back one by one (slower animation)
      setTimeout(() => setActiveCards([0]), 200);
      setTimeout(() => setActiveCards([0, 1]), 450);
      setTimeout(() => {
        setActiveCards([0, 1, 2]);
        setIsTransitioning(false);
      }, 700);
    }, 600);
  };

  // Initialize cards on mount (slower)
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

  // Autoplay every 6 seconds
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
      className="flex w-full flex-col items-start justify-end"
    >
      <div className="w-full overflow-hidden">
        <div className="mr-40 flex w-full flex-col items-start space-y-2">
          {testimonials[currentIndex].map((item, cardIndex) => (
            <div
              className={`w-full cursor-pointer transition-all duration-700 ease-out ${
                activeCards.includes(cardIndex)
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              style={{
                transitionDelay: `${cardIndex * 280}ms`,
              }}
              onClick={() => onCardClick(item)}
              key={item.uuid}
            >
              <div className="flex w-full min-w-0 items-center gap-5">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-zain text-md font-bold text-main md:text-[20px] lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 min-h-[30px] truncate font-zain text-sm text-[#8989A1] dark:text-muted-foreground md:text-base lg:text-md">
                    ...{item.text.substring(0, 50)}
                  </p>
                </div>
                <div className="flex h-[60px] w-[70px] flex-col items-center justify-center rounded-[1px] bg-main text-center text-sm text-white">
                  <p className="text-base">{item.day}</p>
                  <p className="-mt-2 text-sm">{item.month}</p>
                </div>
              </div>
              <div className="my-4 ml-10 h-[.5px] w-full bg-[#d8d8d8] dark:bg-border" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-start gap-2 ml-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-colors cursor-pointer ${
              currentIndex === index ? "h-4 w-4 bg-main" : "h-3 w-3 bg-gray-400 dark:bg-muted-foreground/50"
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
