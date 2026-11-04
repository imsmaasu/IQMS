import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const accentColors = {
  construction: { accent: '#E58A1F', accent100: '#FBE9D0', accent700: '#9A5608' },
  software:     { accent: '#2E6BFF', accent100: '#E3ECFF', accent700: '#1B45B8' },
  education:    { accent: '#139C8A', accent100: '#DDF3EF', accent700: '#0B6B5E' },
};

const divisionImages = {
  construction: {
    src: '/divisions/construction-hero.webp',
    alt: 'Custom home construction architecture in Karachi',
    badge: 'TURNKEY CONSTRUCTION'
  },
  software: {
    src: '/divisions/software-hero.webp',
    alt: 'Clean engineering software development code editor',
    badge: 'CUSTOM SOFTWARE AND AI'
  },
  education: {
    src: '/divisions/education-hero.webp',
    alt: 'STEM education and academic mentoring',
    badge: 'TUTOR MARKETPLACE'
  }
};

export default function Home() {
  return (
    <>
      <SEO
        title={`${siteConfig.brandName} | ${siteConfig.tagline}`}
        description={`${siteConfig.brandName}: construction, software development, and education. ${siteConfig.stats[0]?.label}. ${siteConfig.city}, ${siteConfig.country}.`}
      />

      {/* ── Hero ── */}
      <section
        style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div
          className="container section-spacing"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left: Headline */}
          <div className="stagger" style={{ maxWidth: 700 }}>
            <FadeIn>
              <p
                className="mono-label"
                style={{ color: 'var(--muted)', marginBottom: 16 }}
              >
                {siteConfig.city.toUpperCase()} · {siteConfig.stats[0]?.label?.toUpperCase()}
              </p>
            </FadeIn>

            <FadeIn>
              <h1 style={{ marginBottom: 16 }}>
                {siteConfig.tagline}
              </h1>
            </FadeIn>

            <FadeIn>
              <p style={{ fontSize: '1.0625rem', maxWidth: 520, marginBottom: 32 }}>
                {siteConfig.brandName} is a Karachi based group with 25+ years in
                construction and education, now expanded into software development.
                Three divisions, one standard of care.
              </p>
            </FadeIn>

            <FadeIn>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <a
                  href={siteConfig.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  WhatsApp Us
                </a>
                <Link to="/contact" className="btn-ghost" style={{ color: 'var(--gold-700)' }}>
                  Get in touch
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right: Division index */}
          <FadeIn>
            <div
              style={{
                border: '1px solid var(--ivory-200)',
                borderRadius: 2,
              }}
            >
              <div
                className="mono-label"
                style={{
                  padding: '10px 20px',
                  borderBottom: '1px solid var(--ivory-200)',
                  color: 'var(--muted)',
                }}
              >
                INDEX
              </div>
              {divisions.map((div) => {
                const colors = accentColors[div.accentKey] || accentColors.construction;
                return (
                  <Link
                    key={div.id}
                    to={`/${div.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--ivory-200)',
                      transition: 'background 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = colors.accent100)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    onFocus={(e) => (e.currentTarget.style.background = colors.accent100)}
                    onBlur={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span
                      className="mono-label"
                      style={{ color: colors.accent, minWidth: 28 }}
                    >
                      {div.number}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--navy-950)', flex: 1 }}>
                      {div.name}
                    </span>
                    <ArrowRight size={16} strokeWidth={1.5} style={{ color: 'var(--muted)' }} />
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .container.section-spacing { grid-template-columns: 1.2fr 0.8fr !important; }
          }
        `}</style>
      </section>

      {/* ── Facts Strip ── */}
      <section style={{ background: 'var(--navy-950)' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            padding: '28px 24px',
            justifyContent: 'center',
          }}
        >
          {siteConfig.stats
            .filter((s) => s.value !== null)
            .map((stat) => (
              <span
                key={stat.label}
                className="mono-label"
                style={{ color: 'var(--gold-500)' }}
              >
                {stat.label}
              </span>
            ))}
        </div>
      </section>

      {/* ── Division Rows with Real Imagery ── */}
      {divisions.map((div, idx) => {
        const colors = accentColors[div.accentKey] || accentColors.construction;
        const isAlt = idx % 2 === 1;
        const imgMeta = divisionImages[div.id];

        return (
          <section
            key={div.id}
            style={{
              background: isAlt ? 'var(--ivory-100)' : 'var(--ivory-50)',
              borderBottom: '1px solid var(--ivory-200)',
            }}
          >
            <div className="container section-spacing">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 48,
                  alignItems: 'center',
                }}
                className={`division-row division-row-${idx}`}
              >
                {/* Real Photography Card */}
                <FadeIn>
                  <div
                    style={{
                      border: '1px solid var(--ivory-200)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      background: colors.accent100,
                    }}
                  >
                    <img
                      src={imgMeta.src}
                      alt={imgMeta.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: 280,
                        maxHeight: 340,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        background: 'rgba(7,20,42,0.85)',
                        color: colors.accent,
                        padding: '4px 10px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.12em',
                        borderRadius: 2,
                      }}
                    >
                      {div.number} · {imgMeta.badge}
                    </div>
                  </div>
                </FadeIn>

                {/* Text */}
                <FadeIn>
                  <p className="mono-label" style={{ color: colors.accent, marginBottom: 8 }}>
                    {div.number} {div.name.toUpperCase()}
                  </p>
                  <h2 style={{ marginBottom: 12 }}>{div.name}</h2>
                  <p style={{ fontSize: '1rem', marginBottom: 24, maxWidth: 520 }}>
                    {div.summary}
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 24px',
                      display: 'grid',
                      gap: 10,
                    }}
                  >
                    {div.services.map((svc, i) => (
                      <li
                        key={svc}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 12,
                          fontSize: '0.9375rem',
                          color: 'var(--navy-950)',
                        }}
                      >
                        <span
                          className="mono-label"
                          style={{ color: colors.accent, minWidth: 20 }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {svc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/${div.slug}`}
                    className="btn-ghost"
                    style={{ color: colors.accent700 }}
                  >
                    Explore {div.name}
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Link>
                </FadeIn>
              </div>

              <style>{`
                @media (min-width: 768px) {
                  .division-row-${idx} {
                    grid-template-columns: 1fr 1fr !important;
                    direction: ${idx % 2 === 0 ? 'ltr' : 'rtl'};
                  }
                  .division-row-${idx} > * { direction: ltr; }
                }
              `}</style>
            </div>
          </section>
        );
      })}

      {/* ── How We Work ── */}
      <section style={{ background: 'var(--ivory-50)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              HOW WE WORK
            </p>
            <h2 style={{ marginBottom: 48 }}>Straightforward, start to finish.</h2>
          </FadeIn>

          {[
            {
              num: '01',
              title: 'You tell us what you need',
              text: 'A house, an app, a tutor: describe the scope over WhatsApp or a quick call. We listen first, then respond with specifics.',
            },
            {
              num: '02',
              title: 'One team handles it',
              text: 'No subcontracting surprises. Whether it is construction, software, or education, a single team is responsible from start to handover.',
            },
            {
              num: '03',
              title: 'You stay informed throughout',
              text: 'Regular updates at every milestone. We stay in close touch throughout the delivery.',
            },
          ].map((step) => (
            <FadeIn key={step.num}>
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  marginBottom: 40,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    color: 'var(--ivory-200)',
                    lineHeight: 1,
                    minWidth: 56,
                  }}
                >
                  {step.num}
                </span>
                <div>
                  <h3 style={{ marginBottom: 6, fontSize: '1.125rem' }}>{step.title}</h3>
                  <p style={{ margin: 0 }}>{step.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact Band ── */}
      <section style={{ background: 'var(--navy-900)' }}>
        <div
          className="container"
          style={{
            padding: '48px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            href={siteConfig.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            WhatsApp Us
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn-ghost"
            style={{ color: 'var(--gold-500)' }}
          >
            <Mail size={16} strokeWidth={1.5} />
            {siteConfig.email}
          </a>
        </div>
      </section>
    </>
  );
}
