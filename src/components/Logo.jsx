import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Logo Component
 * 
 * Centralized brand logo with text wordmark and inline sprout SVG.
 * When you're ready to replace this with your real image logo, simply
 * swap the SVG inside this component or add an <img> tag.
 */
export default function Logo({ variant = 'default', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link 
      to="/" 
      className={`logo-link ${className}`}
      aria-label="IQMS STEM SEED PARKS - Home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        textDecoration: 'none'
      }}
    >
      {/* Brand Sprout / Seed SVG Icon */}
      <div 
        className="logo-icon-wrap"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: isLight ? 'rgba(255, 255, 255, 0.12)' : '#F0FDFA',
          border: isLight ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #CCFBF1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isLight ? '#5EEAD4' : '#0D9488',
          flexShrink: 0
        }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span 
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.05rem',
            letterSpacing: '-0.02em',
            color: isLight ? '#FFFFFF' : 'var(--color-primary-navy)'
          }}
        >
          IQMS <span style={{ color: isLight ? '#5EEAD4' : 'var(--color-teal-accent)' }}>STEM</span>
        </span>
        <span 
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isLight ? '#94A3B8' : 'var(--color-text-muted)'
          }}
        >
          SEED PARKS
        </span>
      </div>
    </Link>
  );
}
