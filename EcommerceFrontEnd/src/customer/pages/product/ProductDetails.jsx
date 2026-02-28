import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '../../components/review/ReviewCard';
import ProductReviews from '../../components/review/ReviewCard';
import ProductGrid from '../../components/products/ProductGrid';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const review = [
        {
      id: 1, userName: "Sarah M.", avatar: "SM", rating: 5, date: "2 days ago", verified: true,
      title: "Exceptional Audio Quality!", 
      content: "These headphones exceeded my expectations. The noise cancellation is phenomenal, and the battery life is exactly as advertised. I use them daily for work calls and music, and they're incredibly comfortable even after hours of use.",
      helpful: 45, images: ['data:image/jpeg;base64,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'], replies: 3
    },
    {
      id: 1, userName: "Sarah M.", avatar: "SM", rating: 5, date: "2 days ago", verified: true,
      title: "Exceptional Audio Quality!", 
      content: "These headphones exceeded my expectations. The noise cancellation is phenomenal, and the battery life is exactly as advertised. I use them daily for work calls and music, and they're incredibly comfortable even after hours of use.",
      helpful: 45, images: ['headphone1.jpg'], replies: 3
    }
  ];
  const product = {
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
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 5 min = 3 hours playback",
      "Premium leather headband",
      "Bluetooth 5.2 connectivity",
      "Voice assistant compatible"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 40kHz",
      "Impedance": "32 ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2.5 hours",
      "Weight": "280g"
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const similarProducts = [
    {
      id: 1,
      name: "AudioTech Bass Pro",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 1234
    },
    {
      id: 2,
      name: "Studio Monitor X1",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 856
    },
    {
      id: 3,
      name: "Wireless Elite Pro",
      price: 279.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 2103
    },
    {
      id: 4,
      name: "Premium Sound Max",
      price: 399.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 967
    }
  ];

  const recommendedProducts = [
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 543
    },
    {
      id: 6,
      name: "Premium Cable Kit",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 321
    },
    {
      id: 7,
      name: "Travel Case Pro",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 789
    },
    {
      id: 8,
      name: "Audio Stand Deluxe",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 456
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto p-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col space-y-3 w-20">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[550px] object-cover rounded-2xl shadow-xl"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 h-[550px]">
            {/* Scrollable Content Area */}
            <div className="h-full overflow-y-scroll scrollbar-hide pb-24">
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2 font-medium">{product.brand}</p>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </div>

                  <div className="flex items-center mb-6">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Truck className="w-3 h-3 mr-1" />
                      Same Day Delivery
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Location Check */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm font-medium text-gray-700">DELIVERY TO</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter Pincode"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Check
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                          Select+
                        </span>
                        <span className="text-sm font-semibold text-gray-800">Save ₹3,000</span>
                        <span className="text-xs text-gray-600">Priority Service</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>FREE Standard Delivery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>5% Cashback on all Orders</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>50% OFF on Special Deliveries</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Expert Recommendations</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Select+
                        </span>
                        <div className="text-sm">
                          <span className="font-bold text-gray-800">ADD ₹99</span>
                          <span className="text-gray-500 line-through ml-1">₹999</span>
                          <span className="text-xs text-gray-600 ml-1">/ year</span>
                        </div>
                      </div>
                      <button className="text-blue-600 text-xs font-medium hover:underline">Learn more</button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

                  {/* Color Selection */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-900">Color</h3>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            selectedColor === color
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-900">Size</h3>
                    <div className="flex space-x-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-900">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-600">{product.stockCount} in stock</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Free Shipping</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">2 Year Warranty</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-700">30 Day Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Action Buttons - Part of Container */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex space-x-3">
                <button className="px-6  py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
                  ADD TO CART
                </button>
                <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                  <span>BUY NOW</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-all ${
                    isWishlisted
                      ? 'border-pink-500 bg-pink-50 text-pink-500'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
          
        {review.map((reviewone)=>(
          <ReviewCard key={reviewone.id} review={reviewone} 
          showAvatar={true} 
          showDate={true} 
          showImages={true}  
          showFlag={false} 
          showHelpful={false} 
          showMoreMenu={false} 
          showVerified={false} 
          showReply={false} />
        ))}

        <h1>similar products</h1>
        <ProductGrid products={similarProducts} addToCartBtn={true}></ProductGrid>

        <h2>recommended Products</h2>
        <ProductGrid products={recommendedProducts} addToCartBtn={true}></ProductGrid>
      </div>
    </div>
  );
};

export default ProductDetails;