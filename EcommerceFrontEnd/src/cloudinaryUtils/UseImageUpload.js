// hooks/useImageUpload.js
import { useState, useCallback, useRef } from 'react';
import { uploadImage, deleteImage } from '../services/cloudinaryService';
import { useAuth } from '../context/AuthContext';

/**
 * useImageUpload({ folder, maxFiles, maxSizeMB })
 *
 * Returns:
 *   images      — [{ id, publicId, url, thumbnail, progress, status, error }]
 *   addFiles    — (FileList | File[]) => void
 *   removeImage — (id) => void
 *   clearAll    — () => void
 *   isUploading — boolean
 *   publicIds   — string[]  (for form submission)
 *   urls        — string[]  (ready-to-display URLs)
 */
export function useImageUpload({
  folder    = 'velvetbox/products',
  maxFiles  = 5,
  maxSizeMB = 5,
} = {}) {
  const { jwt } = useAuth();
  const [images, setImages] = useState([]);
  const counterRef = useRef(0); // stable local IDs

  const _setImage = useCallback((id, patch) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, ...patch } : img));
  }, []);

  // ── Add files ──────────────────────────────────────────────────────────────
  const addFiles = useCallback(async (rawFiles) => {
    const files = Array.from(rawFiles);

    // Validate count
    setImages(prev => {
      const slots = maxFiles - prev.length;
      if (slots <= 0) return prev;

      const valid = files
        .slice(0, slots)
        .filter(f => {
          if (f.size > maxSizeMB * 1024 * 1024) {
            console.warn(`[Upload] ${f.name} exceeds ${maxSizeMB}MB, skipped`);
            return false;
          }
          return true;
        });

      const newEntries = valid.map(f => ({
        id:        ++counterRef.current,
        file:      f,
        publicId:  null,
        url:       URL.createObjectURL(f), // instant preview
        thumbnail: null,
        progress:  0,
        status:    'uploading',  // uploading | done | error
        error:     null,
      }));

      // Fire uploads asynchronously per entry
      newEntries.forEach(entry => {
        uploadImage(entry.file, {
          folder,
          onProgress: (pct) => _setImage(entry.id, { progress: pct }),
        })
          .then(result => {
            URL.revokeObjectURL(entry.url); // free blob URL
            _setImage(entry.id, {
              publicId:  result.publicId,
              url:       result.url,
              thumbnail: result.thumbnail,
              progress:  100,
              status:    'done',
              file:      null,
            });
          })
          .catch(err => {
            _setImage(entry.id, {
              status: 'error',
              error:  err.message,
            });
          });
      });

      return [...prev, ...newEntries];
    });
  }, [maxFiles, maxSizeMB, folder, _setImage]);

  // ── Remove image ──────────────────────────────────────────────────────────
  const removeImage = useCallback(async (id) => {
    const img = images.find(i => i.id === id);
    if (!img) return;

    // Revoke blob URL if still pending
    if (img.status === 'uploading' && img.url?.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }

    // Fire delete on Cloudinary if it was successfully uploaded
    if (img.publicId && jwt) {
      deleteImage(img.publicId, jwt).catch(err =>
        console.warn('[Upload] Delete failed:', err.message)
      );
    }

    setImages(prev => prev.filter(i => i.id !== id));
  }, [images, jwt]);

  // ── Clear all ──────────────────────────────────────────────────────────────
  const clearAll = useCallback(() => {
    images.forEach(img => {
      if (img.url?.startsWith('blob:')) URL.revokeObjectURL(img.url);
    });
    setImages([]);
  }, [images]);

  const isUploading = images.some(i => i.status === 'uploading');
  const publicIds   = images.filter(i => i.status === 'done').map(i => i.publicId);
  const urls        = images.filter(i => i.status === 'done').map(i => i.url);

  return { images, addFiles, removeImage, clearAll, isUploading, publicIds, urls };
}