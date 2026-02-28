import React from 'react';
import { motion } from 'framer-motion';

// Individual Category Card Component
const CategoryCard = ({ 
  image, 
  title, 
  onClick, 
  className = "",
  imageAlt = "",
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl p-4 duration-300 ">
        {/* Image Container */}
        <div className="relative mb-4 h-30 w-30 mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {image ? (
            <img 
              src={image} 
              alt={imageAlt || title}
              className="w-full h-full object-cover "
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-center text-gray-800 font-medium text-sm leading-relaxed group-hover:text-purple-600 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default React.memo(CategoryCard);