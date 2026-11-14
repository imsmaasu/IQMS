import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ExternalLink, GraduationCap, Users } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const div = divisions.find((d) => d.id === 'education');

const studentFormUrl = 'https://forms.gle/PbcdMtzjr4tXCQQ38';
const teacherFormUrl = 'https://forms.gle/ijHkWJqKtSeBrgiM6';

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
                <a
                  href={studentFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: 'var(--accent)' }}
                >
                  <GraduationCap size={18} strokeWidth={1.5} />
                  Student Information Form
                  <ExternalLink size={14} strokeWidth={1.5} />
                </a>
                <a
                  href={teacherFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Users size={18} strokeWidth={1.5} />
                  Teacher Information Form
                  <ExternalLink size={14} strokeWidth={1.5} />
                </a>
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

      {/* ── Information Forms Section ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing">
          <FadeIn>
            <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
              REGISTRATION & FORMS
            </p>
            <h2 style={{ marginBottom: 16 }}>Join IQMS STEM SEED PARKS</h2>
            <p style={{ maxWidth: 600, marginBottom: 32, color: 'var(--muted)' }}>
              Whether you are a student seeking expert tutoring or a qualified educator looking to teach, please fill out our official information form below.
            </p>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {/* Student Card */}
            <FadeIn>
              <div
                style={{
                  border: '1px solid var(--ivory-200)',
                  borderRadius: 8,
                  padding: 28,
                  background: 'var(--ivory-50)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: 'var(--accent-100)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <GraduationCap size={24} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ marginBottom: 8, fontSize: '1.25rem' }}>Student Information Form</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: 24 }}>
                    Looking for a qualified tutor? Submit your subjects, academic level, and learning schedule requirements.
                  </p>
                </div>
                <a
                  href={studentFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: 'var(--accent)', justifyContent: 'center' }}
                >
                  Open Student Form
                  <ExternalLink size={16} strokeWidth={1.5} />
                </a>
              </div>
            </FadeIn>

            {/* Teacher Card */}
            <FadeIn>
              <div
                style={{
                  border: '1px solid var(--ivory-200)',
                  borderRadius: 8,
                  padding: 28,
                  background: 'var(--ivory-50)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: 'var(--accent-100)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Users size={24} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ marginBottom: 8, fontSize: '1.25rem' }}>Teacher Information Form</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: 24 }}>
                    Interested in tutoring with us? Submit your qualifications, expertise, teaching experience, and availability.
                  </p>
                </div>
                <a
                  href={teacherFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ justifyContent: 'center' }}
                >
                  Open Teacher Form
                  <ExternalLink size={16} strokeWidth={1.5} />
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <a
                href={studentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: 'var(--accent)' }}
              >
                <GraduationCap size={18} strokeWidth={1.5} />
                Student Information Form
                <ExternalLink size={14} strokeWidth={1.5} />
              </a>
              <a
                href={teacherFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Users size={18} strokeWidth={1.5} />
                Teacher Information Form
                <ExternalLink size={14} strokeWidth={1.5} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
