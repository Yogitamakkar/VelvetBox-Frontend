import { ArrowRight, Tag } from "lucide-react";
import CountdownTimer from "./CountDownTimer";


const DealCard = ({ deal }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      {deal.discount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {deal.discount}% OFF
          </span>
        </div>
      )}
      
      <div className="relative pb-56">
        <img 
          src={deal.image || "/api/placeholder/300/200"} 
          alt={deal.title} 
          className="absolute h-full w-full object-cover"
        />
        {deal.category && (
          <div className="absolute bottom-0 left-0 bg-white bg-opacity-80 px-2 py-1">
            <span className="text-xs font-medium text-gray-700">
              {deal.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <div className="flex items-center gap-1 mb-1">
              <Tag size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-600">
                Deal of the Day
              </span>
            </div>
            
            <CountdownTimer hours={3} minutes={45} seconds={21} />
            
            <h3 className="font-bold text-lg mt-3 mb-1">
              {deal.title}
            </h3>
            
            {deal.originalPrice && (
              <div className="flex items-center gap-2 mt-2">
                <span className="line-through text-sm text-gray-500">
                  ${deal.originalPrice}
                </span>
                <span className="font-bold text-red-600">
                  ${deal.price}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <button 
          className="mt-4 w-full bg-purple-950 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-1 transition-colors duration-300"
        >
          Shop Now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
export default DealCard;