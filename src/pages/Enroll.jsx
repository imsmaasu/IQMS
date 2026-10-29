import React from 'react';
import EnrollForm from '../components/EnrollForm';
import Button from '../components/Button';
import Card from '../components/Card';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import siteConfig from '../config/siteConfig';

export default function Enroll() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-page)', paddingBottom: '4.5rem' }}>
      {/* Page Title Banner */}
      <section 
        style={{
          background: 'linear-gradient(180deg, #F0FDFA 0%, var(--color-bg-page) 100%)',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>
            Quick Registration
          </span>
          <h1 style={{ fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: '0.85rem' }}>
            Enroll & Find Your Tutor
          </h1>
          <p style={{ color: 'var(--color-text-body)', fontSize: '1.08rem', lineHeight: 1.6 }}>
            Submit your learning requirements below to receive a personalized tutor match, or reach out instantly via WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
              gap: '2.5rem',
              alignItems: 'start'
            }}
            className="enroll-grid"
          >
            {/* Column 1: Enrollment Form */}
            <div>
              <EnrollForm />
            </div>

            {/* Column 2: Direct Contact, WhatsApp Support & Reassurance */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* WhatsApp Instant Assistance Card */}
              <Card 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-whatsapp)',
                  borderTop: '5px solid var(--color-whatsapp)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-whatsapp-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <WhatsAppIcon size={24} color="#25D366" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-headline)', margin: 0 }}>
                      Prefer Direct WhatsApp?
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-whatsapp-dark)', fontWeight: 600 }}>
                      Fastest response channel
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  If you prefer chatting directly with an academic advisor before filling out the form, click below to start a WhatsApp conversation right now:
                </p>

                <Button
                  href={siteConfig.getWhatsAppUrl("Hello! I have a question regarding tutoring at IQMS STEM SEED PARKS.")}
                  variant="whatsapp"
                  size="md"
                  fullWidth
                >
                  <WhatsAppIcon size={18} color="#FFFFFF" />
                  <span>Chat on WhatsApp: {siteConfig.displayPhone}</span>
                </Button>

                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Average reply time: <strong>{siteConfig.responseTime}</strong>
                </div>
              </Card>

              {/* Contact Information Block */}
              <Card style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-navy)', marginBottom: '1rem' }}>
                  Contact Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Inquiries & Support
                    </span>
                    <strong style={{ color: 'var(--color-text-headline)' }}>{siteConfig.email}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Academic Admissions
                    </span>
                    <strong style={{ color: 'var(--color-text-headline)' }}>{siteConfig.supportEmail}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Operational Hours
                    </span>
                    <span style={{ color: 'var(--color-text-body)' }}>{siteConfig.officeHours}</span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Coverage Areas
                    </span>
                    <span style={{ color: 'var(--color-text-body)' }}>{siteConfig.headquarters}</span>
                  </div>
                </div>
              </Card>

              {/* What Happens Next Card */}
              <Card style={{ backgroundColor: 'var(--color-teal-light)', border: '1px solid var(--color-teal-border)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-teal-hover)', marginBottom: '0.75rem' }}>
                  What happens after you enroll?
                </h4>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--color-text-body)', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.55 }}>
                  <li><strong>Review:</strong> Our academic coordinator reviews your curriculum and target grade requirements.</li>
                  <li><strong>Tutor Matching:</strong> We match you with 1 to 2 best-fit verified tutors.</li>
                  <li><strong>Trial Session:</strong> An introductory demo / trial lesson is scheduled.</li>
                  <li><strong>Confirmation:</strong> Once satisfied, your regular schedule begins with progress tracking.</li>
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 900px) {
          .enroll-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
