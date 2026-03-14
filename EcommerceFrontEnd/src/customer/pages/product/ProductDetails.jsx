// src/customer/pages/product/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { CircularProgress } from '@mui/material';
import ReviewCard from '../../components/review/ReviewCard';
import ProductGrid from '../../components/products/ProductGrid';
import { useNavigate, useParams } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { productApi, reviewApi, mapProduct, mapReview } from '../../../api/api';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity]           = useState(1);
  const [selectedSize, setSelectedSize]   = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab]         = useState('description');
  const [addedToCart, setAddedToCart]      = useState(false);

  const { addToCart }                       = useCart();
  const { toggleWishlist, isWishlisted }    = useWishlist();
  const navigate                            = useNavigate();

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    setLoading(true);

    Promise.all([
      productApi.getById(productId),
      reviewApi.getByProduct(productId).catch(() => []),
    ])
      .then(([rawProduct, rawReviews]) => {
        if (cancelled) return;
        const mapped = mapProduct(rawProduct);
        setProduct(mapped);
        setSelectedSize(mapped.sizes?.[0] ?? '');
        setSelectedColor(mapped.colors?.[0] ?? '');
        setReviews(Array.isArray(rawReviews) ? rawReviews.map(mapReview) : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <CircularProgress sx={{ color: '#e8006f' }} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error || 'Product not found'}</p>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images.length > 0 ? product.images : ['https://via.placeholder.com/600'];

  const handleAddToCart = () => {
    addToCart({
      id: product.id, name: product.name,
      price: product.price, image: images[0],
      quantity, size: selectedSize, color: selectedColor,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id, name: product.name,
      price: product.price, image: images[0],
      quantity, size: selectedSize, color: selectedColor,
    });
    navigate('/checkout');
  };

  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto p-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col space-y-3 w-20">
              {images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <img src={image} alt={`view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 relative group">
              <img src={images[selectedImage]} alt={product.name}
                className="w-full h-96 lg:h-[550px] object-cover rounded-2xl shadow-xl" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImage(p => (p - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setSelectedImage(p => (p + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 h-[550px]">
            <div className="h-full overflow-y-scroll scrollbar-hide pb-24">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1 font-medium">{product.brand}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({typeof product.reviews === 'number' ? product.reviews.toLocaleString() : 0} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{'\u20B9'}{product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{'\u20B9'}{product.originalPrice}</span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{discount}% OFF</span>
                    </>
                  )}
                </div>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center mb-6">
                  <Truck className="w-3 h-3 mr-1" /> Same Day Delivery
                </span>

                {/* Delivery check */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">DELIVERY TO</span>
                    <span className="text-gray-400">{'\u25BC'}</span>
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
                {product.colors.length > 0 && (
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
                )}

                {/* Size */}
                {product.sizes.length > 0 && (
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
                )}

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
                    {product.stockCount > 0 && (
                      <span className="text-xs text-gray-500">{product.stockCount} in stock</span>
                    )}
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
                  {addedToCart ? '\u2713 ADDED' : 'ADD TO CART'}
                </button>
                <button onClick={handleBuyNow}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                  <span>BUY NOW</span>
                </button>
                <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: images[0] })}
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
              {['description'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium capitalize transition-colors ${
                    activeTab === tab ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500 hover:text-gray-700'
                  }`}>{tab}</button>
              ))}
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'description' && <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>}
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r}
                showAvatar={true} showDate={true} showImages={true}
                showFlag={false} showHelpful={false} showMoreMenu={false}
                showVerified={false} showReply={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
