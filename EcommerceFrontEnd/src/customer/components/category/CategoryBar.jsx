import React from 'react';

const CategoryBar = () => {
  const categories = [
    { label: "Same Day Delivery" , img : "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-SDD-v202306.png" },
    { label: "Flowers" , img : "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-flower-v202306.png"},
    { label: "Cakes" , img : "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-cakes-v202306.png"},
    { label: "Personalized" , img: "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-personalize-v202306.png"},
    { label: "Plants" , img:"https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-plants-v202306.png"},
    { label: "New Arrivals" , img : "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-plants-v202306.png"},
    { label: "International" , img : "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/international_d_tiles_5_20240530184913.png"},
    { label: "Bulk/Corp. Gifts" , img: "https://cdn.igp.com/f_auto,q_auto,t_pnopt1prodlp/banners/w-tiles-bulk-order-v202306.png" }
  ];

  return (
    <div className='box-border px-8 md:px-10'>
        <div className="w-full border border-pink-400 rounded-md my-2 mx-auto max-w-7xl overflow-hidden">
      <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-y md:divide-y-0 divide-pink-300">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center py-4 px-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <div className="text-pink-600 mb-2">
              <div className="w-10 h-10 mx-auto">
                <img src={category.img} alt={category.label}/>
              </div>
            </div>
            <div className="text-gray-700 text-xs md:text-sm text-center">
              {category.label}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CategoryBar;