// services/cloudinaryService.js
// Cloudinary unsigned upload — no backend needed for uploads
// Signed deletes go through your Spring Boot backend

const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // unsigned preset

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn('[Cloudinary] Missing VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET in .env');
}

// ── Upload a single File object ──────────────────────────────────────────────
export async function uploadImage(file, { folder = 'velvetbox', onProgress } = {}) {
  const formData = new FormData();
  formData.append('file',           file);
  formData.append('upload_preset',  UPLOAD_PRESET);
  formData.append('folder',         folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          publicId:  data.public_id,
          url:       data.secure_url,
          width:     data.width,
          height:    data.height,
          format:    data.format,
          bytes:     data.bytes,
          // Handy pre-built transform URLs
          thumbnail: buildUrl(data.public_id, { w: 200, h: 200, c: 'fill', q: 'auto', f: 'auto' }),
          medium:    buildUrl(data.public_id, { w: 600, h: 600, c: 'limit', q: 'auto', f: 'auto' }),
          original:  data.secure_url,
        });
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    xhr.send(formData);
  });
}

// ── Upload multiple files in parallel ────────────────────────────────────────
export async function uploadImages(files, options = {}) {
  return Promise.all(files.map(f => uploadImage(f, options)));
}

// ── Build a Cloudinary URL with transformations ───────────────────────────────
// params: { w, h, c, q, f, r, e, ... } → standard Cloudinary transformation params
export function buildUrl(publicId, params = {}) {
  if (!publicId) return '';

  const transforms = Object.entries(params)
    .map(([k, v]) => `${k}_${v}`)
    .join(',');

  const transformStr = transforms ? `${transforms}/` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}${publicId}`;
}

// ── Common transform presets ─────────────────────────────────────────────────
export const transforms = {
  // Product thumbnails in cards
  productThumb: (publicId) =>
    buildUrl(publicId, { w: 300, h: 300, c: 'fill', g: 'auto', q: 'auto', f: 'auto' }),

  // Full product image
  productFull: (publicId) =>
    buildUrl(publicId, { w: 800, h: 800, c: 'limit', q: 'auto', f: 'auto' }),

  // User/seller avatar
  avatar: (publicId) =>
    buildUrl(publicId, { w: 120, h: 120, c: 'fill', g: 'face', r: 'max', q: 'auto', f: 'auto' }),

  // Category banner
  banner: (publicId) =>
    buildUrl(publicId, { w: 1200, h: 400, c: 'fill', g: 'auto', q: 'auto', f: 'auto' }),

  // Blur placeholder (tiny, base64-like)
  placeholder: (publicId) =>
    buildUrl(publicId, { w: 20, h: 20, c: 'fill', q: 1, f: 'auto', e: 'blur:200' }),
};

// ── Delete via your Spring Boot backend (needs auth) ─────────────────────────
// Your backend should call Cloudinary Admin API with the signed delete
export async function deleteImage(publicId, jwt) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const res = await fetch(`${BASE_URL}/media/delete`, {
    method:  'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ publicId }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Delete failed');
  }
  return res.json();
}