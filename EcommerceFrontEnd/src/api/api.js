// src/api/api.js  —  Centralised backend communication layer
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// ── helpers ──────────────────────────────────────────────────────────────────
function getJwt() {
  return localStorage.getItem('vb_jwt');
}

function authHeaders() {
  const jwt = getJwt();
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
}

async function request(method, path, { body, auth = false, params } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) Object.assign(headers, authHeaders());

  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== '')
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

// ── Data mappers  (backend model → frontend shape) ──────────────────────────
// Backend Product has: title, sellingprice, mrpPrice, images[], numRatings, reviews[], discountPercent …
// Frontend expects  : name,  price,         originalPrice, image (single), rating, reviews (count) …

export function mapProduct(p) {
  if (!p) return null;
  return {
    id:            p.id,
    name:          p.title ?? p.name ?? '',
    description:   p.description ?? '',
    price:         p.sellingprice ?? p.price ?? 0,
    originalPrice: p.mrpPrice ?? p.originalPrice ?? 0,
    discount:      p.discountPercent ?? p.discount ?? 0,
    rating:        p.numRatings ?? p.rating ?? 0,
    reviews:       Array.isArray(p.reviews) ? p.reviews.length : (p.reviews ?? 0),
    image:         Array.isArray(p.images) ? p.images[0] : (p.image ?? ''),
    images:        p.images ?? (p.image ? [p.image] : []),
    color:         p.color ?? '',
    colors:        p.color ? [p.color] : [],
    sizes:         p.sizes ? (typeof p.sizes === 'string' ? p.sizes.split(',').map(s => s.trim()) : p.sizes) : [],
    category:      p.category?.name ?? p.category ?? '',
    categoryId:    p.category?.id ?? null,
    brand:         p.seller?.businessName ?? p.brand ?? '',
    inStock:       (p.quantity ?? 1) > 0,
    stockCount:    p.quantity ?? 0,
    delivery:      p.delivery ?? '',
    createdAt:     p.createdAt ?? null,
    // keep raw for backend calls
    _raw: p,
  };
}

export function mapCartItem(item) {
  if (!item) return null;
  const product = item.product ? mapProduct(item.product) : {};
  return {
    cartItemId: item.id,
    id:         item.product?.id ?? item.id,
    name:       product.name ?? '',
    price:      item.sellingPrice ?? product.price ?? 0,
    originalPrice: item.mrpPrice ?? product.originalPrice ?? 0,
    image:      product.image ?? '',
    quantity:   item.quantity ?? 1,
    size:       item.size ?? '',
    color:      product.color ?? '',
  };
}

export function mapOrder(o) {
  if (!o) return null;
  return {
    id:                o.id,
    status:            (o.orderStatus ?? o.status ?? '').toLowerCase(),
    date:              o.orderDate ?? o.date ?? '',
    total:             o.totalSellingPrice ?? o.total ?? 0,
    items:             (o.orderItems ?? o.items ?? []).map(mapOrderItem),
    estimatedDelivery: o.deliverDate ?? o.estimatedDelivery ?? '',
    deliveredDate:     o.deliverDate ?? o.deliveredDate ?? '',
    cancelledDate:     o.cancelledDate ?? '',
  };
}

function mapOrderItem(item) {
  if (!item) return null;
  const product = item.product ? mapProduct(item.product) : {};
  return {
    id:      item.id,
    name:    product.name ?? item.name ?? '',
    brand:   product.brand ?? item.brand ?? '',
    size:    item.size ?? '',
    color:   product.color ?? item.color ?? '',
    price:   item.sellingPrice ?? product.price ?? 0,
    rating:  product.rating ?? 0,
    reviews: product.reviews ?? 0,
    image:   product.image ?? '',
  };
}

export function mapReview(r) {
  if (!r) return null;
  return {
    id:        r.id,
    userName:  r.user?.fullName ?? r.userName ?? '',
    avatar:    (r.user?.fullName ?? '').split(' ').map(w => w[0]).join('').toUpperCase() || '??',
    rating:    r.reviewRating ?? r.rating ?? 0,
    title:     r.reviewText?.substring(0, 60) ?? r.title ?? '',
    content:   r.reviewText ?? r.content ?? '',
    date:      r.createdAt ?? r.date ?? '',
    verified:  true,
    helpful:   0,
    images:    r.productImages ?? [],
    replies:   0,
  };
}

// ── Products ─────────────────────────────────────────────────────────────────
export const productApi = {
  getAll(filters = {}) {
    // Backend expects: category, brand, colors, sizes, minPrice, maxPrice,
    //                  minDiscount, sort, stock, pageNumber
    return request('GET', '/products', { params: filters });
  },
  getById(id) {
    return request('GET', `/products/${id}`);
  },
  search(query) {
    return request('GET', '/products/search', { params: { query } });
  },
};

// ── Cart ─────────────────────────────────────────────────────────────────────
export const cartApi = {
  get() {
    return request('GET', '/api/cart', { auth: true });
  },
  addItem(productId, size, quantity = 1) {
    return request('POST', '/api/cart/add', {
      auth: true,
      body: { productId, size, quantity },
    });
  },
  updateItem(cartItemId, quantity) {
    return request('PUT', `/api/cart/item/${cartItemId}`, {
      auth: true,
      body: { quantity },
    });
  },
  removeItem(id) {
    return request('DELETE', `/api/cart/item/${id}`, { auth: true });
  },
};

// ── Orders ───────────────────────────────────────────────────────────────────
export const orderApi = {
  create(shippingAddress, paymentMethod) {
    return request('POST', '/api/orders', {
      auth: true,
      body: shippingAddress,
      params: { paymentMethod },
    });
  },
  getById(orderId) {
    return request('GET', `/api/orders/${orderId}`, { auth: true });
  },
  getUserOrders() {
    return request('GET', '/api/orders/user', { auth: true });
  },
  cancel(orderId) {
    return request('PUT', `/api/orders/${orderId}/cancel`, { auth: true });
  },
};

// ── Reviews ──────────────────────────────────────────────────────────────────
export const reviewApi = {
  getByProduct(productId) {
    return request('GET', `/api/products/${productId}/reviews`);
  },
  create(productId, { reviewText, reviewRating, productImages = [] }) {
    return request('POST', `/api/products/${productId}/reviews`, {
      auth: true,
      body: { reviewText, reviewRating, productImages },
    });
  },
  update(reviewId, { reviewText, reviewRating }) {
    return request('PATCH', `/api/reviews/${reviewId}`, {
      auth: true,
      body: { reviewText, reviewRating },
    });
  },
  delete(reviewId) {
    return request('DELETE', `/api/reviews/${reviewId}`, { auth: true });
  },
};

// ── Wishlist ─────────────────────────────────────────────────────────────────
export const wishlistApi = {
  get() {
    return request('GET', '/api/wishlist', { auth: true });
  },
  toggleProduct(productId) {
    return request('POST', `/api/wishlist/add-product/${productId}`, { auth: true });
  },
};

// ── User ─────────────────────────────────────────────────────────────────────
export const userApi = {
  getProfile() {
    return request('GET', '/users/profile', { auth: true });
  },
};
