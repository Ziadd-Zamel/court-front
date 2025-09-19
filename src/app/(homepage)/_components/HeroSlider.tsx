"use client";

import { slides } from "@/lib/constants";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HeroSlides1 from "./HeroSlides/HeroSlides1";
import HeroSlides2 from "./HeroSlides/HeroSlides2";
import HeroSlides3 from "./HeroSlides/HeroSlides3";
import HeroSlides4 from "./HeroSlides/HeroSlides4";

// Types
interface SlideData {
  content: string;
  backgroundImage: string;
}

interface SliderState {
  currentIndex: number;
  isTransitioning: boolean;
}

// Custom hook for slider logic
const useSlider = (slides: SlideData[], autoPlayInterval: number = 5000) => {
  const [state, setState] = useState<SliderState>({
    currentIndex: 0,
    isTransitioning: false,
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (index === state.currentIndex || state.isTransitioning) return;

      setState((prev) => ({ ...prev, isTransitioning: true }));
      setState((prev) => ({ ...prev, currentIndex: index }));

      // Reset transition state after animation
      setTimeout(() => {
        setState((prev) => ({ ...prev, isTransitioning: false }));
      }, 5000);
    },
    [state.currentIndex, state.isTransitioning]
  );

  const goToNext = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [state.currentIndex, slides.length, goToSlide]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (state.currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }, [state.currentIndex, slides.length, goToSlide]);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval]);

  return {
    currentIndex: state.currentIndex,
    isTransitioning: state.isTransitioning,
    goToNext,
    goToPrevious,
    goToSlide,
  };
};

// Slide content component
const SlideContent = ({ slide }: { slide: SlideData }) => {
  const contentComponents = useMemo(
    () => ({
      HeroSlides1,
      HeroSlides2,
      HeroSlides3,
      HeroSlides4,
    }),
    []
  );

  const Component =
    contentComponents[slide.content as keyof typeof contentComponents];

  if (!Component) return null;

  return <Component />;
};

// Background component
const SlideBackground = ({
  backgroundImage,
  isActive,
}: {
  backgroundImage: string;
  isActive: boolean;
}) => (
  <div
    className="absolute inset-0 h-full w-full overflow-hidden"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div
      className={`absolute inset-0 h-full w-full transition-transform duration-[5000ms] ease-linear ${
        isActive ? "scale-110" : "scale-100"
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div className="absolute inset-0 bg-black/10" />
  </div>
);

// Navigation arrows component
const NavigationArrows = ({
  onPrevious,
  onNext,
  isTransitioning,
}: {
  onPrevious: () => void;
  onNext: () => void;
  isTransitioning: boolean;
}) => (
  <>
    <button
      onClick={onPrevious}
      disabled={isTransitioning}
      className="group absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block disabled:opacity-50"
      aria-label="Previous slide"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
        <IoIosArrowBack className="text-2xl transition-transform duration-300 group-hover:-translate-x-1" />
      </div>
    </button>

    <button
      onClick={onNext}
      disabled={isTransitioning}
      className="group absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block disabled:opacity-50"
      aria-label="Next slide"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
        <IoIosArrowForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  </>
);

// Dots navigation component
const DotsNavigation = ({
  totalSlides,
  currentIndex,
  onDotClick,
  isTransitioning,
}: {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  isTransitioning: boolean;
}) => (
  <div
    style={{ direction: "ltr" }}
    className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform space-x-4"
  >
    <div className="flex gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          disabled={isTransitioning}
          className={`size-[9px] rotate-45 transform transition-all hover:scale-125 disabled:opacity-50 ${
            currentIndex === index
              ? "scale-125 bg-main opacity-75"
              : "bg-main opacity-50 hover:opacity-75"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
);

// Main slider component
const HeroSlider = () => {
  const { currentIndex, isTransitioning, goToNext, goToPrevious, goToSlide } =
    useSlider(slides, 5000);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={`${slide.content}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <SlideBackground
            backgroundImage={slide.backgroundImage}
            isActive={currentIndex === index}
          />

          <div className="absolute inset-0 text-white">
            <SlideContent slide={slide} />
          </div>
        </div>
      ))}

      {/* Navigation */}
      <NavigationArrows
        onPrevious={goToPrevious}
        onNext={goToNext}
        isTransitioning={isTransitioning}
      />

      <DotsNavigation
        totalSlides={slides.length}
        currentIndex={currentIndex}
        onDotClick={goToSlide}
        isTransitioning={isTransitioning}
      />
    </div>
  );
};

export default HeroSlider;
