import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { WhatsAppIcon } from './WhatsAppButton';
import siteConfig from '../config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-navy-dark)',
        color: '#94A3B8',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Column */}
          <div>
            <Logo variant="light" />
            <p 
              style={{ 
                marginTop: '1.25rem', 
                fontSize: '0.92rem', 
                lineHeight: 1.65, 
                color: '#94A3B8',
                maxWidth: '340px' 
              }}
            >
              {siteConfig.description}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              <a 
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'background-color 0.2s ease'
                }}
              >
                <WhatsAppIcon size={16} color="#25D366" />
                <span>WhatsApp: {siteConfig.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.05rem', fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/" style={{ color: '#CBD5E1', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/subjects-and-levels" style={{ color: '#CBD5E1', transition: 'color 0.2s' }}>Subjects & Academic Levels</Link>
              </li>
              <li>
                <Link to="/enroll" style={{ color: '#CBD5E1', transition: 'color 0.2s' }}>Student Enrollment Form</Link>
              </li>
              <li>
                <a 
                  href={siteConfig.getWhatsAppUrl("Hello! I want to speak to an academic counselor.")}
                  target="_blank"
                  rel="noopener noreferrer" 
                  style={{ color: '#5EEAD4' }}
                >
                  Academic Consultation (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Academic Levels Column */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.05rem', fontWeight: 700 }}>
              Levels We Cover
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/enroll?level=matric-fsc" style={{ color: '#CBD5E1' }}>Matric & FSc (Pre-Med / Eng / ICS)</Link>
              </li>
              <li>
                <Link to="/enroll?level=o-a-levels" style={{ color: '#CBD5E1' }}>Cambridge O & A Levels (CAIE/Edexcel)</Link>
              </li>
              <li>
                <Link to="/enroll?level=entry-tests" style={{ color: '#CBD5E1' }}>ECAT & MDCAT Entry Test Prep</Link>
              </li>
              <li>
                <Link to="/enroll?level=university" style={{ color: '#CBD5E1' }}>University STEM & Computing Degrees</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.05rem', fontWeight: 700 }}>
              Contact & Hours
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
              <strong>Hours:</strong> {siteConfig.officeHours}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
              <strong>Email:</strong> {siteConfig.email}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
              <strong>Coverage:</strong> {siteConfig.headquarters}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#5EEAD4', marginTop: '0.85rem' }}>
              ⚡ Fast reply time: {siteConfig.responseTime}
            </p>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div 
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#64748B'
          }}
        >
          <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem' }}>
            Phase 1 Launch Edition • Built for Scale
          </p>
        </div>
      </div>
    </footer>
  );
}
