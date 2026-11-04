import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const div = divisions.find((d) => d.id === 'education');

const levels = [
  { name: 'Matric and FSc', badge: 'BISE and Federal Board' },
  { name: 'O and A Levels', badge: 'Cambridge CAIE and Edexcel' },
  { name: 'ECAT and MDCAT Prep', badge: 'Competitive Entry Tests' },
  { name: 'University and Higher STEM', badge: 'Undergrad and Graduate' },
];

const subjects = [
  'Maths', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'English', 'Engineering subjects',
];

export default function Education() {
  return (
    <div data-division="education">
      <SEO title={div.seo.title} description={div.seo.description} />

      {/* ── Hero ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div className="container section-spacing">
          <div className="stagger" style={{ maxWidth: 640 }}>
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <Link to="/education/enroll" className="btn-primary" style={{ background: 'var(--accent)' }}>
                  <MessageCircle size={18} strokeWidth={1.5} />
                  Enroll Now
                </Link>
                <a
                  href={siteConfig.getWhatsAppUrl('Hello, I want to enroll for tutoring at IQMS STEM SEED PARKS.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ color: 'var(--accent-700)' }}
                >
                  WhatsApp Us
                  <ArrowRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Levels ── */}
      <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              LEVELS WE COVER
            </p>
            <h2 style={{ marginBottom: 48 }}>Every academic stage</h2>
          </FadeIn>

          <div style={{ display: 'grid', gap: 0 }}>
            {levels.map((level, i) => (
              <FadeIn key={level.name}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 20,
                    padding: '20px 0',
                    borderBottom: i < levels.length - 1 ? '1px solid var(--ivory-200)' : 'none',
                  }}
                >
                  <span
                    className="mono-label"
                    style={{ color: 'var(--accent)', minWidth: 28 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>{level.name}</span>
                    <span
                      className="mono-label"
                      style={{
                        color: 'var(--muted)',
                        marginLeft: 12,
                        fontSize: '0.625rem',
                      }}
                    >
                      {level.badge}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              SUBJECTS
            </p>
            <h2 style={{ marginBottom: 32 }}>Core subjects and more</h2>
          </FadeIn>

          <FadeIn>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 16,
              }}
            >
              {subjects.map((sub) => (
                <span
                  key={sub}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--ivory-200)',
                    borderRadius: 14,
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--navy-950)',
                    background: '#fff',
                  }}
                >
                  {sub}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
              All other subjects on request.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ background: 'var(--ivory-50)', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing" style={{ maxWidth: 640 }}>
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              HOW IT WORKS
            </p>
            <h2 style={{ marginBottom: 48 }}>Three steps to start</h2>
          </FadeIn>

          {[
            {
              num: '01',
              title: 'Tell us the subject and level',
              text: 'Fill out the enrollment form or send us a WhatsApp message with your details.',
            },
            {
              num: '02',
              title: 'We match you with a tutor',
              text: 'Based on subject, level, location, and timing, we find a qualified tutor from our network.',
            },
            {
              num: '03',
              title: 'Start learning',
              text: 'Classes begin online or on site, at a time that fits your schedule.',
            },
          ].map((step) => (
            <FadeIn key={step.num}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 40, alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    opacity: 0.35,
                    lineHeight: 1,
                    minWidth: 48,
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

          <FadeIn>
            <Link
              to="/education/enroll"
              className="btn-primary"
              style={{ background: 'var(--accent)' }}
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Enroll Now
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
