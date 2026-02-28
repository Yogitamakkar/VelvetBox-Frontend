import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import DealCard from "./DealCard";

export default function DealContainer() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine responsive sizes based on window width
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth >= 640 && windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const getCardClasses = (position) => {
    let base = "transition-all duration-500 ease-in-out";
    let size = "";
    let scale = "";
    let opacity = "";
    let zIndex = "";
    let margin = "";

    if (position === "center") {
      size = isSmallScreen 
        ? "w-64" 
        : isMediumScreen 
          ? "w-72" 
          : isTablet 
            ? "w-80" 
            : "w-96";
      scale = "scale-100";
      opacity = "opacity-100";
      zIndex = "z-20";
    } else if (position === "left") {
      size = isSmallScreen 
        ? "w-40" 
        : isMediumScreen 
          ? "w-48" 
          : isTablet 
            ? "w-56" 
            : "w-72";
      scale = isSmallScreen ? "scale-60" : "scale-75";
      opacity = isSmallScreen ? "opacity-50" : "opacity-70";
      zIndex = "z-10";
      margin = isSmallScreen 
        ? "-mr-10" 
        : isMediumScreen 
          ? "-mr-16" 
          : isTablet 
            ? "-mr-20" 
            : "-mr-24";
    } else if (position === "right") {
      size = isSmallScreen 
        ? "w-40" 
        : isMediumScreen 
          ? "w-48" 
          : isTablet 
            ? "w-56" 
            : "w-72";
      scale = isSmallScreen ? "scale-60" : "scale-75";
      opacity = isSmallScreen ? "opacity-50" : "opacity-70";
      zIndex = "z-10";
      margin = isSmallScreen 
        ? "-ml-10" 
        : isMediumScreen 
          ? "-ml-16" 
          : isTablet 
            ? "-ml-20" 
            : "-ml-24";
    }

    return `${base} ${size} ${scale} ${opacity} ${zIndex} ${margin} cursor-pointer hover:opacity-90`;
  };

  const deals = [
    {
      id: 1,
      title: "Wireless Noise Cancelling Headphones",
      category: "Electronics",
      discount: 25,
      originalPrice: 299.99,
      price: 224.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFoLES2HNikLvxsVPtD3lk64iQcVHLn0pzjg&s",
      hours: 2,
      minutes: 45,
      seconds: 21
    },
    {
      id: 2,
      title: "Premium Coffee Maker Bundle",
      category: "Kitchen",
      discount: 30,
      originalPrice: 199.99,
      price: 139.99,
      image: "https://cdn2.stylecraze.com/wp-content/uploads/2021/06/204-Best-And-Romantic-Wedding-Anniversary-Wishes-For-Wife.jpg.webp",
      hours: 5,
      minutes: 30,
      seconds: 15
    },
    {
      id: 3,
      title: "Fitness Smartwatch Pro",
      category: "Wearables",
      discount: 20,
      originalPrice: 249.99,
      price: 199.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-HOPyqNY_X4o6NCe4vvnqcfa8x8Wy1rsqQ&s",
      hours: 1,
      minutes: 15,
      seconds: 45
    }
  ];

  // Autoplay interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === deals.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [deals.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === deals.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? deals.length - 1 : prev - 1));
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const leftIndex = (activeSlide - 1 + deals.length) % deals.length;
  const centerIndex = activeSlide;
  const rightIndex = (activeSlide + 1) % deals.length;

  return (
    <div className="flex flex-col items-center justify-center bg-purple-100 p-4 md:p-8 rounded-lg mx-2 md:mx-9 transition-all duration-500">
      <div className="relative w-full max-w-5xl py-6 md:py-8">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-1 sm:p-2 shadow-md hover:bg-gray-100"
        >
          <ChevronLeft size={isSmallScreen ? 18 : 24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-1 sm:p-2 shadow-md hover:bg-gray-100"
        >
          <ChevronRight size={isSmallScreen ? 18 : 24} />
        </button>

        {/* Cards Container */}
        <div className="flex justify-center items-center overflow-hidden px-2 sm:px-4 md:px-8">
          <div className="flex justify-center items-center transition-transform duration-700 ease-in-out">
            {/* Left Card */}
            <div
              className={getCardClasses("left")}
              onClick={prevSlide}
            >
              <DealCard deal={deals[leftIndex]} />
            </div>

            {/* Center Card */}
            <div className={getCardClasses("center")}>
              <DealCard deal={deals[centerIndex]} />
            </div>

            {/* Right Card */}
            <div
              className={getCardClasses("right")}
              onClick={nextSlide}
            >
              <DealCard deal={deals[rightIndex]} />
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className="focus:outline-none"
          >
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === activeSlide
                  ? "bg-purple-900"
                  : "border border-purple-900"
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
}