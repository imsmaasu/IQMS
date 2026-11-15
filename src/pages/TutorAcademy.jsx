import React from 'react';
import { ExternalLink, GraduationCap, Users, ArrowRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import siteConfig from '../config/siteConfig';

const studentFormUrl = 'https://forms.gle/PbcdMtzjr4tXCQQ38';
const teacherFormUrl = 'https://forms.gle/ijHkWJqKtSeBrgiM6';

export default function TutorAcademy() {
  return (
    <div data-division="education">
      <SEO
        title="Tutor Academy | SerajUl MerajUl Memar Organisation"
        description="Official information and registration forms for students and teachers at IQMS STEM SEED PARKS Tutor Academy."
      />

      {/* Hero */}
      <section
        className="division-surface"
        style={{ borderBottom: '1px solid var(--ivory-200)' }}
      >
        <div className="container section-spacing">
          <div className="stagger" style={{ maxWidth: 720 }}>
            <FadeIn>
              <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                IQMS STEM SEED PARKS · TUTOR ACADEMY
              </p>
            </FadeIn>
            <FadeIn>
              <h1 style={{ marginBottom: 16 }}>Tutor Academy</h1>
            </FadeIn>
            <FadeIn>
              <p style={{ fontSize: '1.0625rem', maxWidth: 600, marginBottom: 28, color: 'var(--navy-950)' }}>
                Welcome to our academic registration portal. Please select the relevant section below to submit student learning requirements or apply as a qualified educator.
              </p>
            </FadeIn>
            <FadeIn>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <a
                  href="#students"
                  className="btn-primary"
                  style={{ background: 'var(--accent)' }}
                >
                  <GraduationCap size={18} strokeWidth={1.5} />
                  Students Section
                </a>
                <a
                  href="#teachers"
                  className="btn-outline"
                >
                  <Users size={18} strokeWidth={1.5} />
                  Teachers Section
                </a>
                <a
                  href={siteConfig.getWhatsAppUrl('Hello, I have an inquiry regarding the Tutor Academy.')}
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

      {/* Forms Main Section */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--ivory-200)' }}>
        <div className="container section-spacing" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gap: 64 }}>
            {/* Students Section */}
            <div id="students" style={{ scrollMarginTop: 90 }}>
              <FadeIn>
                <div
                  style={{
                    border: '1px solid var(--ivory-200)',
                    borderRadius: 12,
                    padding: '36px 32px',
                    background: 'var(--ivory-50)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        background: 'var(--accent-100)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GraduationCap size={26} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 2 }}>
                        SECTION 01
                      </p>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Students</h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--navy-950)', marginBottom: 12, lineHeight: 1.6 }}>
                    Are you a student or parent looking for dedicated one-on-one or group tuition? We offer expert coaching across Matric, FSc, O/A Levels, ECAT, MDCAT, and University STEM subjects.
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: 24, lineHeight: 1.5 }}>
                    Please fill out the official Student Information Form with your grade, subject preferences, schedule requirements, and study goals:
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                    <a
                      href={studentFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ background: 'var(--accent)', padding: '14px 28px', fontSize: '1rem' }}
                    >
                      <GraduationCap size={18} strokeWidth={1.5} />
                      Student Information Form
                      <ExternalLink size={16} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Teachers Section */}
            <div id="teachers" style={{ scrollMarginTop: 90 }}>
              <FadeIn>
                <div
                  style={{
                    border: '1px solid var(--ivory-200)',
                    borderRadius: 12,
                    padding: '36px 32px',
                    background: 'var(--ivory-50)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        background: 'var(--accent-100)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Users size={26} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: 2 }}>
                        SECTION 02
                      </p>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Teachers</h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--navy-950)', marginBottom: 12, lineHeight: 1.6 }}>
                    Are you a qualified educator, lecturer, or subject matter expert passionate about teaching? Join our academy network to teach students on site or online.
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: 24, lineHeight: 1.5 }}>
                    Please submit your academic background, teaching expertise, subjects, and availability via the Teacher Information Form:
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                    <a
                      href={teacherFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{
                        padding: '14px 28px',
                        fontSize: '1rem',
                        borderColor: 'var(--accent-700)',
                        color: 'var(--accent-700)',
                        background: '#fff',
                      }}
                    >
                      <Users size={18} strokeWidth={1.5} />
                      Teacher Information Form
                      <ExternalLink size={16} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Support / Contact notice */}
      <section style={{ background: 'var(--ivory-100)' }}>
        <div className="container" style={{ padding: '40px 24px', textAlign: 'center', maxWidth: 640 }}>
          <FadeIn>
            <h3 style={{ marginBottom: 12 }}>Need assistance with your registration?</h3>
            <p style={{ marginBottom: 20, color: 'var(--muted)', fontSize: '0.9375rem' }}>
              Our academic coordinators are available 24/7 on WhatsApp to help students and instructors.
            </p>
            <a
              href={siteConfig.getWhatsAppUrl('Hello, I need assistance with the Tutor Academy forms.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Chat with Coordinator on WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
