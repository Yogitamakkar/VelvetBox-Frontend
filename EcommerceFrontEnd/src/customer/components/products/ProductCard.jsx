import { Heart, Star } from "lucide-react";

const ProductCard = ({ product , addToCartBtn }) => {
  return (
    <div className="w-full max-w-[275px] border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white relative ">
      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      {/* Product Image */}
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1 px-3">
        <h3 className="text-sm font-medium text-gray-800 leading-tight">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-gray-900">₹ {product.price}</p>

        {/* Rating & Delivery */}
        <div className="flex items-center gap-2 text-xs text-gray-500 justify-between">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {product.rating} <span className="text-gray-400">({product.reviews})</span>
          </span>

          {product.delivery && (
            <span className="ml-auto bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
              {product.delivery}
            </span>
          )}

          {addToCartBtn && (
            <div className="flex items-center justify-between mb-3">
              <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ">
              Add to Cart
            </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
