import React from 'react';
import { Link } from 'react-router-dom';
import Wordmark from './Wordmark';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Wordmark column */}
          <div className="footer-col">
            <Wordmark size="1.3rem" light />
            <p
              style={{
                marginTop: '16px',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '240px',
              }}
            >
              {siteConfig.tagline}
            </p>
          </div>

          {/* Division columns — generated from divisions.js */}
          {divisions.map((div) => (
            <div className="footer-col" key={div.id}>
              <h4>{div.number} {div.name}</h4>
              {div.services.map((service) => (
                <Link to={`/${div.slug}`} key={service}>
                  {service}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact column */}
          <div className="footer-col">
            <h4>Contact</h4>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ wordBreak: 'break-all' }}
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: {siteConfig.displayPhone}
            </a>
            <span
              style={{
                display: 'block',
                fontSize: '0.875rem',
                padding: '4px 0',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {siteConfig.city} · Available {siteConfig.availability}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {siteConfig.brandName}</span>
          <span>{siteConfig.city}, {siteConfig.country}</span>
        </div>
      </div>
    </footer>
  );
}
