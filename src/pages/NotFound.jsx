import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 | Page Not Found | SerajUlMaymar" description="This page does not exist." />

      <section style={{ background: 'var(--ivory-50)' }}>
        <div
          className="container section-spacing"
          style={{ maxWidth: 480, textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 12vw, 8rem)',
              fontWeight: 600,
              color: 'var(--ivory-200)',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Page not found</h1>
          <p style={{ marginBottom: 32 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="btn-outline">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
