import React from 'react';
import { MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import DivisionForm from '../components/DivisionForm';
import PhotoGallery from '../components/PhotoGallery';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';
import constructionProjects from '../data/projects';

const div = divisions.find((d) => d.id === 'construction');

export default function Construction() {
  return (
    <div data-division="construction">
      <SEO title={div.seo.title} description={div.seo.description} />

      {/* ── Hero ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div className="container section-spacing">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="construction-hero-grid"
          >
            {/* Text */}
            <div className="stagger">
              <FadeIn>
                <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                  {div.heroCopy.eyebrow}
                </p>
              </FadeIn>
              <FadeIn>
                <h1 style={{ marginBottom: 16 }}>{div.heroCopy.headline}</h1>
              </FadeIn>
              <FadeIn>
                <p style={{ fontSize: '1.0625rem', maxWidth: 520, marginBottom: 24 }}>
                  {div.heroCopy.description}
                </p>
              </FadeIn>
              <FadeIn>
                <a
                  href={siteConfig.getWhatsAppUrl('Hello, I need a construction quote.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  Request a Quote
                </a>
              </FadeIn>
            </div>

            {/* Featured real photograph */}
            <FadeIn>
              <div
                style={{
                  border: '1px solid var(--ivory-200)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src="/projects/construction/custom-home.webp"
                  alt="Custom home construction in Karachi"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: 360,
                    objectFit: 'cover',
                  }}
                />
                <span
                  className="mono-label"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(7,20,42,0.8))',
                    color: '#fff',
                    padding: '24px 16px 10px',
                    fontSize: '0.6875rem',
                  }}
                >
                  GROUND UP RESIDENTIAL CONSTRUCTION · KARACHI
                </span>
              </div>
            </FadeIn>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .construction-hero-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              SERVICES
            </p>
            <h2 style={{ marginBottom: 48 }}>What we build</h2>
          </FadeIn>

          {div.services.map((svc, i) => (
            <FadeIn key={svc}>
              <div
                className="tick-border"
                style={{
                  padding: '24px 0 24px 24px',
                  borderBottom: i < div.services.length - 1 ? '1px solid var(--ivory-200)' : 'none',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    opacity: 0.3,
                    lineHeight: 1,
                    minWidth: 48,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{svc}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Turnkey Statement ── */}
      <section style={{ background: 'var(--accent-100)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container" style={{ padding: '48px 24px', maxWidth: 640 }}>
          <FadeIn>
            <h3 style={{ marginBottom: 12 }}>Delivered turnkey</h3>
            <p>
              One team handles your project from the first site visit to the
              final handover, no subcontractors to chase, no coordination on
              your part. We manage everything in between.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Photo Gallery ── */}
      <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              PROJECT GALLERY
            </p>
            <h2 style={{ marginBottom: 32 }}>Our work</h2>
          </FadeIn>
          <FadeIn>
            <PhotoGallery photos={constructionProjects} />
          </FadeIn>
        </div>
      </section>

      {/* ── Karachi Note ── */}
      <section style={{ background: 'var(--ivory-100)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <p className="mono-label" style={{ color: 'var(--muted)', textAlign: 'center' }}>
            ALL CONSTRUCTION SERVICES ARE AVAILABLE IN KARACHI ONLY
          </p>
        </div>
      </section>

      {/* ── Quote Request Form ── */}
      <section style={{ background: 'var(--ivory-50)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <DivisionForm config={div.formConfig} divisionName="Construction" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
