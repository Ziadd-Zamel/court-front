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
  autoPlayEnabled: boolean; // Added state for auto-play control
}

// Custom hook for slider logic
const useSlider = (slides: SlideData[], autoPlayInterval: number = 5000) => {
  const [state, setState] = useState<SliderState>({
    currentIndex: 0,
    isTransitioning: false,
    autoPlayEnabled: true, // Initialize auto-play as enabled
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (index === state.currentIndex) return;

      setState((prev) => ({
        ...prev,
        isTransitioning: true,
        currentIndex: index,
      }));

      // Reset transition state after a shorter duration
      setTimeout(() => {
        setState((prev) => ({ ...prev, isTransitioning: false }));
      }, 300); // Much shorter transition lock
    },
    [state.currentIndex]
  );

  // Function to stop auto-play
  const stopAutoPlay = useCallback(() => {
    setState((prev) => ({ ...prev, autoPlayEnabled: false }));
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [state.currentIndex, slides.length, goToSlide]);

  const goToNextUser = useCallback(() => {
    stopAutoPlay();
    const nextIndex = (state.currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [state.currentIndex, slides.length, goToSlide, stopAutoPlay]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (state.currentIndex - 1 + slides.length) % slides.length;
    stopAutoPlay(); // Stop auto-play when user clicks previous
    goToSlide(prevIndex);
  }, [state.currentIndex, slides.length, goToSlide, stopAutoPlay]);

  // Auto-play effect - only runs when autoPlayEnabled is true
  useEffect(() => {
    if (!state.autoPlayEnabled) return; // Exit early if auto-play is disabled

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval, state.autoPlayEnabled]);

  return {
    currentIndex: state.currentIndex,
    isTransitioning: state.isTransitioning,
    autoPlayEnabled: state.autoPlayEnabled,
    goToNext,
    goToNextUser,
    goToPrevious,
    goToSlide,
    stopAutoPlay,
  };
};

// Slide content component with key-based remounting for animations
const SlideContent = ({
  slide,
  slideKey,
}: {
  slide: SlideData;
  slideKey: string;
}) => {
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

  // Force remount with unique key to restart animations
  return <Component key={slideKey} />;
};

// Background component
const SlideBackground = ({
  backgroundImage,
  isActive,
  showoverlay,
}: {
  backgroundImage: string;
  isActive: boolean;
  showoverlay?: boolean;
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
    {showoverlay && <div className="absolute inset-0 bg-black/50" />}
  </div>
);

// Navigation arrows component
const NavigationArrows = ({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) => (
  <>
    <button
      onClick={onPrevious}
      className="group absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block disabled:opacity-50"
      aria-label="Previous slide"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
        <IoIosArrowBack className="text-2xl transition-transform duration-300 group-hover:-translate-x-1" />
      </div>
    </button>

    <button
      onClick={onNext}
      className="group absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block disabled:opacity-50"
      aria-label="Next slide"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
        <IoIosArrowForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  </>
);

// Dots navigation component - removed disabled state
const DotsNavigation = ({
  totalSlides,
  currentIndex,
  onDotClick,
}: {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
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
          className={`size-[9px] rotate-45 transform transition-all hover:scale-125 ${
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
  const { currentIndex, goToNextUser, goToPrevious, goToSlide } = useSlider(
    slides,
    5000
  );

  // Create unique key for each slide to force component remount and restart animations
  const [slideChangeCounter, setSlideChangeCounter] = useState(0);

  // Increment counter whenever slide changes to force remount
  useEffect(() => {
    setSlideChangeCounter((prev) => prev + 1);
  }, [currentIndex]);

  const handleDotClick = useCallback(
    (index: number) => {
      goToSlide(index);
    },
    [goToSlide]
  );

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={`slide-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <SlideBackground
            backgroundImage={slide.backgroundImage}
            isActive={currentIndex === index}
            showoverlay={slide.showoverlay}
          />

          <div className="absolute inset-0 text-white">
            {/* Pass unique key to force remount and restart animations */}
            <SlideContent
              slide={slide}
              slideKey={`${slide.content}-${index}-${slideChangeCounter}`}
            />
          </div>
        </div>
      ))}

      {/* Navigation */}
      <NavigationArrows onPrevious={goToPrevious} onNext={goToNextUser} />

      <DotsNavigation
        totalSlides={slides.length}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default HeroSlider;
