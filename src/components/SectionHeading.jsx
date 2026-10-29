import React from 'react';

/**
 * Reusable SectionHeading Component
 * Standardizes section headers with tag/badge, title, and subtitle.
 */
export default function SectionHeading({
  tag,
  title,
  subtitle,
  centered = true,
  className = '',
  light = false
}) {
  return (
    <div
      className={`section-header ${className}`}
      style={{
        textAlign: centered ? 'center' : 'left',
        maxWidth: centered ? '720px' : '100%',
        margin: centered ? '0 auto 3rem auto' : '0 0 2.5rem 0',
      }}
    >
      {tag && (
        <div style={{ marginBottom: '0.85rem' }}>
          <span 
            className={`badge ${light ? 'badge-amber' : 'badge-teal'}`}
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em'
            }}
          >
            {tag}
          </span>
        </div>
      )}

      <h2
        style={{
          color: light ? '#FFFFFF' : 'var(--color-text-headline)',
          marginBottom: subtitle ? '1rem' : '0',
          letterSpacing: '-0.025em',
          fontWeight: 800
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: light ? '#94A3B8' : 'var(--color-text-muted)',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
