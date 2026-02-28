import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const Carousel1 = ({
  children,
  cardWidth = 250,
  gap = 16,
  autoPlay = true,
  interval = 3000,
}) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const slides = React.Children.toArray(children);
  const totalCards = slides.length;

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
  const totalPages = Math.ceil(totalCards / cardsPerView);

  const calculateX = (i) => -i * (cardWidth + gap) * cardsPerView;

  const goToSlide = (i) => {
    const newIndex = Math.max(0, Math.min(i, totalPages - 1));
    setIndex(newIndex);
    animate(x, calculateX(newIndex), {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  const handleNext = () => goToSlide(index + 1);
  const handlePrev = () => goToSlide(index - 1);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [index, autoPlay, interval]);

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <motion.div
        className="flex"
        style={{ x, gap: `${gap}px`, cursor: "grab" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          const offset = info.offset.x;
          const threshold = containerWidth / 4;
          if (offset < -threshold) handleNext();
          else if (offset > threshold) handlePrev();
          else animate(x, calculateX(index), {
            type: "spring",
            stiffness: 300,
            damping: 30,
          });
        }}
      >
        {slides.map((child, i) => (
          <div
            key={i}
            style={{ width: `${cardWidth}px`, flexShrink: 0 }}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {/* Arrows */}
      <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white px-2 py-1">‹</button>
      <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-2 py-1">›</button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel1;
