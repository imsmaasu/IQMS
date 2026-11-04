import React from 'react';
import { MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import DivisionForm from '../components/DivisionForm';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const div = divisions.find((d) => d.id === 'software');

export default function Software() {
  return (
    <div data-division="software">
      <SEO title={div.seo.title} description={div.seo.description} />

      {/* ── Hero ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container section-spacing">
          <div className="stagger" style={{ maxWidth: 640 }}>
            <FadeIn>
              <p className="mono-label" style={{ marginBottom: 12 }}>
                {div.heroCopy.eyebrow}
              </p>
            </FadeIn>
            <FadeIn>
              <h1 style={{ marginBottom: 16 }}>{div.heroCopy.headline}</h1>
            </FadeIn>
            <FadeIn>
              <p style={{ fontSize: '1.0625rem', marginBottom: 24 }}>
                {div.heroCopy.description}
              </p>
            </FadeIn>
            <FadeIn>
              <a
                href={siteConfig.getWhatsAppUrl('Hello, I have a software project to discuss.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                Start a Conversation
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ marginBottom: 12 }}>
              // SERVICES
            </p>
            <h2 style={{ marginBottom: 48 }}>What we build</h2>
          </FadeIn>

          <div style={{ display: 'grid', gap: 0 }}>
            {div.services.map((svc, i) => (
              <FadeIn key={svc}>
                <div
                  style={{
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 20,
                    cursor: 'default',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(46,107,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    className="mono-label"
                    style={{ minWidth: 40 }}
                  >
                    // {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 500 }}>
                    {svc}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reach ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container" style={{ padding: '48px 24px', maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ marginBottom: 12 }}>
              // REACH
            </p>
            <p style={{ fontSize: '1.0625rem' }}>
              We work with clients in Pakistan and abroad. All collaboration is
              remote friendly, we scope, build, and deliver over calls and
              shared project boards.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Project Inquiry Form ── */}
      <section style={{ background: 'var(--ivory-50)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <DivisionForm config={div.formConfig} divisionName="Software" />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
