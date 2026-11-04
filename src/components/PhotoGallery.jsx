import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * PhotoGallery — asymmetric grid + lightbox for construction photos.
 *
 * Props:
 *   photos — array from src/data/projects.js
 *     [{ id, src, alt, caption }]
 */
export default function PhotoGallery({ photos = [] }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = useCallback((idx) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIdx((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i - 1 + photos.length) % photos.length);
    },
    [lightboxIdx, photos.length, closeLightbox]
  );

  /* Empty state — architectural line-drawing placeholder */
  if (!photos.length) {
    return (
      <div
        style={{
          border: '1px dashed var(--ivory-200)',
          borderRadius: '2px',
          padding: '48px 32px',
          textAlign: 'center',
        }}
      >
        {/* Inline SVG: house elevation with dimension lines */}
        <svg
          viewBox="0 0 320 200"
          fill="none"
          stroke="var(--navy-700)"
          strokeWidth="0.75"
          style={{ width: '100%', maxWidth: 320, margin: '0 auto 24px', opacity: 0.4 }}
          aria-hidden="true"
        >
          {/* Ground line */}
          <line x1="20" y1="170" x2="300" y2="170" />
          {/* House body */}
          <rect x="60" y="90" width="200" height="80" />
          {/* Roof */}
          <polyline points="50,90 160,30 270,90" />
          {/* Door */}
          <rect x="140" y="120" width="40" height="50" />
          {/* Windows */}
          <rect x="80" y="110" width="35" height="30" />
          <rect x="205" y="110" width="35" height="30" />
          {/* Dimension line bottom */}
          <line x1="60" y1="185" x2="260" y2="185" strokeDasharray="4 2" />
          <line x1="60" y1="182" x2="60" y2="188" />
          <line x1="260" y1="182" x2="260" y2="188" />
          {/* Dimension line side */}
          <line x1="45" y1="90" x2="45" y2="170" strokeDasharray="4 2" />
          <line x1="42" y1="90" x2="48" y2="90" />
          <line x1="42" y1="170" x2="48" y2="170" />
        </svg>

        <p
          className="mono-label"
          style={{ color: 'var(--muted)', marginBottom: 8 }}
        >
          PROJECT GALLERY
        </p>
        <p style={{ fontSize: '0.9375rem', maxWidth: 360, margin: '0 auto' }}>
          Project photos are being added. Check back soon to see completed
          homes and renovations.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            className="gallery-item"
            onClick={() => openLightbox(idx)}
            aria-label={`View: ${photo.alt}`}
            style={{ background: 'none', border: '1px solid var(--ivory-200)', padding: 0 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />
            {photo.caption && (
              <span
                className="mono-label"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(7,20,42,0.7))',
                  color: '#fff',
                  padding: '24px 12px 8px',
                  fontSize: '0.625rem',
                }}
              >
                {photo.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          ref={(el) => el?.focus()}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={28} strokeWidth={1.5} />
          </button>
          <img
            src={photos[lightboxIdx].src}
            alt={photos[lightboxIdx].alt}
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: 'default' }}
          />
        </div>
      )}
    </>
  );
}

