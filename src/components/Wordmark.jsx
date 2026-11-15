import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

/**
 * Wordmark
 * Text-only brand mark: "Seraj" + gold italic "Ul" + " Meraj" + gold italic "Ul" + " Memar Organisation"
 * Fraunces semibold. No logo icon.
 */
export default function Wordmark({ size = '1.25rem', light = false }) {
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
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      aria-label={siteConfig.brandName}
    >
      <span>Seraj</span>
      <span
        style={{
          color: 'var(--gold-500)',
          fontStyle: 'italic',
          marginRight: '0.28em',
        }}
      >
        Ul
      </span>
      <span>Meraj</span>
      <span
        style={{
          color: 'var(--gold-500)',
          fontStyle: 'italic',
          marginRight: '0.28em',
        }}
      >
        Ul
      </span>
      <span>Memar</span>
      <span
        style={{
          fontSize: '0.8em',
          fontWeight: 400,
          color: light ? 'rgba(255,255,255,0.7)' : 'var(--muted)',
          marginLeft: '0.35em',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Organisation
      </span>
    </Link>
  );
}

