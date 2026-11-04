import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const accentColors = {
  construction: '#E58A1F',
  software: '#2E6BFF',
  education: '#139C8A',
};

const formRoutes = {
  construction: '/construction',
  software: '/software',
  education: '/education/enroll',
};

export default function Contact() {
  return (
    <>
      <SEO
        title={`Contact | ${siteConfig.brandName}`}
        description={`Get in touch with ${siteConfig.brandName}. WhatsApp, email, or visit our division pages. ${siteConfig.city}, available ${siteConfig.availability}.`}
      />

      {/* ── Main CTA ── */}
      <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640, textAlign: 'center' }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              CONTACT
            </p>
            <h1 style={{ marginBottom: 16 }}>Reach us any time</h1>
            <p style={{ fontSize: '1.0625rem', marginBottom: 32 }}>
              {siteConfig.city} · Available {siteConfig.availability}
            </p>
          </FadeIn>

          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '16px 40px', fontSize: '1rem' }}
              >
                <MessageCircle size={20} strokeWidth={1.5} />
                WhatsApp: {siteConfig.displayPhone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-ghost"
                style={{ color: 'var(--gold-700)' }}
              >
                <Mail size={16} strokeWidth={1.5} />
                {siteConfig.email}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quick Links to Division Forms ── */}
      <section style={{ background: 'var(--ivory-100)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              DIVISION FORMS
            </p>
            <h2 style={{ marginBottom: 32 }}>Go directly to a form</h2>
          </FadeIn>

          {divisions.map((div) => (
            <FadeIn key={div.id}>
              <Link
                to={formRoutes[div.id] || `/${div.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: '1px solid var(--ivory-200)',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                <span
                  className="mono-label"
                  style={{ color: accentColors[div.accentKey], minWidth: 28 }}
                >
                  {div.number}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>
                    {div.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      color: 'var(--muted)',
                      marginTop: 2,
                    }}
                  >
                    {div.formConfig.title}
                  </span>
                </div>
                <ArrowRight size={16} strokeWidth={1.5} style={{ color: 'var(--muted)' }} />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
