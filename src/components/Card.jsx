import React from 'react';

/**
 * Reusable Card Component
 * Provides clean academic styling, crisp borders, and subtle elevation.
 */
export default function Card({
  children,
  className = '',
  hoverable = true,
  padding = '1.75rem',
  style = {},
  ...props
}) {
  return (
    <div
      className={`custom-card ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: padding,
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
