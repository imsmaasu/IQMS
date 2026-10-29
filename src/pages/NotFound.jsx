import React from 'react';
import Button from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import siteConfig from '../config/siteConfig';

export default function NotFound() {
  return (
    <div 
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--color-bg-page)'
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <span 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--color-teal-accent)',
            display: 'block',
            marginBottom: '1rem'
          }}
        >
          404
        </span>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary-navy)' }}>
          Page Not Found
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page you are looking for does not exist or might have been moved. Return to the homepage or reach out to our team.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button to="/" variant="primary" size="md">
            Return to Homepage
          </Button>

          <Button
            href={siteConfig.getWhatsAppUrl("Hello! I got lost on your website.")}
            variant="whatsapp"
            size="md"
          >
            <WhatsAppIcon size={18} color="#FFFFFF" />
            <span>Chat on WhatsApp</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
