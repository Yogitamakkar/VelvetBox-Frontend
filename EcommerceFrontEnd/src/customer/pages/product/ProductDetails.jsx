// src/customer/pages/product/ProductDetails.jsx
import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '../../components/review/ReviewCard';
import ProductGrid from '../../components/products/ProductGrid';  
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity]           = useState(1);
  const [selectedSize, setSelectedSize]   = useState('M');
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [activeTab, setActiveTab]         = useState('description');
  const [addedToCart, setAddedToCart]     = useState(false);

  const { addToCart }                       = useCart();
  const { toggleWishlist, isWishlisted }    = useWishlist();
  const navigate                            = useNavigate();

  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "AudioTech Pro",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 2847,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
    ],
    colors: ['Navy', 'Black', 'White', 'Rose Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 47,
    description: "Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and studio-grade sound drivers for the ultimate listening experience.",
    features: [
      "Active Noise Cancellation", "30-hour battery life",
      "Quick charge: 5 min = 3 hours playback", "Premium leather headband",
      "Bluetooth 5.2 connectivity", "Voice assistant compatible"
    ],
    specifications: {
      "Driver Size": "40mm", "Frequency Response": "20Hz - 40kHz",
      "Impedance": "32 ohms", "Battery Life": "30 hours",
      "Charging Time": "2.5 hours", "Weight": "280g"
    }
  };

  const reviews = [
    {
      id: 1, userName: "Sarah M.", avatar: "SM", rating: 5, date: "2 days ago", verified: true,
      title: "Exceptional Audio Quality!",
      content: "These headphones exceeded my expectations. The noise cancellation is phenomenal, and the battery life is exactly as advertised.",
      helpful: 45, images: [], replies: 3
    },
    {
      id: 2, userName: "Raj K.", avatar: "RK", rating: 4, date: "1 week ago", verified: true,
      title: "Great value for money",
      content: "Very comfortable for long sessions. Build quality is solid. Delivery was fast.",
      helpful: 23, images: [], replies: 1
    }
  ];

  const similarProducts = [
    { id: 2, name: "AudioTech Bass Pro",  price: 199.99, originalPrice: 249.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop", rating: 4.6, reviews: 1234 },
    { id: 3, name: "Studio Monitor X1",   price: 349.99, originalPrice: 399.99, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop", rating: 4.7, reviews: 856  },
    { id: 4, name: "Wireless Elite Pro",  price: 279.99, originalPrice: 329.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", rating: 4.5, reviews: 2103 },
    { id: 5, name: "Premium Sound Max",   price: 399.99, originalPrice: 499.99, image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop", rating: 4.8, reviews: 967  },
  ];

  const recommendedProducts = [
    { id: 6, name: "Wireless Charging Pad", price: 49.99,  originalPrice: 69.99,  image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop", rating: 4.4, reviews: 543 },
    { id: 7, name: "Premium Cable Kit",     price: 29.99,  originalPrice: 39.99,  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", rating: 4.3, reviews: 321 },
    { id: 8, name: "Travel Case Pro",       price: 79.99,  originalPrice: 99.99,  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", rating: 4.6, reviews: 789 },
    { id: 9, name: "Audio Stand Deluxe",    price: 89.99,  originalPrice: 119.99, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop", rating: 4.5, reviews: 456 },
  ];

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id, name: product.name,
      price: product.price, image: product.images[0],
      quantity, size: selectedSize, color: selectedColor,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id, name: product.name,
      price: product.price, image: product.images[0],
      quantity, size: selectedSize, color: selectedColor,
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto p-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Image Gallery ── */}
          <div className="flex gap-4">
            <div className="flex flex-col space-y-3 w-20">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <img src={image} alt={`view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 relative group">
              <img src={product.images[selectedImage]} alt={product.name}
                className="w-full h-96 lg:h-[550px] object-cover rounded-2xl shadow-xl" />
              <button onClick={() => setSelectedImage(p => (p - 1 + product.images.length) % product.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setSelectedImage(p => (p + 1) % product.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 h-[550px]">
            <div className="h-full overflow-y-scroll scrollbar-hide pb-24">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1 font-medium">{product.brand}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.reviewCount.toLocaleString()} reviews)</span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{product.discount}% OFF</span>
                </div>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center mb-6">
                  <Truck className="w-3 h-3 mr-1" /> Same Day Delivery
                </span>

                {/* Delivery check */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">DELIVERY TO</span>
                    <span className="text-gray-400">▼</span>
                  </div>
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Enter Pincode"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent" />
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                      Check
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

                {/* Color */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-900">Color</h3>
                  <div className="flex space-x-2 flex-wrap gap-y-2">
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                          selectedColor === color ? 'border-pink-500 bg-pink-50 text-pink-700 font-medium' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}>{color}</button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-900">Size</h3>
                  <div className="flex space-x-2">
                    {product.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === size ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}>{size}</button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2 text-gray-900">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100 rounded-l-lg">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 text-sm font-medium">{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-100 rounded-r-lg">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.stockCount} in stock</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3"><Truck className="w-5 h-5 text-green-600" /><span className="text-sm text-gray-700">Free Shipping</span></div>
                  <div className="flex items-center space-x-3"><Shield className="w-5 h-5 text-blue-600" /><span className="text-sm text-gray-700">2 Year Warranty</span></div>
                  <div className="flex items-center space-x-3"><RotateCcw className="w-5 h-5 text-purple-600" /><span className="text-sm text-gray-700">30 Day Returns</span></div>
                </div>
              </div>
            </div>

            {/* Fixed action buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 rounded-b-2xl">
              <div className="flex space-x-3">
                <button onClick={handleAddToCart} style={{
                  padding: '12px 16px', borderRadius: 8, border: '1.5px solid',
                  borderColor: addedToCart ? '#16a34a' : '#e8006f',
                  background: addedToCart ? '#f0fdf4' : '#fff',
                  color: addedToCart ? '#16a34a' : '#e8006f',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}>
                  {addedToCart ? '✓ ADDED' : 'ADD TO CART'}
                </button>
                <button onClick={handleBuyNow}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                  <span>BUY NOW</span>
                </button>
                <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                  className={`p-3 rounded-lg border transition-all ${wishlisted ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-300 hover:border-gray-400 text-gray-600'}`}>
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'specifications'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium capitalize transition-colors ${
                    activeTab === tab ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500 hover:text-gray-700'
                  }`}>{tab}</button>
              ))}
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'description' && <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>}
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-pink-500 rounded-full" /><span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">{k}</span>
                    <span className="text-gray-600">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
          {reviews.map(r => (
            <ReviewCard key={r.id} review={r}
              showAvatar={true} showDate={true} showImages={true}
              showFlag={false} showHelpful={false} showMoreMenu={false}
              showVerified={false} showReply={false} />
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Similar Products</h2>
        <ProductGrid products={similarProducts} addToCartBtn={true} />

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Recommended Products</h2>
        <ProductGrid products={recommendedProducts} addToCartBtn={true} />
      </div>
    </div>
  );
};

export default ProductDetails;