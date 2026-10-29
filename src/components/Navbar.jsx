import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import { WhatsAppIcon } from './WhatsAppButton';
import siteConfig from '../config/siteConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Subjects & Levels', path: '/subjects-and-levels' },
    { label: 'Enroll / Contact', path: '/enroll' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--color-border)' : 'rgba(226, 232, 240, 0.7)'}`,
        boxShadow: isScrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.06)' : 'none',
        transition: 'all 0.25s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-teal-accent)' : 'var(--color-text-body)',
                padding: '0.4rem 0',
                position: 'relative',
                transition: 'color 0.15s ease'
              })}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '2.5px',
                        backgroundColor: 'var(--color-teal-accent)',
                        borderRadius: '2px'
                      }} 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div 
          className="desktop-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <Button
            href={siteConfig.getWhatsAppUrl("Hello! I want to inquire about tutoring with IQMS STEM SEED PARKS.")}
            variant="whatsapp"
            size="sm"
          >
            <WhatsAppIcon size={18} color="#FFFFFF" />
            <span>WhatsApp Us</span>
          </Button>

          <Button
            to="/enroll"
            variant="navy"
            size="sm"
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-toggle"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--color-primary-navy)'
          }}
        >
          {isOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="mobile-menu"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-teal-accent)' : 'var(--color-text-body)',
                padding: '0.6rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isActive ? 'var(--color-teal-light)' : 'transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <Button
              href={siteConfig.getWhatsAppUrl("Hello! I want to inquire about tutoring with IQMS STEM SEED PARKS.")}
              variant="whatsapp"
              size="md"
              fullWidth
            >
              <WhatsAppIcon size={20} color="#FFFFFF" />
              <span>WhatsApp Us</span>
            </Button>
            <Button
              to="/enroll"
              variant="primary"
              size="md"
              fullWidth
            >
              Enroll as Student
            </Button>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive navbar queries */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
