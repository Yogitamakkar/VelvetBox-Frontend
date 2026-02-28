import React from "react";
import { motion } from "framer-motion";

const Slider = ({ children, x, onDragEnd, className }) => {
  return (
    <motion.div
      className={`flex ${className ?? ""}`}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: -10000, right: 10000 }} // ✅ allows free dragging
      dragElastic={0.1}
      onDragEnd={onDragEnd}
    >
      {children}
    </motion.div>
  );
};

export default Slider;
