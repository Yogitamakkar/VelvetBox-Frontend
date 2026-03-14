// components/CloudinaryImage.jsx
import React, { useState, memo } from 'react';
import { buildUrl, transforms } from '../services/cloudinaryService';

/**
 * <CloudinaryImage
 *   publicId="velvetbox/products/xyz"
 *   preset="productThumb"        // uses transforms.productThumb
 *   width={300} height={300}     // or pass custom transform params
 *   params={{ w:300, h:300, c:'fill' }}
 *   alt="Product"
 *   style={{}}
 *   className=""
 *   lazy                         // default true
 *   showPlaceholder              // default true — blur-up effect
 * />
 */
const CloudinaryImage = memo(({
  publicId,
  src,               // fallback: plain URL (non-Cloudinary)
  preset,            // keyof transforms
  params,            // custom transform params object
  alt = '',
  style = {},
  className = '',
  lazy = true,
  showPlaceholder = true,
  onLoad,
  onError,
  ...rest
}) => {
  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  // Build the final image URL
  const imageSrc = (() => {
    if (!publicId) return src || '';
    if (preset && transforms[preset]) return transforms[preset](publicId);
    if (params)  return buildUrl(publicId, params);
    return buildUrl(publicId, { q: 'auto', f: 'auto' });
  })();

  const placeholderSrc = showPlaceholder && publicId
    ? buildUrl(publicId, { w: 20, h: 20, c: 'fill', q: 1, f: 'auto', e: 'blur:200' })
    : null;

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setErrored(true);
    onError?.(e);
  };

  if (errored) {
    return (
      <div style={{
        background: '#f3f4f6', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: '#9ca3af', fontSize: 12,
        ...style,
      }} className={className}>
        <span>📷</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {/* Blur placeholder — shown until main image loads */}
      {showPlaceholder && placeholderSrc && !loaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'inherit',
            filter: 'blur(8px)',
            transform: 'scale(1.05)',
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Main image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.35s ease',
          display: 'block',
        }}
        {...rest}
      />
    </div>
  );
});

export default CloudinaryImage;