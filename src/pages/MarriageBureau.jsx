import React from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import SEO from '../components/SEO';
import MarriageRegistration from '../components/MarriageRegistration';
import siteConfig from '../config/siteConfig';
import divisions from '../data/divisions';
import marriageBureauCopy from '../data/marriageBureau';
import '../styles/marriage-bureau.css';

const div = divisions.find((d) => d.id === 'marriage');

function StarDivider() {
  return (
    <div className="mb-star-divider-band" aria-hidden="true">
      <div className="container">
        <div className="mb-star-divider">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="5.5"
              y="5.5"
              width="13"
              height="13"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x="5.5"
              y="5.5"
              width="13"
              height="13"
              transform="rotate(45 12 12)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function MarriageBureau() {
  const { hero, howItWorks, whatItCovers, choices, registration, closing, images } =
    marriageBureauCopy;

  const scrollToRegister = (e) => {
    e.preventDefault();
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div data-division="marriage">
      <SEO
        title={div?.seo?.title || `Marriage Bureau | ${siteConfig.brandName}`}
        description={
          div?.seo?.description ||
          'Marriage Bureau in Karachi, Pakistan. Register once with candidate details and partner requirements. Private follow-up via WhatsApp.'
        }
      />

      {/* ── 1. Hero ── */}
      <section className="mb-hero mb-jali-blush">
        <div className="container">
          <div className="mb-hero-grid">
            <div className="mb-fade-up">
              <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
                {hero.eyebrow}
              </p>
              <h1 className="mb-hero-title">
                {hero.headlineBefore}
                <em>{hero.headlineEmphasis}</em>
                {hero.headlineAfter}
              </h1>
              <p className="mb-hero-desc">{hero.description}</p>
              <div className="mb-hero-actions">
                <a
                  href="#register"
                  onClick={scrollToRegister}
                  className="mb-btn-primary"
                >
                  {hero.primaryCta}
                  <ArrowDown size={16} strokeWidth={1.75} />
                </a>
                <a
                  href={siteConfig.getWhatsAppUrl(hero.whatsappIntro)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-btn-outline"
                >
                  <MessageCircle size={16} strokeWidth={1.75} />
                  {hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Dual Mehrab Arches */}
            <div className="mb-hero-arches">
              <div className="mb-arch-frame mb-arch-primary mb-arch-unveil">
                <div className="mb-arch-inner">
                  <img
                    src={images.heroMain.src}
                    width={images.heroMain.width}
                    height={images.heroMain.height}
                    alt={images.heroMain.alt}
                    style={{ objectPosition: images.heroMain.objectPosition }}
                  />
                </div>
              </div>

              <div className="mb-arch-frame mb-arch-secondary mb-arch-unveil">
                <div className="mb-arch-inner">
                  <img
                    src={images.heroSecondary.src}
                    width={images.heroSecondary.width}
                    height={images.heroSecondary.height}
                    alt={images.heroSecondary.alt}
                    style={{ objectPosition: images.heroSecondary.objectPosition }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StarDivider />

      {/* ── 2. How It Works ── */}
      <section className="mb-section mb-section--alt">
        <div className="container">
          <div className="mb-how-header">
            <div>
              <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
                {howItWorks.eyebrow}
              </p>
              <h2 className="mb-section-title">
                {howItWorks.headlineBefore}
                <em>{howItWorks.headlineEmphasis}</em>
                {howItWorks.headlineAfter}
              </h2>
            </div>

            <div className="mb-banner-arch mb-arch-unveil">
              <div className="mb-banner-arch-inner">
                <img
                  src={images.howItWorksBanner.src}
                  width={images.howItWorksBanner.width}
                  height={images.howItWorksBanner.height}
                  alt={images.howItWorksBanner.alt}
                  loading="lazy"
                  style={{ objectPosition: images.howItWorksBanner.objectPosition }}
                />
              </div>
            </div>
          </div>

          <div className="mb-steps-ribbon">
            {howItWorks.steps.map((step) => (
              <div key={step.number} className="mb-step-ribbon-item">
                <span className="mb-ribbon-num">{step.number}</span>
                <h3 className="mb-ribbon-title">{step.title}</h3>
                <p className="mb-ribbon-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StarDivider />

      {/* ── 3. What the Form Covers ── */}
      <section className="mb-section mb-section--light">
        <div className="container">
          <div className="mb-covers-grid">
            <div>
              <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
                {whatItCovers.eyebrow}
              </p>
              <p className="mb-pull-quote">
                {whatItCovers.pullQuoteBefore}
                <em>{whatItCovers.pullQuoteEmphasis}</em>
                {whatItCovers.pullQuoteAfter}
              </p>
            </div>

            <ul className="mb-covers-list">
              {whatItCovers.items.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StarDivider />

      {/* ── 4. Your Choices ── */}
      <section className="mb-section mb-jali-blush" style={{ borderBottom: '1px solid var(--mb-blush-200)' }}>
        <div className="container">
          <div className="mb-card mb-choices-card">
            <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
              {choices.eyebrow}
            </p>
            <h2 className="mb-section-title" style={{ marginBottom: 8 }}>
              {choices.headlineBefore}
              <em>{choices.headlineEmphasis}</em>
              {choices.headlineAfter}
            </h2>
            <ul className="mb-choices-list">
              {choices.statements.map((stmt, idx) => (
                <li key={stmt}>
                  <span className="mb-choice-num">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{stmt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Registration Panel (#register) ── */}
      <section id="register" className="mb-section mb-register-section">
        <div className="container">
          <div className="mb-reg-intro">
            <p className="mb-eyebrow" style={{ color: 'var(--mb-rose-700)' }}>
              {registration.eyebrow}
            </p>
            <h2 className="mb-section-title">
              {registration.headlineBefore}
              <em>{registration.headlineEmphasis}</em>
              {registration.headlineAfter}
            </h2>
          </div>

          <MarriageRegistration />
        </div>
      </section>

      {/* ── 6. Closing Band ── */}
      <section className="mb-closing-band mb-jali-maroon">
        <img
          src={images.closingBand.src}
          width={images.closingBand.width}
          height={images.closingBand.height}
          alt={images.closingBand.alt}
          loading="lazy"
          className="mb-closing-bg-img"
          style={{ objectPosition: images.closingBand.objectPosition }}
        />
        <div className="mb-closing-overlay" aria-hidden="true" />
        <div className="container mb-closing-inner">
          <p className="mb-eyebrow" style={{ color: 'var(--mb-champagne-500)' }}>
            {closing.eyebrow}
          </p>
          <h2 className="mb-closing-title">
            {closing.headlineBefore}
            <em>{closing.headlineEmphasis}</em>
            {closing.headlineAfter}
          </h2>
          <a
            href={siteConfig.getWhatsAppUrl(hero.whatsappIntro)}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-btn-on-dark"
          >
            <MessageCircle size={18} strokeWidth={1.75} />
            {closing.cta}
          </a>
        </div>
      </section>
    </div>
  );
}
