"use client";

import { slides } from "@/lib/constants";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HeroSlides from "./HeroSlides/HeroSlides";
import HeroSlides1 from "./HeroSlides/HeroSlides1";
import HeroSlides3 from "./HeroSlides/HeroSlides3";
import HeroSlides2 from "./HeroSlides/HeroSlides2";
import HeroSlides4 from "./HeroSlides/HeroSlides4";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          {/* Zoom Effect */}
          <div
            className={`absolute inset-0 h-full w-full ${
              currentIndex === index ? "animate-zoom" : "animate-zoom-paused"
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <HeroSlides
            key={currentIndex} // Force re-mount on change
            currentIndex={currentIndex}
            img={slide.backgroundImage}
            index={index}
          >
            {slide.content === "HeroSlides1" && (
              <HeroSlides1 key={currentIndex} />
            )}
            {slide.content === "HeroSlides3" && (
              <HeroSlides3 key={currentIndex} />
            )}
            {slide.content === "HeroSlides2" && (
              <HeroSlides2 key={currentIndex} />
            )}
            {slide.content === "HeroSlides4" && (
              <HeroSlides4 key={currentIndex} />
            )}
          </HeroSlides>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="group absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block"
        aria-label="Previous slide"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
          <IoIosArrowBack className="text-2xl transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </button>

      <button
        onClick={handleNext}
        className="group absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer sm:block"
        aria-label="Next slide"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300">
          <IoIosArrowForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 transform space-x-4">
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`size-[9px] rotate-45 transform transition-all hover:scale-125 ${
                currentIndex === index
                  ? "scale-125 bg-main_orang opacity-75"
                  : "bg-main_orang opacity-50 hover:opacity-75"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
