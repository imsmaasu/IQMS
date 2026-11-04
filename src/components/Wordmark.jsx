import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

/**
 * Wordmark
 * Text-only brand mark: "Seraj" + gold italic "Ul" + "Maymar"
 * Fraunces semibold. No logo icon.
 */
export default function Wordmark({ size = '1.25rem', light = false }) {
  const { first, middle, last } = siteConfig.wordmark;
  const base = light ? 'rgba(255,255,255,0.95)' : 'var(--navy-950)';

  return (
    <Link
      to="/"
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: size,
        fontWeight: 600,
        color: base,
        textDecoration: 'none',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        display: 'inline-block',
      }}
      aria-label={siteConfig.brandName}
    >
      {first}
      <span
        style={{
          color: 'var(--gold-500)',
          fontStyle: 'italic',
          margin: '0 0.12em',
        }}
      >
        {middle}
      </span>
      {last}
    </Link>
  );
}

