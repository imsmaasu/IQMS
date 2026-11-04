import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import DivisionForm from '../components/DivisionForm';
import siteConfig from '../config/siteConfig';

/**
 * Generic DivisionPage template fallback.
 * Renders when a new division is added to divisions.js without a dedicated custom page override.
 */
export default function DivisionPage({ division }) {
  if (!division) return null;

  return (
    <div data-division={division.accentKey || division.id}>
      <SEO
        title={division.seo?.title || `${division.name} | ${siteConfig.brandName}`}
        description={division.seo?.description || division.summary}
      />

      {/* Hero */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div className="container section-spacing">
          <div className="stagger" style={{ maxWidth: 640 }}>
            <FadeIn>
              <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                {division.heroCopy?.eyebrow || `${division.number} · ${division.name.toUpperCase()}`}
              </p>
            </FadeIn>
            <FadeIn>
              <h1 style={{ marginBottom: 16 }}>
                {division.heroCopy?.headline || division.name}
              </h1>
            </FadeIn>
            <FadeIn>
              <p style={{ fontSize: '1.0625rem', maxWidth: 520, marginBottom: 24 }}>
                {division.heroCopy?.description || division.summary}
              </p>
            </FadeIn>
            <FadeIn>
              <a
                href={siteConfig.getWhatsAppUrl(`Hello, I would like to inquire about ${division.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                Connect on WhatsApp
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services */}
      {division.services && division.services.length > 0 && (
        <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
          <div className="container section-spacing">
            <FadeIn>
              <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                SERVICES AND SCOPE
              </p>
              <h2 style={{ marginBottom: 48 }}>What we provide</h2>
            </FadeIn>

            <div style={{ display: 'grid', gap: 0 }}>
              {division.services.map((svc, i) => (
                <FadeIn key={svc}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 20,
                      padding: '20px 0',
                      borderBottom: i < division.services.length - 1 ? '1px solid var(--ivory-200)' : 'none',
                    }}
                  >
                    <span
                      className="mono-label"
                      style={{ color: 'var(--accent)', minWidth: 28 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--navy-950)' }}>
                      {svc}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      {division.formConfig && (
        <section style={{ background: 'var(--ivory-100)' }}>
          <div className="container section-spacing" style={{ maxWidth: 640 }}>
            <FadeIn>
              <DivisionForm config={division.formConfig} divisionName={division.name} />
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  );
}
