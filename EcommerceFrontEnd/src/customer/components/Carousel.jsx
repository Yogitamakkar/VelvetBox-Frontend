import { useState, useEffect } from "react";

import { duration, useMediaQuery, useTheme } from "@mui/material";
import { motion } from 'motion/react'
import Dots from "./carousel/Dots";
import Arrows from "./carousel/Arrows";

export default function Carousel() {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen,setMobileOpen] = useState(false);
  
  const slides = [
    {
      id: 1,
      title: "Make Birthdays Unforgettable",
      subtitle: "Surprise them with extra special gifts",
      buttonText: "ORDER NOW",
      url: "#birthday-gifts", // URL to navigate to when clicked
      image: "https://www.fnp.com/assets/images/custom/new-home-2025/hero-banners/Bkirthday_Desk_copy_25.jpg", // Placeholder for your first image
    },
    {
      id: 2,
      title: "Heartfelt Anniversary Gifts",
      subtitle: "Celebrate their love story with timeless treasures",
      buttonText: "ORDER NOW",
      url: "#anniversary-gifts", // URL to navigate to when clicked
      image: "https://www.fnp.com/assets/images/custom/new-home-2025/hero-banners/Anniversarybanner_Desk_16.jpg", // Placeholder for your second image
    },
    {
      id: 3,
      title: "For loved ones",
      subtitle: "Select gifts with love",
      buttonText: "ORDER NOW",
      url: "#special-gifts", // URL to navigate to when clicked
      image: " https://www.fnp.com/assets/images/custom/new-home-2025/hero-banners/Luxe_Desktop-01-05-2025.jpg", // Placeholder for your third image
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex - 1 + slides.length) % slides.length; 
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (slideIndex) => {
    if (isAnimating || currentIndex === slideIndex) return;
    setIsAnimating(true);
    setCurrentIndex(slideIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const extendedSlides = [...slides,slides[0]];

  return (
      <motion.div 
        initial = {{ y : 100, opacity:0}}
        animate={{ y : 0, opacity:1}}
        transition={{duration:0.6 , ease:"easeOut"}}
      >
        <div className="relative w-full h-96 max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg my-3">
          <div className="h-full bg-gray-100 relative ">
        {/* Slides container with smooth transition */}
        <div 
          className="h-full flex transition-transform duration-500 ease-in-out gap-5"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {extendedSlides.map((slide, index) => (
          <div key={index} className="w-1/2 h-full flex-shrink-0">
            <a href={slide.url} className="block w-full h-full relative cursor-pointer">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain "
              />
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h2 className="text-3xl font-bold mb-1">{slide.title}</h2>
                <p className="text-lg mb-4">{slide.subtitle}</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-md transition-colors duration-300">
                  {slide.buttonText}
                </button>
              </div> */}
            </a>
          </div>
        ))}
        </div>

        <Arrows direction={"left"} onClick={goToPrevious}/>
        <Arrows direction={"right"} onClick={goToNext}/>

        <Dots
          length={slides.length}
          currentIndex={currentIndex}
          setCurrentIndex={goToSlide}
        />
      </div>
    </div>
      </motion.div>
  );
}