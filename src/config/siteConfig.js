/**
 * SerajUlMaymar : Site Configuration
 *
 * Edit brand info, contacts, and stats here.
 * All divisions share a single WhatsApp number.
 */

export const siteConfig = {
  // Brand
  brandName: 'SerajUlMaymar',
  wordmark: { first: 'Seraj', middle: 'Ul', last: 'Maymar' },
  tagline: 'Building homes, software, and minds.',

  // Contact
  whatsappNumber: '923642044330',
  displayPhone: '+92 364 2044330',
  email: 'a1edspebdsso247@gmail.com',

  // Location
  city: 'Karachi',
  country: 'Pakistan',
  availability: '24x7',

  // Stats shown in the facts strip.
  // Set a value to null to hide that stat.
  stats: [
    { label: '25+ years in construction and education', value: '25+' },
    { label: '24x7 reach us any time', value: '24/7' },
    { label: 'Karachi', value: 'Karachi' },
  ],

  // Marriage Bureau receiver (Google Apps Script Web App; client env vars only)
  marriageBureau: {
    scriptUrl: import.meta.env.VITE_MB_SCRIPT_URL || '',
    token: import.meta.env.VITE_MB_TOKEN || '',
    minFillMs: 8000,
  },

  /**
   * Build a WhatsApp deep link with a prefilled message.
   * @param {string} message : prefilled text
   * @returns {string} full wa.me URL
   */
  getWhatsAppUrl(message = '') {
    const fallback = `Hello SerajUlMaymar! I would like to get in touch.`;
    const text = encodeURIComponent((message || fallback).trim());
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  },
};

export default siteConfig;
