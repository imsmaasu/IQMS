import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import Wordmark from './Wordmark';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

const accentColors = {
  construction: '#E58A1F',
  software: '#2E6BFF',
  education: '#139C8A',
  rose: '#B23A5A',
};

const navLinks = [
  { to: '/', label: 'Home' },
  ...divisions.map((d) => ({ to: `/${d.slug}`, label: d.name, dot: accentColors[d.accentKey] })),
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeDivision = divisions.find((d) => pathname.startsWith(`/${d.slug}`));

  const isActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <>
      <header
        className="site-header"
        data-division={activeDivision?.accentKey || undefined}
      >
        <div className="container header-inner">
          <Wordmark size="1.2rem" />

          {/* Desktop nav */}
          <ul className="header-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={isActive(link.to) ? 'active' : ''}
                  style={
                    isActive(link.to) && link.dot
                      ? { borderBottomColor: link.dot }
                      : undefined
                  }
                >
                  {link.dot && (
                    <span className="nav-dot" style={{ backgroundColor: link.dot }} />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hide-mobile"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              WhatsApp
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          data-division={activeDivision?.accentKey || undefined}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Wordmark size="1.2rem" />
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ border: 'none' }}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={
                  isActive(link.to)
                    ? { color: link.dot || 'var(--gold-500)' }
                    : undefined
                }
              >
                {link.dot && (
                  <span
                    className="nav-dot"
                    style={{ backgroundColor: link.dot, width: 8, height: 8, marginRight: 10 }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '32px', paddingBottom: '16px' }}>
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}

