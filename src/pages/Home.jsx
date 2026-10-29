import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import siteConfig from '../config/siteConfig';
import { academicLevels } from '../data/levels';

export default function Home() {
  const howItWorks = [
    {
      step: "01",
      title: "Tell Us What You Need",
      description: "Fill our quick enrollment form or send a WhatsApp message mentioning your academic board, subjects, and whether you prefer online or on-site classes."
    },
    {
      step: "02",
      title: "We Match You with a Qualified Tutor",
      description: "Our academic coordinators handpick a verified subject specialist tailored to your syllabus, learning pace, and preferred schedule within 24 hours."
    },
    {
      step: "03",
      title: "Start Learning Online or On-Site",
      description: "Begin with a trial session, assess tutor compatibility, establish clear academic goals, and achieve top grades with regular progress tracking."
    }
  ];

  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: "Verified & Expert STEM Tutors",
      description: "Carefully vetted graduates and subject specialists from leading universities, CAIE certified educators, and board toppers."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      title: "All Boards & All Subjects",
      description: "From Cambridge IGCSE, O/A Levels, and Federal/Punjab Boards to ECAT, MDCAT, and advanced University engineering subjects."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Flexible Online or Home Tuition",
      description: "Learn comfortably via interactive 1-on-1 online digital whiteboards or request in-person home tutoring in supported cities."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Personalized Matching",
      description: "We don't do one-size-fits-all. Every student is paired with an educator who matches their exact personality and learning pace."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Parent-Tutor Communication",
      description: "Bi-weekly progress updates, transparent attendance records, and direct feedback so parents remain confident in student growth."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      title: "Exam & Grade Oriented Drill",
      description: "Past-paper drills, topical question banks, marking scheme mastery, and exam time management techniques."
    }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)',
          paddingTop: '4.5rem',
          paddingBottom: '5rem',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
          {/* Academic Trust Badge */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span 
              className="badge badge-teal"
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-teal-accent)' }}></span>
              Trusted STEM & Academic Tutor Marketplace
            </span>
          </div>

          <h1 
            style={{
              color: 'var(--color-primary-navy)',
              marginBottom: '1.25rem',
              lineHeight: 1.18,
              fontWeight: 800
            }}
          >
            Find the Right Tutor for Any Subject, Online or On-Site
          </h1>

          <p 
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--color-text-body)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '720px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Personalized 1-on-1 tutoring for <strong>Matric/FSc</strong>, <strong>O/A Levels</strong>, <strong>ECAT/MDCAT</strong>, and <strong>University STEM</strong>. Matched with verified educators to boost confidence and secure top grades.
          </p>

          {/* Action CTAs */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}
          >
            <Button
              to="/enroll"
              variant="primary"
              size="lg"
            >
              Enroll Now
            </Button>

            <Button
              href={siteConfig.getWhatsAppUrl("Hello IQMS STEM SEED PARKS! I want to find a tutor.")}
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon size={20} color="#FFFFFF" />
              <span>Chat on WhatsApp</span>
            </Button>
          </div>

          {/* Micro trust indicators */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-teal-accent)', fontWeight: 700 }}>✓</span>
              <span>100% Vetted Subject Specialists</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-teal-accent)', fontWeight: 700 }}>✓</span>
              <span>Online & In-Person Home Classes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-teal-accent)', fontWeight: 700 }}>✓</span>
              <span>Free Consultation & Fast Matching</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works (3 Steps) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <SectionHeading
            tag="Simple 3-Step Process"
            title="How It Works"
            subtitle="Getting started with your personalized tutor takes only a few minutes."
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}
          >
            {howItWorks.map((item, index) => (
              <Card 
                key={item.step} 
                style={{
                  position: 'relative',
                  padding: '2.25rem 1.75rem',
                  borderTop: index === 0 ? '4px solid var(--color-teal-accent)' : index === 1 ? '4px solid var(--color-primary-navy)' : '4px solid var(--color-warm-amber)'
                }}
              >
                <div 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--color-teal-accent)',
                    marginBottom: '0.75rem',
                    opacity: 0.8
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-body)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Levels We Serve */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-page)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            tag="Academic Spectrum"
            title="Levels We Serve"
            subtitle="Tailored tutoring designed around the specific curriculum, marking schemes, and exam formats of each academic tier."
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {academicLevels.map((lvl) => (
              <Card 
                key={lvl.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-teal">{lvl.badge}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                    {lvl.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.55 }}>
                    {lvl.summary}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                      Key Subjects:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {lvl.popularSubjects.slice(0, 4).map((sub) => (
                        <span 
                          key={sub}
                          style={{
                            fontSize: '0.78rem',
                            backgroundColor: 'var(--color-bg-subtle)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-text-body)'
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-teal-hover)', padding: '0.2rem 0.3rem', fontWeight: 600 }}>
                        + more
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem' }}>
                  <Button
                    to={`/enroll?level=${encodeURIComponent(lvl.id)}`}
                    variant="soft"
                    size="sm"
                    fullWidth
                  >
                    Request Tutor
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button
              to="/subjects-and-levels"
              variant="outline"
              size="md"
            >
              Explore All Subjects & Details →
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Benefit Cards) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <SectionHeading
            tag="The STEM SEED Advantage"
            title="Why Choose IQMS STEM SEED PARKS"
            subtitle="We combine pedagogical rigor with flexible matching so your educational investment delivers genuine academic growth."
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-page)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-teal-surface)',
                    color: 'var(--color-teal-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {b.icon}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-headline)' }}>
                    {b.title}
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final Call-to-Action Banner */}
      <section 
        style={{
          backgroundColor: 'var(--color-primary-navy)',
          color: '#FFFFFF',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          position: 'relative'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span 
            className="badge badge-amber"
            style={{ marginBottom: '1.25rem' }}
          >
            Start Your Academic Journey
          </span>
          <h2 style={{ color: '#FFFFFF', marginBottom: '1rem', fontWeight: 800 }}>
            Ready to Connect with Your Ideal Tutor?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '2.25rem', lineHeight: 1.6 }}>
            Whether you need urgent board exam revision, continuous guidance in challenging STEM topics, or competitive test prep, we have the right educator for you.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              to="/enroll"
              variant="primary"
              size="lg"
            >
              Enroll Online Now
            </Button>
            <Button
              href={siteConfig.getWhatsAppUrl("Hello! I want to enroll for tuition.")}
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon size={20} color="#FFFFFF" />
              <span>Chat Directly on WhatsApp</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
